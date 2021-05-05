import { CommandModule } from 'yargs';
import { writeDefaultConfig } from '../tools/create-default-config';

export const generateDefaultConfig: CommandModule<{}, {}> = {
  command: 'generate-config',
  describe: 'Generates default config',
  handler: async () => {
    await writeDefaultConfig();
  }
};
