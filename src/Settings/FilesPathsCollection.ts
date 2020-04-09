import {FilesPathModel} from './FilesPathModel';
import {ConfigFilesPathModelInterface} from './ConfigFilesPathModelInterface';

export class FilesPathsCollection {

    private filesPaths: Array<FilesPathModel>;

    constructor (
        paths: Array<ConfigFilesPathModelInterface> | ConfigFilesPathModelInterface
    ) {
        this.filesPaths = [];
        this.buildFilesPathsModel(paths);
    }

    public getPaths (): Array<FilesPathModel> {
        return this.filesPaths;
    }

    private buildFilesPathsModel (
        paths: Array<ConfigFilesPathModelInterface> | ConfigFilesPathModelInterface
    ): void {
        if (Array.isArray(paths)) {
            paths.forEach((pathConfig: ConfigFilesPathModelInterface) => {
                this.buildFilesPathModel(pathConfig);
            });
        } else {
            this.buildFilesPathModel(paths);
        }
    }

    private buildFilesPathModel (pathConfig: ConfigFilesPathModelInterface): void {
        this.filesPaths.push(new FilesPathModel(pathConfig.path));
    }

}
