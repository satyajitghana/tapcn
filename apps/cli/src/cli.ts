import { Command } from 'commander';
import { runInit } from './commands/init.js';
import { runAdd } from './commands/add.js';
import { runDoctor } from './commands/doctor.js';

const PKG_VERSION = '0.1.0';

export function createCli(): Command {
  const program = new Command();

  program
    .name('tapcn')
    .description(
      'CLI tool for adding tapcn UI components to your React Native project',
    )
    .version(PKG_VERSION, '-v, --version', 'Display the version number');

  // init command
  program
    .command('init')
    .description('Initialize a new tapcn project or set up tapcn in an existing project')
    .option(
      '-c, --cwd <path>',
      'The working directory. Defaults to the current directory.',
    )
    .action(async (options) => {
      await runInit({
        cwd: options.cwd,
      });
    });

  // add command
  program
    .command('add')
    .description('Add tapcn components to your project')
    .argument('[components...]', 'The components to add (space-separated)')
    .option(
      '-c, --cwd <path>',
      'The working directory. Defaults to the current directory.',
    )
    .option('-y, --yes', 'Skip confirmation prompts.', false)
    .option('-o, --overwrite', 'Overwrite existing files.', false)
    .option(
      '-p, --path <path>',
      'The path to add the component to.',
    )
    .action(async (components, options) => {
      await runAdd(components, {
        cwd: options.cwd,
        yes: options.yes,
        overwrite: options.overwrite,
        path: options.path,
      });
    });

  // doctor command
  program
    .command('doctor')
    .description('Check your project setup for issues')
    .option(
      '-c, --cwd <path>',
      'The working directory. Defaults to the current directory.',
    )
    .action(async (options) => {
      await runDoctor({
        cwd: options.cwd,
      });
    });

  return program;
}
