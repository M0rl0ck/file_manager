import { init } from "./tools/utils/startUtils.js";
import { WorkingDirectory } from "./tools/cwd/cwd.js";
import { OsData } from "./tools/os/os.js";
import { FS } from "./tools/fs/fs.js";
import { start } from "./tools/utils/startReadline.js";

const userName = init();
const osData = new OsData();
const directory = new WorkingDirectory(osData.homedir);
const fileSystem = new FS(directory);

await start({ directory, fileSystem, osData });
