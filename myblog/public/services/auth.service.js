(function() {
	
	'use strict';

	angular
		.module('blogApp')
		.factory('Auth', function ($http, $auth, $q) {
			var currentAuthor;

			return {
				currentAuthor: function (newAuthor){
					if(newAuthor) currentAuthor = newAuthor;
					return currentAuthor;
				},
				login: function (obj, callback) {
					// Use Satellizer's $auth service to login
					$auth.login(obj).then(function(data) {
						callback(data, null)
					}, function(error) {
						callback(null, error);
					});
				},
				getUser: function() {
					var deferred = $q.defer();
				  	$http.get('api/users/me').success(function(user) {
						currentAuthor = user;
				  		deferred.resolve({});
					}).error(function(error) {
				    	return deferred.reject(error);
					});
					return deferred.promise;
				}
			}
		});


})();