import { homedir } from "node:os";
import path from "node:path";
import { ERROR } from "../../constants/errors.js";

class workingDirectory {
  constructor() {
    this._currentDirectory = homedir();
  }
  get currentDirectory() {
    return this._currentDirectory;
  }

  set currentDirectory(patch) {
    this._currentDirectory = patch;
  }
}

export const directory = new workingDirectory();
