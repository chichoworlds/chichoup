//powerful-waters-96210
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var http = require('http').Server(app);



app.get('/', function(req, res){
  res.send("Hi!");
});


http.listen(port, function (err) {
	if (err) {
		console.log(err);
	}else{
		console.log('Server is running on port '+ port);
	}
});
