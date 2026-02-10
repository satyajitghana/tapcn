import path from 'node:path';
import fs from 'fs-extra';

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

export async function getPackageManager(
  targetDir?: string,
): Promise<PackageManager> {
  const cwd = targetDir ?? process.cwd();

  // Check for lock files in order of specificity
  if (await fs.pathExists(path.join(cwd, 'bun.lockb'))) {
    return 'bun';
  }

  if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  if (await fs.pathExists(path.join(cwd, 'package-lock.json'))) {
    return 'npm';
  }

  // Check the npm_config_user_agent env var as a fallback
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith('yarn')) {
      return 'yarn';
    }
    if (userAgent.startsWith('pnpm')) {
      return 'pnpm';
    }
    if (userAgent.startsWith('bun')) {
      return 'bun';
    }
  }

  // Default to npm
  return 'npm';
}

export function getPackageRunnerCommand(pm: PackageManager): string {
  switch (pm) {
    case 'npm':
      return 'npx';
    case 'yarn':
      return 'yarn dlx';
    case 'pnpm':
      return 'pnpm dlx';
    case 'bun':
      return 'bunx';
    default:
      return 'npx';
  }
}
