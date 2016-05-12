angular.module('Pirates')
.controller('PCtrl',['$scope','$log','$http','$rootScope','PiratesService',function($scope,$log,$http,$rootScope,PiratesService) {
  $scope._id
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
      $scope.pirates.push(newPirate.data[0]);

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
.controller('EditCtrl',function ($scope,$routeParams,$log,PiratesService,$location) {
  // you have the id in $routeParams.id
  PiratesService.getPirate($routeParams.id).then(function(pirate) {
    $scope.myPirate = pirate.data[0];
  })

  $scope.editPirate = function () {
    $log.info('id',$scope.myPirate)
    PiratesService.editPirate($scope.myPirate).then(function(){
      $location.path('/')
    })
    // $rootScope.current = pirate;
    // $log.info('current======',$rootScope.current)
    // $log.info('current==name====',$rootScope.current.name)
    // $log.info('current==poison====',$rootScope.current.poison)
    // $log.info('current===accessory===',$rootScope.current.accessory)
    // $log.info('current===image===',$rootScope.current.image_url)

    // PiratesService.editPirate(pirate.id).then(function() {
    //   var index = $scope.pirates.indexOf(pirate);
    //   $scope.pirates.splice(index, 1);
    //   $log.info($scope.pirates);
    // })
  }

})
