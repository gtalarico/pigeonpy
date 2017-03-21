(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('mainController', function($scope, $log, $http, $window, $location, forgeService, userService) {

                    // Check if Admin, Add to scope > Will load buckets
                    $scope.user = userService.user

                    $scope.loadHubs = loadHubs
                    if ($scope.hubList){ loadHubs() } // Rebuild State - This should go into Router State Management
                    function loadHubs(){
                        console.log('Main: loadHubs()')
                        var hubList = forgeService.hubList.get();
                        hubList.$promise.then(function(response){
                            $scope.hubList = response.data
                        })
                    }


                    $scope.loadProjects = loadProjects
                    // if ($location.path().indexOf('projects') != -1){ loadProjects($routeParams.hubId) }
                    function loadProjects(hubId){
                        console.log('Main: loadProjects(hubId)')
                        var projectList = forgeService.projectList.get({hubId: hubId});
                        projectList.$promise.then(function(response){
                            $scope.projectList = response.data
                        })
                    }
                    //
                    //     if (forgeService.projectList[hubId] != undefined) {
                    //         $log.log('Projects were already loaded')
                    //         $scope.projectList = forgeService.projectList
                    //         $log.log($scope.projectList)
                    //         }
                    //     else {
                    //         $log.log('Getting Projects...')
                    //         forgeService.getProjectList(hubId).then(
                    //             function(projectList){
                    //                 $log.log(projectList)
                    //                 $scope.projectList = projectList
                    //                 forgeService.projectList = projectList
                    //             }
                    //         )
                    //     }
                    //     $location.path('/hubs/' + hubId + '/projects')
                    //
                    // }
                    //
                    // $scope.loadProject = function(project){
                    //     console.log('Getting Project')
                    //     var hubId = project.relationships.hub.data.id
                    //     var projectId = project.id
                    //     var rootFolderId = project.relationships.rootFolder.data.id
                    //
                    //     if (forgeService.projectItems[projectId] != undefined) {
                    //         $log.log('Project Itemswere already loaded')
                    //         $scope.projectItems = forgeService.projectItems[project.id]
                    //         }
                    //     else {
                    //         $log.log('Getting ProjectItems...')
                    //         forgeService.getProjectItems(hubId, projectId, rootFolderId).then(
                    //             function(projectItems){
                    //                 $log.log(projectItems)
                    //                 $scope.projectItems = projectItems[project.id]
                    //                 forgeService.projectItems = projectItems
                    //             }
                    //         )
                    //     }
                    //     $location.path('/hubs/' + hubId + '/projects/' + projectId + '/folders')
                    // }
            }

        );



}());
