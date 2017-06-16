// pure node.js route handling
//https://gist.github.com/jeffrafter/353700

var http = require('http');
var router = require('./router');
var utils = require('./server/utils');

var mongoose = require('mongoose');
var dbConfig = require('./server/db');
// sys deprecated, use console.log instead

var requestBody;
var requestParams;

//DB connection
db = mongoose.connect(dbConfig.url, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Connected to DB.');
});


// Handle your routes here, put static pages in ./public and they will server
router.register('/', function(req, res) {
  console.log(req.method, '/');

  if(req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write('Hello World');
    utils.redirect(req, res, 'index.html')

    //res.close deprecated
    res.end();
  }
});

// *************** API ***********************************
router.register('/api/register', function(req, res) {
  console.log(req.method, '/api/register');

  if(req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(
      JSON.stringify({
        "name": "AnoFeT",
        "route": "/api/register"
      }, null, 2)
    );

    res.end();
  } else if(req.method == 'POST') {
    console.log(req.headers);
    //console.log(req.body); //undefined
    console.log(requestBody); //this should work

    if (requestBody){
      utils.redirect(req, res, 'login.html');
    } else {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.write(
        JSON.stringify({
          "response": "POST request body is empty.",
          "code": 500
        }, null, 2)
      );
    }
    
    res.end();
  }
});

// initial API ....
router.register('/api/login', function(req, res) {
  console.log(req.method, '/api/login');

  if(req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(
      JSON.stringify({
        "name": "AnoFeT",
        "route": "/api/login"
      }, null, 2)
    );
    
    res.end();
  }
});

// *************** END API ***********************************

// We need a server which relies on our router
var server = http.createServer(function (req, res) {
  requestBody = [];
  //requestParams = {};

  //https://stackoverflow.com/questions/5083914/get-the-whole-response-body-when-the-response-is-chunked
  if(req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE'){
    req.on('data', chunk => {
      console.log('A chunk of data has arrived: ', chunk);
      requestBody.push(chunk);
    });
    req.on('end', () => {
      console.log('No more data');
      requestBody = Buffer.concat(requestBody).toString();

      handler = router.route(req);
      handler.process(req, res);
    });
  } else {
    handler = router.route(req);
    handler.process(req, res);
  }

  //requestParams = utils.params(req);
});

// Start it up
server.listen(4322);
console.log('Server running at 4322');