(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('hubController', ['$scope', '$log', '$http', '$timeout', '$window','$routeParams',
            function($scope, $log, $http, $timeout, $window, $routeParams) {


                $log.log($routeParams)
                    var hubId = $routeParams.hubId

                    // Loads Hubs
                    $http.get('/api/hubs/' + hubId + '/projects')
                        .then(function successCallback(response) {
                            $log.log(response);
                            if (response.status == 200){
                                $log.log('Found Hubs');
                                $scope.projectList = response.data.data
                                console.log($scope.itemList)
                            }
                        }, function errorCallback(response) {
                            $log.log(response);
                        });

                    $scope.loadProject = function(projectId) {
                        $log.log('Load Project Called')
                        $window.location = 'api/hubs/' + hubId + '/projects/' + projectId
                        // $window.location = '#!/hubs/' + hubId + '/projects/' + projectId
                    }






            }

        ]);

}());
