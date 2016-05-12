angular.module('Pirates')
.factory('PiratesService', ['$http','$resource',function ($http,$resource) {
  return {
    all: function() {
      return $http.get('/api/pirates').then(function(response){
        return response.data
      });
    },
    addPirate: function(newPirateData) {
      return $http.post('/api/pirates/add',newPirateData)
    },
    deletePirate: function(id) {
      return $http.delete('/api/pirates/' + id)
    }
  }
}])
