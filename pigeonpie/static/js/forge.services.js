(function () {

    function forgeService($http, $log, $q) {

        var deferredHubList = $q.defer();

        function getHubs() {
            $http.get('/api/hubs')
                  .then(function successCallback(response) {
                      if (response.status == 200){
                          console.log('ForgeServices: Getting Hubs')
                          $log.log(response);
                          deferredHubList.resolve(response.data.data)
                          hubList = response.data.data
                      }
                  }, function errorCallback(response) {
                      if (response.status == 401){
                          $log.log(response);
                          deferredHubList.reject()
                      }
                  });

            return deferredHubList.promise;
        }

      return {
        getHubs: getHubs,
        hubList: [],
      };

    }
    angular.module('PigeonPieApp').service('forgeService', forgeService)

})();
// https://toddmotto.com/resolve-promises-in-angular-routes/

// inject InboxService and bind the
// response to `this.messages`
// function InboxCtrl(InboxService) {
//   this.messages = [];
//   InboxService.getMessages().then(function (response) {
//     this.messages = response;
//   }.bind(this));
// }
//
// angular
//   .module('PigeonPieApp')
//   .controller('InboxCtrl', InboxCtrl)
//   .factory('InboxService', InboxService);
