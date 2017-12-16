(function() {
    function wishlistController(getApiDataService) {
        var vm = this;
        vm.noItemInWishlist = false;
        vm.wishlistItems = [];
        vm.apiFailure = false;
        vm.errorMsg = '';

        Array.prototype.contains = function(element) {
            return this.indexOf(element) > -1;
        };

        getApiDataService.getProductDetails(function(response) {
            if (response === 403) {
                vm.apiFailure = true;
                vm.errorMsg = "You don't have permission to access http://www.adidas.co.uk/api/suggestions/Stans%20Smith on this server.";
            } else if (response === 401) {
                vm.apiFailure = true;
                vm.errorMsg = "You don't have Authorization  to access http://www.adidas.co.uk/api/suggestions/Stans%20Smith on this server.";
            } else if (response === 404) {
                vm.apiFailure = true;
                vm.errorMsg = "not found - http://www.adidas.co.uk/api/suggestions/Stans%20Smith on this server.";
            } else if (typeof(response) === 'number') {
                vm.apiFailure = true;
                vm.errorMsg = "API problem - "
            } else {
                vm.apiFailure = false;
                vm.productInfo = response;
                var productDetails = response;
                getApiDataService.getWishlist(function(response) {
                    if (response.length > 0) {
                        var addedWishlistNames = response;
                        productDetails.map(function(itm) {
                            if (addedWishlistNames.contains(itm.name)) {
                                vm.wishlistItems.push(itm);
                            }
                        });
                    } else {
                        vm.noItemInWishlist = true;
                    }
                });
            }
        });

    }
    angular.module('wishListApp').controller('wishlistController', wishlistController);
    wishlistController.$inject = ['getApiDataService'];
})();