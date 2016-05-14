angular.module('Pirates')
  .controller('SignupCtrl',['$scope','$log','userService','$location',function ($scope,$log,userService,$location) {
  $scope.vm = {}
  $scope.vm.showRiddle = false
  // silly riddle
  $scope.showAnswer = function() {
    $scope.vm.showRiddle = !$scope.vm.showRiddle
  }
  $scope.userForm = {}
  // add a user
  $scope.formSubmit = function () {
    var newUser = angular.copy($scope.userForm);
    $scope.userForm = {};

    userService.addUser(newUser).then(function(newUser){
      $log.info(newUser)
      $scope.pirates.unshift(newUser.data[0]);
    });

    userService.all().then(function(users) {
      $scope.users = users;
      $log.info('here',   $scope.users)
    });
  }

}])
