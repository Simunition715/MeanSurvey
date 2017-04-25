var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'partials/login.html',
		controller: 'UsersController as UC'
	})
	.when('/dashboard',{
		templateUrl: 'partials/dashboard.html',
		controller: 'UsersController as UC'
	})
	.when('/questions',{
		templateUrl: 'partials/question_home.html',
		controller: 'UsersController as UC'
	})
	.when('/question/:id',{
		templateUrl:'partials/show.html',
		controller: 'UsersController as UC'
	})
	.when('/answer/:id',{
		templateUrl:'partials/answer.html',
		controller: 'UsersController as UC'
	})
	.otherwise('/')
})