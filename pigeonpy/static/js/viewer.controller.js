// (function() {

    'use strict';

    angular.module('PigeonPyApp')
        .controller('viewerController', function($scope, $log, $http, $timeout, $window, $stateParams, forgeService, userService) {

                    var urn = $stateParams.urn;
                    var clientId = forgeService.getClientId
                    var accessToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJ1c2VyaWQiOiJFOEgySzkzNlRRV04iLCJleHAiOjE0OTA2NzAxMjcsInNjb3BlIjpbImRhdGE6cmVhZCJdLCJjbGllbnRfaWQiOiJza2lYVmNsSlQxdFhKZjVYdFl1SDZhS0V4emFUQWd4cSIsImdyYW50X2lkIjoiU0lpUDNlUnBmd0RMMUQyUzFWanRvbjR5WlMzeG5jdTkiLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvand0ZXhwMTQ0MCIsImp0aSI6InpoU3VqaVU1RndCb29jdDVwOTZLYkVpcGVJQUM3cDhMYXJUb1VQMmt3U3VkRHR1azlLZTRnM04xbG80Qm5mb0cifQ.4VGJ7FntmYMhcyU8EaAA8t70mCU_h_wir_wwp6W8eWA"
                    console.log('here')

                    var viewer;
                    var options = {
                        env: 'AutodeskProduction',
                        accessToken: accessToken,
                        // accessToken: '<YOUR_APPLICATION_TOKEN>',
                        // TODO: Add call back for refresh token
                        // getAccessToken: function(onGetAccessToken) {
                        //                     var accessToken = '<YOUR_APPLICATION_TOKEN>';
                        //                     var expireTimeSeconds = 86400;
                        //                     onGetAccessToken(accessToken, expireTimeSeconds);
                        //                 }
                    };
                    var documentId = 'urn:'+ urn;
                    Autodesk.Viewing.Initializer(options, function onInitialized(){
                        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
                    });

                    /**
                    * Autodesk.Viewing.Document.load() success callback.
                    * Proceeds with model initialization.
                    */
                    function onDocumentLoadSuccess(doc) {

                        // A document contains references to 3D and 2D viewables.
                        var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
                        if (viewables.length === 0) {
                            console.error('Document contains no viewables.');
                            return;
                        }

                        // Choose any of the avialble viewables
                        var initialViewable = viewables[0];
                        var svfUrl = doc.getViewablePath(initialViewable);
                        var modelOptions = {
                            sharedPropertyDbPath: doc.getPropertyDbPath()
                        };

                        var viewerDiv = document.getElementById('MyViewerDiv');
                        viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
                        viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
                    }

                    /**
                     * Autodesk.Viewing.Document.load() failuire callback.
                     */
                    function onDocumentLoadFailure(viewerErrorCode) {
                        console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
                    }

                    /**
                     * viewer.loadModel() success callback.
                     * Invoked after the model's SVF has been initially loaded.
                     * It may trigger before any geometry has been downloaded and displayed on-screen.
                     */
                    function onLoadModelSuccess(model) {
                        console.log('onLoadModelSuccess()!');
                        console.log('Validate model loaded: ' + (viewer.model === model));
                        console.log(model);
                    }

                    /**
                     * viewer.loadModel() failure callback.
                     * Invoked when there's an error fetching the SVF file.
                     */
                    function onLoadModelError(viewerErrorCode) {
                        console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
                    }





            }

        );

// }());
