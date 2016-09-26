angular.module('AppUI')

.controller('LoginCtrl', function ($scope, $state, authService) {
    //appInfo.cleanLocalCache();
    if (authService.authentication.isAuth) {
        $state.go('home.dashboard');
        return;
    }

    $scope.state = $state.current.name;

    $scope.submitLogin = function () {
    	authService.login($scope.login).then(function (response) {
            $state.go('home.dashboard');
        },
         function (err) {
             alert(err.error_description)
         });
    }
})

.controller('RegisterCtrl', function ($scope, $timeout, $state, authService) {
    //appInfo.cleanLocalCache();

    $scope.state = $state.current.name;

    console.log($state.current.name)

    $scope.submitLogin = function () {
        //console.log($scope.register);
        authService.saveRegistration($scope.register).then(function (response) {

            $scope.savedSuccessfully = true;
            
            alert("User has been registered successfully");
            $state.go('login');

        },
         function (response) {
             var errors = [];
             for (var key in response.data.ModelState) {
                 for (var i = 0; i < response.data.ModelState[key].length; i++) {
                     errors.push(response.data.ModelState[key][i]);
                 }
             }
             //$scope.message = "Failed to register user due to:" + errors.join(' ');
             alert("Failed to register user due to:" + errors.join(' '));
         });
    }
})

.controller('LockscreenCtrl', function ($scope, $state) {
    //appInfo.cleanLocalCache();

    $scope.state = $state.current.name;

    console.log($state.current.name)
})