angular.module('Pirates')
.controller('SecretCtrl',['$scope','$log','$location','theUser',function ($scope,$log,$location,theUser) {
  $scope.user = theUser
  $log.info('theUser',theUser)
  if(theUser === null) {
    $location.path('/');
  }

  // you have the id in $routeParams.id
  // PiratesService.getPirate($routeParams.id).then(function(pirate) {
  //   $scope.myPirate = pirate.data[0];
  // })
  //
  // $scope.editPirate = function () {
  //   PiratesService.editPirate($scope.myPirate).then(function(){
  //     $location.path('/')
  //   });
  // }




}])
