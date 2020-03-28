import chalk from 'chalk';
/* eslint-disable-next-line no-unused-vars */
import { CommandModule } from 'yargs';

import messageFormatter from '../tools/message-formatter';

interface Options {
  commitParams: string;
}

const command: CommandModule<{}, Options> = {
  command: '$0 <commitParams>',
  describe: 'Handles commit message, adds branch name if it need',
  builder(yargs) {
    return yargs
      .positional('commitParams', {
        describe: 'params for commit message',
        type: 'string',
      })
      .demandOption('commitParams');
  },
  handler({ commitParams }) {
    const paramsArray = commitParams.split(' ');
    const path = paramsArray[0];

    const logger = (text: string, error?: Error | boolean) => {
      if (error) {
        console.error(chalk.red(text), error);
      } else {
        console.log(chalk.green(text));
      }
    };

    const success = (): never => {
      logger('Commit message - ok 👌');
      // wotan-disable-next-line return-never-call
      process.exit(0);
    };

    const fail = (error: Error): never => {
      logger('prepare-commit-msg hook: error 🚫️️', error);
      // wotan-disable-next-line return-never-call
      process.exit(1);
    };

    messageFormatter(success, fail)(path);
  },
};

export default command;
