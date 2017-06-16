//Utility functions

exports.redirect = function (req, res, address){
  // HACK: if using this on 404 createHandler call, it will add indefinetly to the path ...
  // req.url += address;

  req.url = '/';
  req.url += address;

  res.writeHead(302, {'Location': req.url});
  res.end();
}