import {LoaderFile} from '../LoadFiles/LoadFile';

export class SchemaLoader extends LoaderFile {

    private readonly SCHEMA_FILE_NAME = 'schema.json';

    public constructor (pathSchemaIs: string) {
        super(pathSchemaIs);
        this.path = this.getFullPathFile(pathSchemaIs);
        this.checkIfFileExist();
    }

    private getFullPathFile (pathSchemaIs: string): string {
        return pathSchemaIs + '/' + this.SCHEMA_FILE_NAME;
    }

    private checkIfFileExist (): never | void {
        if (!this.existPath()) {
            throw new Error(
                'The schema file (' + this.SCHEMA_FILE_NAME + ') doesn\'t exist in folder.'
            );
        }
    }

}
