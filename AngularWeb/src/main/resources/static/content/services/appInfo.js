angular.module('AppUI')

.factory('appInfo', function ($state) {
    return {
    	//getAuthUrl: 'http://localhost:8080/jwt-server/oauth/',
    	getAuthUrl: 'http://localhost:8081/oauth/',
        getApiUserUrl: 'http://localhost:8080/resourceUser',
        getApiCustomerUrl: 'http://localhost:8080/resourceCustomer/customers',
        getApiProjectUrl: 'http://localhost:8080/resourceProject/projects',
        getBaseImage: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
        cleanLocalCache: function () {
            localStorage.clear();
        },
        //isAuth: function () {
        //    if (this.getProfile() == undefined) {
        //        this.cleanLocalCache();
        //        $state.go('login');
        //        return false;
        //    }

        //    return true;
        //},
        //setProfile: function (profile) {
        //    localStorage.setItem('profile', JSON.stringify(profile));
        //},
        //getProfile: function () {
        //    return JSON.parse(localStorage.getItem('profile'));
        //},

        getHttpConfigHeader: function () {
            var profile = JSON.parse(localStorage.getItem('authorizationData'));
            return {
                headers: {
                    Authorization: 'Bearer ' + profile.token
                }
            };
        },
        getMultipartHttpConfigHeader: function () {
            var profile = this.getProfile();
            return {
                // this cancels AngularJS normal serialization of request
                transformRequest: angular.identity,
                headers: {
                    // this lets browser set `Content-Type: multipart/form-data` 
                    // header and proper data boundary
                    'Content-Type': undefined,
                    Authorization: 'Bearer ' + profile.token
                }
            };
        }
    }
})

