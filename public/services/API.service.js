'use strict';

angular.module('blogApp')
  .factory('API', function ($http) {
    var url = "api/v1/";
    var defaultErrorMessage = "Server responded with an undefined error!";
    return {
      apiUrl: function(){
        return url;
      },
      doGet: function(uri, callback, params) {
        $http({
          url: url + uri,
          method: 'GET',
          params: params ? params : {}
        }).success(function(data) {
          if(callback) return callback(data);
          return data;
        }).error(function(error) {
          if(callback) return callback(undefined, error || defaultErrorMessage);
          return error || defaultErrorMessage;
        });
      },
      doPost: function(uri, object, callback, params) {
        $http({
          url: url + uri,
          method: 'POST',
          data: object,
          params: params ? params : {},
          headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
          if(callback) return callback(data);
          return data;
        }).error(function(error) {
          if(callback) return callback(undefined, error || defaultErrorMessage);
          return error || defaultErrorMessage;
        });
      },
      doPut: function(uri, object, callback, params, id) {
        console.log(uri + (object.id ? "/" + object.id : ""));
        $http({
          url: url + uri + (object.id ? "/" + object.id : ""),
          method: 'PUT',
          data: object,
          params: params ? params : {},
          headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
          if(callback) return callback(data);
          return data;
        }).error(function(error) {
          if(callback) return callback(undefined, error || defaultErrorMessage);
          return error || defaultErrorMessage;
        });
      },
      doDelete: function(uri, id, callback, params) {
        $http({
          url: url + uri + "/" + id,
          params: params ? params : {},
          method: 'DELETE'
        }).success(function(data) {
          if(callback) return callback(data);
          return data;
        }).error(function(error) {
          if(callback) return callback(undefined, error || defaultErrorMessage);
          return error || defaultErrorMessage;
        });
      }
    }
  });
