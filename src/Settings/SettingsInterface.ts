import {ConfigFilesPathModelInterface} from './ConfigFilesPathModelInterface';

export interface SettingsInterface {
    environment: string;
    filesPaths: Array<ConfigFilesPathModelInterface> | ConfigFilesPathModelInterface;
    environments?: Array<string>;
    forceValidateSchemas?: boolean;
}
