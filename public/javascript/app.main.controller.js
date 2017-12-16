var wishListApp = angular.module('wishListApp', ['ngMaterial', 'material.svgAssetsCache', 'ui.router']);

(function() {
    function mainController($state, getApiDataService) {
        var vm = this;
        vm.addToWishlist = addToWishlist;
        vm.removeFromWishlist = removeFromWishlist;
        vm.gotToWishlist = gotToWishlist;
        vm.productInfo = [];
        vm.wishlist = [];
        vm.errorMsg = '';
        vm.apiFailure = false;

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
            } else if(typeof(response)==='number'){
                 vm.apiFailure = true;
                  vm.errorMsg ="API problem - "
            } else {
                vm.apiFailure = false;
                vm.productInfo = response;
            }
        });

        function addToWishlist(item) {
            item.added = true;
            vm.wishlist.push(item.name);
        }

        function removeFromWishlist(item) {
            item.added = false;
            var getIndex = vm.wishlist.indexOf(item.name);
            vm.wishlist.splice(getIndex, 1);
        }

        function gotToWishlist() {
            getApiDataService.setWishlist(vm.wishlist);
            $state.go('wishlist', { 'list': vm.wishlist });
        }
    }
    mainController.$inject = ['$state', 'getApiDataService'];
    angular.module('wishListApp').controller('mainController', mainController);
})();