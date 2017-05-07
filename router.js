var handlerFactory = require('./server/handler');
var fs = require('fs');
var parser = require('url');
var handlers = {};


function mimeType(path){
  //mime types from: https://gist.github.com/lsauer/5196979
  var data = fs.readFileSync('server/mime.json')
  var mimeObj = JSON.parse( data );

  var pathExt = path.substr( path.indexOf('.') + 1 );
  //console.log('pathExt: ', pathExt);

  var mimeType;
  Object.keys(mimeObj).forEach(function(key) {
    if (key == pathExt) {
      //console.log('mimeObj[key]: ', mimeObj[key]);
      mimeType = mimeObj[key];
    }
  });
  return mimeType || 'text/html';
}

exports.clear = function() {
  handlers = {};
}

exports.register = function(url, method) {
  handlers[url] = handlerFactory.createHandler(method);
}

exports.route = function(req) {
  url = parser.parse(req.url, true);
  var handler = handlers[url.pathname];
  if (!handler) handler = this.missing(req)
  return handler;
}

exports.missing = function(req) {
  // Try to read the file locally, this is a security hole, yo /../../etc/passwd
  var url = parser.parse(req.url, true);
  var path = __dirname + "/public" + url.pathname

  console.log(req.method, url.pathname);

  try {    
    data = fs.readFileSync(path);
    //mime = req.headers.accepts || 'text/html'
    mime = mimeType(path);
    console.log('  mime selected: ', mime);

    return handlerFactory.createHandler(function(req, res) {
      res.writeHead(200, {'Content-Type': mime});
      res.write(data);
      res.end();
    });        
  } catch (e) { 
    return handlerFactory.createHandler(function(req, res) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("No route registered for " + url.pathname);
      res.end();
    });      
  }  
}