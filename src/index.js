import { init } from "./tools/utils/startUtils.js";
import { WorkingDirectory } from "./tools/cwd/cwd.js";
import { OsData } from "./tools/os/os.js";
import { Crypto } from "./tools/crypto/crypto.js";
import { Archiver } from "./tools/archiver/archiver.js";
import { FS } from "./tools/fs/fs.js";
import { start } from "./tools/utils/startReadline.js";

init();
const osData = new OsData();
const workingDirectory = new WorkingDirectory(osData.homedir);
const fileSystem = new FS(workingDirectory);
const crypto = new Crypto(workingDirectory);
const archiver = new Archiver(workingDirectory);

await start({ workingDirectory, fileSystem, osData, crypto, archiver });
