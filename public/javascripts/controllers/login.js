(function() {
  'use strict';
  angular.module('Pirates')
    .controller('LoginCtrl',['$scope','$location','$log','$http','userService', function($scope,$location,$log,$http,userService) {

      $scope.loginForm = {}
      $scope.loginSubmit = function($http) {
        var loggy = angular.copy($scope.loginForm)
        $scope.loginForm = {}
        $log.info('user being sent to login: ',  loggy)

        userService.loginUser(loggy).then(function(response) {
          if (response.status === 200) {
            $log.info(response.data)
            localStorage.setItem('token',response.data.token)
            $location.path('/')
          }
          if(response.status === 403) {
            $scope.error = response.data
          }
        })
      }
    }])


}());
