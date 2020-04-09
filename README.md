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

### Commands

 - `npm run build`: Build the project (config).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.

### License
MIT