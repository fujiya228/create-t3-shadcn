import * as p from '@clack/prompts';

export const onCancel = () => {
  p.cancel('Operation cancelled.');
  process.exit(0);
};

export const importAliasesQuestion = () => p.text({
  message: 'What import alias would you like to use?',
  initialValue: '@/*',
  placeholder: '@/*',
}) as Promise<string>;
