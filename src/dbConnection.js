var mysql = require("mysql");
var settings = require('./dao-settings.js').settings;
var connection = mysql.createConnection({
        host:settings.host,port:settings.port,
         user: settings.user,  password: settings.password,database:settings.database
});
exports.connection=connection;
