$( document ).ready(function() {
        $(".button-collapse").sideNav();
        // Initialize collapse button
});


(function () {
    var myApp = angular.module('PigeonPieApp', ['ui.router']);

    myApp.config(function($stateProvider) {
      var hubState = {
        name: 'hubList',
        url: '/hubs',
        component: 'hubList'
      }

      var bucketsState = {
        name: 'bucketList',
        url: '/buckets',
        component: 'bucketList'
      }

      $stateProvider.state(hubState);
      $stateProvider.state(bucketsState);
    });

}());

// $( document ).ready(function() {
//         $(".button-collapse").sideNav();
//         // Initialize collapse button
// });
//
// // https://github.com/mgonto/restangular
// // https://github.com/emmaguo/angular-poller
// // https://chieffancypants.github.io/angular-loading-bar/
//
// (function () {
//
//   'use strict';
//   var myApp = angular.module('PigeonPieApp',['ui.router']);
//
//   myApp.config(function($stateProvider) {
//
//           var bucketsState = {
//             name: 'buckets',
//             url: '/buckets',
//             components: 'buckets',
//             template:'<h1>Yes!</h1>',
//             // templateUrl:'/static/partials/buckets.html',
//             // resolve: {
//             //     people: function(PeopleService) {
//             //         return [];
//             //     }
//           }
//
//         //   .when('/buckets',{
//         //       templateUrl:'/static/partials/buckets.html',
//         //       controller: 'bucketsController'})
//           //
//         //   .when('/hubs',{
//         //       templateUrl:'/static/partials/hubs.html',
//         //       controller: 'hubListController'})
//           //
//         //   .when('/hubs/:hubId/projects',{
//         //       templateUrl:'/static/partials/hub.html',
//         //       controller: 'hubController'})
//           //
//         //   .when('/hubs/:hubId/projects/:projectId',{
//         //       templateUrl:'/static/partials/project.html',
//         //       controller: 'projectController'
//         //   })
//           //
//         //   .when('/login',{templateUrl:'/static/partials/login.html'})
//         //   .when('/upload',{templateUrl:'/static/partials/upload.html'})
//           //
//         //   .otherwise({redirectTo:'/',
//         //               templateUrl: '/static/partials/home.html',
//         //               controller: 'homeController'})
//   })
//
//   angular.module('PigeonPieApp').component('buckets', {
//     bindings: { buckets: '<' },
//
//     template: '<h3>Some people:</h3>'
//     // template: '<h3>Some people:</h3>' +
//     //           '<ul>' +
//     //           '  <li ng-repeat="person in $ctrl.people">' +
//     //           '    <a ui-sref="person({ personId: person.id })">' +
//     //           '      {{person.name}}' +
//     //           '    </a>' +
//     //           '  </li>' +
//     //           '</ul>'
//   })
//
//
// }());
