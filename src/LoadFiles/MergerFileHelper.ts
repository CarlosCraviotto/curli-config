enum TypeOfValue {
    isArray = 'array',
    isObject = 'object',
    isOther = 'other'
}

class MergeValues {

    private getTypeOfValue (value: any): string {
        let type: string;

        if (Array.isArray(value)) {
            type = TypeOfValue.isArray;
        } else if (value && typeof value === 'object' && value.constructor === Object) {
            type = TypeOfValue.isObject;
        } else {
            type = TypeOfValue.isOther;
        }

        return type;
    }

    private mergeObjects<T extends { [key: string]: any }> (value1: T, value2: T): T {

        for (const key in value2) {
            if (value1.hasOwnProperty(key)) {
                value1[key] = this.mergeValues(value1[key], value2[key]);
            } else {
                value1[key] = value2[key];
            }
        }

        return value1;
    }

    private mergeArrays (value1: Array<any>, value2: Array<any>): object {
        value2.forEach((value: any) => {
            if (value1.indexOf(value) === -1) {
                value1.push(value);
            }
        });
        return value1;
    }

    public mergeValues (value1: any, value2: any): any {
        let valueToReturn: any;
        const typeValue1: string = this.getTypeOfValue(value1);
        const typeValue2: string = this.getTypeOfValue(value2);

        if (typeValue1 === TypeOfValue.isObject && typeValue2 === TypeOfValue.isObject) {
            valueToReturn = this.mergeObjects(value1, value2);
        } else if (typeValue1 === TypeOfValue.isArray && typeValue2 === TypeOfValue.isArray) {

            valueToReturn = this.mergeArrays(value1, value2);
        } else {
            valueToReturn = value2;
        }
        return valueToReturn;
    }

}

export function mergeValues (value1: any, value2: any): any {
    const instance = new MergeValues();
    return instance.mergeValues(value1, value2);
}
