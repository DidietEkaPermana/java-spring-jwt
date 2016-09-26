angular.module('AppUI')

.controller('CustomerCtrl', function ($scope, $state) {
	
})

.controller('tableCustomer', function ($scope, $uibModal, apiService, DTOptionsBuilder, DTColumnBuilder, authService) {
    var vm = this;
    
    vm.dtOptions = DTOptionsBuilder.newOptions()
	    .withOption('ajax', {
	        // Either you specify the AjaxDataProp here
	        dataSrc: 'data',
	        url: apiService.customerGet,
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
        DTColumnBuilder.newColumn('firstName').withTitle('First Name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last Name'),
        DTColumnBuilder.newColumn('email').withTitle('Email')
    ];
    
    vm.dtInstance = {};
    
    function addModalPopUp(){
    	//alert("ping");
    	$scope.info = {
    			firstName: '',
    			lastName: '',
    			email: '',
    			mobile: ''
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
            templateUrl: 'content/views/customer/customerDetail.html',
            controller: 'CustomerModalInstanceCtrl',
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

.controller('CustomerModalInstanceCtrl', function ($scope, $uibModalInstance, apiService, items, dataState) {

    $scope.items = items;
    $scope.modalState = dataState;

    $scope.ok = function () {
//    	console.dir($scope.items);
    	
    	if($scope.modalState === 'Add'){
    		apiService.customerPost($scope.items)
    		.then(function(result) {
    			$uibModalInstance.close();
    		}, function(error) {
    			alert(error);
			})
    	} else {
    		apiService.customerPut($scope.items)
    		.then(function(result) {
    			$uibModalInstance.close();
    		}, function(error) {
    			alert(error);
			})
//    		$uibModalInstance.close();
    	}
    };
    
    $scope.delete = function () {
    	if(confirm("Are you sure?")){
    		console.log("Delete");
    		apiService.customerDelete($scope.items.id)
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