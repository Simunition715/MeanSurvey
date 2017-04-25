var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		unique: true,
		required: true
	}
},{timestamps: true});

mongoose.model('User',UserSchema);