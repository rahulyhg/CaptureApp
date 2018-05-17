'use strict';

/* App Module */

var captureApp = angular.module('captureApp', [
    'ngRoute',
    'ngCookies',
    'ngResource',
    'uiGmapgoogle-maps',
    'bootstrapLightbox',
    'pageslide-directive',
    'angularFileUpload', 
    
    //'captureAppController',
  /*'ngSanitize',
  'uiGmapgoogle-maps',
  'ui.bootstrap',
  'chart.js',
  'angularFileUpload',
    'pageslide-directive'*/
]);

captureApp.config(['$routeProvider', '$httpProvider',
     function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
        when('/landing', {
            templateUrl: './templates/landing.html',
            controller: 'landing_controller',
            security: false
        }).
        when('/home', {
            templateUrl: './templates/home.html',
            controller: 'home_controller',
            security: true
        }).
        when('/about', {
            templateUrl: './templates/about.html',
            controller: 'about_controller',
            security: true
        }).
        when('/help', {
            templateUrl: './templates/help.html',
            controller: 'help_controller',
            security: true
        }).
        when('/moments', {
            templateUrl: './templates/moments.html',
            controller: 'moments_controller',
            security: true
        }).
        when('/moment/:momentID', {
            templateUrl: './templates/moment.html',
            controller: 'moment_controller',
            security: true
        }).
        when('/account', {
            templateUrl: './templates/account_settings.html',
            controller: 'account_controller',
            security: true
        }).
        otherwise({
            redirectTo: '/home'
        });

     }
]);