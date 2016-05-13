angular.module('Pirates',['ngRoute','ngResource'])

.config(function($routeProvider,  $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'views/pirates.html',
    controller: 'PCtrl'
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
  .when('/404', {
    template:'<h1>404 not found</h1>'
  }).otherwise({
    redirectTo: '/404'
  });
  $locationProvider.html5Mode(true);
});
