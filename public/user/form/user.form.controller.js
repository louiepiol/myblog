(function() {

	'use strict';

	angular
		.module('blogApp')
		.controller('UserFormController', UserController);

	function UserController($scope, $state, API) {
		$scope.user = {};
		$scope.userArray = {};
		$scope.getUser = function(id) {
			API.doGet('users/profile/' + id, function(data, error) {
				if(data) $scope.user = data;
				else alert(error);
			});
		}
		if($state.params.id) {
			$scope.getUser($state.params.id);
	    	$scope.edit = true;
	    }
	    $scope.save = function(id) {
		    if(id) {
	        	API.doPut('users', $scope.user, function(data, error) {
					if(data) {
						$scope.user = data[0];
						$scope.userArray.message = true;
					} else {
						$scope.userArray.error = true;
					}
				});
			} else {
				API.doPost('users', $scope.user, function(data, error) {
					if(data) {
						$scope.userArray.message = true;
						$scope.edit = true;
					}
					if(error) $scope.userArray.error = true;
				});
			}
		}
	}	
})();