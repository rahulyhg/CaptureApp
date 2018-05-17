angular.module('captureApp').controller('header_controller', ['$scope', '$routeParams', '$timeout', '$http', '$cookieStore', '$rootScope','momentService',
    function ($scope, $routeParams, $timeout, $http, $cookieStore, $rootScope,momentService) {
        $rootScope.$on("$routeChangeStart", function (event, next) {
            if (next.security) {
                if (!isAuthenticated($cookieStore)) {
                    window.location = '#/landing/';
                }
            }
        });
        
        $rootScope.$on("userLoginChanged", function (event, args) {
            if(args.LoggedIn){
                momentService.sync(args.data.USER_ID);   
            }
            else{
                momentService.clearData();   
            }
        });
        if(isAuthenticated($cookieStore)){
             momentService.sync(getLogin($cookieStore).USER_ID);
        }
        
        $rootScope.$broadcast('userLoginChanged', {
            LoggedIn: isAuthenticated($cookieStore),
            data: getLogin($cookieStore)
        });
        
    }]);