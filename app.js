var express = require('express');
var app = express();
var sys = require('sys');
var exec = require('execSync').exec;

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

app.listen('3917');

/* Utils */
function getRawFile(callback, username, component, version, file) {
     var path = ['/data1/Users/git/repositories/',
                   username,
                   component + '.git'
                ].join('/');
     var result = exec('git --git-dir ' + path + ' show ' + version + ':' + file);
     callback(result.stdout);
}

