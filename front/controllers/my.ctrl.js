(function() {
    'use strict';

    angular
        .module('app')
        .controller('MyController', MyController);

    MyController.$inject = ["restService", "AuthService", "$scope"];

    function MyController(restService, AuthService, $scope) {
        var my = this;

        my.books = [];
        my.errMsg = '';
        my.getMyBooks = getMyBooks;
        my.removeBook = removeBook;

        function getMyBooks() {
            my.errMsg = '';
            restService.getMyItems(
                function(resp) {
                    my.books = resp;
                    console.log("my.books => ", my.books);
                },
                function(err) {
                    console.log(err);
                    my.errMsg = `${err.statusText} ${err.status}`;
                }
            );
        }

        getMyBooks();

        function removeBook(book_id, index) {
            my.errMsg = '';
            restService.deleteItemById(
                book_id,
                function(resp) {
                    //console.log("resp => ", resp);
                    //console.log(`Pic with id: ${resp._id} successfully removed`);
                    my.books.splice(index, 1);
                },
                function(err) {
                    console.log(err);
                    my.errMsg = `${err.statusText} ${err.status}`;
                }
            );

        }

    }

})();
