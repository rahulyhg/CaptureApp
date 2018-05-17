angular.module('captureApp').controller('moments_controller', ['$scope', '$routeParams', '$timeout', '$http', '$cookieStore', '$rootScope', 'momentService',
    function ($scope, $routeParams, $timeout, $http, $cookieStore, $rootScope, momentService) {
        $scope.moments = [];
        $rootScope.$on("momentsSynced", function (event, args) {
            loadMoments(args.Moments);
        });
        

        var loadMoments = function (rawMoments) {
            $scope.moments = [];
            rawMoments.forEach(function (obj, index) {
                var image ="";
                if(obj.Media.length > 0){
                    image = obj.Media[0].PATH;
                }
                var moment = {
                    Title: obj.TITLE,
                    Comment: obj.COMMENT,
                    Image: image,
                    Date: obj.TIME,
                    GUID:obj.GUID
                };
                $scope.moments.push(moment);
            });
        };
        loadMoments(momentService.getMoments());

        $scope.selectMoment = function(moment){
            window.location = "#/moment/"+moment.GUID;
        };
    }]);