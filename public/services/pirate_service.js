angular.module('Pirates')
.factory('PiratesService', ['$http','$log',function ($http,$log) {
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
    editPirate: function(pirate) {
      return $http.put('/api/edit/pirate/' +pirate.id , pirate)
    },
    getPirate: function(id) {
      return $http.get('/api/pirate/'+ id)
    }
  }
}])
