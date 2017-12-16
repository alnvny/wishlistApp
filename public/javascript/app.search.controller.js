(function() {
    function searchController(getApiDataService) {
        var vm = this;
        vm.simulateQuery = false;
        vm.querySearch = querySearch;
        vm.productInfo = '';
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
            } else if (typeof(response) === 'number') {
                vm.apiFailure = true;
                vm.errorMsg = "API problem - "
            } else {
                vm.apiFailure = false;
                vm.productInfo = response;
            }
        });

        function querySearch(query) {
            var results = query ? vm.productInfo.filter(createFilterFor(query)) : vm.productInfo,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function createFilterFor(query) {
            return function filterFn(state) {
                return (state.name.indexOf(query) === 0);
            };
        }
    }
    angular.module('wishListApp').controller('searchController', searchController);
    searchController.$inject = ['getApiDataService'];
})();