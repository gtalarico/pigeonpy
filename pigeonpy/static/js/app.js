$( document ).ready(function() {

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

$(".dropdown-button").dropdown();

});

(function () {

  'use strict';
  angular.module('PigeonPyApp',['ui.router', 'ngAnimate', 'ngResource', 'angular-loading-bar'])
  .run(function($rootScope){
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
      });
  })

  .config(function($stateProvider){
    //   $locationProvider.hashPrefix('!');

    $stateProvider
        .state('app', {
            // url: '',
            abstract: true,
            views: {
              '@' : {
                      templateUrl: '/static/partials/layout.html',
                      controller: 'mainController',
                        },
                'nav.side@app' : { templateUrl: '/static/partials/nav.side.html',},
                'nav.top@app' : { templateUrl: '/static/partials/nav.top.html',},
                // 'footer@app' : { templateUrl: '/static/partials/footer.html',},
            },
          })
          .state('login', {
              url: '/login',
              templateUrl: '/static/partials/login.html',
          })

          .state('app.home', {
              url: '',
              views: { 'main@app': {
                          templateUrl:'/static/partials/home.html'
                      }
              }
          })
          .state('app.buckets', {
              url: '/buckets',
              controller: 'bucketsController',
              views: { 'main@app': {
                          templateUrl:'/static/partials/buckets.html'
                      }
              }
          })
          .state('app.hubs', {
              url: '/hubs',
              resolve: { hubListResponse : resolveHubs },
              views: { 'main@app': {
                          templateUrl:'/static/partials/hubs.html',
                          controller: function($rootScope, hubListResponse) {
                                $rootScope.hubList = hubListResponse;
                                  },
                      }
              }
          })
          .state('app.hubs.projects', {
              url: '/:hubId/projects',
              resolve: { projectListResponse : resolveProjects },
              views: { 'main@app': {
                          templateUrl:'/static/partials/projects.html',
                          controller: function($rootScope, hubListResponse, projectListResponse) {
                              $rootScope.hubList = hubListResponse;
                              $rootScope.projectList = projectListResponse;
                          },
                     }
              }
          })
          .state('app.hubs.projects.items', {
              url: '/:projectId/folders/:folderId',
              resolve: { itemListResponse : resolveItems },
              views: { 'main@app': {
                          templateUrl:'/static/partials/items.html',
                          controller: function($rootScope, hubListResponse, projectListResponse, itemListResponse) {
                              $rootScope.hubList = hubListResponse;
                              $rootScope.projectList = projectListResponse;
                              $rootScope.itemList = itemListResponse;
                          },
                     }
              }
          })
          .state('app.view', {
              url: '/:urn/view',
              resolve: { },
              views: { 'main@app': {
                          templateUrl:'/static/partials/viewer.html',
                          controller: 'viewerController'
                     }
              }
          })
        // http://www.jvandemo.com/how-to-resolve-angularjs-resources-with-ui-router/
        function resolveHubs(forgeService) {
            console.log('Resolving HubList')
            return forgeService.hubList.get().$promise;
        }

        function resolveProjects(forgeService, $stateParams) {
            var hubId = $stateParams.hubId;
            console.log('Resolving Projects for Hub: ' + hubId)
            return forgeService.projectList.get({hubId: hubId}).$promise;
        }

        function resolveItems(forgeService, $stateParams) {
            var projectId = $stateParams.projectId;
            var folderId = $stateParams.folderId;
            console.log('Resolving Items for project: ' + projectId)
            console.log('folderId: ' + projectId)
            return forgeService.itemList.get({projectId: projectId, folderId: folderId}).$promise;
        }
          //
        //   .otherwise({redirectTo:'/',
        //               templateUrl: '/static/partials/home.html',
        //           })
  });

}());
