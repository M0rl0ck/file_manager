import os from "node:os";
import { stdout } from "node:process";
import { ERROR } from "../../constants/errors.js";

const tempCommand = () => {
  console.log("\nOssssss \n");
};

class OsData {
  constructor() {
    this.homedir = os.homedir();
    this.command = {
      EOL: this.getEOL,
      cpus: this.getCpus,
      homedir: this.getHomedir,
      username: this.getUsername,
      architecture: this.getArchitecture,
    };
  }
  getOsData = async (arg) => {
    try {
      this.command[arg.slice(2)]();
    } catch {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };
  getEOL = () => {
    if (!this.EOL) {
      this.EOL = JSON.stringify(os.EOL);
    }
    stdout.write(`\n${this.EOL}\n`);
  };
  getCpus = () => {
    if (!this.cpus) {
      this.cpus = os.cpus().map(({ model, speed }) => ({
        Model: model,
        Speed: `${speed / 1000} GHz`,
      }));
    }
    stdout.write(`\nMachine has ${this.cpus.length} CPUs.\n`);
    console.table(this.cpus);
  };
  getHomedir = () => {
    stdout.write(`\nHome dir is: ${this.homedir}\n`);
  };
  getUsername = () => {
    if (!this.username) {
      this.username = os.userInfo().username;
    }
    stdout.write(`\nUser name: ${this.username}\n`);
  };
  getArchitecture = () => {
    if (!this.architecture) {
      this.architecture = os.arch();
    }
    stdout.write(`\n ${this.architecture}\n`);
  };
}

export { OsData };
