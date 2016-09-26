angular.module('AppUI')

.factory('authService', function (apiService, $q, jwtHelper) {

    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        remember: false,
        userName: "",
        token: null,
        role: null
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return apiService.register(registration)
            .then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        //apiService.login(data)
        //    .success(function (response) {
            	
        //    	var tokenPayload = jwtHelper.decodeToken(response.access_token);
            	
        //    	console.log(JSON.stringify(tokenPayload));

                if (loginData.remember == undefined)
                    loginData.remember = false

                localStorage.setItem('authorizationData', JSON.stringify({ 
                    token: '1213131',//response.access_token,
                	userName: loginData.userName, 
                	remember: loginData.remember,
                    role: ['Admin']//tokenPayload.authorities
                	}));
            	
            	
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.remember = loginData.remember;
                _authentication.token = '1213131';//response.access_token;
                _authentication.role = ['Admin'];//tokenPayload.authorities;

                deferred.resolve();//deferred.resolve(response);
                //deferred.resolve(loginData);

            //}).error(function (err, status) {
            //    _logOut();
            //    deferred.reject(err);
            //});

        return deferred.promise;

    };

    var _logOut = function () {

        localStorage.removeItem('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.remember = false;
        _authentication.token = null;
        _authentication.role = null;

    };

    var _fillAuthData = function () {
        
        var authData = localStorage.getItem('authorizationData');

        if (authData) {

            authData = JSON.parse(authData);

            if (!authData.remember) {
                localStorage.removeItem('authorizationData');
                return;
            }

            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.remember = authData.remember;
            _authentication.token = authData.token;
            _authentication.role = authData.role;
        }

    }
    
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    
    return authServiceFactory;
});