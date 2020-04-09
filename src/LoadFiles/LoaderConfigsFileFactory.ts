import {Settings} from '../Settings';
import {LoaderConfigsFile} from './LoaderConfigsFile';
import {FilesPathModel} from '../Settings/FilesPathModel';
import {LoaderConfigsFilesGroup} from './LoaderConfigsFilesGroup';

export class LoaderConfigsFileFactory {

    private readonly defaultFileName: string;
    private readonly fileExtencion: string;
    private readonly environment: string;
    private readonly forceValidateSchemas: boolean;

    public constructor (private settings: Settings) {
        this.defaultFileName = this.settings.DEFAULT_FILE_NAME;
        this.fileExtencion = this.settings.FILE_NAME_EXTENSION;
        this.environment = this.settings.getEnvironment();
        this.forceValidateSchemas = this.settings.getForceValidateSchemas();
    }

    public factory (): Array<LoaderConfigsFilesGroup> {
        const filesPathsCollection: Array<FilesPathModel> =
            this.settings.getFilesPaths().getPaths();
        const arrayLoaderConfigsGroups: Array<LoaderConfigsFilesGroup> = [];

        filesPathsCollection.forEach((filesPathModel: FilesPathModel) => {
            arrayLoaderConfigsGroups.push(
                this.buildLoaderConfigsFilesGroup(filesPathModel)
            );
        });

        return arrayLoaderConfigsGroups;
    }

    private buildLoaderConfigsFilesGroup (
        filesPathModel: FilesPathModel
    ): LoaderConfigsFilesGroup {

        const path: string = filesPathModel.getPath();
        const group: LoaderConfigsFilesGroup = new LoaderConfigsFilesGroup(
            path,
            this.forceValidateSchemas
        );

        // TODO: implement cache system
        group.add(
            new LoaderConfigsFile(this.getFullFileNameByPath(path, this.defaultFileName))
        );
        group.add(
            new LoaderConfigsFile(this.getFullFileNameByPath(path, this.environment))
        );

        return group;
    }

    private getFullFileNameByPath (path: string, fileName: string): string {
        return path + '/' + fileName + this.fileExtencion;
    }

}
