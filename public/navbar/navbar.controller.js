(function() {

	'use strict';

	angular
		.module('blogApp')
		.controller('NavController', function ($scope, $state, $location, $window, $auth, Auth) {
			$scope.currentUser = Auth.currentAuthor() ? Auth.currentAuthor() : null;
			$scope.logout = function() {
              	$auth.logout();
				$state.go('login');
			}
			$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		      if(toState.name == "logout") {
				$state.go('login');
		      }
		    });
		});
})();