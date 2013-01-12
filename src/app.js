var express = require('express');
var app     = express.createServer();
//require('./app/models/db_connect');

require('./settings').boot(app);



// Include all controllers here. For example
// require('./app/controllers/articles')(app)

app.get('/', function(req, res){
    console.log("End the reulst");
    res.end("Displaying the result");
 // res.render('home', {title : ''});
});

var port = process.env.PORT || 3001;
app.listen(port);
console.log('Express app started on port '+port);
