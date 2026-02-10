import path from 'node:path';
import fs from 'fs-extra';
import prompts from 'prompts';
import ora from 'ora';
import { execa } from 'execa';
import { logger } from '../utils/logger.js';

const TEMPLATES = {
  'expo-default': {
    name: 'Expo (Default)',
    description: 'Expo project with NativeWind and tapcn pre-configured',
    repo: 'https://github.com/tapcn/template-expo-default.git',
  },
  'expo-router': {
    name: 'Expo Router',
    description:
      'Expo Router project with NativeWind and tapcn pre-configured',
    repo: 'https://github.com/tapcn/template-expo-router.git',
  },
  'expo-bare': {
    name: 'Expo (Bare)',
    description: 'Minimal Expo project with only essential tapcn setup',
    repo: 'https://github.com/tapcn/template-expo-bare.git',
  },
} as const;

type TemplateKey = keyof typeof TEMPLATES;

interface InitOptions {
  cwd?: string;
}

export async function runInit(options: InitOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd();

  logger.log('');
  logger.info('Initializing a new tapcn project...');
  logger.log('');

  // Check if we're inside an existing project
  const existingPackageJson = path.join(cwd, 'package.json');
  if (await fs.pathExists(existingPackageJson)) {
    const { proceed } = await prompts({
      type: 'confirm',
      name: 'proceed',
      message:
        'A package.json already exists in this directory. Do you want to initialize tapcn in this existing project?',
      initial: false,
    });

    if (proceed) {
      await initializeInExistingProject(cwd);
      return;
    }

    logger.log('');
  }

  // Prompt for project name
  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'What is the name of your project?',
    initial: 'my-tapcn-app',
    validate: (value: string) => {
      if (!value.trim()) {
        return 'Project name is required';
      }
      if (!/^[a-z0-9-_]+$/i.test(value.trim())) {
        return 'Project name can only contain letters, numbers, hyphens, and underscores';
      }
      return true;
    },
  });

  if (!projectName) {
    logger.error('Project name is required. Aborting.');
    process.exit(1);
  }

  // Prompt for template
  const { template } = await prompts({
    type: 'select',
    name: 'template',
    message: 'Which template would you like to use?',
    choices: Object.entries(TEMPLATES).map(([value, t]) => ({
      title: t.name,
      description: t.description,
      value,
    })),
    initial: 0,
  });

  if (!template) {
    logger.error('Template selection is required. Aborting.');
    process.exit(1);
  }

  const targetDir = path.join(cwd, projectName);

  // Check if target directory exists
  if (await fs.pathExists(targetDir)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `Directory "${projectName}" already exists. Do you want to overwrite it?`,
      initial: false,
    });

    if (!overwrite) {
      logger.info('Aborting.');
      process.exit(0);
    }

    await fs.remove(targetDir);
  }

  // Clone the template
  const selectedTemplate = TEMPLATES[template as TemplateKey];
  const spinner = ora(`Cloning template: ${selectedTemplate.name}...`).start();

  try {
    await execa('git', [
      'clone',
      '--depth',
      '1',
      selectedTemplate.repo,
      targetDir,
    ]);

    // Remove .git directory so user starts fresh
    await fs.remove(path.join(targetDir, '.git'));

    spinner.succeed(`Template "${selectedTemplate.name}" cloned successfully.`);
  } catch (error) {
    spinner.fail('Failed to clone template.');
    logger.error(
      'Could not clone the template repository. Please check your internet connection and try again.',
    );
    logger.error(
      'Alternatively, you can initialize tapcn in an existing Expo project with:',
    );
    logger.log('  cd your-project && tapcn init');
    process.exit(1);
  }

  // Create components.json
  await createComponentsJson(targetDir);

  // Initialize git
  const gitSpinner = ora('Initializing git repository...').start();
  try {
    await execa('git', ['init'], { cwd: targetDir });
    await execa('git', ['add', '-A'], { cwd: targetDir });
    await execa('git', ['commit', '-m', 'Initial commit from tapcn init'], {
      cwd: targetDir,
    });
    gitSpinner.succeed('Git repository initialized.');
  } catch {
    gitSpinner.warn('Could not initialize git repository.');
  }

  logger.break();
  logger.success('Project created successfully!');
  logger.break();
  logger.log('Next steps:');
  logger.log(`  cd ${projectName}`);
  logger.log('  npm install');
  logger.log('  tapcn add button');
  logger.log('  npm run start');
  logger.break();
}

async function initializeInExistingProject(cwd: string): Promise<void> {
  const spinner = ora('Setting up tapcn in existing project...').start();

  // Create components.json
  await createComponentsJson(cwd);

  spinner.succeed('tapcn initialized in existing project.');

  logger.break();
  logger.info('Make sure you have the following dependencies installed:');
  logger.log('  - nativewind');
  logger.log('  - tailwindcss');
  logger.log('  - react-native-reanimated');
  logger.log('  - class-variance-authority');
  logger.log('  - clsx');
  logger.log('  - tailwind-merge');
  logger.break();
  logger.info('You can now add components with:');
  logger.log('  tapcn add button');
  logger.break();
}

async function createComponentsJson(targetDir: string): Promise<void> {
  const componentsJsonPath = path.join(targetDir, 'components.json');

  const config = {
    $schema: 'https://tapcn.dev/schema.json',
    style: 'default',
    tailwind: {
      config: 'tailwind.config.ts',
      css: 'global.css',
      baseColor: 'neutral',
      cssVariables: true,
    },
    aliases: {
      components: '~/components',
      utils: '~/lib/utils',
      ui: '~/components/ui',
      lib: '~/lib',
    },
  };

  await fs.writeJson(componentsJsonPath, config, { spaces: 2 });
  logger.success('Created components.json');
}
