import { VersoLanguagePlugin } from "../plugin";

export const TidalPlugin: VersoLanguagePlugin = {
  parse: require("./parser.js"),
  stop: "hush",
  prepareCommand: (raw) =>
    `:{\n ${raw
      .split("\n")
      .filter((x) => !x.includes("--"))
      .join("\n")} \n:}`,
};
