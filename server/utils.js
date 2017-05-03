//Utility functions

exports.redirect = function (req, res, address){
  req.url += address;

  res.writeHead(302, {'Location': req.url});
  res.end();
}