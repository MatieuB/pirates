angular.module('Pirates')
  .controller('PCtrl',['$scope','$log',function($scope,$log) {

    $scope.hello = 'am i here?'
    $scope.test = function() {
      $log.info('Tests?????')

    }
  }])
