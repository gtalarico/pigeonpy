(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('mainController', function($scope, $timeout, $log, $http, $state, forgeService, userService) {

            if (!userService.isLoggedIn()) {
                $state.go('login')
            }

            $scope.user = userService.getUser()

            $scope.$on('$viewContentLoaded', function(event) {
              $timeout(function() {
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

                  $(".dropdown-button").dropdown();
              },100);
            });


            }
        );



}());
