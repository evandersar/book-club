(function() {
    'use strict';

    angular
        .module('app')
        .service("AuthService", AuthService)
        .factory("AuthInterceptor", AuthInterceptor)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });

    AuthService.$inject = ["$q", "$http", "API_ENDPOINT"];
    AuthInterceptor.$inject = ["$rootScope", "$q", "AUTH_EVENTS"];

    function AuthService($q, $http, API_ENDPOINT) {
        var LOCAL_TOKEN_KEY = 'userAuthToken';
        var isAuthenticated = false;
        var authToken;

        var register = function(user) {
            return $q(function(resolve, reject) {
                $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
                    if (result.data.success) {
                        resolve(result.data.msg);
                    }
                    else {
                        reject(result.data.msg);
                    }
                });
            });
        };

        var login = function(user) {
            return $q(function(resolve, reject) {
                $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
                    if (result.data.success) {
                        storeUserCredentials(result.data.token);
                        resolve(result.data.msg);
                    }
                    else {
                        reject(result.data.msg);
                    }
                });
            });
        };

        var logout = function() {
            destroyUserCredentials();
        };
        
        var getPayload = function() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY).split(' ')[1];
            
            return JSON.parse(atob(token.split('.')[1]));
        };

        loadUserCredentials();

        return {
            login: login,
            register: register,
            logout: logout,
            isAuthenticated: function() { return isAuthenticated; },
            getPayload: getPayload
        };

        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            if (token) {
                useCredentials(token);
            }
        }

        function storeUserCredentials(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            isAuthenticated = true;
            authToken = token;

            // Set the token as header for your requests!
            $http.defaults.headers.common.Authorization = authToken;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            isAuthenticated = false;
            $http.defaults.headers.common.Authorization = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        }

    }

    function AuthInterceptor($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function(response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                }[response.status], response);
                return $q.reject(response);
            }
        };
    }

})();
