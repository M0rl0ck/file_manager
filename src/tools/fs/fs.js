import path from "node:path";
import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import { ERROR } from "../../constants/errors.js";
import { pipeline, finished } from "node:stream/promises";
import { Writable } from "node:stream";

const customStdOut = () =>
  new Writable({
    decodeStrings: false,
    write(chunk, encoding, callback) {
      stdout.write(chunk);
      callback();
    },
  });

class FS {
  constructor(cwd) {
    this.cwd = cwd;
  }
  cat = async (...pathToFile) => {
    const patchToReadingFile = path.resolve(
      this.cwd.currentDirectory,
      pathToFile.join(" ")
    );
    console.log(patchToReadingFile);
    try {
      const input = createReadStream(patchToReadingFile, { encoding: "utf-8" });
      stdout.write("\n");
      await pipeline(input, customStdOut());
      stdout.write("\n");
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
}

export { FS };
