(function() {
    'use strict';

    angular
        .module('app')
        .controller('MyController', MyController);

    MyController.$inject = ["restService", "AuthService", " $scope"];

    function MyController(restService, AuthService,  $scope) {
        var all = this;
        
        all.books = [];
        all.errMsg = '';
        all.authenticated = AuthService.isAuthenticated();
        all.user = all.authenticated ? AuthService.getPayload() : {};
        all.getBooks = getBooks;

        function getBooks() {
            all.errMsg = '';
            restService.getItems(
                function(resp) {
                    all.books = resp;
                    console.log("all.books => ", all.books);
                },
                function(err) {
                    console.log(err);
                    all.errMsg = `${err.statusText} ${err.status}`;
                }
            );
        }
        
        getBooks();
        
        $scope.$on('logining', function(event, data) {
            console.log(data);
            all.authenticated = AuthService.isAuthenticated();
        });

    }

})();
