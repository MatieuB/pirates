angular.module('Pirates',['ngRoute','ngResource'])

.config(function($routeProvider,  $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'views/pirates.html',
    controller: 'PCtrl',
    resolve: {
        currentUser: function ($http) {
          return $http.get('/api/users/me')
            .then(function (response) {
              if(response.data.error) {
                return null
              }
              return response.data
            })

        }
      }
  }).when('/edit/pirate/:id', {
    templateUrl : 'views/edit_pirate.html',
    controller: 'EditCtrl'
  }).when('/secret', {
    templateUrl: 'views/secret.html',
    controller: 'PCtrl',
    requiresLogin: true
  }).when('/signup', {
    templateUrl: 'views/signup.html',
    controller: 'SignupCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })
  .when('/404', {
    template:'<h1>404 not found</h1>'
  }).otherwise({
    redirectTo: '/404'
  });
  $locationProvider.html5Mode(true);
});
