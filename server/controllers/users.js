var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');


module.exports = {
	index: function(req,res){
		User.find({}).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			return res.json(doc);
		})
	},
	ask: function(req, res){
		var question = new Question(req.body)
		question.save(function(err, doc){
			if(err){
				console.log("an error",err);
				return res.json(err);
			}
			return res.json(doc);
			console.log("a document",doc);
		})
	},
	answer: function(req, res){
		var post = req.body;
		Question.findById(post.question).exec(function(err, doc){
			if(err){
				return res.json(err);
			}
			doc.answers.push(post.answer)
			doc.save(function(err,doc){
				if(err){
					return res.json(err);
				}
				return res.json(doc);
			})
		})
	},
	show: function(req, res){
		Question.findById(req.params.id).exec(function(err, doc){
			if(err){
				return res.json(err);
			}
			return res.json(doc);
		})
	},
	like: function(req,res){
		Question.findById(req.params.answerId).exec(function(err, doc){
			if(err){
				return res.json(err)
			}
			for(i = 0; i<doc.answers.length;i++){
				if(doc.answers[i]._id == req.params.id){
					doc.answers[i].like++
					doc.save();
					return res.json(doc);
				}
			}
		})
	},
	askIndex: function(req,res){
		Question.find({}).exec(function(err, doc){
			if(err){
				return res.json(err);
				console.log(err);
			}
			return res.json(doc);
		})
	},
	login: function(req,res){
		User.findOne({name:req.body.name}).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			if(!doc){
				var user = new User(req.body);
				user.save(function(err,doc){
					req.session.user = doc
					return res.json(doc);
				})
			}
			else {
				req.session.user = doc
				return res.json(doc);
			}
		})
	},
	session: function(req, res){
		if(!req.session.user){
			return res.json({
				"errors": "not authorized"
			})
		}
		return res.json(req.session.user);
	},
	logout: function(req,res){
		req.session.destroy(function(err){
			return res.json(err)
		})

	}
}