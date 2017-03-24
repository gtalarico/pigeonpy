(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('mainController', function($rootScope, $scope, $log, $http, $state, forgeService, userService) {

                    // $rootScope.$on('$stateChangeSuccess',
                    //   function(event, toState, toParams, fromState, fromParams) {
                        // if ($state.current.name == 'hubs'){ loadHubs() } // Rebuild State - This should go into Router State Management
                    //   }
                    // )

                    // Check if Admin, Add to scope > Will load buckets
                    // $scope.user = userService.user

                    // $scope.loadHubs = loadHubs
                    // function loadHubs(){
                    //     console.log('Main: loadHubs()')
                    //     $state.go('hubs', {} );
                    //     console.log('State Changed')
                    //     var hubList = forgeService.hubList.get();
                    //     hubList.$promise.then(function(response){
                    //         // $scope.hubList = response.data;
                    //     })
                    // }
                    //
                    //
                    // $scope.loadProjects = loadProjects
                    // function loadProjects(hubId){
                    //     console.log('Main: loadProjects(hubId)')
                    //     console.log(hubId)
                    //     var projectList = forgeService.projectList.get({hubId: hubId});
                    //     projectList.$promise.then(function(response){
                    //         $scope.projectList = response.data;
                    //         // $state.go('projects', {hubId: hubId}, { location: true });
                    //     })
                    // }




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
