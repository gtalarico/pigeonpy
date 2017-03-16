(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('homeController', ['$scope', '$log', '$http', '$timeout', '$window',
            function($scope, $log, $http, $timeout, $window) {

                    $http.get('/api/user')
                        .then(function successCallback(response) {
                            if (response.status == 200){
                                $log.log('Found User');
                                $log.log(response);
                                $scope.user = response.data
                            }
                            $log.log('User Request Failed');
                        }, function errorCallback(response) {
                            if (response.status == 401){
                                $log.log(response);
                                $window.location = '#!/login'
                            }
                        });
            }

        ]);



}());
