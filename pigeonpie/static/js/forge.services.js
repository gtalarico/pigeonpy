(function () {

    angular.module('PigeonPieApp',[])

    .factory('$forgeService', ['$http'], function($http) {

        var responseData;
        getHttp()
        return responseData

        function getHttp() {

            $http.get('/api/hubs')
              .then(function successCallback(response) {
                  $log.log(response);
                  if (response.status == 200){
                      $log.log('Found Hubs');
                      responseData = response.data.data
                  }
              }, function errorCallback(response) {
                  $log.log(response);
                  responseData = response.data.data
              });

        }


      // factory function body that constructs shinyNewServiceInstance
      return shinyNewServiceInstance;
    });

})();
