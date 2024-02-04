import { argv, stdout } from "node:process";

const init = () => {
  // check arguments and setup exit message

  let exit_message =
    "For start application you must pass your username.\nPlease run the application with the command:  npm run start -- --username=your_username";
  let userName = "";
  process.on("exit", () => {
    stdout.write(`\n${exit_message}\n`);
  });

  process.on("SIGINT", () => process.exit());

  const argument = argv.slice(2);
  if (!argument.length) {
    process.exit();
  } else {
    exit_message =
      "Invalid arguments \nPlease run the application with the command:  npm run start -- --username=your_username";
    const argumentsWithUserName = argument.filter((el) =>
      el.startsWith("--username=")
    );
    if (argumentsWithUserName.length === 1) {
      userName = argumentsWithUserName[0].slice(11);
      exit_message = `Thank you for using File Manager, ${userName}, goodbye!`;
      stdout.write(`Welcome to the File Manager, ${userName}!\n\n`);
    } else {
      process.exit();
    }
  }
};

export { init };
