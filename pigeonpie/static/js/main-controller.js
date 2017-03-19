(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('mainController', ['$scope', '$log', '$http', '$window', '$location','$routeParams',
            function($scope, $log, $http, $window, $location, $routeParams) {

                    $http.get('/api/user')
                        .then(function successCallback(response) {
                            if (response.status == 200){
                                $log.log('Found User');
                                $log.log(response);
                                $scope.user = response.data
                            }
                        }, function errorCallback(response) {
                            if (response.status == 401){
                                $log.log(response);
                                $window.location = '#!/login'
                            }
                        });

                    $scope.loadHubs = function(){

                        $http.get('/api/hubs')
                            .then(function successCallback(response) {
                                if (response.status == 200){
                                    console.log('Getting Hubs')
                                    $log.log(response);
                                    $scope.hubList = response.data.data
                                    // $state.go('/hubs/');
                                    $location.path('/hubs/')
                                }
                            }, function errorCallback(response) {
                                if (response.status == 401){
                                    $log.log(response);
                                    // $window.location = '#!/login'
                                }
                            });
                    }

                    $scope.loadProjects = function(hubId){
                        $http.get('/api/hubs/' + hubId + '/projects' )
                            .then(function successCallback(response) {
                                if (response.status == 200){
                                    console.log('Getting Projects')
                                    var projectList = {}
                                    projectList[hubId] = response.data.data
                                    $scope.projectList = projectList
                                }
                            }, function errorCallback(response) {
                                if (response.status == 401){
                                    $log.log(response);
                                    // $window.location = '#!/login'
                                }
                            });
                    }

                    $scope.loadFolders = function(hubId, projectId){
                        $http.get('/api/hubs/' + hubId + '/projects/' + projectId + '/folders' )
                            .then(function successCallback(response) {
                                if (response.status == 200){
                                    console.log('Getting Projects')
                                    var folderList = {}
                                    folderList[projectId] = response.data.data
                                    $scope.folderList = folderList
                                }
                            }, function errorCallback(response) {
                                if (response.status == 401){
                                    $log.log(response);
                                    // $window.location = '#!/login'
                                }
                            });
                    }
            }

        ]);



}());
