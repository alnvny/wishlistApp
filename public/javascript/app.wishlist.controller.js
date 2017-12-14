(function() {
    function wishlistController(getApiDataService) {
        var self = this;
        self.noItemInWishlist = false;
        self.wishlistItems = [];
        Array.prototype.contains = function(element) {
            return this.indexOf(element) > -1;
        };
        getApiDataService.getProductDetails(function(response) {
            var productDetails = response;
            getApiDataService.getWishlist(function(response) {
                if(response.length>0){
                var addedWishlistNames = response;
                productDetails.map(function(itm) {
                    if (addedWishlistNames.contains(itm.name)) {
                        self.wishlistItems.push(itm);
                    }
                });
            }else{
                self.noItemInWishlist = true;
            }
            });
        });

    }
    angular.module('wishListApp').controller('wishlistController', wishlistController);
    wishlistController.$inject = ['getApiDataService'];
})();