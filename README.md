# Component Server
A proxy to serve up components regardless of which git hosting tool is used. Point the server to the folder containing all the repositories organized by username. The result will be provided by the server for `component install`.

## Usage
    
    $ npm install
    # edit config.json
    $ node app

Starts an express engine at the port specified as `port:` in `config.json`. The path to the repositories folder needs to be set to `repositories_path:`.

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

# License
MIT
