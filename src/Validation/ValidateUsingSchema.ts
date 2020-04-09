import {SchemaLoader} from './SchemaLoader';
import * as Ajv from 'ajv';

export class ValidateUsingSchema {

    private readonly schema: object;

    public constructor (private toValidate: {}, pathSchemaIs: string) {
        const schemaLoader: SchemaLoader = new SchemaLoader(pathSchemaIs);
        this.schema = schemaLoader.loadFile();
        this.validate();
    }

    private validate (): void | never {
        const ajv = new Ajv({allErrors: true}); // options can be passed, e.g. {allErrors: true}
        const validate = ajv.compile(this.schema);
        const valid = validate(this.toValidate);
        if (!valid) {
            const error: string = (Array.isArray(validate.errors)) ?
                this.concatErrors(validate.errors) : '';
            throw new Error('Error validating config schema => ' + error);
        }
    }

    private concatErrors (errors: Array<any>): string {
        let messageToReturn = '';
        errors.forEach((error: any, index: number) => {
            messageToReturn = messageToReturn + ((index >= 1) ? ' | ' : '') + error.message;
        });
        return messageToReturn;
    }

}
