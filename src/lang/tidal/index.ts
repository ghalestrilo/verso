import { VersoLanguagePlugin } from "../plugin";
import { parse } from "./parser.js";

export const TidalPlugin: VersoLanguagePlugin = {
  parse,
  // parse: require("./parser.js"),
  stop: "hush",
  prepareCommand: (raw) =>
    `:{\n ${raw
      .split("\n")
      .filter((x) => !x.includes("--"))
      .join("\n")} \n:}`,
};
