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
        .state('app', {
            url: '/',
            views: {
              '@' : { templateUrl: '/static/partials/layout.html' },
                'nav.top@app' : { templateUrl: '/static/partials/nav.top.html',},
                'nav.side@app' : { templateUrl: '/static/partials/nav.side.html',},
                'footer@app' : { templateUrl: '/static/partials/footer.html',},
            },
          })
          .state('home', {
              url: '/',
              templateUrl:'/static/partials/home.html',
            //   controller: 'mainController'
          })
        // .state('list', {
        //     parent: 'index',
        //     url: '/list',
        //     // templateUrl: 'list.html',
        //     // controller: 'ListCtrl'
        //   })
        // .state('list.detail', {
        //     url: '/:id',
        //     views: {
        //       'detail@index' : {
        //         // templateUrl: 'detail.html',
        //         // controller: 'DetailCtrl'
        //       },
        //       'actions@index' : {
        //         // templateUrl: 'actions.html',
        //         // controller: 'ActionCtrl'
        //       },
        //     },
        //   })

        .state('app.buckets', {
            // parent: 'app',
            url: 'buckets',
            controller: 'bucketsController',
            views: { 'main@app': {
                        templateUrl:'/static/partials/buckets.html'
                    }
            }
        })
        //
        //
        // .state('hubs', {
        //   url: '/hubs',
        //   templateUrl:'/static/partials/hubs.html', // TODO: Fix root scope
        //   resolve: { hubListResponse : function(forgeService) {
        //                                 return forgeService.hubList.get();
        //             }},
        //   controller: function($scope, hubListResponse) {
        //       $scope.hubList = hubListResponse.data
        //       console.log('Hublist set')
        //   },
        // })
        //
        // .state('hubs.projects', {
        //   url: '/hubs/:hubId/projects',
        //   templateUrl:'/static/partials/projects.html',
        //   controller: function($scope, projectListResponse, hubListResponse) {
        //       $scope.projectList = projectListResponse.data;
        //       $scope.hubList = $scope.hubListResponse.data
        //       console.log('>' + $scope.hubListResponse.data)
        //   },
        //   resolve: { projectListResponse : function(forgeService, $stateParams) {
        //                                         var hubId = $stateParams.hubId;
        //                                         console.log('Resolving Projects for: ' + hubId)
        //                                         return forgeService.projectList.get({hubId: hubId});
        //                                     },
        //              hubListResponse : function(forgeService) {
        //                                         return forgeService.hubList.get();
        //                                               }
        //         }
        // })

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
