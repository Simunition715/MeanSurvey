app.factory('UserFactory', function($http){
	var factory = {};
	factory.current_user = {};
	factory.current_poll = {};

	factory.session = function(callback){
		$http.get('session').then(function(res){
			if(!res.data.errors){
				factory.current_user = res.data;
				callback(res);
			}else {
				factory.current_user = {};
				callback(false);
			}
		})
	}
	factory.logout = function(user,callback){
		$http.get('/logout').then(callback)
	}
	factory.show = function(id, callback){
		$http.get('/question/'+id).then(callback)
	}
	factory.like = function(id,answerId, callback){
		$http.put('/answer/'+answerId+'/like/'+id).then(callback)
	}
	factory.getQuestions = function(callback){
		$http.get('/getQuestions').then(callback)
	}
	factory.login = function(newUser, callback){
		$http.post("/login",newUser).then(function(res){
			if(!res.data.errors){
				factory.current_user = res.data;
			}
			callback(res);
		})
	}
	factory.ask = function(newQuestion, callback){
		$http.post("/ask",newQuestion).then(callback)
	}
	factory.answer = function(post, callback){
		$http.post("/answer",post).then(callback)
	}
	return factory;
})