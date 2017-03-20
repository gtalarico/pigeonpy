(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('mainController', ['$scope', '$log', '$http', '$window', '$location', 'forgeService',
            function($scope, $log, $http, $window, $location, forgeService) {


                    $scope.isAdmin = forgeService.isAdmin()

                    $scope.$on('$viewContentLoaded', function(){
                        $scope.hubList = forgeService.hubList
                        console.log('All content loaded')
                    });

                    // Initialized on Page Load by ng-init. Redirects if not authenticated
                    $scope.getUser = function(){

                        $http.get('/api/user')
                        .then(function successCallback(response) {
                            if (response.status == 200){
                                $log.log('User Profile Acquired');
                                $log.log(response);
                                $scope.user = response.data
                            }
                        }, function errorCallback(response) {
                            if (response.status == 401){
                                $log.log(response);
                                $window.location = '#!/login'
                            }
                        });
                    }

                    $scope.loadHubs = function(){

                        if (forgeService.hubList.length != 0) {
                            $scope.hubList = forgeService.hubList
                            $log.log('Hubs were already loaded')
                            }
                        else {
                            forgeService.getHubs().then(
                                function(hubList){
                                    $scope.hubList = hubList
                                    forgeService.hubList = hubList
                                }
                            )
                        }
                        $location.path('/hubs/')

                    }

                    $scope.loadProjects = function(hubId){

                        if (forgeService.projectList[hubId] != undefined) {
                            $log.log('Projects were already loaded')
                            $scope.projectList = forgeService.projectList
                            $log.log($scope.projectList)
                            }
                        else {
                            $log.log('Getting Projects...')
                            forgeService.getProjectList(hubId).then(
                                function(projectList){
                                    $log.log(projectList)
                                    $scope.projectList = projectList
                                    forgeService.projectList = projectList
                                }
                            )
                        }
                        $location.path('/hubs/' + hubId + '/projects')

                    }

                    $scope.loadProject = function(project){
                        console.log('Getting Project')
                        var hubId = project.relationships.hub.data.id
                        var projectId = project.id
                        var rootFolderId = project.relationships.rootFolder.data.id

                        if (forgeService.projectItems[projectId] != undefined) {
                            $log.log('Project Itemswere already loaded')
                            $scope.projectItems = forgeService.projectItems[project.id]
                            }
                        else {
                            $log.log('Getting ProjectItems...')
                            forgeService.getProjectItems(hubId, projectId, rootFolderId).then(
                                function(projectItems){
                                    $log.log(projectItems)
                                    $scope.projectItems = projectItems[project.id]
                                    forgeService.projectItems = projectItems
                                }
                            )
                        }
                        $location.path('/hubs/' + hubId + '/projects/' + projectId + '/folders')
                    }
            }]

        );



}());
