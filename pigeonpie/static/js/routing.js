(function () {

    angular.module('PigeonPieApp', ['ui.router'])

    .config(function($stateProvider) {
      var homeState = {
        name: 'home',
        url: '/home',
        component: 'home'
        // template: '<h3>Home</h3>',
        // controller: 'homeController',
        // templateUrl: 'static/partials/home.html'
      }

      var bucketsState = {
        name: 'buckets',
        url: '/buckets',
        template: '<h3>Home</h3>'
        // templateUrl: 'static/partials/buckets.html'
      }

      var hubsState = {
        name: 'hubs',
        url: '/hubs',
        templateUrl: 'static/partials/hubs.html'
      }

      $stateProvider.state(homeState);
      $stateProvider.state(bucketsState);
      $stateProvider.state(hubsState);
    });



}());

// (function () {
//
//   'use strict';
//
//   angular.module('PigeonPieApp')
//      .config(['$locationProvider','$routeProvider',
//               function($locationProvider,$routeProvider){
//          $locationProvider.hashPrefix('!');
//          $routeProvider
//          .when('/buckets',{templateUrl:'/static/partials/buckets.html',
//                            controller: 'bucketsController'})
//          .when('/upload',{templateUrl:'/static/partials/upload.html'})
//          .when('/hubs',{templateUrl:'/static/partials/hubs.html',
//                         controller: 'hubController'})
//          .when('/login',{templateUrl:'/static/partials/login.html'})
//          .otherwise({redirectTo:'/',
//                      templateUrl: '/static/partials/home.html',
//                      controller: 'homeController'})
//      }])
//
// }());
