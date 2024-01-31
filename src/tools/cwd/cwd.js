import { homedir } from "node:os";
import path from "node:path";
import { access, constants, readdir, stat } from "node:fs/promises";
import { ERROR } from "../../constants/errors.js";

class WorkingDirectory {
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
      const filesList = await readdir(this._currentDirectory, {
        withFileTypes: true,
      });

      const sortedList = filesList.sort((a, b) =>
        a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
      );
      const [dirs, files] = sortedList.reduce(
        (acc, file) => {
          if (file.isDirectory()) {
            acc[0].push({ Name: file.name, Type: "directory" });
          } else if (file.isSymbolicLink()) {
            acc[0].push({ Name: file.name, Type: "Symbolic Link" });
          } else if (file.isFile()) {
            acc[1].push({ Name: file.name, Type: "file" });
          }
          return acc;
        },
        [[], []]
      );
      console.table([...dirs, ...files]);
    } catch (e) {
      console.error(e.message);
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

export { WorkingDirectory };
