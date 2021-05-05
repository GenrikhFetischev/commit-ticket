import { resolve } from 'path';
import appRoot from 'app-root-path';
import { promises } from 'fs';

const defaultConfig = `
// default regexp matches to something like: feature/PROJECT-123-cool-things
const regexp = /^(feature|hotfix|bugfix|fix)\\/(\\w+-[0-9]{1,6})/;

module.exports = (branchName, commitMessage) => {
  const match = branchName.match(regexp);
  if (match) {
    const [, , taskId] = branchName.match(regexp);
    return \`[\${taskId}] \${commitMessage}\`;
  } else {
    return commitMessage;
  }
};


`;

export const writeDefaultConfig = async () => {
  const pathToConfig = resolve(appRoot.path, 'commit-ticket-config.js');

  await promises.writeFile(pathToConfig, defaultConfig);
};
