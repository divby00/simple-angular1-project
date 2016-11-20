'use strict';

var appname = angular.module('appname', [
    'ui.router',
    'appname.home',
    'appname.about'
]);

appname.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'components/home/home.html',
            controller: 'homeController as home'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'components/about/about.html',
            controller: 'aboutController as about'
        });
}]);
