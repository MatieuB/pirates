angular.module('Pirates')
.controller('PCtrl',['$scope','$log','$http','PiratesService',function($scope,$log,$http,PiratesService) {
  $scope._id
  $scope.formData = {}

  PiratesService.all().then(function(pirates){
    $scope.pirates = pirates
    $log.info('here',   $scope.pirates)
  })

  $scope.formSubmit = function () {
    var newPirate = angular.copy($scope.formData);
    $scope.formData = {};

    PiratesService.addPirate(newPirate).then(function(newPirate){
      $scope.addToPirates(newPirate.data[0]);
        // $scope.addToPirates = function (newPirate){
        //   $scope.pirates.push(newPirate);
        // }
      });

    PiratesService.all().then(function(pirates) {
      $scope.pirates = pirates;
      $log.info('here',   $scope.pirates)
    });
  }


  $scope.deletePirate = function (pirate) {
    $log.info(pirate)
    PiratesService.deletePirate(pirate.id).then(function() {
      var index = $scope.pirates.indexOf(pirate);
      $scope.pirates.splice(index, 1);
      $log.info($scope.pirates)
    })
  }



}])
