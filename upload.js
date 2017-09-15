var csv = require('fast-csv');
var mongoose = require('mongoose');
var Author = require('./author');

exports.post = function (req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');
	
	var authorFile = req.files.file;

	var authors = [];
		
	csv
	 .fromString(authorFile.data.toString(), {
		 headers: true,
		 ignoreEmpty: true
	 })
	 .on("data", function(data){
		 data['_id'] = new mongoose.Types.ObjectId();
		 
		 authors.push(data);
	 })
	 .on("end", function(){
		 Author.create(authors, function(err, documents) {
			if (err) throw err;
			
			res.send(authors.length + ' authors have been successfully uploaded.');
		 });
	 });
};