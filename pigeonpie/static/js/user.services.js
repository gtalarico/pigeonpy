(function () {
    angular.module('PigeonPieApp')
        .factory('userService', function userService($window, $state, $resource) {

            function getUser(){
                if (!isLoggedIn()) {
                    $state.go('login')
                }
                var user = $resource('/api/user').get()
                user.$promise.then(
                    function(response){
                        console.log('Getting user...')
                        return response
                    },
                    function(response){
                        console.log('Error Getting User Profile')
                        console.log(response)
                    }
                )
                return user
            }

            function isLoggedIn(){
                // Faster way of checking if loged in.
                return Boolean(window.flaskSession.user)
            }

            return { getUser: getUser,
                     isLoggedIn: isLoggedIn,
                     //  profile: $window.flaskSession.user.profile
                    }
        });

})();
