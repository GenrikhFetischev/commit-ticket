import getBranchName from 'current-git-branch';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import appRoot from 'app-root-path';
import chalk from 'chalk';

export const readConfigFunction = () => {
  return require(resolve(appRoot.path, 'commit-ticket-config.js'));
};

const getCommitMessage = (pathToCommitMessage: string): string => {
  const messagePath: string = resolve(pathToCommitMessage);
  return readFileSync(messagePath, 'utf-8');
};

export const prepareCommitMessage = (pathToCommitMessage: string) => {
  try {
    const message = getCommitMessage(pathToCommitMessage);
    const branchName = getBranchName();
    const configFunction = readConfigFunction();

    const commitMessage = configFunction(branchName, message);
    writeFileSync(pathToCommitMessage, commitMessage, 'utf-8');
    console.log(chalk.green(`✅ Prepared commit message: ${commitMessage}`));
  } catch (e) {
    console.error(chalk.red('🚫️ prepare-commit-msg hook error️'), e);
  }
};
