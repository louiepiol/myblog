(function() {

	'use strict';

	angular
		.module('blogApp', ['ui.router', 'satellizer', 'ui.tinymce'])
		.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider, $httpProvider) {


			// Satellizer configuration that specifies which API
			// route the JWT should be retrieved from
			$authProvider.loginUrl = '/api/authenticate';

			// Redirect to the auth state if any other states
			// are requested other than users
			$urlRouterProvider.otherwise('/login');
			
			$stateProvider
				.state('internal', {
			        abstract: true,
			        views: {
			          'header': {
			            templateUrl: '../navbar/navbar.html',
			            controller: 'NavController'
			          }
			        }
		      	})
				.state('login', {
					url: '/login',
					views: {
			          "container@": {
			            templateUrl: '../auth/auth.html',
			            controller: 'AuthController as auth'
			          }
			        }
				})
				.state('logout', {
					url: '/logout',
        			referrer: 'login',
					views: {
			          "container@": {
			            templateUrl: '',
	            		controller: function($state, Auth, $window) {
			              	var referrer = $state.current.referrer
			              	$window.localStorage.removeItem('satellizer_token');
			              	$state.go(referrer);
			            }
			          }
			        }
				})
				.state('register', {
					url: '/register',
					views: {
			          "container@": {
			            templateUrl: '../auth/register.html',
			            controller: 'AuthController as auth'
			          }
			        }
				})
				.state('user', {
					url: '/users/:id',
		      		parent: 'internal',
		      		views: {
		      			"container@": {
							templateUrl: '../user/user.html',
							controller: 'UserController as user'
						}
					},
			        resolve: {
			          author: function (Auth) { return Auth.getUser(); }
			        }
				})
				.state('posts-form', {
					url: '/posts/form',
		      		parent: 'internal',
		      		views: {
		      			"container@": {
							templateUrl: '../post/form/post.form.html',
							controller: 'PostFormController'
						}
					},
			        resolve: {
			          author: function (Auth) { return Auth.getUser(); }
			        }
				})
				.state('posts-form-update', {
					url: '/posts/form/:id',
		      		parent: 'internal',
		      		views: {
		      			"container@": {
							templateUrl: '../post/form/post.form.html',
							controller: 'PostFormController'
						}
					},
			        resolve: {
			          author: function (Auth) { return Auth.getUser(); }
			        }
				})
				.state('posts', {
					url: '/posts',
		      		parent: 'internal',
					views: {
						"container@": {
							templateUrl: '../post/list/post.html',
							controller: 'PostController'
						}
					},
			        resolve: {
			          author: function (Auth) { return Auth.getUser(); }
			        }
				})
				.state('posts-author', {
					url: '/posts/user/:id',
		      		parent: 'internal',
					views: {
						"container@": {
							templateUrl: '../post/list/post.html',
							controller: 'PostController'
						}
					},
			        resolve: {
			          author: function (Auth) { return Auth.getUser(); }
			        }
				});;
			    $httpProvider.interceptors.push('authInterceptor');
    			$locationProvider.html5Mode(true);
		})
		.factory('authInterceptor', function ($rootScope, $q, $location) {
		    return {
		      	// Intercept 401s and redirect you to login
		      	responseError: function(response) {
		        if(response.status == 401) {
		            $location.path('/login');
		            window.location.reload();
		            return $q.resolve(response.data);
		        };
		        return $q.reject(response);
		      }
		    };
		});
})();