(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('bucketsController', ['$scope', '$log', '$http', '$timeout', '$window',
            function($scope, $log, $http, $timeout, $window) {

                // Get Bucket List
                var timeout = "";
                var bucketListPoller = function() {
                    $http.get('/api/buckets')
                        .then(function successCallback(response) {
                            $log.log(response);
                            $scope.bucketList = response.data.items
                        }, function errorCallback(response) {
                            $log.log(response);
                            if (response.status === 401) {
                                $log.log('User is not Authenticated')
                                $window.location.href = '/';
                            }
                        });
                    timeout = $timeout(bucketListPoller, 2000);
                }
                bucketListPoller();

                $scope.createBucket = function() {
                    var bucketKey = $scope.bucketKey;
                    $http.post('/api/buckets/' + bucketKey)
                        .then(function successCallback(response) {
                            $log.log(response);
                            if (response.status == 200){
                                $log.log('Bucket Created');
                            }
                        }, function errorCallback(response) {
                            $log.log(response);
                        });
                };


                $scope.deleteBucket = function() {
                    var bucketKey = $scope.bucketKey;
                    $log.log('Deleting bucket: ' + bucketKey)
                    $http.delete('/api/buckets/' + bucketKey)
                        .then(function successCallback(response) {
                            $log.log(response);
                            if (response.status == 200){
                                $log.log('Bucket Created');
                            }
                        }, function errorCallback(response) {
                            $log.log(response);
                        });
                };

            }

        ]);

}());
