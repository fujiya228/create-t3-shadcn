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

export async function initilzeShadcnUI(componentsConfig: any, setupConfig: SetupConfig) {
  // Initialize Shadcn UI
  const spin = p.spinner();
  spin.start();
  spin.message('Installing shadcn/ui');

  const projectPath = path.join(process.cwd(), setupConfig.appName);
  await runCommand('npx shadcn@latest init -d', projectPath);
  await overwriteComponetsConfig(componentsConfig, projectPath);

  spin.stop('Installed shadcn/ui');
}

async function overwriteComponetsConfig(componentsConfig: any, projectPath: string) {
  const filePath = path.join(projectPath, 'components.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const jsonData = JSON.parse(data);

  jsonData.style = componentsConfig.style;
  jsonData.tailwind.baseColor = componentsConfig.baseColor;
  jsonData.tailwind.cssVariables = componentsConfig.cssVariables;

  await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
}
