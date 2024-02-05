import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { ERROR } from "../../constants/errors.js";
import { pipeline } from "node:stream/promises";

class Archiver {
  constructor(cwd) {
    this.cwd = cwd;
  }

  compress = async (pathToFile, pathToNewFile) => {
    try {
      const { input, output } = await this.getStreams(
        pathToFile,
        pathToNewFile
      );
      await pipeline(input, createBrotliCompress(), output);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  decompress = async (pathToFile, pathToNewFile) => {
    try {
      const { input, output } = await this.getStreams(
        pathToFile,
        pathToNewFile
      );
      await pipeline(input, createBrotliDecompress(), output);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  getStreams = async (pathToFile, pathToNewFile) => {
    const pathToSourceFile = this.cwd.getPath(pathToFile);
    const isFileExist = await this.cwd.isPathExist(pathToSourceFile);
    if (!isFileExist) {
      throw new Error();
    }
    const pathToDestinationFile = this.cwd.getPath(pathToNewFile);
    const input = createReadStream(pathToSourceFile);
    const output = createWriteStream(pathToDestinationFile, { flags: "wx" });
    return { input, output };
  };
}

export { Archiver };
