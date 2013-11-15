var express = require('express');
var app = express();
var sys = require('sys');
var exec = require('execSync').exec;
var fs = require('fs');
var Path = require('path')

var config = JSON.parse(fs.readFileSync(Path.join(__dirname, 'config.json')))

app.get('/components/:username/:component/:version/*', function(req, res, next) {
    var params = req.params;

    if (params.length > 0) {
        var file = getRawFile(function(data) {
            if (!data) {
                res.send('File not found', 404);
            }
            res.send(data);
        }, params.username, params.component, params.version, params[0]); 
    }
});

app.get('/', function(req, res, next) {
    res.send('Component server');
});

app.listen(config.port);

/* Utils */
function getRawFile(callback, username, component, version, file) {
     var path = Path.join(config.repositories_path,
                   username,
                   component + '.git'
                );
     try {
         var result = exec('git --git-dir ' + path + ' show ' + version + ':' + file);
         if (!result.stderr && result.stdout.indexOf('Not a git repository') === -1) {
             callback(result.stdout);
         } else {
             callback();
         }
     } catch (e) {
         console.log(e);
         callback();
     }
}

