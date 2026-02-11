import path from 'node:path';
import fs from 'fs-extra';
import prompts from 'prompts';
import ora from 'ora';
import { execa } from 'execa';
import { logger } from '../utils/logger.js';
import {
  AVAILABLE_COMPONENTS,
  getRegistryUrls,
  validateComponents,
} from '../utils/registry.js';
import {
  getPackageManager,
  getPackageRunnerCommand,
} from '../utils/get-package-manager.js';
import { runDoctor } from './doctor.js';

interface AddOptions {
  cwd?: string;
  yes?: boolean;
  overwrite?: boolean;
  path?: string;
}

export async function runAdd(
  components: string[],
  options: AddOptions,
): Promise<void> {
  const cwd = options.cwd ?? process.cwd();

  // Check that components.json exists
  const componentsJsonPath = path.join(cwd, 'components.json');
  if (!(await fs.pathExists(componentsJsonPath))) {
    logger.error(
      'components.json not found. Please run "tapcn init" first to set up your project.',
    );
    process.exit(1);
  }

  // If no components specified, show interactive multi-select
  if (components.length === 0) {
    const { selectedComponents } = await prompts({
      type: 'autocompleteMultiselect',
      name: 'selectedComponents',
      message: 'Which components would you like to add?',
      choices: AVAILABLE_COMPONENTS.map((c) => ({
        title: c,
        value: c,
      })),
      instructions:
        '\n  Space to select, Enter to confirm, Type to filter\n',
      min: 1,
    });

    if (!selectedComponents || selectedComponents.length === 0) {
      logger.warn('No components selected. Aborting.');
      process.exit(0);
    }

    components = selectedComponents;
  }

  // Validate component names
  const { valid, invalid } = validateComponents(components);

  if (invalid.length > 0) {
    logger.error(`Unknown component(s): ${invalid.join(', ')}`);
    logger.info(
      `Available components: ${AVAILABLE_COMPONENTS.join(', ')}`,
    );
    process.exit(1);
  }

  if (valid.length === 0) {
    logger.error('No valid components to add.');
    process.exit(1);
  }

  // Build registry URLs
  const registryUrls = getRegistryUrls(valid);

  logger.break();
  logger.info(`Adding ${valid.length} component(s): ${valid.join(', ')}`);
  logger.break();

  // Detect package manager
  const packageManager = await getPackageManager(cwd);
  const runnerCommand = getPackageRunnerCommand(packageManager);

  // Build the shadcn command
  // Delegate to shadcn@latest add with registry URLs
  // e.g., npx shadcn@latest add https://tapcn.vercel.app/r/button.json --yes
  const shadcnArgs = ['shadcn@latest', 'add', ...registryUrls];

  if (options.yes) {
    shadcnArgs.push('--yes');
  }

  if (options.overwrite) {
    shadcnArgs.push('--overwrite');
  }

  if (options.path) {
    shadcnArgs.push('--path', options.path);
  }

  const spinner = ora('Running shadcn to install components...').start();

  try {
    // Split the runner command for pnpm dlx case
    const [cmd, ...cmdPrefixArgs] = runnerCommand.split(' ');
    const allArgs = [...cmdPrefixArgs, ...shadcnArgs];

    spinner.stop();

    logger.info(`Running: ${cmd} ${allArgs.join(' ')}`);
    logger.break();

    await execa(cmd, allArgs, {
      cwd,
      stdio: 'inherit',
    });

    logger.break();
    logger.success('Components added successfully!');
  } catch (error) {
    logger.break();
    logger.error('Failed to add components via shadcn.');

    if (error instanceof Error) {
      logger.error(error.message);
    }

    logger.break();
    logger.info('You can try adding them manually:');
    for (const url of registryUrls) {
      logger.log(`  ${runnerCommand} shadcn@latest add ${url}`);
    }

    process.exit(1);
  }

  // Run doctor after adding components
  logger.break();
  logger.info('Running doctor to verify project setup...');
  logger.break();

  await runDoctor({ cwd });
}
