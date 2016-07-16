//powerful-waters-96210
var express = require('express');
var app = express();
var port = 300;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.send("Hi!");
});


var server = app.listen(port, function(){
  console.log('Server listening on port 3000');
});
