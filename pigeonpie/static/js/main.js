$( document ).ready(function() {

        $('.button-collapse.left').sideNav({
              menuWidth: 300, // Default is 300
              edge: 'left', // Choose the horizontal origin
              closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
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

});

// https://github.com/mgonto/restangular
// https://github.com/emmaguo/angular-poller
// https://chieffancypants.github.io/angular-loading-bar/

(function () {

  'use strict';
  angular.module('PigeonPieApp',['ui.router', 'ngAnimate', 'ngResource', 'angular-loading-bar'])
  .run(function($rootScope){
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
      });
  })

  .config(function($stateProvider){
    //   $locationProvider.hashPrefix('!');

    $stateProvider
        .state('home', {
            url: '',
            templateUrl:'/static/partials/home.html',
            controller: 'mainController'
        })

        .state('buckets', {
            url: '/buckets',
            templateUrl:'/static/partials/buckets.html',
            controller: 'bucketsController'
        })


        .state('hubs', {
          url: '/hubs',
          templateUrl:'/static/partials/hubs.html', // TODO: Fix root scope
          resolve: { hubListResponse : function(forgeService) {
                                        return forgeService.hubList.get();
                    }},
          controller: function($rootScope, hubListResponse) {
              $rootScope.hubList = hubListResponse.data
          },
        })

        .state('projects', {
          url: '/hubs/:hubId/projects',
          templateUrl:'/static/partials/projects.html',
          controller: function($rootScope, projectListResponse, hubListResponse) {
              $rootScope.projectList = projectListResponse.data;
              $rootScope.hubList = hubListResponse.data },
          resolve: { projectListResponse : function(forgeService, $stateParams) {
                                                var hubId = $stateParams.hubId;
                                                return forgeService.projectList.get({hubId: hubId});
                                            },
                     hubListResponse : function(forgeService) {
                                                return forgeService.hubList.get();
                                                      }
                }
        })

      //   .when('/hubs/:hubId/projects',{
      //       templateUrl:'/static/partials/projects.html',
      //       controller: function($scope, response) { $scope.projectList = response.data },
      //       resolve: { response : function($route, forgeService) {
      //                             var hubId = $route.current.params.hubId
      //                             console.log('Resolving project list for Hub: '+ hubId)
      //                             return forgeService.projectList.get({hubId: hubId});
      //                           }
      //                 },
      //   })



        //   .when('/hubs/:hubId/projects/:projectId/folders',{
        //       templateUrl:'/static/partials/project.html',
        //     //   controller: 'projectController'
        //   })

        //   .when('/login',{templateUrl:'/static/partials/login.html'})
        //   .when('/upload',{templateUrl:'/static/partials/upload.html'})
        //   .when('/',{templateUrl:'/static/partials/home.html'})
          //
        //   .otherwise({redirectTo:'/',
        //               templateUrl: '/static/partials/home.html',
        //           })
  });

}());
