import { stdin, stdout } from "node:process";
import { directory } from "./tools/cwd/cwd.js";
import readline from "node:readline/promises";
import { init } from "./tools/utils/startUtils.js";
import { commands } from "./tools/commands/commands.js";
import { ERROR } from "./constants/errors.js";
import { log } from "node:console";

const userName = init();

const rl = readline.createInterface(stdin, stdout);
while (true) {
  const answer = await rl.question(
    `You are currently in ${directory.currentDirectory}\n\n>`
  );

  if (answer.trim() === ".exit") {
    process.exit();
  }

  try {
    commands[answer]();
  } catch {
    console.error(ERROR.INVALID_INPUT);
  }
}
