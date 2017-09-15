var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
    name: {
		firstName: {
			type: String,
			required: true
		},
		lastName: String
	},
	biography: String,
	twitter: {
		type: String,
		validate: {
			validator: function(text) {
				if (text !== null && text.length > 0)
					return text.indexOf('https://twitter.com/') === 0;
				
				return true;
			},
			message: 'Twitter handle must start with https://twitter.com/'
		}
	},
	facebook: {
		type: String,
		validate: {
			validator: function(text) {
				if (text !== null && text.length > 0)
					return text.indexOf('https://www.facebook.com/') === 0;
				
				return true;
			},
			message: 'Facebook Page must start with https://www.facebook.com/'
		}
	},
	linkedin: {
		type: String,
		validate: {
			validator: function(text) {
				if (text !== null && text.length > 0)
					return text.indexOf('https://www.linkedin.com/') === 0;
				
				return true;
			},
			message: 'LinkedIn must start with https://www.linkedin.com/'
		}
	},
	profilePicture: Buffer,
	created: { 
		type: Date,
		default: Date.now
	}
});

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;