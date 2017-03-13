(function () {

  'use strict';

  angular.module('PigeonPieApp')
     .config(['$locationProvider','$routeProvider',
              function($locationProvider,$routeProvider){
         $locationProvider.hashPrefix('!');
         $routeProvider
         .when('/buckets',{templateUrl:'/static/partials/buckets.html',
                           controller: 'bucketsController'})
         .when('/upload',{templateUrl:'/static/partials/upload.html',
                           controller: 'bucketsController'})
         .otherwise({redirectTo:'/',
                     templateUrl: '/static/partials/home.html'});
     }])

}());
