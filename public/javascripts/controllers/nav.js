angular.module('Pirates')
  .controller('NavCtrl',['$scope',function($scope) {

    $scope.logOut = function() {
        $log.info('Logout clicked, PCtrl is working')
        localStorage.clear();
        $location.path('/signup');
      }

  }])
