(function () {
    angular.module('PigeonPieApp')
        .factory('userService', function userService($window, $resource) {
            return { user: $resource('/api/user').get()
                     //  profile: $window.flaskSession.user.profile
                    }
        });

})();
