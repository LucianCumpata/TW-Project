var http = require("http");
var fs = require('fs');
var parser = require('url');
http.createServer(function(req, res) {
 // res.writeHead(200, {"Content-Type": "text/html"});
 // res.write("<h1>Hello, World!</h1>");
 // res.end();

try{
    var data = fs.readFileSync("public/index.html");
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
    res.end();
	} catch (e) {
	res.writeHead(404, {'Content-Type': 'text/plain'}); //text/plain
	res.write("No route registered for " + url.pathname);
 	res.end();
}
}).listen(4321);
  console.log("Now listening on port 4321");