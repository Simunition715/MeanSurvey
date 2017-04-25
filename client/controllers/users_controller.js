app.controller('UsersController', function(UserFactory, $location, $routeParams){
	console.log('instanciating users controller...');
	var self = this;
	self.newUser = {};
	self.current_user = {};
	self.loginUser = {};
	self.newQuestion = {};
	self.questions = [];
	self.new = {};
	self.show = {};
	self.ans = {}
	self.errors = [];


	UserFactory.session(function(res){
		if(res){
			self.current_user = res.data;
		}else {
			self.current_user = {};
			$location.url('/');
		}
	})
	self.show = function(){
		UserFactory.show($routeParams.id, function(res){
			self.show = res.data;
			self.ans = res.data
		})
	}
	self.answer = function(id){
		console.log("newish",id);
		$location.url('/answer/'+id);
	}
	self.showQ = function(id){
		console.log("this id is", id);
		$location.url('/question/'+id);
	}
	self.cancel = function(){
		$location.url('/questions');
	}
	self.login = function(newUser){
		UserFactory.login(newUser, function(res){
			$location.url('/questions')
		})
	}
	self.home = function(){
		$location.url('/questions')
	}
	self.logout = function(){
		self.current_user = {};
		$location.url('/')
	}
	self.getQuestions = function(){
		UserFactory.getQuestions(function(res){
			self.questions = res.data;
		})
	}
	self.getCurrentUser = function(){
		return UserFactory.current_user;
	}
	self.like = function(id, answerId){
		console.log(id);
		UserFactory.like(id,answerId,function(res){
			self.show = res.data;
		})
	}
	self.askQuestion = function(newQuestion){
		self.errors = [];
		newQuestion._user = UserFactory.current_user.name;
		UserFactory.ask(newQuestion, function(res){
			if(res.data.errors){
				self.errors.push('Question must be atleast 10 characters in length');
				$location.url('/dashboard')
			}
			if(!res.data.errors){
				$location.url('/questions')
				self.getQuestions()
			}
		})
	}
	self.answerQuestion = function(newAnswer){
		newAnswer._user = UserFactory.current_user.name;
		post = {
			question: self.show._id,
			answer: newAnswer
		}
		UserFactory.answer(post, function(res){
			$location.url('/questions')
			//self.getAnswers()
		})
	}
})