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
        srch.msg = "";
        srch.searching = false;
        srch.books = [];
        srch.searchBook = searchBook;
        srch.addBook = addBook;

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
                        //console.log("srch.books => ", srch.books);
                    },
                    function(err) {
                        srch.searching = false;
                        console.log(err);
                        srch.errMsg = `${err.statusText} ${err.status}`;
                    }
                );
            }
        }

        function addBook(book) {
            srch.errMsg = "";
            srch.msg = "";
            restService.addItem(
                {
                    googleId: book.id,
                    title: book.title,
                    link: book.link,
                    thumbnail: book.thumbnail,
                    author: book.authors[0],
                    publisher: book.publisher,
                    date: book.publishedDate,
                    pages: book.pageCount
                },
                function(resp) {
                    //console.log(`book saved with id: ${resp._id}`);
                    //$state.go('my');
                    srch.msg = resp.title;
                },
                function(err) {
                    console.log(err);
                    if (err.data.code == 11000) {
                        srch.errMsg = "You already have this book in your collection";
                    }
                    else{
                        srch.errMsg = `${err.statusText} ${err.status}`;
                    }
                }
            );

        }

    }



})();
