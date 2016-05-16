(function() {
  'use strict';
  angular.module('Pirates')
    .controller('LoginCtrl',['$scope','$location','$log','$http','userService', function($scope,$location,$log,$http,userService) {

      $scope.loginForm = {}
      $scope.loginSubmit = function($http) {
        $log.info('login clicked part 1')
        var loggy = angular.copy($scope.loginForm)
        $scope.loginForm = {}
        $log.info('loggy: ',  loggy)

        userService.loginUser(loggy).then(function(response) {
          $log.info('error=========',response)
          if (response.status === 200) {
            $log.info('login clicked part 2')
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
