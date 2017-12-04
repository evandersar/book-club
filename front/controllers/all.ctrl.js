(function() {
    'use strict';

    angular
        .module('app')
        .controller('AllController', AllController);

    AllController.$inject = ["restService", "AuthService", "$scope"];

    function AllController(restService, AuthService, $scope) {
        var all = this;

        all.books = [];
        all.msg = '';
        all.errMsg = '';
        all.authenticated = AuthService.isAuthenticated();
        all.user = all.authenticated ? AuthService.getPayload() : {};
        all.getBooks = getBooks;
        all.reqBook = reqBook;

        $scope.$on('logining', function(event, data) {
            console.log(data);
            all.authenticated = AuthService.isAuthenticated();
        });

        getBooks();

        function getBooks() {
            all.errMsg = '';
            all.msg = '';
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

        function reqBook(book) {
            all.errMsg = '';
            all.msg = '';
            restService.requestBook(
                all.user._id, 
                {
                    status: 'Pending',
                    bookId: book._id,
                    author: book.author,
                    title: book.title,
                    ownerName: book.ownerName
                },
                function(resp) {
                    //console.log(resp);
                    if (resp.tradeOut) {
                        all.msg = book.title;
                    }
                    else {
                        all.errMsg = `You have already requested - ${resp.title}`;
                    }

                },
                function(err) {
                    console.log(err);
                    all.errMsg = `${err.statusText} ${err.status}`;
                }
            );
        }

    }

})();
