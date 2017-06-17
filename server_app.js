// pure node.js route handling
//https://gist.github.com/jeffrafter/353700

var http = require('http');
var querystring = require('querystring');

var router = require('./router');
var utils = require('./server/utils');

var mongoose = require('mongoose');
var dbConfig = require('./server/db');
var bcrypt = require('bcrypt');

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

var User = require('./server/models/userModel');

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
    //console.log(req.headers);
    //console.log(req.body); //undefined
    //console.log(requestBody); //this should work

    if (requestBody){
      var requestBodyJSON = querystring.parse(requestBody);

      var newUser = new User(requestBodyJSON);
      //hash the password for safe storage
      newUser.password = newUser.hashPassword(newUser.password); //bcrypt.hashSync(requestBodyJSON.password, 10);

      newUser.save(function (err, message) {
        if (err) {
          console.log('mongoose: ', err);
          return res.write(
            JSON.stringify({
              "response": err
            }, null, 2)
          );
          //return res.end();
        }
      });

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
  } else if(req.method == 'POST') {
    console.log(requestBody);

    if (requestBody){
      var requestBodyJSON = querystring.parse(requestBody);
      //hash the password for safe storage
      //requestBodyJSON.password = User.hashPassword(requestBodyJSON.password); // bcrypt.hashSync(requestBodyJSON.password, 10);
      console.log(requestBodyJSON);

      User.findOne({'user_name': requestBodyJSON.user_name}, function (err, user) {
        if (err) {
          console.log('mongoose: ', err);
          res.writeHead(500, {'Content-Type': 'application/json'});
          return res.write(
            JSON.stringify({
              "response": err
            }, null, 2)
          );
        }
        if (!user) {
          console.log('mongoose: ', 'User not found !');
          res.writeHead(404, {'Content-Type': 'application/json'});
          return res.write(
            JSON.stringify({
              "response": "User not found !"
            }, null, 2)
          );
          //return res.send("not found !");//done(null, false, console.log({message: 'User not found'}));
        }
        if (!user.checkPassword(requestBodyJSON.password)) {
          console.log('mongoose: ', 'Wrong password !');
          //return done(null, false, console.log({message: 'Wrong password'}));
          res.writeHead(404, {'Content-Type': 'application/json'});
          return res.write(
            JSON.stringify({
              "response": "Wrong user or password !"
            }, null, 2)
          );
        }
        console.log('User %s has logged in.', user.user_name);
        return;
      }).then(function(){
        //console.log('res: ', res);//
        //console.log(res.getHeaders());

        if(res.statusCode == 404 || res.statusCode == 500){
          res.end();
        } else {
          utils.redirect(req, res, 'profile.html');
        }

      });


    } else {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.write(
        JSON.stringify({
          "response": "POST request body is empty.",
          "code": 500
        }, null, 2)
      );
      res.end();
    }
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