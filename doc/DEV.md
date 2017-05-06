# Development #

Development is done against master, release code can be found in the [public](https://github.com/IoT-WebDashboard/IoT-WebDashboard/tree/master/public) folder.

## Getting started ##

### Install the `gulp` command
These instructions require node.js and npm

```sh
npm install --global gulp-cli
```

### Install needed development dependencies

```sh
npm install
```

### Code formatting
Code formating is done with [js-beautify](https://www.npmjs.com/package/js-beautify) with it default config. To install run

```sh
npm install js-beautify
```

## Run the Project

To cross-compile and test your project run
```sh
gulp test
```

To start your server run:
```sh
gulp server
```

You can reach the server by the URL http://localhost:8080/webpack-dev-server/public/index.html
The URL has to be opened by a browser with single origin policy disabled or you will not be able to get data from other SensorThings-servers.

### Windows (Chrome)
stop all chrome processes.(Go to the Taskmanager. Closing all chrome windows isn't enough.)

go to the folder chrome.exe is located and run:
```sh
chrome.exe --disable-web-security --allow-file-access-from-files --user-data-dir="C:/Chrome"
```

### OSX (Chrome)
stop all chrome processes, then run: 

```sh
open -a "Google Chrome.app" --args --disable-web-security --allow-file-access-from-files --user-data-dir
```

### Linux (Chromium)
```sh
chromium-browser --disable-web-security --user-data-dir
```

## Creating the Documentation for this dashboard (JSDOC)

To install jsdoc globally:
```sh
npm install -g jsdoc
```

after that, create the jsdoc. Either run createJSDOC.bat or:
```sh
jsdoc -r -d ./jsdoc ./src/
```

now you can open the start page of the JSDOC. It is located in:
./jsdoc/index.html
