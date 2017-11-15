(function() {
    'use strict';

    angular
        .module('app')
        .controller('AllController', AllController);

    AllController.$inject = ["restService"];

    function AllController(restService) {
        var all = this;
        
        all.books = [];
        all.getBooks = getBooks;

        function getBooks() {
            restService.getItems(
                function(resp) {
                    all.books = resp;
                    console.log("all.books => ", all.books);
                },
                function(err) {
                    console.log(err);
                    alert(`${err.statusText} ${err.status}`);
                }
            );
        }
        
        getBooks();

    }

})();
