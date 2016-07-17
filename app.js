//powerful-waters-96210
var express = require('express');
var app = express();
var path = require('path');
var http=require('http').Server(app);
var fileRoute = require('./routes/file');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var port = process.env.PORT || 3000;

mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Connected to the database');
	}
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //false por default
// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', fileRoute.index);
app.post('/upload', fileRoute.upload);
app.get('/file/:id', fileRoute.item);

http.listen(port,function(){
	console.log('Servidor escuchando a traves del puerto '+port);
});
