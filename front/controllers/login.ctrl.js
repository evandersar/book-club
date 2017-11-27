(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ["$state", "$rootScope", "AuthService"];

    function LoginController($state, $rootScope, AuthService) {
        var lgn = this;

        lgn.errMsg = '';
        lgn.user = {
            name: '',
            password: ''
        };

        lgn.login = login;
        lgn.signup = signup;

        function login() {
            lgn.loginForm.$setSubmitted();
            if (formIsValid()) {
                AuthService.login(lgn.user).then(
                    function(msg) {
                        $state.go('search');
                        $rootScope.$broadcast('logining', 'User logining');
                    },
                    function(errMsg) {
                        console.log(errMsg);
                        lgn.errMsg = errMsg;
                    });
            }
        }

        function signup() {
            lgn.loginForm.$setSubmitted();
            if (formIsValid()) {
                AuthService.register(lgn.user).then(
                    function(msg) {
                        lgn.user = {};
                        lgn.loginForm.$setPristine();
                        lgn.loginForm.$setUntouched();
                        console.log(msg);
                        lgn.errMsg = msg;
                    },
                    function(errMsg) {
                        console.log(errMsg);
                        lgn.errMsg = errMsg;
                    });
            }
        }

        function formIsValid() {
            lgn.errMsg = '';
            
            if (!lgn.loginForm.$valid) {
                lgn.errMsg = 'All fields are required';
                $(".search-err").show();
            }

            return lgn.loginForm.$valid;
        }

    }

})();
