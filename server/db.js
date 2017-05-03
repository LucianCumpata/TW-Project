var dbName = 'tw-project';
var dbPort = '27017';
var dbHost = 'localhost';
var connection = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

module.exports = {
  url: connection
};