angular.module('captureApp').controller('sidebar_controller', ['$scope', '$routeParams', '$timeout', '$http', '$cookieStore', '$rootScope', 'momentService',
    function ($scope, $routeParams, $timeout, $http, $cookieStore, $rootScope, momentService) {

        $scope.username = "User@user";
        $scope.numberOfMoments = "25";

        $scope.sidebarVisible = isAuthenticated($cookieStore) ? "open" : "hidden";
        $scope.toggleSidebar = function () {
            if ($scope.sidebarVisible == "closed" && isAuthenticated($cookieStore)) {
                $scope.sidebarVisible = "open";
            } else {
                if (!isAuthenticated($cookieStore)) {
                    $scope.sidebarVisible = "hidden";
                } else {
                    $scope.sidebarVisible = "closed";
                }
            }
        };

        $scope.$on("userLoginChanged", function (event, args) {
            if (args.LoggedIn) {
                $scope.sidebarVisible = "open";
                $scope.username = args.data.USERNAME;
            } else {
                $scope.sidebarVisible = "hidden";
            }
        });

        $scope.logout = function () {
            logout($cookieStore);
            $rootScope.$broadcast('userLoginChanged', {
                LoggedIn: false,
                data: null
            });
            window.location = "#/login";
        };

        $scope.newMomentButtonTitle = "New Moment";
        var getLocation = function () {
            $scope.$apply(function(){
                $scope.newMomentButtonTitle = "Creating...";
            });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }

        var guid =function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        var showPosition = function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            $scope.newMomentButtonTitle = "New Moment";
            var newMoment = {
                Title: "New Moment",
                Comment: "No Comment",
                Location: {
                    Lat: lat,
                    Lng: lng
                },
                Time: new Date(),
                UserID: getLogin($cookieStore).USER_ID,
                GUID: guid()
            };
            momentService.postMoment(newMoment);
            window.location = "#/moment/"+newMoment.GUID;
        }

        $scope.newMomentClick = function () {
            getLocation();
        };


    }]);