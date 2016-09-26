angular.module('AppUI')

.controller('UserCtrl', function ($scope, $state) {
	
})

.controller('tableUser', function ($scope, $uibModal, apiService, DTOptionsBuilder, DTColumnBuilder, authService) {
    var vm = this;
    
    vm.dtOptions = DTOptionsBuilder.newOptions()
	    .withOption('ajax', {
	        // Either you specify the AjaxDataProp here
	        dataSrc: 'data',
	        url: apiService.userGet,
	        type: 'GET',
	        headers: {
	        	Authorization: 'bearer ' + authService.authentication.token
	        }
	    })
	    // or here
	    //.withDataProp('data')
	    .withOption('processing', true)
	    .withOption('serverSide', true)
	    .withPaginationType('full_numbers')
	    .withOption('rowCallback', rowCallback)
	    .withButtons([{
	    	text: 'Add',
	    	key: '1',
	    	action: addModalPopUp
	    }]);
    
    vm.dtColumns = [
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('email').withTitle('Email'),
        DTColumnBuilder.newColumn('group[0].groupName').withTitle('Role')
    ];
    
    vm.dtInstance = {};
    
    function addModalPopUp(){
    	//alert("ping");
    	$scope.info = {
    			name: '',
    			email: '',
    			password: '',
    			group: [{
    				groupName: '' 
    			}]
    	};
        $scope.modalState = "Add";

        callPopUp();
    }

    function editModalPopUp(info) {
        //vm.message = info.Name + ' - ' + info.Email;
        $scope.info = info;
        $scope.modalState = "Edit";
        
        callPopUp();
    }
    
    function callPopUp(){
    	var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'content/views/auth/userDetail.html',
            controller: 'UserModalInstanceCtrl',
            resolve: {
                items: function () {
                    return $scope.info;
                },
                dataState : function () {
                	return $scope.modalState
                }
            }
        });
    	
    	modalInstance.result.then(function () {
            //$log.info('Modal ok at: ' + new Date());
        	vm.dtInstance.reloadData();
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function () {
            	editModalPopUp(aData);
            });
        });
        return nRow;
    }
})

.controller('UserModalInstanceCtrl', function ($scope, $uibModalInstance, apiService, items, dataState) {

    $scope.items = items;
    $scope.modalState = dataState;
    
    apiService.roleGetAll()
    .then(function(result) {
    	$scope.data = result.data.data;
    		}, function(error) {
    			alert(error);
			})

    $scope.ok = function () {
//    	console.dir($scope.items);
    	
    	if($scope.modalState === 'Add'){
    		apiService.userPost($scope.items)
    		.then(function(result) {
    			$uibModalInstance.close();
    		}, function(error) {
    			alert(error.data.message);
			})
    	} else {
    		apiService.userPut($scope.items)
    		.then(function(result) {
    			$uibModalInstance.close();
    		}, function(error) {
    			alert(error.data.message);
			})
//    		$uibModalInstance.close();
    	}
    };
    
    $scope.delete = function () {
    	if(confirm("Are you sure?")){
    		console.log("Delete");
    		apiService.userDelete($scope.items.userId)
    		.then(function(result) {
    			$uibModalInstance.close();
    		}, function(error) {
    			alert(error);
			})
    	}
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});