import path from "node:path";

class FS {
  constructor(cwd) {
    this.cwd = cwd;
  }
  cat = async (pathToFile) => {
    const patchToReadingFile = path.resolve(this.cwd.cur);
    try {
      const fileText = await readFile(patchToReadingFile, "utf-8");
      console.log(fileText);
    } catch (e) {
      if (e.code === "ENOENT") {
        throw new Error(ERRORMESSAGE);
      }
      console.log(e.message);
    }
  };
}

export { FS };
