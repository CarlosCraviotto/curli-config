# curli-config

[![Build Status](https://travis-ci.org/CarlosCraviotto/curli-config.svg?branch=master)](https://travis-ci.com/github/CarlosCraviotto/curli-config)
[![Coverage Status](https://coveralls.io/repos/github/CarlosCraviotto/curli-config/badge.svg?branch=master&cach=ff)](https://coveralls.io/github/CarlosCraviotto/curli-config?branch=master)


A small library to load / validate configuration files placed in different sides of the application using environments



## Installation

Install by `npm`

```sh
npm install --save curli-config
```
#### Basic Usage


```typescript
import {Config} from "curli-config";

const config = new Config({
            environment: 'local',
            forceValidateSchemas: false,
            filesPaths: {path: __dirname + '/config'}
        });
//get the value from here
const defaultLanguage = config.get("defaultLanguage")

```



#### Adding more files to import from runtime


```typescript
import {Config} from "curli-config";

const config = new Config({
            environment: 'local',
            filesPaths: {path: __dirname + '/config'}
        });

//loading files from this folder.
config.addNewPath({path: __dirname + '/config_db'});

//get the value from here
const defaultLanguage = config.get("defaultLanguage")

```

### 



### Commands

 - `npm run build`: Build the project (config).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.



### Changelog

All notable changes to this project will be documented in this section.

### 1.0.0 - 2020-04-22

#### Added

- Support for add files in runtime.

#### Changed

- Remove all the settings classes



### Contributing

When submitting your pull-request try to follow those guides:

- https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github
- https://medium.com/@vadimdemedes/making-your-first-contribution-de6576ddb190



### License

MIT