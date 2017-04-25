var Users = require('../controllers/users');


module.exports = function(app){
	app.post('/login',Users.login);
	app.get('/users',Users.index);
	app.get('/session',Users.session);
	app.post('/ask',Users.ask);
	app.get('/getQuestions',Users.askIndex);
	app.get('/question/:id',Users.show);
	app.post('/answer',Users.answer);
	app.put('/answer/:answerId/like/:id',Users.like);




}