(function() {
    function wishListConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'pages/home.html',
                controller: 'mainController'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'pages/search.html',
                controller: 'searchController',
                controllerAs: 'vm'
            })
            .state('wishlist', {
                url: '/wishlist',
                templateUrl: 'pages/wishlist.html',
                controller: 'wishlistController',
                controllerAs: 'wishlist'
            })
    }
    angular.module('wishListApp').config(wishListConfig);
    wishListConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
})();