angular.module('AppUI')

.factory('apiService', function (appInfo, $http) {
    return {
        register: function (registration) {
            return $http.post(appInfo.getApiBaseUrl + 'account/register', registration);
        },
        login: function (data) {
        	var headersInc = { 
        			'Content-Type': 'application/x-www-form-urlencoded',
        			'Authorization': 'Basic ' + btoa('fooClientIdPassword:secret')
        				};
            return $http.post(appInfo.getAuthUrl + 'token', data, { headers: headersInc });
        },
        userGet: appInfo.getApiUserUrl + "/User",
        userPost: function (data){
        	return $http.post(appInfo.getApiUserUrl + "/User", data, appInfo.getHttpConfigHeader());
        },
        userPut: function (data){
        	return $http.put(appInfo.getApiUserUrl + '/User/' + data.userId, data, appInfo.getHttpConfigHeader());
        },
        userDelete: function (data){
        	return $http.delete(appInfo.getApiUserUrl + '/User/' + data, appInfo.getHttpConfigHeader());
        },
        roleGetAll: function (){
        	return $http.get(appInfo.getApiUserUrl + '/Group?draw=1', appInfo.getHttpConfigHeader());
        },
        customerGet: appInfo.getApiCustomerUrl,
        customerGetAll: function (){
        	return $http.get(appInfo.getApiCustomerUrl + '?draw=1', appInfo.getHttpConfigHeader());
        },
        customerPost: function (data){
        	return $http.post(appInfo.getApiCustomerUrl, data, appInfo.getHttpConfigHeader());
        },
        customerPut: function (data){
        	return $http.put(appInfo.getApiCustomerUrl + '/' + data.id, data, appInfo.getHttpConfigHeader());
        },
        customerDelete: function (data){
        	return $http.delete(appInfo.getApiCustomerUrl + '/' + data, appInfo.getHttpConfigHeader());
        },
        projectGet: appInfo.getApiProjectUrl,
        projectPost: function (data){
        	return $http.post(appInfo.getApiProjectUrl, data, appInfo.getHttpConfigHeader());
        },
        projectPut: function (data){
        	return $http.put(appInfo.getApiProjectUrl + '/' + data.id, data, appInfo.getHttpConfigHeader());
        },
        projectDelete: function (data){
        	return $http.delete(appInfo.getApiProjectUrl + '/' + data, appInfo.getHttpConfigHeader());
        }
    }
})