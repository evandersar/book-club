(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ["AuthService", "AUTH_EVENTS", "$state","$scope"];

    function MainController(AuthService, AUTH_EVENTS, $state, $scope) {
        var main = this;
        
        main.authenticated = AuthService.isAuthenticated();
        main.logout = logout;

        function logout() {
            AuthService.logout();
            $scope.$broadcast('logining', 'User logining');
            $state.go('all');
            main.authenticated = AuthService.isAuthenticated();
        }

        $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
            AuthService.logout();
            $state.go('login');
        });
        
        $scope.$on('logining', function(event, data) {
            console.log(data);
            main.authenticated = AuthService.isAuthenticated();
        });

    }

})();
