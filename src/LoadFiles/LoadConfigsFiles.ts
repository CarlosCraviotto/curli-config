import {Settings} from '../Settings';
import {LoaderConfigsFileFactory} from './LoaderConfigsFileFactory';
import {LoaderConfigsFilesGroup} from './LoaderConfigsFilesGroup';
import {mergeValues} from './MergerFileHelper';

export class LoadConfigsFiles {

    private factory: LoaderConfigsFileFactory;

    public constructor (private settings: Settings) {
        this.factory = new LoaderConfigsFileFactory(this.settings);
    }

    public getConfiguration (): object {
        let config = {};
        const arrayLoaderConfigsGroups: Array<LoaderConfigsFilesGroup> =
            this.factory.factory();

        arrayLoaderConfigsGroups.forEach((
            loaderConfigsFilesGroup: LoaderConfigsFilesGroup
        ) => {
            config = mergeValues(config, loaderConfigsFilesGroup.getConfig());
        });

        return config;
    }

}
