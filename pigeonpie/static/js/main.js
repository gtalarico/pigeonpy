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
              controller: 'mainController'
          })

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
