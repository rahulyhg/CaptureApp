angular.module('captureApp').controller('landing_controller', ['$scope', '$routeParams', '$timeout', '$http', '$cookieStore', '$rootScope',
    function ($scope, $routeParams, $timeout, $http, $cookieStore, $rootScope) {

        if (isAuthenticated($cookieStore)) {
            window.location = '#/home/';
        }
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 3
        };


        var triggerPolling = function () {
            $scope.map.center.longitude += 0.01;
        }

        var poll = function () {
            $timeout(function () {
                triggerPolling();
                poll();
            }, 1); //0.1 Seconds
        };
        poll();



        $scope.registerForm = false;
        $scope.loginTitle = "Login";
        $scope.registerTitle = "Register";

        $scope.registerClicked = function () {
            $scope.registerForm = !$scope.registerForm;
            $scope.loginTitle = $scope.registerForm ? "Register" : "Login";
            $scope.registerTitle = $scope.registerForm ? "Login" : "Register";
        }

        $scope.username = "";
        $scope.password = "";
        $scope.confirmPassword = "";

        var loginUser = function () {
            $url = "api/index.php/login/" + $scope.username + "/" + $scope.password;
            $http.get($url).
            success(function (data, status, headers, config) {
                if (data != "") {
                    login($cookieStore, data);
                    $scope.errorMessage = "";
                    window.location = '#/home';
                    $rootScope.$broadcast('userLoginChanged', {
                        LoggedIn: true,
                        data: data
                    });
                }
                else{
                    $scope.errorMessage ="Username or Password invalid.";
                }
            }).
            error(function (data, status, headers, config) {
                if (status == 404) {
                    $scope.errorMessage ="Username or Password invalid.";
                } else {
                    $scope.errorMessage = "Error: " + status;
                }
            });
        };

        var register = function () {
            if ($scope.password != $scope.confirmPassword) {
                $scope.errorMessage = "Passwords dont match.";
                return;
            }

            $url = "api/index.php/registerUser/" + $scope.username + "/" + $scope.password;
            $http.post($url).
            success(function (data, status, headers, config) {
                if (data != "") {
                    var user = {
                        USERNAME: $scope.username,
                        USER_ID: data
                    }
                    login($cookieStore, user);
                    $scope.errorMessage = "";
                    window.location = '#/home';
                    $rootScope.$broadcast('userLoginChanged', {
                        LoggedIn: true,
                        data: user
                    });
                }
            }).
            error(function (data, status, headers, config) {
                $scope.errorMessage = "Error: " + status;
            });

        };

        $scope.loginButtonClicked = function () {
            if ($scope.registerForm) {
                register();
            } else {
                loginUser();
            }
        };

    }]);