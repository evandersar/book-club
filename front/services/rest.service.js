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
            '/api/myitems', {}, {
                getmyitems: { method: 'POST', isArray: true }
            }
        );

        return {
            addItem: addItem,
            getItems: getItems,
            updateItem: updateItem,
            deleteItemById: deleteItemById,
            getMyItems: getMyItems,
            searchItem: searchItem
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
            return Item.delete(
                { id: id },
                function(resp) {
                    callback(resp);
                },
                function(err) {
                    errorCallback(err);
                }
            );
        }

        function getMyItems(userId, callback, errorCallback) {
            return MyItem.getmyitems({}, {
                    userId: userId
                },
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

    }

})();
