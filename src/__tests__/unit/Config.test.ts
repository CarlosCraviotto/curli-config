import chai = require('chai');

import {Config} from '../../Config';
// import {SettingsLoadFilesModel} from "../../Settings/SettingsLoadFilesModel";

describe('Config class tests', function () {

    it('Should find one value of in configuration files', function () {

        const resultAll: object = {
            'dataBase': {
                'user': 'root',
                'password': '12345678_secure',
                'name': 'localhost',
                'host': 'localhost',
            },
            'loadMysql': false,
            'languages': ['es', 'en', 'fr'],
            'fileWeGetItFrom': 'local',
            'defaultLanguage': 'es',
        };

        const config = new Config({
            environment: 'local',
            forceValidateSchemas: false,
            filesPaths: {path: __dirname + '/../files/config1'},
        });

        chai.assert.deepEqual('root', config.get('dataBase').user);
        chai.assert.deepEqual(resultAll, config.getAll());

    });

    it('Should use one environment than is passed into the environments options', function () {

        const config = new Config({
            environment: 'existInNewList',
            environments: ['existInNewList'],
            forceValidateSchemas: false,
            filesPaths: {path: __dirname + '/../files/config1'},
        });
        chai.assert.deepEqual('default', config.get('dataBase').user);
    });

    it('Should get data from two folders', function () {

        const config = new Config({
            environment: 'dev',
            forceValidateSchemas: false,
            filesPaths: [
                {path: __dirname + '/../files/config1'},
                {path: __dirname + '/../files/userConfig'},
            ],
        });
        chai.assert.deepEqual('dev', config.get('rootUser'));
    });

    it('Should mix the data from two folders', function () {

        const config = new Config({
            environment: 'local',
            forceValidateSchemas: false,
            filesPaths: [
                {path: __dirname + '/../files/config1'},
                {path: __dirname + '/../files/dataBaseSecondConfig'},
            ],
        });
        chai.assert.deepEqual('root', config.get('dataBase').user);
        chai.assert.deepEqual('localhost', config.get('dataBase').other);
    });

    it(
        'Should throw an error if the environment doesn\'t exist in the environments list.',
        function () {
            chai.assert.throws(function () {
                new Config({
                    environment: 'nonExist',
                    forceValidateSchemas: false,
                    filesPaths: {path: __dirname + '/../files/config1'},
                });
            }, 'This environment (nonExist) doesn\'t exist.');
        }
    );

    it('Should throw an error if the environment is empty.', function () {

        chai.assert.throws(function () {
            new Config({
                environment: '',
                forceValidateSchemas: false,
                filesPaths: {path: __dirname + '/../files/config1'},
            });
        }, 'The environment can\'t be empty.');
    });

    it('Should throw an error if the json file is wrong .', function () {

        chai.assert.throws(function () {
            new Config({
                environment: 'local',
                forceValidateSchemas: false,
                filesPaths: {path: __dirname + '/../files/configWrong'},
            });
        }, 'Unexpected end of JSON input');
    });

    it('Should validate using schema', function () {

        const config = new Config({
            environment: 'dev',
            forceValidateSchemas: true, // we don't need it
            filesPaths: [
                {path: __dirname + '/../files/config1'},
            ],
        });
        chai.assert.deepEqual(false, config.get('loadMysql'));
    });

    it('Should validate using schema and find error', function () {

        chai.assert.throws(function () {
            new Config({
                environment: 'production',
                forceValidateSchemas: true, // we don't need it
                filesPaths: [
                    {path: __dirname + '/../files/config1'},
                ],
            });
        }, 'Error validating config schema => should have required property \'loadMysql\'');
    });

    it('Should validate using schema and find two errors', function () {
        chai.assert.throws(function () {
            new Config({
                environment: 'miArma',
                environments: ['miArma'],
                filesPaths: [
                    {path: __dirname + '/../files/config1'},
                ],
            });
        },
        'Error validating config schema => should have required property \'loadMysql\'' +
            ' | should have required property \'defaultLanguage\'');
    });

    it('Should try to load a config without schema file in the folder.', function () {
        chai.assert.throws(function () {
            new Config({
                environment: 'local',
                filesPaths: [
                    {path: __dirname + '/../files/dataBaseSecondConfig'},
                ],
            });
        }, 'The schema file (schema.json) doesn\'t exist in folder');
    });
});
