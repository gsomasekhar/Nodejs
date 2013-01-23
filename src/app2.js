/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib');
  var mysql = require('mysql');
  var log = require('./logger.js');


var logger=log.logger;
/*var connection  = mysql.createConnection({
        host:'ec2-23-23-187-30.compute-1.amazonaws.com',
        port:'3306',
        user:'root',
        password:'bitnami098',
        database:'recruiter',
     // socketPath: '/opt/bitnami/mysql/tmp/mysql.sock',
      // socketPath:'/var/run/mysqld/mysql.sock',
});
*/
var connection=require('./dbConnection').connection;
//connection.connect();
//var client =connection.client;
connection.connect(function(err) {
        if (err) {
            console.log("SQL CONNECT ERROR: " + err);
        } else {
            console.log("SQL CONNECT SUCCESSFUL.");
        }
    });
console.log('Client Connection'+connection );
var app = module.exports = express.createServer();


  app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
    logger.log('debug', 'readRecord method in  .........');
  connection.query('SELECT * FROM tlnt_talents', function selectCb(err, results, fields) {
    if (err) {
      throw err;
    }
    console.log("Reulsts" +results);
    res.render('users', {
      title: results[0].title,
      results: results
    });
  });
});


app.get('/userSignIn', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});
/*app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})*/

app.post('/users', function (req, res) {
     logger.log('debug', 'writing the Record method in  .........');
    console.log("Request Object "+req.param('firstName').toString());
    var data  = {talent_Id:req.param('talent_id'), first_name: req.param('firstName').toString(),middle_name:req.param('middleName').toString(),
        last_name:req.param('lastName').toString(),status:req.param('lastName').toString(),work_authorization_status:req.param('workAuthorization').toString()
        };
    connection.query('INSERT INTO tlnt_talents SET ?', data, 
        function (err, result) {
            if (err) 
                {
                    console.log('Unable to Connect the Client',connection);
                throw err;
                }
            res.send('User added to database with ID: ' +data);
        }
    );
});
 
app.listen(process.env.PORT || 3000);