/*properties
    component, exec, get, indexOf, join, length, listen, log, params, port,
    repositories_path, send, stderr, stdout, username, version
*/
/*jslint node: true, passfail: false, nomen: true */

'use strict';
var express = require('express'),
    app = express(),
    sys = require('sys'),
    exec = require('execSync').exec,
    fs = require('fs'),
    path = require('path'),
    config = require('./config.json');

/* Utils */
function getRawFile(callback, username, component, version, file) {
    var result,
        repo = path.join(config.repositories_path,
            username,
            component + '.git');
    try {
        result = exec('git --git-dir ' + repo + ' show ' + version + ':' + file);
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

app.get('/components/:username/:component/:version/*', function callback(req, res) {
    var params = req.params;

    if (params.length > 0) {
        getRawFile(function responder(data) {
            if (!data) {
                res.send('File not found', 404);
            }
            res.send(data);
        }, params.username, params.component, params.version, params[0]);
    }
});

app.get('/', function defResponse(req, res) {
    res.send('Component server', req);
});

app.listen(config.port);

