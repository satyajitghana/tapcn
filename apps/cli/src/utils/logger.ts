import chalk from 'chalk';

export const logger = {
  info(...args: unknown[]) {
    console.log(chalk.cyan('info'), '-', ...args);
  },

  success(...args: unknown[]) {
    console.log(chalk.green('success'), '-', ...args);
  },

  warn(...args: unknown[]) {
    console.log(chalk.yellow('warn'), '-', ...args);
  },

  error(...args: unknown[]) {
    console.log(chalk.red('error'), '-', ...args);
  },

  break() {
    console.log('');
  },

  log(...args: unknown[]) {
    console.log(...args);
  },
};
