import { parse } from "./parser";
import fs from "fs";

const content = fs.readFileSync("src/lang/tidal/song1.hs", "utf8");

describe("tidal language support", () => {
  it("parses file correctly", () => {
    parse(content);
  });

  it("parses correct scene count", () => {
    const parsed = parse(content, { trace: true });
    console.log(parsed);
    expect(parsed.scenes.filter((stm) => stm?.type === "scene")).toHaveLength(
      4
    );
  });

  it("parses correct scene meta", () => {
    const { scenes } = parse(content, { trace: true });
    const scenesWithMeta = scenes.filter((x) => x.type === "scene");
    const meta = scenesWithMeta.map((x) => x.meta);
    console.log(JSON.stringify(meta));
    // expect(meta).toEqual([])
  });
});
