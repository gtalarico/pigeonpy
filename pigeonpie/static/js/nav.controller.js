(function() {

    'use strict';

    angular.module('PigeonPieApp')
        .controller('navController', ['$scope', '$log', 'forgeService', 'userService',
            function($scope, log, forgeService, userService) {
                    // Check if Admin, Add to scope > Will load buckets
                    $scope.user = userService.user

            }]

        );



}());
