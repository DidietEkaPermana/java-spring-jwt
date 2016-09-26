/**
 * 
 */

angular.module('AppUI', ['ui.router', 'ui.bootstrap', 'datatables', 'datatables.buttons', 'AppUI.routing', 'angular-jwt'])

.run(['authService', function (authService) {
    authService.fillAuthData();
}])

//.config(['$resourceProvider', function ($resourceProvider) {
//    // Don't strip trailing slashes from calculated URLs
//    $resourceProvider.defaults.stripTrailingSlashes = false;
//}]);

.config(['$httpProvider', function ($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);