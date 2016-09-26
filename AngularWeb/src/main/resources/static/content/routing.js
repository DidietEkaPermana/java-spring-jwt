/**
 * 
 */

angular.module('AppUI.routing', [])

.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('login', {
			url: '/',
			templateUrl: 'content/views/auth/login.html',
			controller: 'LoginCtrl'
		})
        .state('register', {
            url: '/register',
            templateUrl: 'content/views/auth/register.html',
            controller: 'RegisterCtrl'
        })
        .state('lockscreen', {
            url: '/lockscreen',
            templateUrl: 'content/views/auth/lockscreen.html',
            controller: 'LockscreenCtrl'
        })
		.state('home', {
			url: '/home',
			templateUrl: 'content/views/home.html',
			controller: 'HomeCtrl'
		})
		.state('home.dashboard', {
		    url: '/dashboard',
		    templateUrl: 'content/views/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
		})
		.state('home.user', {
		    url: '/user',
		    templateUrl: 'content/views/auth/userList.html',
		    controller: 'UserCtrl'
		})
		.state('home.menu', {
		    url: '/menu',
		    templateUrl: 'content/views/menu/menu.html',
		    controller: 'MenuCtrl'
		})
		.state('home.customer', {
		    url: '/customer',
		    templateUrl: 'content/views/customer/customerList.html',
		    controller: 'CustomerCtrl'
		})
		.state('home.project', {
		    url: '/project',
		    templateUrl: 'content/views/project/projectList.html',
		    controller: 'ProjectCtrl'
		})
		
	$urlRouterProvider.otherwise('/');
})