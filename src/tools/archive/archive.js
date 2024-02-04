import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { ERROR } from "../../constants/errors.js";
import { pipeline } from "node:stream/promises";

class Archive {
  constructor(cwd) {
    this.cwd = cwd;
  }
  compress = async (pathToFile, pathToNewFile) => {
    try {
      const { input, output } = this.getStreams(pathToFile, pathToNewFile);
      await pipeline(input, createBrotliCompress(), output);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  decompress = async (pathToFile, pathToNewFile) => {
    try {
      const { input, output } = this.getStreams(pathToFile, pathToNewFile);
      await pipeline(input, createBrotliDecompress(), output);
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
  getStreams = (pathToFile, pathToNewFile) => {
    const pathToSourceFile = this.cwd.getPath(pathToFile);
    const pathToDestinationFile = this.cwd.getPath(pathToNewFile);
    const input = createReadStream(pathToSourceFile);
    const output = createWriteStream(pathToDestinationFile, { flags: "wx" });
    return { input, output };
  };
}

export { Archive };
