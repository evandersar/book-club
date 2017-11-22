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
        srch.searchBook = searchBook;

        function searchBook() {
            srch.searchForm.$setSubmitted();
            srch.books = [];
            if (!srch.title) {
                srch.errMsg = 'Please type book title';
                $(".search-err").show();
            }
            else {
                srch.errMsg = "";
                srch.searching = true;
                restService.searchItem(
                    srch.title,
                    function(resp) {
                        if (!resp[0]) srch.errMsg = 'No data for this book or wrong book title';
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
        }
    }



})();
