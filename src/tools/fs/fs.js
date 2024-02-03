import { createReadStream, createWriteStream } from "node:fs";
import { writeFile, rename, rm as del } from "node:fs/promises";
import { stdout } from "node:process";
import { ERROR } from "../../constants/errors.js";
import { pipeline } from "node:stream/promises";
import { Writable } from "node:stream";
import path from "node:path";

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
    const pathToReadingFile = this.cwd.getPathWithSpace(pathToFile);

    try {
      const input = createReadStream(pathToReadingFile, { encoding: "utf-8" });
      stdout.write("\n");
      await pipeline(input, customStdOut());
      stdout.write("\n");
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
  add = async (...pathToFile) => {
    const pathToNewFile = this.cwd.getPathWithSpace(pathToFile);
    try {
      await writeFile(pathToNewFile, "", { flag: "wx" });
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
  rn = async (pathToFile, pathToNewFile) => {
    const pathToSourceFile = this.cwd.getPath(pathToFile);
    const pathToDestinationFile = this.cwd.getPath(pathToNewFile);
    try {
      if (await this.cwd.isPathExist(pathToDestinationFile)) {
        throw new Error();
      }
      await rename(pathToSourceFile, pathToDestinationFile);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
  cp = async (pathToFile, pathToNewDir) => {
    try {
      const pathToSourceFile = this.cwd.getPath(pathToFile);
      const nameFile = path.basename(pathToSourceFile);
      const pathToDestinationFile = this.cwd.getPath(pathToNewDir, nameFile);

      const input = createReadStream(pathToSourceFile);
      const output = createWriteStream(pathToDestinationFile, { flags: "wx" });
      await pipeline(input, output);
    } catch (e) {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
  rm = async (...pathToFile) => {
    try {
      const pathToDeletingFile = this.cwd.getPathWithSpace(pathToFile);
      await del(pathToDeletingFile);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
  mv = async (pathToFile, pathToNewDir) => {
    try {
      await this.cp(pathToFile, pathToNewDir);
      await this.rm(pathToFile);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
}

export { FS };
