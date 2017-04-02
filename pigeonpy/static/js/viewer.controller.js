// (function() {

    'use strict';

    angular.module('PigeonPyApp')
        .controller('viewerController', function($scope, $log, $http, $timeout, $window, $stateParams, forgeService, userService) {

                var urn = $stateParams.urn;
                var clientId = userService.getClientId()
                var getToken = userService.getAccessToken().get()
                getToken.$promise.then(function(response){
                    console.log('Got token')
                    initializeViewer(response.token)

                })



                var viewer;
                function initializeViewer(token){

                    var options = {
                        env: 'AutodeskProduction',
                        accessToken: token,
                        // getAccessToken: function(onGetAccessToken) {
                                            // var accessToken = '<YOUR_APPLICATION_TOKEN>';
                                            // var expireTimeSeconds = 86400;
                                            // onGetAccessToken(accessToken, expireTimeSeconds);
                                        // }
                    };
                    var documentId = 'urn:'+ urn;
                    Autodesk.Viewing.Initializer(options, function onInitialized(){
                        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
                    });

                }

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
