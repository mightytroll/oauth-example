# Template App

This template app lays out directory structure for building Xola microservices.
It also installs commonly used packages and sets up basic testing environment.

## Prerequisites

Current version of the app requires `node v10+` to run.
Babel is not required to run the app as it relies on [esm](https://www.npmjs.com/package/esm) ECMAScript module loader.
However, [Jest](https://www.npmjs.com/package/jest) does not support `esm` so it relies on Babel to transpile ES6 code.

## Getting Started

To get started, create new GitHub repository using this one as a template.
Detailed instructions on how to create a repository from a template can be found in [this help article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

When done, simply checkout your new repo and run `npm install` to install all the dependencies and... voila! That's it.
You can now start up your app, run the tests and start development.

## Configuration

To manage separate configuration environments, [config](https://www.npmjs.com/package/config) package is installed.
Configurations can be found in [config](config) directory.
Besides the configurations for every environment, there is also a template for configuring local environment.
Local configurations should not be committed.
To avoid committing passwords and other sensitive information, copy `local.json.dist` to `local-development.json`.

```shell script
cp config/local.json.dist config/local-development.json
```

It's important to specify development environment for local configuration because you don't want the same configuration to be loaded when running tests locally.

As you develop your app, make sure you update `local.json.dist` with placeholders for necessary configuration so that others can easily setup and run the app.

#### Structure

By convention, top-level keys should be the names of services you are configuring.
Actual configurations should be namespaced (nested) under the service name and grouped by purpose.
In the following example, `port` number only applies to the `app` service, specifically the `server` part of the app.

```json5
{
    // ...
    server: {
        port: 3000
    }
    // ...
}
```

#### Deployment

If you don't plan on running the tests locally (like in production environment) it's sufficient to have just one local config named `local.json`.
Create the config file and fill in all the credentials.

```shell script
cp config/local.json.dist config/local.json
nano config/local.json
```

## Running the App

To start up the app, simply execute `npm start`.

In development environment, it's useful to run the app in inspect mode which allows you to set breakpoint for easier debugging.
To run the app in inspect mode, execute `npm run debug` or `npm run watch` if you also want to automatically re-run the app when source code changes.

## Testing

App comes fully set up for running Jest tests.
To run the tests, execute `npm test` or `npm run test:watch` if you want to watch for file changes and rerun the tests automatically.

An in-memory MongoDB server is spun up when you run the tests.
If your app doesn't use the database, you can go ahead and disable the in-memory mongo server in [jest.config.js](jest.config.js) by commenting out `globalSetup`, `globalTeardown` and `testEnvironment` options.

#### IDE Warnings

##### Node.js coding assistance is disabled

To get rid of the warning go to _Preferences_ | _Languages & Frameworks_ | _Node.js and NPM_ and check the _Coding assistance for Node.js_ option.

##### Unresolved function or method describe()

To get rid of the warning go to _Preferences_ | _Languages & Frameworks_ | _JavaScript_ | _Libraries_, press _Download..._, select "jest" from the list of available stubs, press _Download and Install_.
