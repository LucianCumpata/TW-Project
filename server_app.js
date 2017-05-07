// pure node.js route handling
//https://gist.github.com/jeffrafter/353700

var http = require('http');
var router = require('./router');
var utils = require('./server/utils');

var mongoose = require('mongoose');
var dbConfig = require('./server/db');
// sys deprecated, use console.log instead

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

// We need a server which relies on our router
var server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

// Start it up
server.listen(4322);
console.log('Server running');