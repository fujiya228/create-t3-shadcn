import { Command } from 'commander';
import * as p from '@clack/prompts';

import { SetupConfig, buildComponentsConfig, buildSetupConfig } from '@/src/steps/builConfig';
import { initializeFramework, initilzeShadcnUI } from '@/src/steps/initializers';

export const init = new Command()
  .name('init')
  .description('Setup a new framework app with shadcn/ui')
  .action(async () => {
    p.intro('Welcome to the with-shadcn CLI! 🚀');

    // Ask for application configs
    const setupConfig: SetupConfig = await buildSetupConfig();

    // Initialize the selected framework
    await initializeFramework(setupConfig);

    const componentsConfig = await buildComponentsConfig();

    // Initialize Shadcn UI
    await initilzeShadcnUI(componentsConfig, setupConfig);

    p.outro('All done! 🚀');
  });
