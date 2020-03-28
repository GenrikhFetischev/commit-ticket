import yargs from 'yargs';

import defaultCommand from './commands/default';

yargs
  .command(defaultCommand)
  .strict()
  .version(false)
  .wrap(yargs.terminalWidth())
  .parse();
