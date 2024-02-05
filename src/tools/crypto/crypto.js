import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import { ERROR } from "../../constants/errors.js";
import { pipeline } from "node:stream/promises";
import { createCustomStdOut } from "../utils/customStdOut.js";

class Crypto {
  constructor(cwd) {
    this.cwd = cwd;
  }

  calculateHash = async (...pathToFile) => {
    try {
      const pathToCalculatingFile = this.cwd.getPath(...pathToFile);
      const hash = createHash("sha256");
      const input = createReadStream(pathToCalculatingFile);
      stdout.write(`\n File ${pathToFile} hash: `);
      await pipeline(input, hash.setEncoding("hex"), createCustomStdOut());
      stdout.write("\n");
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
}

export { Crypto };
