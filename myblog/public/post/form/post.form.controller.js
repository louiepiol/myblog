(function() {

	'use strict';

	angular
		.module('blogApp')
		.controller('PostFormController', function ($http, $scope, $state, $location, Auth, API) {
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
					console.log(id);
					$scope.post.author_id = Auth.currentAuthor() ? Auth.currentAuthor().id : null;
					if(id) {
		        API.doPut('api/posts', $scope.post, function(data, error) {
							if(data) window.location.reload();
							else alert(error);
						});
					} else {
						API.doPost('api/posts', $scope.post, function(data, error) {
							if(data) $location.path('/posts/form/' + data[0].id);
							else alert(error);
						});
	        }
				};

				$scope.delete = function(id) {
					if(id) {
						var res = confirm("Are you sure you want to delete this post?")
						if(res == true) {
							API.doDelete('api/posts/delete', id, function(data, error) {
								if(data) $location.path('/posts');
								else alert(error);
							});
		        } else {
		        	//TODO
		        }
					}
				};
				
				$scope.getPost = function(id) {
		      $http.get('api/posts/' + id).success(function(post) {
						$scope.post = post;
						if(post.author_id	 == Auth.currentAuthor().id || Auth.currentAuthor().role == "admin") {
							$scope.isAuthor = true;
						}
					}).error(function(error) {
						console.log(error);
					});
		    };

		    $scope.edit = function() {
		    	$scope.setPost.form = true;
		    }

		    if($state.params.id) {
		      $scope.getPost($state.params.id);
		    } else {
		    	$scope.setPost.form = true;
		    }
		});

})();