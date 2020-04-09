import {existsSync, readFileSync} from 'fs';

export class LoaderFile {

    public constructor (protected path: string) {}

    public loadFile (): object {
        let fileContent = {};
        if (this.existPath()) {
            const rawFileContent = readFileSync(this.path, 'utf8');
            fileContent = JSON.parse(rawFileContent);
        }
        return fileContent;
    }

    public existPath (): boolean {
        return existsSync(this.path);
    }

}
