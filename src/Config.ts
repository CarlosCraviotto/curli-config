import {Settings, SettingsInterface} from './Settings';
import {LoadConfigsFiles} from './LoadFiles/LoadConfigsFiles';

export class Config {

    private config: { [keys: string]: any };
    private settings: Settings;

    public constructor (protected settingsByUser: SettingsInterface) {
        this.settings = new Settings(settingsByUser);
        this.config = this.getConfigFromFiles();
    }

    public get (configName: string): any {
        return this.config[configName];
    }

    public getAll (): { [keys: string]: any } {
        return this.config;
    }

    private getConfigFromFiles (): object {
        const load: LoadConfigsFiles = new LoadConfigsFiles(this.settings);
        return load.getConfiguration();
    }

}
