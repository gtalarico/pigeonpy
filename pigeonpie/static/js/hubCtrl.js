(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('hubController', ['$scope', '$log', '$http', '$timeout', '$window',
            function($scope, $log, $http, $timeout, $window) {

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
            }

        ]);

}());
