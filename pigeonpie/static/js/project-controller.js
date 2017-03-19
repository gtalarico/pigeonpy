(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('projectController', ['$scope', '$log', '$http', '$timeout', '$window','$routeParams',
            function($scope, $log, $http, $timeout, $window, $routeParams) {

                $log.log($routeParams)
                    var hubId = $routeParams.hubId
                    var projectId = $routeParams.projectId

                    $http.get('/api/hubs/' + hubId + '/projects/' + projectId + '/folders')
                        .then(function successCallback(response) {
                            $log.log(response);
                            if (response.status == 200){
                                $log.log('Found Hubs');
                                $scope.folderList = response.data.data
                            }
                        }, function errorCallback(response) {
                            $log.log(response);
                        });


                    $scope.loadItems = function(folderId) {
                        $http.get('/api/hubs/' + hubId + '/projects/' + projectId + '/folders/' + folderId)
                            .then(function successCallback(response) {
                                $log.log(response);
                                if (response.status == 200){
                                    $log.log('Found Items');
                                    $scope.itemList = response.data.data
                                }
                            }, function errorCallback(response) {
                                $log.log(response);
                            });
                    }






            }

        ]);

}());
