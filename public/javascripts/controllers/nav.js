angular.module('Pirates')
  .controller('NavCtrl',['$scope',function($scope) {
    $scope.logOut = function() {
        localStorage.clear();
        $location.path('/login');
      }
  }])
