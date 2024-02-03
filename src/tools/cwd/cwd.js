import path from "node:path";
import { access, constants, readdir } from "node:fs/promises";
import { ERROR } from "../../constants/errors.js";

class WorkingDirectory {
  constructor(homedir) {
    this._currentDirectory = homedir;
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

  cd = async (...newPatch) => {
    const newDirectory = this.getPathWithSpace(newPatch);
    const isDirExist = await this.isPathExist(newDirectory);
    if (isDirExist) {
      this._currentDirectory = newDirectory;
    } else throw new Error(ERROR.OPERATION_FAILED);
  };

  ls = async (...newPatch) => {
    try {
      const pathToDirectory = this.getPathWithSpace(newPatch);
      const filesList = await readdir(pathToDirectory, {
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

  getPath = (...newPatch) => {
    return path.resolve(this._currentDirectory, ...newPatch);
  };
  getPathWithSpace = (newPatch) => {
    return newPatch
      ? path.resolve(this._currentDirectory, newPatch.join(" "))
      : this._currentDirectory;
  };

  isPathExist = async (pathToFile) => {
    try {
      await access(pathToFile, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  };
}

export { WorkingDirectory };
