angular.module('Pirates')
.factory('PiratesService', ['$http','$resource','$log',function ($http,$resource,$log) {
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
    },
    editPirate: function(id) {
      
      return $http.put('/api/edit/pirate/' + id)
    },
    getPirate: function(id) {
      return $http.get('/api/pirate/'+ id)
    }
  }
}])
