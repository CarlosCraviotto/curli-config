import {Settings} from '../Settings';
import {LoaderConfigsFile} from './LoaderConfigsFile';
import {LoaderConfigsFilesGroup} from './LoaderConfigsFilesGroup';
import {DEFAULT_FILE_NAME, FILE_NAME_EXTENSION, FORCE_VALIDATE_SCHEMAS} from './Const';
import {ConfigFilesPathModel} from '../Settings/ConfigFilesPathModel';

export class LoaderConfigsFileFactory {

    private readonly environment: string;
    private readonly forceValidateSchemas: boolean;

    public constructor (settings: Settings) {
        this.environment = settings.environment;
        this.forceValidateSchemas =
            (typeof settings.forceValidateSchemas === 'undefined') ?
                FORCE_VALIDATE_SCHEMAS : settings.forceValidateSchemas;
    }

    public factory (
        filesPathsCollection: Array<ConfigFilesPathModel>
    ): Array<LoaderConfigsFilesGroup> {
        const arrayLoaderConfigsGroups: Array<LoaderConfigsFilesGroup> = [];

        filesPathsCollection.forEach((filesPathModel: ConfigFilesPathModel) => {
            arrayLoaderConfigsGroups.push(
                this.buildLoaderConfigsFilesGroup(filesPathModel)
            );
        });

        return arrayLoaderConfigsGroups;
    }

    private buildLoaderConfigsFilesGroup (
        filesPathModel: ConfigFilesPathModel
    ): LoaderConfigsFilesGroup {

        const path: string = filesPathModel.path;
        const group: LoaderConfigsFilesGroup = new LoaderConfigsFilesGroup(
            path,
            this.forceValidateSchemas
        );

        // TODO: implement cache system
        group.add(
            new LoaderConfigsFile(this.getFullFileNameByPath(path, DEFAULT_FILE_NAME))
        );
        group.add(
            new LoaderConfigsFile(this.getFullFileNameByPath(path, this.environment))
        );

        return group;
    }

    private getFullFileNameByPath (path: string, fileName: string): string {
        return path + '/' + fileName + FILE_NAME_EXTENSION;
    }

}
