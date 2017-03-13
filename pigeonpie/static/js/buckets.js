(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('bucketsController', ['$scope', '$log', '$http', '$timeout',
            function($scope, $log, $http, $timeout) {

                // Get Bucket List
                var timeout = "";
                var bucketListPoller = function() {
                    $http.get('/api/buckets')
                        .then(function successCallback(response) {
                            $log.log(response);
                            $scope.bucketList = response.data.items
                            $timeout.cancel(timeout);
                        }, function errorCallback(response) {
                            $log.log(response);
                        });
                    timeout = $timeout(bucketListPoller, 2000);
                }
                bucketListPoller();

                $scope.createBucket = function() {
                    var bucketKey = $scope.bucketKey;
                    $http.post('/api/buckets/' + bucketKey)
                        .then(function successCallback(response) {
                            $log.log(response);
                            getNewBucket(bucketKey)
                        }, function errorCallback(response) {
                            $log.log(response);
                        });
                };


                function getNewBucket(bucketKey) {
                    var timeout = "";
                    var poller = function() {
                        $http.get('/api/buckets/' + bucketKey).
                        then(function successCallback(response) {
                            if (response.status === 202) {
                                $log.log(response.data);
                            } else if (response.status === 200) {
                                $log.log(response.data);
                                $scope.bucketList.push(response.data);
                                $timeout.cancel(timeout);
                                return false;
                            }
                            timeout = $timeout(poller, 2000);
                        });
                    };
                    poller();
                }

                $scope.deleteBucket = function(bucketKey) {
                    $log.log('Deleting bucket: ' + bucketKey)
                    var timeout = "";
                    var poller = function() {
                        $http.delete('/api/buckets/' + bucketKey)
                            .then(function successCallback(response) {
                                if (response.status === 202) {
                                    $log.log(response.data);
                                } else if (response.status === 200) {
                                    $log.log(response.data);
                                    bucketListPoller();
                                    $timeout.cancel(timeout);
                                    return false;
                                }
                                timeout = $timeout(poller, 2000);
                            });
                    };
                    poller();
                }


            }

        ]);

}());
