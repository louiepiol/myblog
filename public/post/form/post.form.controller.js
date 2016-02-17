(function() {

	'use strict';

	angular
		.module('blogApp')
		.controller('PostFormController', function ($scope, $state, $location, Auth, API) {
				$scope.post = {};
				$scope.setPost = {};

				$scope.tinymceOptions = {
				    onChange: function(e) {
				      // put logic here for keypress and cut/paste changes
				    },
				    inline: false,
				    plugins : 'advlist autolink link image lists charmap print preview',
				    skin: 'lightgray',
				    theme : 'modern'
				};

				$scope.save = function(id) {
					$scope.post.author_id = Auth.currentAuthor() ? Auth.currentAuthor().id : null;
					if(id) {
		        API.doPut('posts', $scope.post, function(data, error) {
							if(data) {
								window.location.reload();
								$scope.setPost.error = true;
							} else {
								$scope.setPost.error = error;
							};
						});
					} else {
						API.doPost('posts', $scope.post, function(data, error) {
							if(data) {
								$location.path('/posts/form/' + data[0].id);
								$scope.setPost.message = true;
							} else {
								$scope.setPost.error = error;
							};
						});
	        }
				};

				$scope.delete = function(id) {
					if(id) {
						var res = confirm("Are you sure you want to delete this post?")
						if(res == true) {
							API.doDelete('posts/delete', id, function(data, error) {
								if(data) $location.path('/home');
								else alert(error);
							});
		        } else {
		        	//TODO
		        }
					}
				};
				
				$scope.getPost = function(id) {
		      API.doGet('posts/' + id, function(data, error) {
		      	if(data) {
		      		$scope.post = data;
							if(data.author_id	 == Auth.currentAuthor().id || Auth.currentAuthor().role == "admin") {
								$scope.isAuthor = true;
							}
		      	}
						else if(error) alert(error);
		      });
		    };

		    $scope.edit = function() {
		    	$scope.setPost.form = true;
		    };

		    if($state.params.id) {
		      $scope.getPost($state.params.id);
		    } else {
		      $scope.setPost.new = true;
		    	$scope.setPost.form = true;
		    }
		});

})();