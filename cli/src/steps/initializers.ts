import * as path from 'path';
import { promises as fs } from "fs";

import * as p from '@clack/prompts';

import { type SetupConfig, FRAMEWORKS } from '@/src/steps/builConfig';
import { runCommand } from '@/src/utils/run-command';

export async function initializeFramework(setupConfig: SetupConfig) {
  const spin = p.spinner();
  spin.start();
  spin.message(`Creating a new ${FRAMEWORKS[setupConfig.framework].label} app`);

  switch (setupConfig.framework) {
    case 'nextjs':
      await runCommand(`npx create-next-app@latest ${setupConfig.appName} ${setupConfig.cliFlags.join(' ')}`);
      break;
    case 't3app':
      await runCommand(`npx create-t3-app@latest ${setupConfig.appName} ${setupConfig.cliFlags.join(' ')}`);
      break;
  }

  spin.stop(`Created a new ${FRAMEWORKS[setupConfig.framework].label} app`);
}
