import { init } from "./tools/utils/startUtils.js";
import { WorkingDirectory } from "./tools/cwd/cwd.js";
import { OsData } from "./tools/os/os.js";
import { Crypto } from "./tools/crypto/crypto.js";
import { Archive } from "./tools/archive/archive.js";
import { FS } from "./tools/fs/fs.js";
import { start } from "./tools/utils/startReadline.js";

const userName = init();
const osData = new OsData();
const directory = new WorkingDirectory(osData.homedir);
const fileSystem = new FS(directory);
const crypto = new Crypto(directory);
const archive = new Archive(directory);

await start({ directory, fileSystem, osData, crypto, archive });
