import { homedir } from "node:os";
import path from "node:path";
import { access, constants, readdir, stat } from "node:fs/promises";
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

  up = () => {
    this._currentDirectory = path.resolve(this._currentDirectory, "..");
  };

  cd = async (newPatch) => {
    const newDirectory = path.resolve(this._currentDirectory, newPatch);
    const isExist = await this.isFileExist(newDirectory);
    if (isExist) {
      this._currentDirectory = newDirectory;
    } else throw new Error(ERROR.OPERATION_FAILED);
  };

  ls = async () => {
    try {
      const filesList = await readdir(this._currentDirectory);

      const sortedList = filesList.sort((a, b) =>
        a.toUpperCase() < b.toUpperCase() ? -1 : 1
      );
      const [dirs, files] = [[], []];
      for (const file of sortedList) {
        const status = await stat(path.join(this._currentDirectory, file));
        if (status.isDirectory()) {
          dirs.push({ Name: file, Type: "directory" });
        } else {
          files.push({ Name: file, Type: "file" });
        }
      }
      console.table([...dirs, ...files]);
    } catch (e) {
      throw new Error(ERROR.OPERATION_FAILED);
    }
  };

  isFileExist = async (pathToFile) => {
    try {
      await access(pathToFile, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  };
}

export const directory = new workingDirectory();
