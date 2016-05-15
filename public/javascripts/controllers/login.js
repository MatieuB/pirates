(function() {
  'use strict';
  angular.module('Pirates')
    .controller('LoginCtrl',['$scope','$log','$http','userService', function($scope,$log,$http,userService) {

      $scope.loginForm = {}
      $scope.loginSubmit = function($http) {
        $log.info('login clicked part 1')
        var loggy = angular.copy($scope.loginForm)
        $scope.loginForm = {}
        $log.info('loggy: ',  loggy)

        userService.loginUser(loggy).then(function(response) {
          $log.info(response)
          $log.info('login clicked part 2')
          $log.info(response.data)
        })
      }

    }])


}());
