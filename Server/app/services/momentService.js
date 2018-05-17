angular.module('captureApp').service('momentService', function ($http, $timeout, $rootScope) {
    var moments = [];
    var currentUserID = "";


    var clearData = function () {
        moments = [];
        currentUserID = "";
    }

    var postMoment = function (moment) {
        $url = "api/index.php/postMoment";
        $http.post($url, moment).success(function (data, status, headers, config) {
            sync();
        });
        moments.push(moment);
        $rootScope.$broadcast('momentsSynced', {
            Moments: moments
        });
    }

    var deleteMoment = function (moment) {
        $url = "api/index.php/deleteMoment/" + moment.GUID;
        $http.post($url, "").success(function (data, status, headers, config) {
            sync();
        });
        $rootScope.$broadcast('momentsSynced', {
            Moments: moments
        });

    }

    var deleteMedia = function (media) {
        $url = "api/index.php/deleteMomentContent/" + media.GUID;
        $http.post($url, "").success(function (data, status, headers, config) {
            sync();
        });
        $rootScope.$broadcast('momentsSynced', {
            Moments: moments
        });
    }


    var sync = function (userID) {
        if (userID == null) {
            userID = currentUserID;
        }
        currentUserID = userID;
        $http.defaults.headers.common['Softrocket-Api-Key'] = userID;
        $url = "api/index.php/getMomentsForUser/" + userID;
        $http.get($url).
        success(function (data, status, headers, config) {
            moments = data;

            if (moments.length == 0) {
                $rootScope.$broadcast('momentsSynced', {
                    Moments: moments
                });
            } else {
                moments.forEach(function (obj, index) {
                    $url = "api/index.php/getMomentMedia/" + obj.GUID;
                    $http.get($url).
                    success(function (dat, stat, h, conf) {
                        obj.Media = dat;
                        if (obj.GUID == moments[moments.length - 1].GUID) {
                            $rootScope.$broadcast('momentsSynced', {
                                Moments: moments
                            });
                        }
                    });
                });
            }

        });
    }

    var getMoments = function () {
        return moments;
    }

    var triggerPolling = function () {
        if (currentUserID != "") {
            sync(currentUserID);
        }
    }

    var poll = function () {
        $timeout(function () {
            triggerPolling();
            poll();
        }, 10000);
    };
    poll();



    return {
        clearData: clearData,
        getMoments: getMoments,
        sync: sync,
        postMoment: postMoment,
        deleteMoment: deleteMoment,
        deleteMedia: deleteMedia,
    };

});