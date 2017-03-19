$( document ).ready(function() {
        $(".button-collapse").sideNav();
        // Initialize collapse button
});

// https://github.com/mgonto/restangular
// https://github.com/emmaguo/angular-poller
// https://chieffancypants.github.io/angular-loading-bar/

(function () {

  'use strict';
  angular.module('PigeonPieApp',['ngRoute', 'ngAnimate', 'angular-loading-bar'])

  .config(['$locationProvider','$routeProvider',
           function($locationProvider,$routeProvider){
      $locationProvider.hashPrefix('!');

      $routeProvider
          .when('/buckets',{
              templateUrl:'/static/partials/buckets.html',
              controller: 'bucketsController'})

          .when('/hubs',{
              templateUrl:'/static/partials/hubs.html',
              controller: 'hubListController'})

          .when('/hubs/:hubId/projects',{
              templateUrl:'/static/partials/hub.html',
              controller: 'hubController'})

          .when('/hubs/:hubId/projects/:projectId',{
              templateUrl:'/static/partials/project.html',
              controller: 'projectController'
          })

          .when('/login',{templateUrl:'/static/partials/login.html'})
          .when('/upload',{templateUrl:'/static/partials/upload.html'})

          .otherwise({redirectTo:'/',
                      templateUrl: '/static/partials/home.html',
                      controller: 'homeController'})
  }])

}());
