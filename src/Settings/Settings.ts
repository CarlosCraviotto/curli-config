import {FilesPathsCollection} from './FilesPathsCollection';
import {SettingsInterface} from './SettingsInterface';

export class Settings {

    public readonly DEFAULT_FILE_NAME: string = 'default';
    public readonly FILE_NAME_EXTENSION: string = '.json';

    private environments: Array<string> = ['local', 'dev', 'production'];
    private environment: string;
    private forceValidateSchemas = true;
    // private forceValidateAllEnvironments: boolean = true;
    private filesPaths: FilesPathsCollection;

    constructor (
        protected settingsByUser: SettingsInterface
    ) {
        this.environment = settingsByUser.environment;
        this.filesPaths = new FilesPathsCollection(settingsByUser.filesPaths);

        const environments = settingsByUser.environments;
        const forceSchemas = (settingsByUser.forceValidateSchemas) ? true : false;
        const existForceValidateSchemas = (
            typeof settingsByUser.forceValidateSchemas === 'boolean'
        );

        this.environments = (environments) ? environments : this.environments;
        this.forceValidateSchemas = (existForceValidateSchemas) ?
            forceSchemas : this.forceValidateSchemas;

        this.validate();
    }

    public getEnvironment (): string {
        return this.environment;
    }

    public getForceValidateSchemas (): boolean {
        return this.forceValidateSchemas;
    }

    public getFilesPaths (): FilesPathsCollection {
        return this.filesPaths;
    }

    private validate (): void {

        if (this.environment === '') {
            throw new Error('The environment can\'t be empty.');
        }
        if (this.environments.indexOf(this.environment) === -1) {
            throw new Error('This environment (' + this.environment + ') doesn\'t exist.');
        }
    }

}
