var File = require('../models/files');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var indice = 0;

exports.index = function(req, res){
  res.sendFile(path.join(__dirname, '../views/index.html'));
};

exports.upload = function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();
  var myFiles = [];

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    saveName(file.name);
    myFiles[indice] = file.name;
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function(file) {
    File.findOne({name: myFiles[indice]}, gotFile);
    function gotFile (err, thisF) {
      if (err) {
        console.log(err)
        return next(err)
      }
      res.end(String(req.get('host'))+'/file/'+String(thisF._id));
      indice++;
    }
  });

  // parse the incoming request containing the form data
  form.parse(req);

};

saveName = function(name) {
  var thisName = name;
  if ((thisName === '')) {
    console.log('ERROR: Campos vacios');
    return res.send('Hay campos vacíos, revisar');
  }
  var thisFile = new File({
      name : name
  });
  thisFile.save(onSaved);
  function onSaved (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return;
  }
};

exports.item = function(req, res) {
  File.findById(req.params.id, gotFile);
  function gotFile (err, thisF) {
    if (err) {
      console.log(err)
      return next(err)
    }
    res.sendFile(path.join(__dirname, '../uploads/'+thisF.name));
  }
};
