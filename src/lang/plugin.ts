export type VersoLanguagePlugin = {
  parse: any;
  stop: string;
  prepareCommand: (raw: string) => string;
};
