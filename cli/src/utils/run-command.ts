import { execSync } from 'child_process';

export const runCommand = (command: string, cwd?: string) => {
  try {
    execSync(command, { stdio: 'inherit', cwd: cwd || process.cwd() });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\nFailed to execute: ${command}\n`);
      console.error(`Error: ${error.message}\n`);
    }
    process.exit(1);
  }
}
