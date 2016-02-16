(function() {

	'use strict';

	angular
		.module('blogApp')
		.controller('PostController', PostController)
		.filter('unsafe', function($sce) { return $sce.trustAsHtml; })
		.filter('myDate', function($filter) {    
		    var angularDateFilter = $filter('date');
		    return function(theDate) {
		       return angularDateFilter(new Date(theDate), 'MMM dd,y @ h:mma');
		    }
		});

	function PostController($http, $scope, $state, $window, Auth) {
		$scope.posts = {};
		$scope.getPostList = function(authorId) {
			// This request will hit the index method in the AuthenticateController
			// on the Laravel side and will return the list of users
			if(!authorId) {
				$http.get('api/posts').success(function(posts) {
					$scope.posts = posts.posts;
				}).error(function(error) {
					$scope.error = error;
				});
			} else {
				$http.get('api/users/' + authorId + '/posts').success(function(posts) {
					$scope.posts = posts.posts;
				}).error(function(error) {
					$scope.error = error;
				});
			}
		}
		if($state.params.id) {
			$scope.getPostList($state.params.id);
    } else {
			$scope.getPostList();
    }
	}

})();