import * as path from "path";
import * as fs from "fs";
import { createHash } from "crypto";
import * as ts from "typescript";

export const parse = (
  code: string
):
  | {
      comments: ts.SymbolDisplayPart[];
      tags: ts.JSDocTagInfo[];
    }
  | undefined => {
  const tmpFolder = path.resolve(__dirname, "tmp");
  if (!fs.existsSync(tmpFolder)) {
    fs.mkdirSync(tmpFolder);
  }
  try {
    const name = createHash("md5")
      .update(Math.random().toString())
      .digest("hex");

    const fileName = path.resolve(tmpFolder, name + ".ts");
    ts.sys.writeFile(fileName, code);
    ts.sys.writeFile(fileName, code);

    try {
      const program = ts.createProgram([fileName], {
        jsx: ts.JsxEmit.React,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.Latest,
      });

      const checker = program.getTypeChecker();
      const file = program.getSourceFile(fileName);
      const module = checker.getSymbolAtLocation(file);
      const exports = checker.getExportsOfModule(module);
      if (exports.length !== 1) {
        throw new Error("Number of exports should be exactly 1");
      }
      const symbol = exports[0];
      const comments = symbol.getDocumentationComment(checker);
      const tags = symbol.getJsDocTags();
      return { comments, tags };
    } finally {
      if (ts.sys.deleteFile) {
        ts.sys.deleteFile(fileName);
      }
    }
  } finally {
    fs.rmdirSync(tmpFolder, { recursive: true });
  }
};
