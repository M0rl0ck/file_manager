import { init } from "./tools/utils/startUtils.js";
import { WorkingDirectory } from "./tools/cwd/cwd.js";
import { FS } from "./tools/fs/fs.js";
import { start } from "./tools/utils/startReadline.js";

// cd не принимает пробелы

const userName = init();
const directory = new WorkingDirectory();
const fileSystem = new FS(directory);

await start({ directory, fileSystem });
