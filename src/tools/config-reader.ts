import { readFileSync } from 'fs';
import { resolve } from 'path';
import appRoot from 'app-root-path';

interface Config {
  branchPattern: string;
}

export const configReader = (failHandler: (e: Error) => never): Config => {
  try {
    const rawConfig = readFileSync(
      resolve(appRoot.path, 'commit-ticket-config.json'),
      'utf-8'
    );
    console.log(appRoot.path);
    return JSON.parse(rawConfig);
  } catch (e) {
    failHandler(e);
  }
};
