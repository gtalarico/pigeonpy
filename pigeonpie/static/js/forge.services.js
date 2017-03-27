// AS FACTORY

(function () {

angular.module('PigeonPieApp')

    .factory('forgeService',
    function forgeService($http, $log, $q, $window, $resource) {

        function hubList() {
            return $resource('/api/hubs', {},
                                 { get: { method: 'GET', cache:true } }
                             )
        }

        function projectList(hubId) {
            return $resource('/api/hubs/:hubId/projects',
                                {hubId: '@hubId'},
                                { get: { method: 'GET', cache:true } }
                            )
        }

        function itemList(projectId, folderId) {
            return $resource('/api/projects/:projectId/folders/:folderId/items',
                                {projectId: '@projectId', folderId: '@folderId'},
                                { get: { method: 'GET', cache:true } }
                            )
        }

        function getClientId() {
            return $window.flaskSession.clientId
        }


        return {
            hubList: hubList(),
            projectList: projectList(),
            itemList: itemList(),
            clientId: getClientId(),
        }





        // }

        // return $resource('http://jsonplaceholder.typicode.com/users/:user',{user: "@user"})

        // function getProjectList(hubId) {
        //     console.log('ForgeServices: Getting Projects')
        //
        //     $http.get('/api/hubs/' + hubId + '/projects')
        //           .then(function successCallback(response) {
        //               if (response.status == 200){
        //                   $log.log(response);
        //                   projectList[hubId] = response.data.data
        //                   deferredProjectList.resolve(projectList)
        //               }
        //           }, function errorCallback(response) {
        //               if (response.status == 401){
        //                   $log.log(response);
        //                   deferredProjectList.reject()
        //               }
        //           });
        //     return deferredProjectList.promise;
        // }
        //
        // function getProjectItems(hubId, projectId, rootFolderId) {
        //     console.log('ForgeServices: Getting Project Items')
        //     $http.get('/api/hubs/' + hubId + '/projects/' + projectId + '/folders/' + rootFolderId)
        //           .then(function successCallback(response) {
        //               if (response.status == 200){
        //                   $log.log(response);
        //                   projectItems[projectId] = response.data.data
        //                   deferredProjectItems.resolve(projectItems)
        //               }
        //           }, function errorCallback(response) {
        //               if (response.status == 401){
        //                   $log.log(response);
        //                   deferredProjectItems.reject()
        //               }
        //           });
        //     return deferredProjectItems.promise;
        // }

    //   return {
        // hubList: $resource('/api/hubs')
        // hubList: hubList,
        // getProjectList: getProjectList,
        // projectList: projectList,
        // getProjectItems: getProjectItems,
        // projectItems: projectItems,
        // isAdmin: isAdmin
    //   }

  });


})();
// (function () {
//
//     function forgeService($http, $log, $q, $window) {
//
//         var hubList = {}
//         var projectList = {}
//         var projectItems = {}
//
//         var deferredHubList = $q.defer();
//         var deferredProjectList = $q.defer();
//         var deferredProjectItems = $q.defer();
//
//         function isAdmin() {
//             return window.flaskSession.user.is_admin
//         }
//
//         function getHubs() {
//             console.log('ForgeServices: Getting Hubs')
//
//             $http.get('/api/hubs')
//                   .then(function successCallback(response) {
//                       if (response.status == 200){
//                           $log.log(response);
//                           deferredHubList.resolve(response.data.data)
//                       }
//                   }, function errorCallback(response) {
//                       if (response.status == 401){
//                           $log.log(response);
//                           deferredHubList.reject()
//                       }
//                   });
//             return deferredHubList.promise;
//         }
//
//         function getProjectList(hubId) {
//             console.log('ForgeServices: Getting Projects')
//
//             $http.get('/api/hubs/' + hubId + '/projects')
//                   .then(function successCallback(response) {
//                       if (response.status == 200){
//                           $log.log(response);
//                           projectList[hubId] = response.data.data
//                           deferredProjectList.resolve(projectList)
//                       }
//                   }, function errorCallback(response) {
//                       if (response.status == 401){
//                           $log.log(response);
//                           deferredProjectList.reject()
//                       }
//                   });
//             return deferredProjectList.promise;
//         }
//
//         function getProjectItems(hubId, projectId, rootFolderId) {
//             console.log('ForgeServices: Getting Project Items')
//             $http.get('/api/hubs/' + hubId + '/projects/' + projectId + '/folders/' + rootFolderId)
//                   .then(function successCallback(response) {
//                       if (response.status == 200){
//                           $log.log(response);
//                           projectItems[projectId] = response.data.data
//                           deferredProjectItems.resolve(projectItems)
//                       }
//                   }, function errorCallback(response) {
//                       if (response.status == 401){
//                           $log.log(response);
//                           deferredProjectItems.reject()
//                       }
//                   });
//             return deferredProjectItems.promise;
//         }
//
//       return {
//         getHubs: getHubs,
//         hubList: hubList,
//         getProjectList: getProjectList,
//         projectList: projectList,
//         getProjectItems: getProjectItems,
//         projectItems: projectItems,
//         isAdmin: isAdmin
//       };
//
//     }
//     angular.module('PigeonPieApp').factory('forgeService', forgeService)
//
// })();


// (function () {
//
// angular.module('PigeonPieApp').service('forgeService',
//     function forgeService($http, $log, $q, $window) {
//
//         this.hubList = []
//         this.projectList = {}
//
//         var deferredHubList = $q.defer();
//         var deferredProjectList = $q.defer();
//
//         this.isAdmin = function() {
//             return window.flaskSession.user.is_admin
//         }
//
//         this.getHubs = function() {
//             $http.get('/api/hubs')
//                   .then(function successCallback(response) {
//                       if (response.status == 200){
//                           console.log('ForgeServices: Getting Hubs')
//                           $log.log(response);
//                           deferredHubList.resolve(response.data.data)
//                       }
//                   }, function errorCallback(response) {
//                       if (response.status == 401){
//                           $log.log(response);
//                           deferredHubList.reject()
//                       }
//                   });
//             return deferredHubList.promise;
//         }
//
//         this.getProjectList = function(hub_id) {
//             $http.get('/api/hubs/' + hub_id + '/projects')
//                   .then(function successCallback(response) {
//                       if (response.status == 200){
//                           console.log('ForgeServices: Getting Hubs')
//                           $log.log(response);
//                           projectList[hub_id] = response.data.data
//                           deferredProjectList.resolve(projectList)
//                       }
//                   }, function errorCallback(response) {
//                       if (response.status == 401){
//                           $log.log(response);
//                           deferredProjectList.reject()
//                       }
//                   });
//             return deferredProjectList.promise;
//         }
//     }
// );
//
// })();
