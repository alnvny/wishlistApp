var wishListApp = angular.module('wishListApp', ['ngMaterial', 'material.svgAssetsCache', 'ui.router']);

wishListApp.controller('mainController', function($scope, $http, $state, getApiDataService) {
    var vm = this;
    vm.addToWishlist = addToWishlist;
    vm.removeFromWishlist = removeFromWishlist;
    vm.gotToWishlist = gotToWishlist;
    vm.productInfo = [];
    vm.wishlist = [];


    getApiDataService.getProductDetails(function(response) {
        vm.productInfo = response;
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
});