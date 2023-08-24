
// Generated by peggy v. 2.0.1 (ts-pegjs plugin v. 3.1.0 )
//
// https://peggyjs.org/   https://github.com/metadevpro/ts-pegjs

export interface FilePosition {
  offset: number;
  line: number;
  column: number;
}

export interface FileRange {
  start: FilePosition;
  end: FilePosition;
  source: string;
}

export interface LiteralExpectation {
  type: "literal";
  text: string;
  ignoreCase: boolean;
}

export interface ClassParts extends Array<string | ClassParts> {}

export interface ClassExpectation {
  type: "class";
  parts: ClassParts;
  inverted: boolean;
  ignoreCase: boolean;
}

export interface AnyExpectation {
  type: "any";
}

export interface EndExpectation {
  type: "end";
}

export interface OtherExpectation {
  type: "other";
  description: string;
}

export type Expectation = LiteralExpectation | ClassExpectation | AnyExpectation | EndExpectation | OtherExpectation;

function peg$padEnd(str: string, targetLength: number, padString: string) {
  padString = padString || ' ';
  if (str.length > targetLength) {
    return str;
  }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

export class PeggySyntaxError extends Error {
  public static buildMessage(expected: Expectation[], found: string | null) {
    function hex(ch: string): string {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/"/g,  "\\\"")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function classEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/\]/g, "\\]")
        .replace(/\^/g, "\\^")
        .replace(/-/g,  "\\-")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function describeExpectation(expectation: Expectation) {
      switch (expectation.type) {
        case "literal":
          return "\"" + literalEscape(expectation.text) + "\"";
        case "class":
          const escapedParts = expectation.parts.map((part) => {
            return Array.isArray(part)
              ? classEscape(part[0] as string) + "-" + classEscape(part[1] as string)
              : classEscape(part);
          });

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        case "any":
          return "any character";
        case "end":
          return "end of input";
        case "other":
          return expectation.description;
      }
    }

    function describeExpected(expected1: Expectation[]) {
      const descriptions = expected1.map(describeExpectation);
      let i: number;
      let j: number;

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found1: string | null) {
      return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  }

  public message: string;
  public expected: Expectation[];
  public found: string | null;
  public location: FileRange;
  public name: string;

  constructor(message: string, expected: Expectation[], found: string | null, location: FileRange) {
    super();
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "PeggySyntaxError";

    if (typeof (Object as any).setPrototypeOf === "function") {
      (Object as any).setPrototypeOf(this, PeggySyntaxError.prototype);
    } else {
      (this as any).__proto__ = PeggySyntaxError.prototype;
    }
    if (typeof (Error as any).captureStackTrace === "function") {
      (Error as any).captureStackTrace(this, PeggySyntaxError);
    }
  }

  format(sources: { grammarSource?: string; text: string }[]): string {
    let str = 'Error: ' + this.message;
    if (this.location) {
      let src: string[] | null = null;
      let k;
      for (k = 0; k < sources.length; k++) {
        if (sources[k].grammarSource === this.location.source) {
          src = sources[k].text.split(/\r\n|\n|\r/g);
          break;
        }
      }
      let s = this.location.start;
      let loc = this.location.source + ':' + s.line + ':' + s.column;
      if (src) {
        let e = this.location.end;
        let filler = peg$padEnd('', s.line.toString().length, ' ');
        let line = src[s.line - 1];
        let last = s.line === e.line ? e.column : line.length + 1;
        str += '\n --> ' + loc + '\n' + filler + ' |\n' + s.line + ' | ' + line + '\n' + filler + ' | ' +
          peg$padEnd('', s.column - 1, ' ') +
          peg$padEnd('', last - s.column, '^');
      } else {
        str += '\n at ' + loc;
      }
    }
    return str;
  }
}

function peg$parse(input: string, options?: ParseOptions) {
  options = options !== undefined ? options : {};

  const peg$FAILED: Readonly<any> = {};
  const peg$source = options.grammarSource;

  const peg$startRuleFunctions: {[id: string]: any} = { start: peg$parsestart };
  let peg$startRuleFunction: () => any = peg$parsestart;

  const peg$c0 = function(statements: any): any { return structureTrack(statements)};
  const peg$c1 = function(statement: any): any { return {
    ...statement,
    raw: text()
  } };
  const peg$c2 = peg$otherExpectation("scene");
  const peg$c3 = "do";
  const peg$c4 = peg$literalExpectation("do", false);
  const peg$c5 = function(statements: any): any { return processScene(statements) };
  const peg$c6 = peg$otherExpectation("channel command");
  const peg$c7 = function(channel: any, command: any): any { return {
        channel,
        command
      }};
  const peg$c8 = "p ";
  const peg$c9 = peg$literalExpectation("p ", false);
  const peg$c10 = function(name: any): any { return name };
  const peg$c11 = /^[d]/;
  const peg$c12 = peg$classExpectation(["d"], false, false);
  const peg$c13 = function(name: any): any { return name.join('') };
  const peg$c14 = /^[a-z]/;
  const peg$c15 = peg$classExpectation([["a", "z"]], false, false);
  const peg$c16 = peg$otherExpectation("blank");
  const peg$c17 = " ";
  const peg$c18 = peg$literalExpectation(" ", false);
  const peg$c19 = function(): any { return };
  const peg$c20 = peg$otherExpectation("newline");
  const peg$c21 = /^[\n]/;
  const peg$c22 = peg$classExpectation(["\n"], false, false);
  const peg$c23 = peg$otherExpectation("indent");
  const peg$c24 = /^[ ]/;
  const peg$c25 = peg$classExpectation([" "], false, false);
  const peg$c26 = peg$otherExpectation("string");
  const peg$c27 = peg$anyExpectation();
  const peg$c28 = "\"";
  const peg$c29 = peg$literalExpectation("\"", false);
  const peg$c30 = peg$otherExpectation("integer");
  const peg$c31 = /^[0-9]/;
  const peg$c32 = peg$classExpectation([["0", "9"]], false, false);
  const peg$c33 = function(digits: any): any { return parseInt(digits.join(""), 10); };
  const peg$c34 = peg$otherExpectation("comment");
  const peg$c35 = "--";
  const peg$c36 = peg$literalExpectation("--", false);
  const peg$c37 = function(text: any): any {
    return text.meta ? text : { comment: text }
  };
  const peg$c38 = peg$otherExpectation("scene metadata");
  const peg$c39 = "@";
  const peg$c40 = peg$literalExpectation("@", false);
  const peg$c41 = function(key: any, value: any): any { return { meta: { [key.join('')]: value } } };
  const peg$c42 = function(): any { return { type: "stray", text: text() }};

  let peg$currPos = 0;
  let peg$savedPos = 0;
  const peg$posDetailsCache = [{ line: 1, column: 1 }];
  let peg$maxFailPos = 0;
  let peg$maxFailExpected: Expectation[] = [];
  let peg$silentFails = 0;

  let peg$result;

  if (options.startRule !== undefined) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text(): string {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location(): FileRange {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description: string, location1?: FileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location1
    );
  }

  function error(message: string, location1?: FileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location1);
  }

  function peg$literalExpectation(text1: string, ignoreCase: boolean): LiteralExpectation {
    return { type: "literal", text: text1, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts: ClassParts, inverted: boolean, ignoreCase: boolean): ClassExpectation {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation(): AnyExpectation {
    return { type: "any" };
  }

  function peg$endExpectation(): EndExpectation {
    return { type: "end" };
  }

  function peg$otherExpectation(description: string): OtherExpectation {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos: number) {
    let details = peg$posDetailsCache[pos];
    let p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos: number, endPos: number): FileRange {
    const startPosDetails = peg$computePosDetails(startPos);
    const endPosDetails = peg$computePosDetails(endPos);

    return {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected1: Expectation) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected1);
  }

  function peg$buildSimpleError(message: string, location1: FileRange) {
    return new PeggySyntaxError(message, [], "", location1);
  }

  function peg$buildStructuredError(expected1: Expectation[], found: string | null, location1: FileRange) {
    return new PeggySyntaxError(
      PeggySyntaxError.buildMessage(expected1, found),
      expected1,
      found,
      location1
    );
  }

  function peg$parsestart(): any {
    let s0;

    s0 = peg$parsetrack();

    return s0;
  }

  function peg$parsetrack(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsenewline();
    while (s2 as any !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsenewline();
    }
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsestatement();
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsestatement();
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsestatement(): any {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parseblank();
    if (s1 as any === peg$FAILED) {
      s1 = null;
    }
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parsescene();
      if (s2 as any === peg$FAILED) {
        s2 = peg$parsestray_command();
        if (s2 as any === peg$FAILED) {
          s2 = peg$parsecomment();
        }
      }
      if (s2 as any !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsenewline();
        if (s4 as any === peg$FAILED) {
          s4 = peg$parseblank();
        }
        while (s4 as any !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsenewline();
          if (s4 as any === peg$FAILED) {
            s4 = peg$parseblank();
          }
        }
        if (s3 as any !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsescene(): any {
    let s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c3) {
      s1 = peg$c3;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c4); }
    }
    if (s1 as any !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parseindent();
      if (s4 as any !== peg$FAILED) {
        s5 = peg$parsecommand();
        if (s5 as any === peg$FAILED) {
          s5 = peg$parsecomment();
          if (s5 as any === peg$FAILED) {
            s5 = peg$parseinline_text();
          }
        }
        if (s5 as any !== peg$FAILED) {
          s3 = s5;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parseindent();
        if (s4 as any !== peg$FAILED) {
          s5 = peg$parsecommand();
          if (s5 as any === peg$FAILED) {
            s5 = peg$parsecomment();
            if (s5 as any === peg$FAILED) {
              s5 = peg$parseinline_text();
            }
          }
          if (s5 as any !== peg$FAILED) {
            s3 = s5;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c5(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 as any === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c2); }
    }

    return s0;
  }

  function peg$parsecommand(): any {
    let s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parsechannel();
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parseblank();
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parseinline_text();
        if (s3 as any !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c7(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 as any === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }

    return s0;
  }

  function peg$parsechannel(): any {
    let s0;

    s0 = peg$parsepchannel();
    if (s0 as any === peg$FAILED) {
      s0 = peg$parsedchannel();
      if (s0 as any === peg$FAILED) {
        s0 = peg$parsetchannel();
      }
    }

    return s0;
  }

  function peg$parsepchannel(): any {
    let s0, s1, s2;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c8) {
      s1 = peg$c8;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c9); }
    }
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parsestring();
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c10(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedchannel(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c11.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c12); }
    }
    if (s2 as any !== peg$FAILED) {
      s3 = peg$parseinteger();
      if (s3 as any !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c13(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsetchannel(): any {
    let s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$currPos;
    if (peg$c14.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c15); }
    }
    if (s2 as any !== peg$FAILED) {
      if (peg$c14.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      if (s3 as any !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c13(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseblank(): any {
    let s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = [];
    if (input.charCodeAt(peg$currPos) === 32) {
      s3 = peg$c17;
      peg$currPos++;
    } else {
      s3 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c18); }
    }
    if (s3 as any !== peg$FAILED) {
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c17;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c18); }
        }
      }
    } else {
      s2 = peg$FAILED;
    }
    if (s2 as any !== peg$FAILED) {
      s1 = input.substring(s1, peg$currPos);
    } else {
      s1 = s2;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c19();
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 as any === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c16); }
    }

    return s0;
  }

  function peg$parsenewline(): any {
    let s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = [];
    if (peg$c21.test(input.charAt(peg$currPos))) {
      s3 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s3 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c22); }
    }
    if (s3 as any !== peg$FAILED) {
      while (s3 as any !== peg$FAILED) {
        s2.push(s3);
        if (peg$c21.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c22); }
        }
      }
    } else {
      s2 = peg$FAILED;
    }
    if (s2 as any !== peg$FAILED) {
      s1 = input.substring(s1, peg$currPos);
    } else {
      s1 = s2;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c19();
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 as any === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c20); }
    }

    return s0;
  }

  function peg$parseindent(): any {
    let s0, s1, s2, s3, s4, s5;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$currPos;
    s3 = peg$parsenewline();
    if (s3 as any !== peg$FAILED) {
      s4 = [];
      if (peg$c24.test(input.charAt(peg$currPos))) {
        s5 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }
      if (s5 as any !== peg$FAILED) {
        while (s5 as any !== peg$FAILED) {
          s4.push(s5);
          if (peg$c24.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c25); }
          }
        }
      } else {
        s4 = peg$FAILED;
      }
      if (s4 as any !== peg$FAILED) {
        s3 = [s3, s4];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    if (s2 as any !== peg$FAILED) {
      s1 = input.substring(s1, peg$currPos);
    } else {
      s1 = s2;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c19();
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 as any === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c23); }
    }

    return s0;
  }

  function peg$parsestring(): any {
    let s0, s1, s2, s3, s4, s5, s6, s7;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parsequotes();
    if (s1 as any !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = [];
      s4 = peg$currPos;
      s5 = peg$currPos;
      peg$silentFails++;
      s6 = peg$parsenewline();
      peg$silentFails--;
      if (s6 as any === peg$FAILED) {
        s5 = undefined;
      } else {
        peg$currPos = s5;
        s5 = peg$FAILED;
      }
      if (s5 as any !== peg$FAILED) {
        s6 = peg$currPos;
        peg$silentFails++;
        s7 = peg$parsequotes();
        peg$silentFails--;
        if (s7 as any === peg$FAILED) {
          s6 = undefined;
        } else {
          peg$currPos = s6;
          s6 = peg$FAILED;
        }
        if (s6 as any !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s7 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s7 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c27); }
          }
          if (s7 as any !== peg$FAILED) {
            s5 = [s5, s6, s7];
            s4 = s5;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      } else {
        peg$currPos = s4;
        s4 = peg$FAILED;
      }
      while (s4 as any !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$currPos;
        s5 = peg$currPos;
        peg$silentFails++;
        s6 = peg$parsenewline();
        peg$silentFails--;
        if (s6 as any === peg$FAILED) {
          s5 = undefined;
        } else {
          peg$currPos = s5;
          s5 = peg$FAILED;
        }
        if (s5 as any !== peg$FAILED) {
          s6 = peg$currPos;
          peg$silentFails++;
          s7 = peg$parsequotes();
          peg$silentFails--;
          if (s7 as any === peg$FAILED) {
            s6 = undefined;
          } else {
            peg$currPos = s6;
            s6 = peg$FAILED;
          }
          if (s6 as any !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s7 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c27); }
            }
            if (s7 as any !== peg$FAILED) {
              s5 = [s5, s6, s7];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
      }
      if (s3 as any !== peg$FAILED) {
        s2 = input.substring(s2, peg$currPos);
      } else {
        s2 = s3;
      }
      if (s2 as any !== peg$FAILED) {
        s3 = peg$parsequotes();
        if (s3 as any !== peg$FAILED) {
          s0 = s2;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 as any === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c26); }
    }

    return s0;
  }

  function peg$parsequotes(): any {
    let s0;

    if (input.charCodeAt(peg$currPos) === 34) {
      s0 = peg$c28;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c29); }
    }

    return s0;
  }

  function peg$parseinteger(): any {
    let s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c31.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c32); }
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        if (peg$c31.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c32); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c33(s1);
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 as any === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c30); }
    }

    return s0;
  }

  function peg$parsecomment(): any {
    let s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c35) {
      s1 = peg$c35;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c36); }
    }
    if (s1 as any !== peg$FAILED) {
      s2 = peg$parsescene_meta();
      if (s2 as any === peg$FAILED) {
        s2 = peg$parseinline_text();
      }
      if (s2 as any !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c37(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 as any === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c34); }
    }

    return s0;
  }

  function peg$parsescene_meta(): any {
    let s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseblank();
    if (s1 as any === peg$FAILED) {
      s1 = null;
    }
    if (s1 as any !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 64) {
        s2 = peg$c39;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      if (s2 as any !== peg$FAILED) {
        s3 = [];
        if (peg$c14.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        if (s4 as any !== peg$FAILED) {
          while (s4 as any !== peg$FAILED) {
            s3.push(s4);
            if (peg$c14.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c15); }
            }
          }
        } else {
          s3 = peg$FAILED;
        }
        if (s3 as any !== peg$FAILED) {
          s4 = peg$parseinline_text();
          if (s4 as any !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c41(s3, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 as any === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c38); }
    }

    return s0;
  }

  function peg$parsestray_command(): any {
    let s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseinline_text();
    if (s1 as any !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c42();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseinline_text(): any {
    let s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$currPos;
    s3 = peg$currPos;
    peg$silentFails++;
    s4 = peg$parsenewline();
    peg$silentFails--;
    if (s4 as any === peg$FAILED) {
      s3 = undefined;
    } else {
      peg$currPos = s3;
      s3 = peg$FAILED;
    }
    if (s3 as any !== peg$FAILED) {
      if (input.length > peg$currPos) {
        s4 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c27); }
      }
      if (s4 as any !== peg$FAILED) {
        s3 = [s3, s4];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    if (s2 as any !== peg$FAILED) {
      while (s2 as any !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsenewline();
        peg$silentFails--;
        if (s4 as any === peg$FAILED) {
          s3 = undefined;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 as any !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c27); }
          }
          if (s4 as any !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 as any !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    return s0;
  }


  	function processScene(statements) {
      const comments = statements.filter(x => x?.comment).map(x => x.comment)
      const actions = statements.filter(x => !(x?.comment || x?.meta))
      let meta = Object.fromEntries(statements
        .filter(x => x?.meta)
        .map(x => x.meta)
        .map(metaEntry => Object.entries(metaEntry))
        .flat())

      if (meta.colors) meta.colors = Object.fromEntries(meta.colors.trim().split(/\s/).map(x => x.split(':')))

      return {
        type: "scene",
        comments,
        actions,
        meta
      }
    }

    // TODO: create structureTrack function
    function structureTrack(statements = []) {
      const scenes = statements.filter(s => s.type === 'scene')

      const channels = scenes.filter(s => s.type === 'scene')
        .map(({ actions }) => actions.map(({ channel }) => channel))
        .flat()
        .filter(x => x)
      
      const uniqueChannels = [...(new Set(channels))]

      return {
        // scenes: statements.filter(x => x?.type === 'scene')
        // TODO: actions should be { channel, command, raw } so it's easier to send to repl
        scenes: scenes.map(scene => ({
          ...scene,
          actions: Object.fromEntries(
            scene.actions.map(action => action.channel
              ? [action.channel, action.command]
              : ['unknown', action])
            )
        })),
        channels: uniqueChannels,
        }
    }


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

export {
  PeggySyntaxError as PeggySyntaxError,
  peg$parse as parse
};
