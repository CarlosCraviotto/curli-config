import {ConfigFilesPathModel, Settings} from '../Settings';
import {LoaderConfigsFileFactory} from './LoaderConfigsFileFactory';
import {LoaderConfigsFilesGroup} from './LoaderConfigsFilesGroup';
import {mergeValues} from './MergerFileHelper';
import {ENVIRONMENTS} from './Const';

export class LoadConfigsFiles {

    private factory: LoaderConfigsFileFactory;

    public constructor (private settings: Settings) {
        this.validateEnvironmentInSettings(settings);
        this.factory = new LoaderConfigsFileFactory(this.settings);
    }

    public getConfiguration (
        filesPaths: Array<ConfigFilesPathModel>,
        configToMergeWith?: {}
    ): object {

        let config = {};
        const arrayLoaderConfigsGroups: Array<LoaderConfigsFilesGroup> =
            this.factory.factory(filesPaths);

        arrayLoaderConfigsGroups.forEach((
            loaderConfigsFilesGroup: LoaderConfigsFilesGroup
        ) => {
            config = mergeValues(config, loaderConfigsFilesGroup.getConfig());
        });

        config = (configToMergeWith) ? mergeValues(configToMergeWith, config) : config;

        return config;
    }

    private validateEnvironmentInSettings (settings: Settings) {
        const environments = (settings.environments) ? settings.environments : ENVIRONMENTS;

        if (settings.environment === '') {
            throw new Error('The environment can\'t be empty.');
        }

        if (environments.indexOf(settings.environment) === -1) {
            throw new Error('This environment (' + settings.environment + ') doesn\'t exist.');
        }
    }

}
