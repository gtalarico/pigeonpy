(function() {

    'use strict';

    angular.module('PigeonPyApp')
        .controller('hubsController', function($rootScope, $scope, $log, $http, $timeout, $state, $stateParams, forgeService, userService) {

                $scope.user = userService.getUser()

                console.log('Hubs Controller Initialized')
                resolveByState()

                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    $log.log("AppCtrl.onStateChangeSuccess");
                    resolveByState()
                });

                function resolveByState(){
                    switch($state.current.name) {
                        case 'app.hubs':
                            $rootScope.hubList = resolveHubs()
                            break;
                        case 'app.hubs.projects':
                            $rootScope.projectList = resolveProjects($state,  $stateParams)
                            break;
                        default:
                            break;
                    }
                }

                // http://www.jvandemo.com/how-to-resolve-angularjs-resources-with-ui-router/
                function resolveHubs() {
                    console.log('Resolving HubList')
                    return forgeService.hubList.get();
                }

                function resolveProjects($state,  $stateParams) {
                    var hubId = $stateParams.hubId;
                    console.log('Resolving Projects for Hub: ' + hubId)
                    return forgeService.projectList.get({hubId: hubId});
                }

                function resolveItems() {
                    var projectId = $stateParams.projectId;
                    var folderId = $stateParams.folderId;
                    console.log('Resolving Items for project: ' + projectId)
                    console.log('folderId: ' + projectId)
                    return forgeService.itemList.get({projectId: projectId, folderId: folderId}).$promise;
                }



                $scope.$on('$viewContentLoaded', function(event) {
                  $timeout(function() {

                          $('.collapsible').collapsible();
                          $(".dropdown-button").dropdown();

                          $('.button-collapse.left').sideNav({
                                menuWidth: 300, // Default is 300
                                edge: 'left', // Choose the horizontal origin
                                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                                draggable: false // Choose whether you can drag to open on touch screens
                              }
                            );

                          $('.button-collapse.right').sideNav({
                                menuWidth: 300, // Default is 300
                                edge: 'right', // Choose the horizontal origin
                                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                                draggable: true // Choose whether you can drag to open on touch screens
                              }
                            );


                  },100);
                });



            }

        );

}());
