/*properties
    component, exec, get, indexOf, join, length, listen, log, params, port,
    repositories_path, send, stderr, stdout, username, version
*/
/*jslint node: true, passfail: false, nomen: true */

'use strict';
var express = require('express'),
    app = express(),
    spawn = require('child_process').spawn,
    path = require('path'),
    config = require('./config.json');

app.get('/components/:username/:component/:version/*', function callback(req, res) {
    var command, repo, gitShow, params = req.params;

    if (params.length > 0) {
        repo = path.join(config.repositories_path,
            params.username,
            params.component + '.git');
        command = ['--git-dir', repo, 'show', params.version + ':' + params[0]];

        res.setHeader('Content-Type', 'application/octet-stream');
        gitShow = spawn('git', command);
        gitShow.stdout.pipe(res);
    }
});

app.get('/', function defResponse(req, res) {
    res.send(200, 'Component server');
});

app.listen(config.port);
