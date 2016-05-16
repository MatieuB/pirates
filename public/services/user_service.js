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
      return $http.post('/api/login',user).then( function (data) {
        console.log("loginUser", data);
        return data
      })
    },
    isLoggedIn: function() {
      $http.get('/api/users/me')
        .then(function (response) {
          $log.info('from resolve',response.data)
          if(response.data.error) {
            return false
          }
          return true
        })
    }
  }
}])
