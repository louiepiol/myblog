(function() {

	'use strict';

	angular
		.module('blogApp')
		.controller('UserController', UserController);

	function UserController($http, $scope, $state, API) {
		$scope.user = {};
		$scope.posts = {};
		$scope.getUser = function(id) {
			// This request will hit the index method in the AuthenticateController
			// on the Laravel side and will return the list of users
			$http.get(API.apiUrl() + 'users/profile/' + id).success(function(user) {
				$scope.user = user;
				$http.get(API.apiUrl() + 'users/' + user.id + '/posts').success(function(posts) {
					$scope.posts = posts.posts;
				}).error(function(error) {
					alert(error);
				});
			}).error(function(error) {
				alert(error);
			});
		}
		if($state.params.id) {
				$scope.getUser($state.params.id);
	    } else {
				$scope.getUser();
	    }
	}
	
})();