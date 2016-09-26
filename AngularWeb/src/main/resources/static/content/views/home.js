angular.module('AppUI')

.controller('HomeCtrl', function ($scope, $state, $window, authService) {
    if (!authService.authentication.isAuth) {
        $state.go('login');
        return false;
    }

    //$scope.profile = appInfo.getProfile();
    $scope.userName = authService.authentication.userName;
    $scope.role = authService.authentication.role[0];

    $scope.state = '';

    $scope.isMenuActive = function (arg) {
        return $state.is('home.' + arg);
    }

    $scope.Logout = function () {
        authService.logOut();
        $state.go('login');
    }
})
