import { stdout } from "node:process";
import { Writable } from "node:stream";

const createCustomStdOut = () =>
  new Writable({
    decodeStrings: false,
    write(chunk, _, callback) {
      stdout.write(chunk);
      callback();
    },
  });

export { createCustomStdOut };
