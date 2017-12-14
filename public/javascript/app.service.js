var app = angular.module('wishListApp');

app.service('getApiDataService', function($http) {

    var completeProductInfo = [];
    var serviceObject = {};
    var addedWishList = [];

    serviceObject.getProductDetails = function(callback) {
        if (completeProductInfo.length > 0) {
            callback(completeProductInfo);
        } else {
            $http.get('https://www.adidas.co.uk/api/suggestions/Stans%20Smith').then(function(response) {
                //var getProducts = [];
                var getProducts = response.data.products;
               // getProducts.push(response.data.products);
                var items = [];
                getProducts.map(function(itm) {
                    var product = itm.url.slice(41, 47);
                    itm.name = itm.url.slice(41, 47);
                    itm.rate = itm.separatedSalePrice.slice(62, 67);
                    items.push({ name: product });
                });
                completeProductInfo = getProducts;
                callback(completeProductInfo)
            });
        }
    }

    serviceObject.setWishlist = function(addedItems) {
        addedWishList = addedItems
    }

    serviceObject.getWishlist = function(callback) {
        if(addedWishList.length>0){
            callback(addedWishList)
        }
        else{
            callback('');
        }       
    }
    return serviceObject;
});