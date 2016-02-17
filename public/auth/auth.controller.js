(function() {

	'use strict';

	angular
		.module('blogApp')
		.controller('AuthController', AuthController);


	function AuthController($state, $scope, $location, Auth, API) {
		$scope.frmLogin = {};
		$scope.frmRegister = {};
		$scope.$location = $location;
		$scope.login = function() {
			Auth.login($scope.frmLogin, function(data, err) {
				if(!err) $state.go('home');
				else alert(err);
			})
		}

		$scope.register = function() {
			API.doPost('users', $scope.frmRegister, function(data, error) {
				if(data) {
					alert("Registration succesful");
					$location.path("/login");
				}
				if(error) alert("Error :", error);
			})
		}
	}

})();