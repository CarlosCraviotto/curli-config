import {ConfigFilesPathModel, Settings} from './Settings';
import {LoadConfigsFiles} from './LoadFiles/LoadConfigsFiles';

export class Config {

    private config: { [keys: string]: any };
    private settings: Settings;
    private load: LoadConfigsFiles;

    public constructor (protected settingsByUser: Settings) {
        this.config = {};
        this.settings = settingsByUser;
        this.load = new LoadConfigsFiles(this.settings);

        const filesPaths = this.getPathsAsArrays(this.settings.filesPaths);
        this.getConfigFromFiles(filesPaths);
    }

    public addNewPath (file: ConfigFilesPathModel): any {
        const filesPaths = this.getPathsAsArrays(file);
        this.getConfigFromFiles(filesPaths);
    }

    public get (configName: string): any {
        return this.config[configName];
    }

    public getAll (): { [keys: string]: any } {
        return this.config;
    }

    private getConfigFromFiles (filesPaths: Array<ConfigFilesPathModel>): void {
        this.config = this.load.getConfiguration(filesPaths, this.config);
    }

    private getPathsAsArrays (
        filesPaths: Array<ConfigFilesPathModel>|ConfigFilesPathModel
    ): Array<ConfigFilesPathModel> {
        return Array.isArray(filesPaths) ? filesPaths : [filesPaths];
    }

}
