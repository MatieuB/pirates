angular.module('Pirates')
  .directive('mbNav',function() {
    return {
      restrict: 'E',
      templateUrl: '/views/nav.html',
      controller: ['$scope', function($scope) {
        $scope.logOut = function() {
            localStorage.clear();
            $location.path('/login');
          }
      }]
    }
  })
