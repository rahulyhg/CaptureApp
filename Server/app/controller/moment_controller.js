angular.module('captureApp').controller('moment_controller', ['$scope', '$routeParams', '$timeout', '$http', '$cookieStore', '$rootScope', 'momentService', 'Lightbox', 'FileUploader',
    function ($scope, $routeParams, $timeout, $http, $cookieStore, $rootScope, momentService, Lightbox, FileUploader) {

        var guid = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        $scope.moment = null;
        $scope.images = [];
        $scope.videos = [];

        $scope.imageUploader = new FileUploader({
            headers: {
                'Softrocket-Api-Key': getLogin($cookieStore).USER_ID
            }
        });
        $scope.imageUploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/ , options) {
                return this.queue.length < 10;
            }
        });

        $scope.videoUploader = new FileUploader({
            headers: {
                'Softrocket-Api-Key': getLogin($cookieStore).USER_ID
            }
        });
        $scope.videoUploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/ , options) {
                return this.queue.length < 10;
            }
        });

        var loadMoment = function () {
            momentService.getMoments().forEach(function (obj, index) {
                if (obj.GUID == $routeParams.momentID) {
                    $scope.moment = obj;
                }
            });
            if ($scope.moment == null)
                return;
            $scope.title = $scope.moment.TITLE;;
            $scope.comment = $scope.moment.COMMENT;

            for (var i = $scope.images.length-1; i >= 0; i--) {
                var exists = false;
                $scope.moment.Media.forEach(function(o, index) {
                    if ($scope.images[i].GUID == o.GUID)
                        exists = true;
                });
                if (!exists)
                    $scope.images.splice(i, 1);
            }

            for (var i = $scope.videos.length-1; i >= 0; i--) {
                var exists = false;
                $scope.moment.Media.forEach(function(o, index) {
                    if ($scope.videos[i].GUID == o.GUID)
                        exists = true;
                });
                if (!exists)
                    $scope.videos.splice(i, 1);
            }

            $scope.moment.Media.forEach(function (obj, index) {
                var imgExists = false;
                $scope.images.forEach(function (o, i) {
                    if (obj.GUID == o.GUID)
                        imgExists = true;
                });

                var vidExists = false;
                $scope.videos.forEach(function (o, i) {
                    if (obj.GUID == o.GUID)
                        vidExists = true;
                });
                var media = {
                    url: "http://alexwerff.de/captureApp/" + obj.PATH,
                    GUID: obj.GUID,
                }
                if (obj.TYPE == "Image" && !imgExists) {
                    $scope.images.push(media);
                }
                if (obj.TYPE == "Video" && !vidExists) {
                    $scope.videos.push(media);
                }
            });
            $scope.marker = {
                coords: {
                    latitude: $scope.moment.LOCATION.LAT,
                    longitude: $scope.moment.LOCATION.LNG
                },
                icon: '././img/flag.png',
                options: {},
                id: 0,
                events: {}
            };

            $scope.map = {
                center: {
                    latitude: $scope.marker.coords.latitude,
                    longitude: $scope.marker.coords.longitude
                },
                zoom: 15
            };



        };

        loadMoment();




        $rootScope.$on("momentsSynced", function (event, args) {
            loadMoment();
        });

        $scope.imageClicked = function (image) {
            var index = $scope.images.indexOf(image);
            Lightbox.openModal($scope.images, index);
        }

        $scope.saveClicked = function () {

        }

        $scope.deleteClicked = function () {
            momentService.deleteMoment($scope.moment);
            window.location = "#/moments";
        }

        $scope.deleteMediaClicked = function (media) {
            momentService.deleteMedia(media);

        };


        $scope.videoUploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
            $scope.imageUploader.url = "api/index.php/postMomentContent/" + guid() + "/" + $scope.moment.GUID + "/" + getLogin($cookieStore).USER_ID + "/Video";
            fileItem.url = "api/index.php/postMomentContent/" + guid() + "/" + $scope.moment.GUID + "/" + getLogin($cookieStore).USER_ID + "/Video";
            fileItem.upload();
        };

        $scope.videoUploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.imageUploader.progress = 0;
            console.info('onCompleteItem', fileItem, response, status, headers);
            loadMoment();
        };

        $scope.imageUploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
            $scope.imageUploader.url = "api/index.php/postMomentContent/" + guid() + "/" + $scope.moment.GUID + "/" + getLogin($cookieStore).USER_ID + "/Image";
            fileItem.url = "api/index.php/postMomentContent/" + guid() + "/" + $scope.moment.GUID + "/" + getLogin($cookieStore).USER_ID + "/Image";
            fileItem.upload();
        };

        $scope.imageUploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.imageUploader.progress = 0;
            console.info('onCompleteItem', fileItem, response, status, headers);
            loadMoment();
        };
}]);