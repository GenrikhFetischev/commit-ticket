import yargs from 'yargs';

import { prepareCommitMsg } from './commands/prepareCommitMsg';
import { generateDefaultConfig } from './commands/generate-default-config';

yargs
  .command(prepareCommitMsg)
  .command(generateDefaultConfig)
  .strict()
  .version(false)
  .wrap(yargs.terminalWidth())
  .parse();
