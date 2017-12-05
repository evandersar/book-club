(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ["AuthService", "AUTH_EVENTS", "$state","$scope"];

    function ProfileController(AuthService, AUTH_EVENTS, $state, $scope) {
        var prfl = this;
        
        prfl.errMsg = '';
        prfl.user = {};
        prfl.getUserInfo = getUserInfo;
        prfl.updateUser = updateUser;
        
        getUserInfo();
        
        function getUserInfo(){
            AuthService.userInfo().then(
                    function(user) {
                        console.log("user => ", user);
                        prfl.user = user;
                    },
                    function(errMsg) {
                        console.log(errMsg);
                        prfl.errMsg = errMsg;
                    });
        }
        
        function updateUser(){
            console.log("prfl.user => ", prfl.user);
        }

    }

})();