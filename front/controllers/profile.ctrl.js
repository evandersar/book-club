(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ["AuthService", "restService"];

    function ProfileController(AuthService, restService) {
        var prfl = this;

        prfl.errMsg = '';
        prfl.msg = '';
        prfl.user = {};
        prfl.getUserInfo = getUserInfo;
        prfl.updateUser = updateUser;
        prfl.changeStatus = changeStatus;
        prfl.cancel = cancel;

        getUserInfo();

        function getUserInfo() {
            prfl.errMsg = '';
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

        function updateUser() {
            prfl.errMsg = '';
            prfl.msg = '';
            console.log("prfl.user => ", prfl.user);
            AuthService.updateUser({
                city: prfl.user.city,
                state: prfl.user.state
            }).then(
                function(msg) {
                    console.log("msg => ", msg);
                    prfl.msg = msg;
                },
                function(errMsg) {
                    console.log("errMsg => ", errMsg);
                    prfl.errMsg = errMsg;
                });
        }

        function changeStatus(tradeIn, status) {
            console.log("tradeIn , status =>> ", tradeIn, status);
            restService.changeStatus(
                {
                    tradeId: tradeIn._id,
                    bookId: tradeIn.bookId,
                    status: status,
                    clientName: tradeIn.clientName
                },
                function(resp) {
                    console.log("resp => ", resp);
                    prfl.user = resp;
                },
                function(err) {
                    console.log("err => ", err);
                }
            );
        }


        function cancel(bookId) {
            console.log("bookId => ", bookId);
        }

    }

})();
