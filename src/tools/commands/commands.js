import { stdout } from "node:process";

const tempCommand = () => {
  stdout.write("\ndddd\n");
};

const commands = {
  ls: tempCommand,
  cd: tempCommand,
  up: tempCommand,
  cat: tempCommand,
  add: tempCommand,
  rn: tempCommand,
  cp: tempCommand,
  mv: tempCommand,
  rm: tempCommand,
  os: tempCommand,
  hash: tempCommand,
  compress: tempCommand,
  decompress: tempCommand,
};

export { commands };
