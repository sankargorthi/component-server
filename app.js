var express = require('express');
var app = express();

app.all('/components/:username/:component/:version/:file*', function(req, res, next) {
    var params = req.params;

    if (params.length > 0) {
	console.log('found params');
        var username = params.username;
        var component = params.component;
        var version = params.version;
	var file = params.file;
        getRawFile(username, component, version, file); 
    }
});

app.get('/', function(req, res, next) {
    res.send('Component server');
});

app.listen('3917');

/* Utils */
function getRawFile(username, component, version, file) {
    console.log(arguments); 
}
