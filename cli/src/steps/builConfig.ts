import * as p from '@clack/prompts';

import { importAliasesQuestion, onCancel } from '@/src/utils/prompt';

type FrameworkInfo = {
  value: string;
  label: string;
  defaultCliFlags: string[];
  questions: {
    [key: string]: {
      flagString: string;
      question: () => Promise<string>;
    };
  };
};

type Frameworks = {
  [key: string]: FrameworkInfo;
};

export type SetupConfig = {
  appName: string;
  framework: string;
  cliFlags: string[];
};

export const FRAMEWORKS: Frameworks = {
  nextjs: {
    value: 'nextjs',
    label: 'Next.js',
    defaultCliFlags: [
      '--ts',
      '--eslint',
      '--tailwind', // default to true
      '--src-dir src', // default to src
      '--app', // default to true
    ],
    questions: {
      importAliases: {
        flagString: '--import-alias',
        question: importAliasesQuestion,
      },
    },

  },
  t3app: {
    value: 't3app',
    label: 'T3 Stack application',
    defaultCliFlags: [
      '--noGit',
      '--CI',
      '--tailwind true', // default to true
      '--appRouter true',
    ],
    questions: {
      trpc: {
        flagString: '',
        question: () => p.select({
          message: 'Would you like to use tRPC?',
          options: [
            { value: '--trpc true', label: 'Yes' },
            { value: '', label: 'No' },
          ],
        }) as Promise<string>,
      },
      nextAuth: {
        flagString: '',
        question: () => p.select({
          message: 'What authentication provider would you like to use?',
          options: [
            { value: '', label: 'None' },
            { value: '--nextAuth true', label: 'NextAuth.js' },
          ],
        }) as Promise<string>,
      },
      orm: {
        flagString: '',
        question: () => p.select({
          message: 'What database ORM would you like to use?',
          options: [
            { value: '', label: 'None' },
            { value: '--prisma true', label: 'Prisma' },
            { value: '--drizzle true', label: 'Drizzle' },
          ],
        }) as Promise<string>,
      },
      dbProvider: {
        flagString: '--dbProvider',
        question: () => p.select({
          message: 'What database provider would you like to use?',
          options: [
            { value: 'sqlite', label: 'SQLite (LibSQL)' },
            { value: 'mysql', label: 'MySQL' },
            { value: 'postgres', label: 'PostgreSQL' },
            { value: 'planetscale', label: 'PlanetScale' },
          ],
        }) as Promise<string>,
      },
      // TODO: if below issue is fixed, uncomment this
      // https://github.com/t3-oss/create-t3-app/issues/1903
      // importAliases: {
      //   flagString: '--import-alias',
      //   question: importAliasesQuestion,
      // },
    },
  },
};

async function buildCliFlags(framework: string): Promise<string[]> {
  const fw = FRAMEWORKS[framework];

  // make a map of the questions
  const questions = Object.keys(fw.questions).reduce((acc, question) => {
    acc[question] = fw.questions[question].question;
    return acc;
  }, {} as { [key: string]: () => Promise<string> });

  // ask the questions and get the results
  const questionResults = await p.group(questions, { onCancel: onCancel, });
  
  // convert the results to CLI flags
  const additionalCliFlags = Object.keys(questionResults).map((question) => {
    return `${fw.questions[question].flagString} ${questionResults[question]}`;
  });

  // return the default flags and the additional flags
  return Promise.resolve([...fw.defaultCliFlags, ...additionalCliFlags]);
}

export async function buildSetupConfig(): Promise<SetupConfig> {
  return p.group(
    {
      appName: () =>
        p.text({
          message: 'What is your app name?'
        }) as Promise<string>,
      framework: () =>
        p.select({
          message: 'What framework would you like to use?',
          options: Object.values(FRAMEWORKS),
        }) as Promise<string>,
      cliFlags: (opts: { results: { framework?: string; } }) => buildCliFlags(opts.results.framework as string),
    },
    {
      onCancel: onCancel,
    }
  );
}

export async function buildComponentsConfig() {
  return p.group({
    style: () => p.select({
      message: 'shadcn/ui: Which style would you like to use?',
      options: [
        { value: 'new-york', label: 'New York' },
        { value: 'default', label: 'Default' },
      ],
    }) as Promise<string>,
    baseColor: () => p.select({
      message: 'shadcn/ui: Which color would you like to use as the base color?',
      options: [
        {　value: "neutral",　label: "Neutral", },
        {　value: "gray",　label: "Gray", },
        {　value: "zinc",　label: "Zinc", },
        {　value: "stone",　label: "Stone", },
        {　value: "slate",　label: "Slate", },
      ],
    }) as Promise<string>,
    cssVariables: () => p.confirm({
      message: 'shadcn/ui: Would you like to use CSS variables for theming?',
    }) as Promise<boolean>,
  });
}
