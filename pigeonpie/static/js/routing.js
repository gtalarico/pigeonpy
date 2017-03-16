(function () {

  'use strict';

  angular.module('PigeonPieApp')
     .config(['$locationProvider','$routeProvider',
              function($locationProvider,$routeProvider){
         $locationProvider.hashPrefix('!');
         $routeProvider
         .when('/buckets',{templateUrl:'/static/partials/buckets.html',
                           controller: 'bucketsController'})
         .when('/upload',{templateUrl:'/static/partials/upload.html'})
         .when('/hubs',{templateUrl:'/static/partials/hubs.html',
                        controller: 'hubController'})
         .when('/login',{templateUrl:'/static/partials/login.html'})
         .otherwise({redirectTo:'/',
                     templateUrl: '/static/partials/home.html',
                     controller: 'homeController'})
     }])

}());
