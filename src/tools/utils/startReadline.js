import { ERROR } from "../../constants/errors.js";
import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";
import { parseArgs } from "./parseArgs.js";

const start = async ({
  workingDirectory,
  fileSystem,
  osData,
  crypto,
  archiver,
}) => {
  const commands = {
    ls: workingDirectory.ls,
    cd: workingDirectory.cd,
    up: workingDirectory.up,
    cat: fileSystem.cat,
    add: fileSystem.add,
    rn: fileSystem.rn,
    cp: fileSystem.cp,
    mv: fileSystem.mv,
    rm: fileSystem.rm,
    os: osData.getOsData,
    hash: crypto.calculateHash,
    compress: archiver.compress,
    decompress: archiver.decompress,
  };

  const rl = readline.createInterface(stdin, stdout);
  while (true) {
    const answer = await rl.question(
      `\nYou are currently in ${workingDirectory.currentDirectory}\n\n>`
    );

    if (answer.trim() === ".exit") {
      process.exit();
    }

    try {
      const [command, ...args] = answer.split(" ");
      await commands[command](...parseArgs(args));
    } catch (err) {
      console.error(
        err.message === ERROR.OPERATION_FAILED
          ? ERROR.OPERATION_FAILED
          : ERROR.INVALID_INPUT
      );
    }
  }
};

export { start };
