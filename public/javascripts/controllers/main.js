angular.module('Pirates')
  .controller('PCtrl',['$scope','$log','$http','PiratesService',function($scope,$log,$http,PiratesService) {

    $scope.hello = 'am i here?'

    PiratesService.all().then(function(pirates){
      $scope.pirates = pirates
      $log.info('herefdafdf',   $scope.pirates)
    })

  }])
