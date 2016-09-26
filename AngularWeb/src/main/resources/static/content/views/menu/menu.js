angular.module('AppUI')

.controller('MenuCtrl', function ($scope, $state, $uibModal, utility) {
    var menuList = [{
        menuId: 1,
        title: 'menu 1',
        rootId: null,
        seq: 1
    }, {
        menuId: 7,
        title: 'menu 7',
        rootId: 1,
        seq: 1
    }, {
        menuId: 5,
        title: 'menu 5',
        rootId: 2,
        seq: 1
    }, {
        menuId: 2,
        title: 'menu 2',
        rootId: null,
        seq: 2
    }, {
        menuId: 6,
        title: 'menu 6',
        rootId: 2,
        seq: 2
    }, {
        menuId: 3,
        title: 'menu 3',
        rootId: null,
        seq: 3
    }, {
        menuId: 4,
        title: 'menu 4',
        rootId: null,
        seq: 4
    }]

    refreshMenu();

    function refreshMenu() {
        //apiService.GetMenu().success(function (result) {
        //    menuList = result;

        //    var dataTree = [{
        //        menuId: 0,
        //        title: "Main",
        //        selected: false,
        //        expanded: true,
        //        nodes: nodeMenu(menuList, null)
        //    }]
            
        //    $scope.menus = dataTree;
        //})
        var dataTree = nodeMenu(menuList, null);

        $scope.menus = dataTree;
    }

    function nodeMenu(list, parent) {
        var dataNode = [];
        var seq = 1;

        for (var i = 0; i < list.length; i++) {
            if (list[i].rootId == parent) {
                dataNode.push({
                    menuId: list[i].menuId,
                    title: list[i].title,
                    selected: false,
                    expanded: true,
                    seq: list[i].seq,
                    nodes: nodeMenu(list, list[i].menuId)
                })
            }
        }

        dataNode.sort(function (a, b) {
            if (a.seq < b.seq)
                return -1;
            if (a.seq > b.seq)
                return 1;
            return 0;
        })

        return dataNode;
    }

    // #region Menu Event

    $scope.$on('Menu.Change', function (event, data) {
        console.log(data);

        if (data.origin == data.target) {
            alert("Sorry, nothing to move");
            return;
        }

        var foundOrigin = utility.searchData(menuList, "menuId", data.origin);
        var foundTarget = utility.searchData(menuList, "menuId", data.target);

        var maxSeq = findMaxSeq(menuList, foundTarget.rootId);

        console.log(foundOrigin);
        console.log(foundTarget);

        if (foundOrigin.rootId == foundTarget.rootId) {
            var seqMove = foundOrigin.seq;
            var seqTarget = foundTarget.seq;
            if (data.AboveTarget) {
                seqTarget--;
            } else {
                seqTarget++;
            }
            if (seqMove == seqTarget) {
                alert("Nothing to move");
                return;
            }

            seqTarget = foundTarget.seq;

            if (seqTarget > seqMove) {
                if (data.AboveTarget)
                    seqTarget--;

                if (seqTarget > maxSeq)
                    seqTarget = maxSeq;

                seqMove++;
                var i = 0;
                while(true){
                    if (menuList[i].rootId == foundOrigin.rootId && menuList[i].seq == seqMove) {
                        --menuList[i].seq;
                        seqMove++;
                    }

                    if (seqMove > seqTarget)
                        break;

                    (menuList.length - 1 == i) ? i = 0 : i++;
                }

                foundOrigin.seq = seqTarget;
            } else {
                if (!data.AboveTarget)
                    seqTarget++;

                seqMove--;
                var i = 0;
                while (true) {
                    if (menuList[i].rootId == foundOrigin.rootId && menuList[i].seq == seqMove) {
                        menuList[i].seq++;
                        seqMove--;
                    }

                    if (seqMove < seqTarget)
                        break;

                    (menuList.length-1 == i)?i=0:i++;
                }

                foundOrigin.seq = seqTarget;
            }
        } else {
            //fix seq in origin
            var seqMov = foundOrigin.seq;
            var maxSeqOrigin = findMaxSeq(menuList, foundOrigin.rootId);

            if (maxSeqOrigin > seqMov) {
                seqMov++;
                var i = 0;
                while (true) {
                    if (menuList[i].rootId == foundOrigin.rootId && menuList[i].seq == seqMove) {
                        --menuList[i].seq;
                        seqMove++;
                    }

                    if (seqMove => maxSeqOrigin)
                        break;

                    (menuList.length - 1 == i) ? i = 0 : i++;
                }
            }

            //move origin to target
            //foundOrigin.rootId = foundTarget.rootId;

            var seqMove = foundTarget.seq;

            if (!data.AboveTarget) {
                seqMove++;
            }

            if (seqMove <= maxSeq) {
                //move target seq
                i = 0;
                while (true) {
                    if (menuList[i].rootId == foundTarget.rootId && menuList[i].seq == maxSeq) {
                        ++menuList[i].seq;
                        maxSeq--;
                    }

                    if (maxSeq <= seqMove)
                        break;

                    (menuList.length - 1 == i) ? i = 0 : i++;
                }
            }

            foundOrigin.rootId = foundTarget.rootId;
            foundOrigin.seq = seqMove;
        }

        refreshMenu();
    })

    $scope.$on('Menu.Selected', function (event, data) {
        console.log(data);
    })

    $scope.$on('Menu.Edit', function (event, data) {
        console.log(data);

        var found = utility.searchData(menuList, "menuId", data.Id);

        $scope.info = {
            title: found.title,
            menuId: data.Id,
            rootId: found.rootId
        };
        $scope.modalState = "Edit";

        callPopUp();
    })

    $scope.$on('Menu.Add', function (event, data) {
        console.log(data);

        var found = utility.searchData(menuList, "menuId", data.Id);

        $scope.info = {
            title: '',
            rootId: data.Id
        };
        $scope.modalState = "Add";

        callPopUp();
    })

    $scope.$on('Menu.Remove', function (event, data) {
        console.log(data);

        var found = utility.searchData(menuList, "menuId", data.Id);

        $scope.info = {
            title: found.title,
            menuId: data.Id,
            rootId: found.rootId
        };

        $scope.modalState = "Delete";

        callPopUp();
    })

    // #endregion

    function callPopUp() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'content/views/menu/menuAddModal.html',
            controller: 'MenuModalInstanceCtrl',
            resolve: {
                items: function () {
                    return $scope.info;
                },
                dataState: function () {
                    return $scope.modalState
                }
            }
        });

        modalInstance.result.then(function (result) {
            //$log.info('Modal ok at: ' + new Date());
            console.log(result);

            if (result.state == "Add") {

                var seq = findMaxSeq(menuList, result.rootId);
                menuList.push({
                    menuId: result.menuId,
                    title: result.title,
                    rootId: result.rootId,
                    seq: seq+1
                })
            } else if (result.state == "Edit")  {
                var found = utility.searchData(menuList, "menuId", result.menuId);

                found.title = result.title;
            } else {
                recursiveDelete(result.menuId);

                var found = utility.searchData(menuList, "menuId", result.menuId);

                var idx = menuList.indexOf(found);

                menuList.splice(idx, 1);
                reIndexSeqAfterDelete(result.rootId, found.seq);
            }

            refreshMenu();
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }

    // #region Delete Helper

    function recursiveDelete(rootId) {
        var found = utility.searchData(menuList, "rootId", rootId);

        while (found != null) {
            recursiveDelete(found.menuId);

            found = utility.searchData(menuList, "rootId", rootId);

            if (found != null) {
                var idx = menuList.indexOf(found);

                menuList.splice(idx, 1);
            }
        }
    }

    function reIndexSeqAfterDelete(rootId, seq) {
        for (var i = 0; i < menuList.length; i++) {
            if (menuList[i].rootId == rootId && menuList[i].seq == seq + 1) {
                menuList[i].seq--;
                seq++;
            }
        }
    }

    // #endregion

    function findMaxSeq(object, rootId) {
        var seq = 0;
        for (var i = 0; i < object.length; i++) {
            if (object[i].rootId == rootId) {
                if (object[i].seq > seq)
                    seq = object[i].seq;
            }
        }

        return seq;
    }
})

.controller('MenuModalInstanceCtrl', function ($scope, $uibModalInstance, apiService, items, dataState, utility) {

    $scope.items = items;
    $scope.modalState = dataState;

    $scope.ok = function () {
        var data;
        if ($scope.modalState === 'Add') {

            data = {
                state: "Add",
                menuId: utility.generateGUID(),
                title: $scope.items.title,
                rootId: $scope.items.rootId
            };
        } else if ($scope.modalState === 'Edit')  {

            data = {
                state: "Edit",
                menuId: $scope.items.menuId,
                title: $scope.items.title,
                rootId: $scope.items.rootId
            };
        } else {
            if (confirm("Are you sure you want to delete data?")) {
                data = {
                    state: "Delete",
                    menuId: $scope.items.menuId,
                    title: $scope.items.title,
                    rootId: $scope.items.rootId
                };
            }
        }

        $uibModalInstance.close(data);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});