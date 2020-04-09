import {LoaderConfigsFile} from './LoaderConfigsFile';
import {mergeValues} from './MergerFileHelper';
import {ValidateUsingSchema} from '../Validation/ValidateUsingSchema';

export class LoaderConfigsFilesGroup {

    private laoderCollection: Array<LoaderConfigsFile>;

    public constructor (
        private path: string,
        private forceValidateSchemas: boolean
    ) {
        this.laoderCollection = [];
    }

    public add (loaderConfigsFile: LoaderConfigsFile): void {
        this.laoderCollection.push(loaderConfigsFile);
    }

    public getConfig (): object {
        let config = {};

        this.laoderCollection.forEach((loaderConfigsFile: LoaderConfigsFile) => {
            config = mergeValues(config, loaderConfigsFile.loadFile());
        });

        if (this.forceValidateSchemas) {
            new ValidateUsingSchema(config, this.path);
        }

        return config;
    }

}
