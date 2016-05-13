angular.module('Pirates')
.controller('EditCtrl',['$scope','$routeParams','$log','PiratesService','$location',function ($scope,$routeParams,$log,PiratesService,$location) {
  // you have the id in $routeParams.id
  PiratesService.getPirate($routeParams.id).then(function(pirate) {
    $scope.myPirate = pirate.data[0];
  })

  $scope.editPirate = function () {
    PiratesService.editPirate($scope.myPirate).then(function(){
      $location.path('/')
    });
  }
}])
