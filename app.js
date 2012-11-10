var flatiron = require('flatiron'),
    path = require('path'),
    connect = require('connect'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);

app.http.before = [
  connect.static(__dirname + '/demo')
];


app.router.get('/', function () {
});


app.start(1337);
