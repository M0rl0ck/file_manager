const parseArgs = (args) => {
  if (!args.some((el) => el.includes('"'))) {
    return args;
  }
  const stringFromArgs = args.join(" ");
  let isQuotesSet = false;
  let isDivide = false;
  let tmpArg = "";
  const parsedArgs = [];

  for (let i = 0; i < stringFromArgs.length; i++) {
    switch (stringFromArgs[i]) {
      case '"': {
        isQuotesSet = !isQuotesSet;
        break;
      }

      case " ": {
        if (isQuotesSet) {
          tmpArg += " ";
        } else {
          if (isDivide === false) {
            if (tmpArg) {
              parsedArgs.push(tmpArg);
              tmpArg = "";
            }
            isDivide = true;
          } else {
            tmpArg += " ";
          }
        }
        break;
      }

      default: {
        tmpArg += stringFromArgs[i];
        isDivide = false;
      }
    }
  }

  if (isQuotesSet) {
    throw new Error("Parse error");
  }

  if (tmpArg) {
    parsedArgs.push(tmpArg);
  }

  return parsedArgs;
};

export { parseArgs };
