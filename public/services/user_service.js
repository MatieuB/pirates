angular.module('Pirates')
.factory('userService', ['$http','$log',function ($http,$log) {
  return {

    all: function() {
      return $http.get('/api/users').then(function(response){
        return response.data
      });
    },
    addUser: function(user) {
      return $http.post('/api/users/add',user)
    },
    loginUser: function(user) {
      return $http.post('/api/login',user)
    },
    isLoggedIn: function() {
      if(localStorage.getItem('token')) {
        return true
      }
    }
  }
}])
