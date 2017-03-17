(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('hubListController', ['$scope', '$log', '$http', '$timeout', '$window',
            function($scope, $log, $http, $timeout, $window) {

                    // Loads Hubs
                    $http.get('/api/hubs')
                        .then(function successCallback(response) {
                            $log.log(response);
                            if (response.status == 200){
                                $log.log('Found Hubs');
                                $scope.hubList = response.data.data
                                console.log('test')
                            }
                        }, function errorCallback(response) {
                            $log.log(response);
                        });

                    $scope.loadHub = function(hubId) {
                        $window.location = '#!/hubs/' + hubId + '/projects'
                    }






            }

        ]);

}());
