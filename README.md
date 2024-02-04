# file_manager

### This repository is the part of [nodejs-assignments](https://github.com/AlreadyBored/nodejs-assignments)

## Setup and Running

### Clone this repository:

`$ git clone https://github.com/M0rl0ck/file_manager.git`

### Go to branch develop:

`$ git checkout develop`

### Running the app

`$ npm run start -- --username=your_username`

If a parameter is not received or an invalid parameter is received, the application displays a message with an example of the correct command and stops.

### Working with paths containing spaces

If the path contains spaces, you must wrap it in double quotes - `"`

#### Example:

`cat 'dir/path with spaces/file name with spaces'`,  
 `cp "dir/path with spaces/file name with spaces" "dir/path with spaces/dir name with spaces"`,

If a command takes one parameter, it can be left unwrapped:

`ls dir/path with spaces/dir name with spaces`

### Commands:

`cp`, `mv` take a path to the directory as the second parameter.

`compress` and `decompress` take a path to the new file as the second parameter.

`ls` can accept a directory path as a parameter. If the parameter is not received, the current directory will be read.
