(function () {

    var myApp = angular.module('PigeonPieApp');

    myApp.service('$forgeService', function ($http, $log) {

        var responseData
        this.getHttp = function() {
              $http.get('/api/hubs')
                .then(function successCallback(response) {
                        $log.log(response);
                        if (response.status == 200){
                            $log.log('Found Hubs');
                            responseData = response.data.data
                            return responseData
                        }
                    }, function errorCallback(response) {
                        $log.log(response);
                        responseData = response.data.data
                        return responseData
                    });

              }
      });

})();
