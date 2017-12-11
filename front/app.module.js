(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngResource'])
        .config(routerConfig)
        .run(function($rootScope, $state, AuthService, AUTH_EVENTS) {
            $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
                if (!AuthService.isAuthenticated()) {
                    //console.log(next.name);
                    if (next.name !== 'login' && next.name !== 'all') {
                        event.preventDefault();
                        $state.go('login');
                    }
                }
            });
        })
        .directive('onErrorSrc', function() {
            return {
                link: function(scope, element, attrs) {
                    element.bind('error', function() {
                        if (attrs.src != attrs.onErrorSrc) {
                            attrs.$set('src', attrs.onErrorSrc);
                        }
                    });
                }
            };
        })
        .constant('AUTH_EVENTS', {
            notAuthenticated: 'auth-not-authenticated'
        })
        .constant('API_ENDPOINT', {
            url: 'https://book-club-evandersar.c9users.io/api'
        });

    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        var states = [{
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

            {
                name: 'login',
                url: '/login',
                templateUrl: 'front/views/login.html',
                controller: 'LoginController',
                controllerAs: 'lgn'
            },
            
            {
                name: 'my',
                url: '/my',
                templateUrl: 'front/views/my.html',
                controller: 'MyController',
                controllerAs: 'my'
            },
            
            {
                name: 'profile',
                url: '/profile',
                templateUrl: 'front/views/profile.html',
                controller: 'ProfileController',
                controllerAs: 'prfl'
            },

        ];

        states.forEach(function(state) {
            $stateProvider.state(state);
        });

        $urlRouterProvider.otherwise('/all');

    }

})();
