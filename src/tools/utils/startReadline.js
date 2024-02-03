import { ERROR } from "../../constants/errors.js";
import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";

const start = async ({ directory, fileSystem }) => {
  const tempCommand = () => {
    stdout.write("\ndddd\n");
  };

  const parseArgs = (args) => {
    if (args.some((el) => el.search(/['"]/) + 1)) {
      return args
        .join(" ")
        .split(/['"]/)
        .filter((el) => !!el.trim())
        .map((el) => el.trim());
    }
    return args;
  };

  const commands = {
    ls: directory.ls,
    cd: directory.cd,
    up: directory.up,
    cat: fileSystem.cat,
    add: fileSystem.add,
    rn: fileSystem.rn,
    cp: fileSystem.cp,
    mv: fileSystem.mv,
    rm: fileSystem.rm,
    os: tempCommand,
    hash: tempCommand,
    compress: tempCommand,
    decompress: tempCommand,
  };

  const rl = readline.createInterface(stdin, stdout);
  while (true) {
    const answer = await rl.question(
      `\nYou are currently in ${directory.currentDirectory}\n\n>`
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
