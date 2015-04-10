var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');

app.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer({ dest: './public/'}));

app.get('/', function (request, response, next) {
  response.render('index', { title: 'Promised XHR Examples', message: 'Hello there!'});
});

app.use('/promised-xhr-endpoint', function (request, response, next) {
  var body = request.body;
  var params = request.params;
  var files = request.files;
  var query = request.query;

  response.send({
    body: body,
    params: params,
    files: files,
    query: query
  });
});

var server = app.listen((process.env.PORT || 5555), function () {
    console.log("Express server listening at " + JSON.stringify(server.address()));
});
