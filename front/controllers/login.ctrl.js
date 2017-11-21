(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ["$state", "AuthService"];

    function LoginController($state, AuthService) {
        var lgn = this;

        lgn.user = {
            name: '',
            password: ''
        };
        lgn.login = login;
        lgn.signup = signup;

        function login() {
            console.log("lgn.user => ", lgn.user);
            AuthService.login(lgn.user).then(
                function(msg) {
                    $state.go('search');
                },
                function(errMsg) {
                    console.log(errMsg);
                    alert(errMsg);
                });
        }
        
        function signup() {
            AuthService.register(lgn.user).then(
                function(msg) {
                    lgn.user = {};
                    console.log(msg);
                    alert(msg);
                },
                function(errMsg) {
                    console.log(errMsg);
                    alert(errMsg);
                });
        }

    }

})();
