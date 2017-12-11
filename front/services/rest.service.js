(function() {
    'use strict';

    angular
        .module('app')
        .factory("restService", restService);

    restService.$inject = ["$resource"];

    function restService($resource) {

        var Item = $resource(
            '/api/items/:id', {
                id: '@id'
            }, {
                "update": {
                    method: "PUT"
                },
                searchitem: { method: 'POST', isArray: true }
            }
        );

        var MyItem = $resource(
            '/api/myitems'
        );

        var User = $resource(
            'api/user/:id', {
                id: '@id'
            }, {
                "update": {
                    method: "PUT"
                }
            }
        );

        return {
            addItem: addItem,
            getItems: getItems,
            updateItem: updateItem,
            deleteItemById: deleteItemById,
            getMyItems: getMyItems,
            searchItem: searchItem,
            requestBook: requestBook,
            changeStatus: changeStatus,
            cancelRequest: cancelRequest
        };

        function addItem(ItemObj, callback, errorCallback) {
            return MyItem.save(
                ItemObj,
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function getItems(callback, errorCallback) {
            return Item.query(
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function requestBook(myId, book, callback, errorCallback) {
            return User.update({
                    id: myId
                },
                book,
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }
        
        function changeStatus(obj, callback, errorCallback) {
            return User.save(
                obj,
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function updateItem(id, voter, callback, errorCallback) {
            return Item.update({
                    id: id
                },
                voter,
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function deleteItemById(id, callback, errorCallback) {
            return Item.delete({ id: id },
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function getMyItems(callback, errorCallback) {
            return MyItem.query(
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function searchItem(title, callback, errorCallback) {
            return Item.searchitem({}, {
                    title: title
                },
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }
        
        function cancelRequest(obj, callback, errorCallback) {
            return User.update({},
                obj,
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

    }

})();
