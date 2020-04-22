import {ConfigFilesPathModel} from './ConfigFilesPathModel';

export interface Settings {
    environment: string;
    filesPaths: Array<ConfigFilesPathModel> | ConfigFilesPathModel;
    environments?: Array<string>;
    forceValidateSchemas?: boolean;
}
