angular.module('captureApp').controller('home_controller', ['$scope', '$routeParams', '$timeout', '$http', '$cookieStore', '$rootScope', 'momentService',
    function ($scope, $routeParams, $timeout, $http, $cookieStore, $rootScope, momentService) {
        $scope.index = 0;
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 5,
            markersEvents: {
                click: function (marker, eventName, model, arguments) {
                    $scope.map.window.model = model;
                    $scope.map.window.show = true;
                    $scope.windowTitle = model.title;
                    $scope.map.center = {
                        latitude: model.latitude,
                        longitude: model.longitude
                    }
                    $scope.title = model.title;
                    $scope.comment = model.comment;
                    $scope.date = model.date;
                    $scope.momentGUID = model.GUID;
                    $scope.image = model.image;
                }
            },
            window: {
                marker: {},
                show: false,
                closeClick: function () {
                    this.show = false;
                    $scope.momentGUID = null;
                },
                options: {} // define when map is ready
            }
        };
        
        $scope.showMomentClicked = function(){
            if($scope.momentGUID != null){
                window.location = "#/moment/"+$scope.momentGUID;
                map.window.closeClick();
            }
        }

        $rootScope.$on("momentsSynced", function (event, args) {
            $scope.Moments = args.Moments;
            if ($scope.Moments.length != args.Moments.length) {
                loadMarker(-1);
            }
        });

        var createRandomMarker = function (moment, idKey) {
            if (idKey == null) {
                idKey = "id";
            }

            var lat = parseFloat(moment.LOCATION.LAT.replace(",", "."));
            var lng = parseFloat(moment.LOCATION.LNG.replace(",", "."));

            var imageUrl = "";
            if(moment.Media.length > 0){
                imageUrl = "http://alexwerff.de/captureApp/" + moment.Media[0].PATH;
            }
            var ret = {
                latitude: lat,
                longitude: lng,
                title: moment.TITLE,
                comment:moment.COMMENT,
                date:moment.TIME,
                GUID:moment.GUID,
                image:imageUrl,
                icon: '././img/flag.png',
            };
            ret[idKey] = $scope.index;
            $scope.index = $scope.index + 1;
            return ret;
        };
        $scope.randomMarkers = [];

        $scope.Moments = momentService.getMoments();
        var loadMarker = function (limit) {
            var markers = [];
            var max = limit;
            if (max < 0) {
                max = $scope.Moments.length;
            }
            for (var i = 0; i < max; i++) {
                var st = $scope.Moments[i];
                if (st != null) {
                    var marker = createRandomMarker(st);
                    markers.push(marker);
                }
            }
            $scope.randomMarkers = markers;
        }
        loadMarker(-1);

    }]);