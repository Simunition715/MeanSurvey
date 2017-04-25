var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	question: {
		type: String,
		minlength: 10,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	answers: [{
		answer: {
			type: String,
		},
		details: {
			type: String
		},
		_user: {
			type:String,
		},
		like: {
			type: Number,
			default: 0
		}
	}],
	_user: {
		type:String
	}
},{timestamps: true});

mongoose.model('Question',QuestionSchema);