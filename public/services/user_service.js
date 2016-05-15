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
    }
    // deletePirate: function(id) {
    //   return $http.delete('/api/pirates/' + id)
    // },
    // editPirate: function(pirate) {
    //   return $http.put('/api/edit/pirate/' +pirate.id , pirate)
    // },
    // getPirate: function(id) {
    //   return $http.get('/api/pirate/'+ id)
    // }
  }
}])
