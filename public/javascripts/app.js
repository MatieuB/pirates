(function() {

  'use strict';

  angular.module('Pirates',['ngRoute'])

  .config(function($routeProvider,$locationProvider,$httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');

    $routeProvider
    .when('/', {

      templateUrl: 'views/pirates.html',
      resolve: {
          theUser: function ($http,$log) {
            return $http.get('/api/users/me')
              .then(function (response) {
                $log.info('from resolve',response.data)
                if(response.data.error) {
                  return null
                }
                return response.data
              })

          }
        },
      controller: 'PCtrl'

    }).when('/edit/pirate/:id', {
      templateUrl : 'views/edit_pirate.html',
      controller: 'EditCtrl'
    }).when('/secret', {
      templateUrl: 'views/secret.html',
      controller: 'SecretCtrl',
      requiresLogin: true,
      resolve: {
          theUser: function ($http,$log) {
            return $http.get('/api/users/me')
              .then(function (response) {
                $log.info('from resolve',response.data)
                if(response.data.error) {
                  return null
                }
                return response.data
              })

          }
        }
    })
    .when('/signup', {
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

    // app.run runs once when the app starts
    // this improves user experience
    angular.module('Pirates').run(function ($rootScope, $location, $window, $log) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        // if the next route requires login
        // and we don't have a token
        // then redirect to the homepage

        if (next.$$route.requiresLogin && !localStorage.getItem('token')) {
          $log.info('requires login');
          $location.path('/404');
        }

      });
    });


    angular.module('Pirates').factory('authInterceptor', function ($location) {
      return {
        request: function(config) {
          if (localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
          }
          return config;
        },
        responseError: function(response) {
          console.log(response);
          return response;
        }
      };
    })


}());
