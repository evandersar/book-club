(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ["AuthService", "AUTH_EVENTS", "$state","$scope"];

    function ProfileController(AuthService, AUTH_EVENTS, $state, $scope) {
        var main = this;

        

    }

})();