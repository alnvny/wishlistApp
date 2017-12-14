(function() {
    function searchController(getApiDataService) {
        var vm = this;
        vm.simulateQuery = false;
        vm.querySearch = querySearch;
        vm.productInfo = '';

        getApiDataService.getProductDetails(function(response) {
            vm.productInfo = response;
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
    angular.module('wishListApp').controller('searchController',searchController);
    searchController.$inject = ['getApiDataService'];
})();