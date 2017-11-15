(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ["restService"];

    function SearchController(restService) {
        var srch = this;
        
        srch.title = "";
        srch.errMsg = "";
        srch.searching = false;
        srch.books = [];
        srch.getBooks = getBooks;

        function getBooks() {
            srch.searching = true;
            restService.getItems(
                function(resp) {
                    srch.searching = false;
                    srch.books = resp;
                    console.log("srch.books => ", srch.books);
                },
                function(err) {
                    srch.searching = false;
                    console.log(err);
                    srch.errMsg = `${err.statusText} ${err.status}`;
                }
            );
        }
        
        getBooks();

    }

})();
