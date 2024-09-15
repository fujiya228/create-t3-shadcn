import { Command } from 'commander';
import { runCommand } from '@/src/utils/run-command';
import * as path from 'path';

export const init = new Command()
  .name('init')
  .description('setup a new frameworks app with shadcn/ui')
  .action(() => {
    const projectName = 'my-t3-app';

    console.log('Creating T3 app...');
    runCommand(`npm create t3-app@latest -- ${projectName}`);

    const projectPath = path.join(process.cwd(), projectName);

    console.log('Setting up shadcn...');
    runCommand('npx shadcn@latest init', projectPath);

    console.log('T3 app with shadcn setup is complete!');
  });
