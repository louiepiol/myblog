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

	function PostController($scope, $state, $window, Auth, API) {
		$scope.posts = {};
		$scope.getPostList = function(authorId) {
			// This request will hit the index method in the AuthenticateController
			// on the Laravel side and will return the list of users
			if(!authorId) {
				API.doGet('posts', function(data, error) {
	      	if(data) {
						$scope.posts = data.posts;
	      	}
					else if(error) alert(error);
	      });
			} else {
				API.doGet('users/' + authorId + '/posts', function(data, error) {
	      	if(data) {
						$scope.posts = data.posts;
	      	}
					else if(error) alert(error);
	      });
			}
		}
		if($state.params.id) {
			$scope.getPostList($state.params.id);
    	$scope.showPost = true;
    } else {
			$scope.getPostList();
    }
	}

})();