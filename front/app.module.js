(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngResource'])
        .config(routerConfig);

    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        var states = [
            {
                name: 'all',
                url: '/all',
                templateUrl: 'front/views/all.html',
                controller: 'AllController',
                controllerAs: 'all'
            },
            
            {
                name: 'search',
                url: '/search',
                templateUrl: 'front/views/search.html',
                controller: 'SearchController',
                controllerAs: 'srch'
            },

        ];

        states.forEach(function(state) {
            $stateProvider.state(state);
        });

        $urlRouterProvider.otherwise('/all');

    }

})();
