# Component Server
A proxy to serve up components regardless of which git hosting tool is used. Point the server to the folder containing all the repositories organized by username. The result will be provided by the server for `component install`.

## Usage
    
    $ npm install
    $ node app

Starts an express engine at port `3917`. The path to the repository folder is constructed in `app.js`.

## Adding the remote to components

    // component/component.json
    {
        "name": "My Component",
        ...
        "remotes": [
            "http://ipaddress:3917/components/"
        ],
        "dependencies": {

        }
    }

NOTE: Make sure the trailing slash on the IP address is always present.