angular.module('Pirates')
.controller('PCtrl',['$scope','$log','$http','$rootScope','PiratesService',function($scope,$log,$http,$rootScope,PiratesService) {
  $scope.formData = {}

  PiratesService.all().then(function(pirates){
    $scope.pirates = pirates
    $log.info('here', $scope.pirates)
  })

  $scope.formSubmit = function () {
    var newPirate = angular.copy($scope.formData);
    $scope.formData = {};

    PiratesService.addPirate(newPirate).then(function(newPirate){
      $log.info(newPirate)
      $scope.pirates.unshift(newPirate.data[0]);

       });

    PiratesService.all().then(function(pirates) {
      $scope.pirates = pirates;
      $log.info('here',   $scope.pirates)
    });
  }

  $scope.deletePirate = function (pirate) {
    // $log.info(pirate)
    PiratesService.deletePirate(pirate.id).then(function() {
      var index = $scope.pirates.indexOf(pirate);
      $scope.pirates.splice(index, 1);
      $log.info($scope.pirates);
    })
  }
  $scope.getPirate = function(pirate) {
    PiratesService.getPirate(pirate.id).then(function(pirate) {
      $rootScope.myPirate = pirate.data[0];
      $log.info('=====myPirate=====',$rootScope.myPirate)
    })
  }

}])
