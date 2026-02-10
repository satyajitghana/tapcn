import path from 'node:path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';

interface DoctorOptions {
  cwd?: string;
}

interface CheckResult {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
}

const REQUIRED_DEPENDENCIES = [
  'expo',
  'nativewind',
  'react-native',
  'react-native-reanimated',
  'tailwindcss',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
];

const RECOMMENDED_DEPENDENCIES = [
  'react-native-safe-area-context',
  'react-native-svg',
  '@rn-primitives/slot',
  'lucide-react-native',
];

const CONFIG_FILES = [
  {
    name: 'babel.config.js',
    alternatives: ['babel.config.cjs', 'babel.config.mjs'],
    description: 'Babel config (needed for NativeWind)',
  },
  {
    name: 'metro.config.js',
    alternatives: ['metro.config.cjs', 'metro.config.ts'],
    description: 'Metro bundler config (needed for NativeWind)',
  },
  {
    name: 'tailwind.config.ts',
    alternatives: ['tailwind.config.js', 'tailwind.config.cjs'],
    description: 'Tailwind CSS config',
  },
  {
    name: 'global.css',
    alternatives: ['app/global.css', 'src/global.css', 'assets/global.css'],
    description: 'Global CSS file with Tailwind directives',
  },
];

export async function runDoctor(options: DoctorOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd();
  const results: CheckResult[] = [];

  logger.log(chalk.bold('tapcn doctor'));
  logger.log(chalk.dim('Checking your project setup...\n'));

  // 1. Check components.json
  results.push(await checkComponentsJson(cwd));

  // 2. Check package.json exists
  results.push(await checkPackageJson(cwd));

  // 3. Check required dependencies
  const depResults = await checkDependencies(cwd);
  results.push(...depResults);

  // 4. Check config files
  const configResults = await checkConfigFiles(cwd);
  results.push(...configResults);

  // 5. Check recommended dependencies
  const recResults = await checkRecommendedDependencies(cwd);
  results.push(...recResults);

  // Print results
  logger.break();
  logger.log(chalk.bold('Results:'));
  logger.break();

  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;

  for (const result of results) {
    const icon =
      result.status === 'pass'
        ? chalk.green('  [PASS]')
        : result.status === 'warn'
          ? chalk.yellow('  [WARN]')
          : chalk.red('  [FAIL]');

    logger.log(`${icon} ${result.name}`);
    if (result.status !== 'pass') {
      logger.log(chalk.dim(`         ${result.message}`));
    }

    if (result.status === 'pass') passCount++;
    if (result.status === 'warn') warnCount++;
    if (result.status === 'fail') failCount++;
  }

  logger.break();

  if (failCount > 0) {
    logger.error(
      `${failCount} check(s) failed, ${warnCount} warning(s), ${passCount} passed.`,
    );
    logger.info(
      'Fix the issues above and run "tapcn doctor" again.',
    );
  } else if (warnCount > 0) {
    logger.warn(
      `${warnCount} warning(s), ${passCount} passed. Your project should work, but consider fixing the warnings.`,
    );
  } else {
    logger.success(
      `All ${passCount} checks passed! Your project is set up correctly.`,
    );
  }

  logger.break();
}

async function checkComponentsJson(cwd: string): Promise<CheckResult> {
  const componentsJsonPath = path.join(cwd, 'components.json');

  if (!(await fs.pathExists(componentsJsonPath))) {
    return {
      name: 'components.json',
      status: 'fail',
      message:
        'components.json not found. Run "tapcn init" to create one.',
    };
  }

  try {
    const content = await fs.readJson(componentsJsonPath);

    if (!content.aliases || !content.aliases.components || !content.aliases.utils) {
      return {
        name: 'components.json',
        status: 'warn',
        message:
          'components.json is missing required aliases (components, utils). Some features may not work correctly.',
      };
    }

    return {
      name: 'components.json',
      status: 'pass',
      message: '',
    };
  } catch {
    return {
      name: 'components.json',
      status: 'fail',
      message:
        'components.json exists but contains invalid JSON. Please fix or recreate it.',
    };
  }
}

async function checkPackageJson(cwd: string): Promise<CheckResult> {
  const packageJsonPath = path.join(cwd, 'package.json');

  if (!(await fs.pathExists(packageJsonPath))) {
    return {
      name: 'package.json',
      status: 'fail',
      message:
        'No package.json found. Are you in the right directory?',
    };
  }

  return {
    name: 'package.json',
    status: 'pass',
    message: '',
  };
}

async function getAllDependencies(
  cwd: string,
): Promise<Record<string, string>> {
  const packageJsonPath = path.join(cwd, 'package.json');

  if (!(await fs.pathExists(packageJsonPath))) {
    return {};
  }

  try {
    const packageJson = await fs.readJson(packageJsonPath);
    return {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };
  } catch {
    return {};
  }
}

async function checkDependencies(cwd: string): Promise<CheckResult[]> {
  const allDeps = await getAllDependencies(cwd);
  const results: CheckResult[] = [];

  for (const dep of REQUIRED_DEPENDENCIES) {
    if (allDeps[dep]) {
      results.push({
        name: `Dependency: ${dep}`,
        status: 'pass',
        message: '',
      });
    } else {
      results.push({
        name: `Dependency: ${dep}`,
        status: 'fail',
        message: `Missing required dependency "${dep}". Install it with your package manager.`,
      });
    }
  }

  return results;
}

async function checkRecommendedDependencies(
  cwd: string,
): Promise<CheckResult[]> {
  const allDeps = await getAllDependencies(cwd);
  const results: CheckResult[] = [];

  for (const dep of RECOMMENDED_DEPENDENCIES) {
    if (allDeps[dep]) {
      results.push({
        name: `Recommended: ${dep}`,
        status: 'pass',
        message: '',
      });
    } else {
      results.push({
        name: `Recommended: ${dep}`,
        status: 'warn',
        message: `"${dep}" is recommended for full component support.`,
      });
    }
  }

  return results;
}

async function checkConfigFiles(cwd: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  for (const configFile of CONFIG_FILES) {
    const mainPath = path.join(cwd, configFile.name);
    let found = false;

    if (await fs.pathExists(mainPath)) {
      found = true;
    } else {
      // Check alternatives
      for (const alt of configFile.alternatives) {
        if (await fs.pathExists(path.join(cwd, alt))) {
          found = true;
          break;
        }
      }
    }

    if (found) {
      results.push({
        name: `Config: ${configFile.description}`,
        status: 'pass',
        message: '',
      });
    } else {
      results.push({
        name: `Config: ${configFile.description}`,
        status: 'fail',
        message: `Could not find ${configFile.name} (or alternatives: ${configFile.alternatives.join(', ')}). This file is required for tapcn to work.`,
      });
    }
  }

  return results;
}
