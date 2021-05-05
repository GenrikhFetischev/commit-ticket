import { CommandModule } from 'yargs';

import { prepareCommitMessage } from '../tools/message-formatter';

interface Options {
  commitParams: string;
}

export const prepareCommitMsg: CommandModule<{}, Options> = {
  command: 'prepare-msg <commitParams>',
  describe: 'Handles commit message, adds branch name if it need',
  builder(yargs) {
    return yargs
      .positional('commitParams', {
        describe: 'params for commit message',
        type: 'string'
      })
      .demandOption('commitParams');
  },
  handler({ commitParams }) {
    const paramsArray = commitParams.split(' ');
    const path = paramsArray[0];

    prepareCommitMessage(path);
  }
};


