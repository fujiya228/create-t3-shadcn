import { execa } from 'execa';

export const runCommand = async (command: string, cwd?: string) => {
  const [cmd, ...args] = command.split(' ');

  try {
    await execa(cmd, args, { cwd: cwd || process.cwd() });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\nFailed to execute: ${command}\n\n${error.message}\n`);
    }
    process.exit(1);
  }
}
