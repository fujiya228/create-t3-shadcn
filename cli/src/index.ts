#!/usr/bin/env node
import { init } from "@/src/commands/init"
import { Command } from "commander"

import { getPackageInfo } from "./utils/get-package-info"

process.on('SIGINT', () => {
  console.log('\nProcess interrupted by user (Ctrl + C). Exiting...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nProcess terminated (SIGTERM). Exiting...');
  process.exit(0);
});

async function main() {
  const packageInfo = await getPackageInfo()

  const program = new Command()
    .name("with-shadcn")
    .description("setup a new frameworks app with shadcn/ui")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )
    .addCommand(init)
    .showHelpAfterError()
    .exitOverride(() => {
      process.exit(0);
    });

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  } else {
    program.parse(process.argv);
  }
}

main()
