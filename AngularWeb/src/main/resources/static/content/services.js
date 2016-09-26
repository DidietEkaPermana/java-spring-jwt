/**
 *
 */

angular.module('AppUI.services', [])

.factory('appInfo', function($state){
    return {
        getContentType:  ["Arah Kiblat", "Calculator", "Doa Manasik", "Juz Amma", "List Text", "List Text Category", "Location", "Quiz Choice", "Text", "Waktu Shalat"],
        getStatus: ["Pending", "Approve", "Reject"],
        getState: ["Insert", "Update", "Delete"],
        getBaseUrl: 'http://localhost:8080/HasanahWebAPI',
        getApiBaseUrl: 'http://localhost:8080/HasanahWebAPI/rest/',
        getBaseImage: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
		cleanLocalCache: function(){
			localStorage.clear();
		},
		isAuth: function() {
			if(this.getProfile() == undefined){
			    this.cleanLocalCache();
			    $state.go('login');
			    return false;
			}

			return true;
		},
		isAdmin: function() {
			return this.getProfile().role === 'Admin';
		},
		isChecker: function() {
			return this.getProfile().role === 'Checker';
		},
		isMaker: function() {
			return this.getProfile().role === 'Maker';
		},
		setProfile: function(profile){
			localStorage.setItem('profile', JSON.stringify(profile));
		},
        getProfile: function () {
            return JSON.parse(localStorage.getItem('profile'));
        },
        
        getHttpConfigHeader: function () {
            var profile = this.getProfile();
            return {
                headers: {
                    SERVICE_KEY: profile.userId,
                    AUTH_TOKEN: profile.token
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
                    SERVICE_KEY: profile.userId,
                    AUTH_TOKEN: profile.token
                }
            };
        }
	}
})

.factory('apiService', function (appInfo, $http) {
    return {
        //userService: $resource(appInfo.getApiBaseUrl + "CMSUserService"), //https://docs.angularjs.org/api/ngResource/service/$resource,
        //roleService: $resource(appInfo.getApiBaseUrl + "CMSRoleService"),
		login: function(login){
		    return $http.get(appInfo.getApiBaseUrl + "CMSUserService/Login?userID=" + login.userName + "&password=" + login.password);
		},
		logout: function () {
		    return $http.get(appInfo.getApiBaseUrl + "CMSUserService/Logout", appInfo.getHttpConfigHeader());
		},
		GetRole: function () {
		    return $http.get(appInfo.getApiBaseUrl + "CMSRoleService", appInfo.getHttpConfigHeader());
		},
		GetUser: function () {
		    return $http.get(appInfo.getApiBaseUrl + "CMSUserService", appInfo.getHttpConfigHeader());
		},
		AddUser: function(data){
		    return $http.post(appInfo.getApiBaseUrl + "CMSUserService", data, appInfo.getHttpConfigHeader());
		},
		UpdateUser: function (data) {
		    return $http.put(appInfo.getApiBaseUrl + "CMSUserService", data, appInfo.getHttpConfigHeader());
		},
		ChangePassword: function (data) {
		    return $http.put(appInfo.getApiBaseUrl + "CMSUserService/ChangePassword", data, appInfo.getHttpConfigHeader());
		},
		DeleteUser: function (data) {
		    return $http.delete(appInfo.getApiBaseUrl + "CMSUserService/" + data, appInfo.getHttpConfigHeader());
		},
		GetGeneralParameter: function () {
		    return $http.get(appInfo.getApiBaseUrl + "CMSGeneralParameterService", appInfo.getHttpConfigHeader());
		},
		//AddGeneralParameter: function (data) {
		//    return $http.post(appInfo.getApiBaseUrl + "CMSGeneralParameterService", data, appInfo.getHttpConfigHeader());
		//},
		UpdateGeneralParameter: function (data) {
		    return $http.put(appInfo.getApiBaseUrl + "CMSGeneralParameterService", data, appInfo.getHttpConfigHeader());
		},
		//DeleteGeneralParameter: function (data) {
		//    return $http.delete(appInfo.getApiBaseUrl + "CMSGeneralParameterService/" + data, appInfo.getHttpConfigHeader());
		//},
		GetMenu: function () {
		    return $http.get(appInfo.getApiBaseUrl + "CMSMenuService", appInfo.getHttpConfigHeader());
		},
		AddMenu: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSMenuService", data, appInfo.getMultipartHttpConfigHeader());
		},
		UpdateMenu: function (data) {
		    return $http.put(appInfo.getApiBaseUrl + "CMSMenuService", data, appInfo.getMultipartHttpConfigHeader());
		},
		PutMenuSeq: function (data) {
		    return $http.put(appInfo.getApiBaseUrl + "CMSMenuService/Seq", data, appInfo.getHttpConfigHeader());
		},
		DeleteMenu: function (data) {
		    return $http.delete(appInfo.getApiBaseUrl + "CMSMenuService/" + data, appInfo.getHttpConfigHeader());
		},
		getBanner: function () {
		    return $http.get(appInfo.getApiBaseUrl + "CMSBannerService/", appInfo.getHttpConfigHeader());
		},
		addBanner: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSBannerService/add", data, appInfo.getMultipartHttpConfigHeader());
		},
		editBanner: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSBannerService/edit", data, appInfo.getMultipartHttpConfigHeader());
		},
		deleteBanner: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSBannerService/delete", data, appInfo.getMultipartHttpConfigHeader());
		},
		approvalBanner: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSBannerService/approval", data, appInfo.getMultipartHttpConfigHeader());
		},
		getAuditTrailByDate: function (dateFrom, dateTo) {
		    return $http.get(appInfo.getApiBaseUrl + "CMSAuditTrailService/get?dateFrom=" 
		    		+ dateFrom + "&dateTo=" + dateTo, appInfo.getHttpConfigHeader());
		},
		getTextByMenuId: function (menuId) {
		    return $http.get(appInfo.getApiBaseUrl + "CMSTextService/getByMenuId?menuId=" + menuId, appInfo.getHttpConfigHeader());
		},
		addText: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSTextService/add", data, appInfo.getMultipartHttpConfigHeader());
		},
		editText: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSTextService/edit", data, appInfo.getMultipartHttpConfigHeader());
		},
		approvalText: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSTextService/approval", data, appInfo.getMultipartHttpConfigHeader());
		},
		getListTextCategoryBySearchCriteria: function (menuId, title, category, status) {
		    return $http.get(appInfo.getApiBaseUrl + "CMSListTextCategoryService/getBySearchCriteria?menuId=" 
		    		+ menuId + "&title=" + title + "&category=" + category 
		    		+ "&status=" + status, 
		    		appInfo.getHttpConfigHeader());
		},
		addListTextCategory: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSListTextCategoryService/add", data, appInfo.getMultipartHttpConfigHeader());
		},
		editListTextCategory: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSListTextCategoryService/edit", data, appInfo.getMultipartHttpConfigHeader());
		},
		deleteListTextCategory: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSListTextCategoryService/delete", data, appInfo.getMultipartHttpConfigHeader());
		},
		approvalListTextCategory: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSListTextCategoryService/approval", data, appInfo.getMultipartHttpConfigHeader());
		},
		getListTextBySearchCriteria: function (menuId, title, status) {
		    return $http.get(appInfo.getApiBaseUrl + "CMSListTextService/getBySearchCriteria?menuId=" 
		    		+ menuId + "&title=" + title 
		    		+ "&status=" + status, 
		    		appInfo.getHttpConfigHeader());
		},
		addListText: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSListTextService/add", data, appInfo.getMultipartHttpConfigHeader());
		},
		editListText: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSListTextService/edit", data, appInfo.getMultipartHttpConfigHeader());
		},
		deleteListText: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSListTextService/delete", data, appInfo.getMultipartHttpConfigHeader());
		},
		approvalListText: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSListTextService/approval", data, appInfo.getMultipartHttpConfigHeader());
		},
		getLocationBySearchCriteria: function (menuId, name, address, status) {
		    return $http.get(appInfo.getApiBaseUrl + "CMSLocationService/getBySearchCriteria?menuId=" 
		    		+ menuId + "&name=" + name + "&address=" + address
		    		+ "&status=" + status, 
		    		appInfo.getHttpConfigHeader());
		},
		addLocation: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSLocationService/add", data, appInfo.getMultipartHttpConfigHeader());
		},
		editLocation: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSLocationService/edit", data, appInfo.getMultipartHttpConfigHeader());
		},
		deleteLocation: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSLocationService/delete", data, appInfo.getMultipartHttpConfigHeader());
		},
		approvalLocation: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSLocationService/approval", data, appInfo.getMultipartHttpConfigHeader());
		},
		push: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSPushService", data, appInfo.getHttpConfigHeader());
		},
		updateQuiz: function (data) {
		    return $http.put(appInfo.getApiBaseUrl + "CMSQuizService", data, appInfo.getHttpConfigHeader());
		},
		setQuizDelete: function (data) {
		    return $http.put(appInfo.getApiBaseUrl + "CMSQuizService/delete", data, appInfo.getMultipartHttpConfigHeader());
		},
		setQuizStatus: function (data) {
		    return $http.put(appInfo.getApiBaseUrl + "CMSQuizService/setStatus", data, appInfo.getMultipartHttpConfigHeader());
		},
		getQuizBySearchCriteria: function (menuId, title, status) {
		    return $http.get(appInfo.getApiBaseUrl + "CMSQuizService/getBySearchCriteria?menuId="
		    		+ menuId + "&title=" + title + "&status=" + status,
		    		appInfo.getHttpConfigHeader());
		},
		addQuiz: function (data) {
		    return $http.post(appInfo.getApiBaseUrl + "CMSQuizService", data, appInfo.getHttpConfigHeader());
		}
	}
})

.factory('utility', function () {
    return {
        searchData: function(dataSearch, children, id) {
            for (var i = 0; i < dataSearch.length; i++) {
                if (dataSearch[i][children] == id)
                    return dataSearch[i];

                if (dataSearch[i].nodes) {
                    var find = searchData(dataSearch[i].nodes, children, id);

                    if (find != null)
                        return find;
                }
            }

            return null;
        },


        /*
         * RFC4122 allows random ("version 4") ids
         * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
         */
        generateGUID: function(){
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }
    }
})

.factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
    return {
        response: function (response) {
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401", rejection);
                $location.path('/').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        }
    }
}])

.directive('treeModel', ['$compile', function ($compile) {

    function searchData(dataSearch, children, id) {
        for (var i = 0; i < dataSearch.length; i++) {
            if (dataSearch[i][children] == id)
                return dataSearch[i];

            if (dataSearch[i].nodes) {
                var find = searchData(dataSearch[i].nodes, children, id);

                if (find != null)
                    return find;
            }
        }

        return null;
    }

    function clearSelectedData(dataSearch) {
        for (var i = 0; i < dataSearch.length; i++) {
            dataSearch[i].selected = false;

            if (dataSearch[i].nodes) {
                clearSelectedData(dataSearch[i].nodes);
            }
        }
    }

    function templCreation(node, hideChild, treeId, children, id, label, level) {
        var html = '';

        angular.forEach(node, function (item, index) {
            var datID = String(item[id]).replace(/-/g, '');
            html += '<li draggable="true" ng-mouseenter="options' + datID + '=true" ng-mouseleave="options' + datID + '=false" add-draggable class="list-group-item node-tree';

            if (item.selected)
                html += ' node-selected';

            html += '"';

            if (!hideChild) {
                html += ' ng-hide="true"';
                item.expanded = false;
            }

            html += ' data-nodeid="' + item[id] + '" >';
            for (var i = 0 ; i < level ; i++) {
                html += '<span class="indent"></span>';
            }

            html += '<span class="icon expand-icon glyphicon ';

            if (item[children].length > 0) {
                if (item.expanded)
                    html += 'glyphicon-minus';
                else
                    html += 'glyphicon-plus';
            }

            html += '" ng-click="' + treeId + '.selectNodeHead(\'' + item[id] + '\')"></span>' +
                '<span class="icon node-icon"></span><span ng-click="' + treeId + '.selectNodeLabel(\'' + item[id] + '\', ' + level + ')">' + item[label] + '</span>';

            if (level == 0) {
                html += '<span class="pull-right icon glyphicon glyphicon-plus-sign" ng-show="options' + datID + '" ng-click="' + treeId + '.addNodeLabel(\'' + item[id] + '\', ' + level + ')"></span>';
            }
            else if (level == 1) {
                html += '<span class="pull-right icon glyphicon glyphicon-plus-sign" ng-show="options' + datID + '" ng-click="' + treeId + '.addNodeLabel(\'' + item[id] + '\', ' + level + ')"></span>';
                html += '<span class="pull-right icon glyphicon glyphicon-remove-sign" ng-show="options' + datID + '" ng-click="' + treeId + '.removeNodeLabel(\'' + item[id] + '\', ' + level + ')"></span>';
            }
            else
                html += '<span class="pull-right icon glyphicon glyphicon-remove-sign" ng-show="options' + datID + '" ng-click="' + treeId + '.removeNodeLabel(\'' + item[id] + '\', ' + level + ')"></span>';
            
            html += '</li>';

            if (item[children]) {
                html += templCreation(item[children], item.expanded, treeId, children, id, label, level + 1);
            }
        });

        return html;
    }

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //tree id
            var treeId = attrs.treeId;

            //tree model
            var treeModel = attrs.treeModel;

            //node id
            var nodeId = attrs.nodeId || 'id';

            //node label
            var nodeLabel = attrs.nodeLabel || 'label';

            //children
            var nodeChildren = attrs.nodeChildren || 'children';

            scope.$watch("menus", function (newValue, oldValue) {
                //This gets called when data changes.
                //console.log('change');

                var html = '<ul class="list-group" add-list>';

                html += templCreation(scope[treeModel], true, treeId, nodeChildren, nodeId, nodeLabel, 0);

                html += '</ul>';

                element.html('').append($compile(html)(scope));
            });

            //check tree id, tree model
            if (treeId && treeModel) {

                scope[treeId] = scope[treeId] || {};

                //event if node head clicks,
                scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {

                    //Collapse or Expand

                    //console.log("head " + selectedNode);

                    var dataFound = searchData(scope[treeModel], nodeId, selectedNode);
                    dataFound.expanded = !dataFound.expanded;

                    var html = '<ul class="list-group" add-list>';

                    html += templCreation(scope[treeModel], true, treeId, nodeChildren, nodeId, nodeLabel, 0);

                    html += '</ul>';

                    element.html('').append($compile(html)(scope));
                };


                //event if node label clicks,
                scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (selectedNode, level) {

                    clearSelectedData(scope[treeModel], nodeChildren);

                    var dataFound = searchData(scope[treeModel], nodeId, selectedNode);
                    //console.log(dataFound);
                    dataFound.selected = true;

                    //lempar ke root
                    //console.log("label " + selectedNode);
                    //scope[treeId].currentNode = dataFound;

                    scope.$emit('Menu.Selected', {
                        Id: selectedNode,
                        level: level
                    });

                    var html = '<ul class="list-group" add-list>';

                    html += templCreation(scope[treeModel], true, treeId, nodeChildren, nodeId, nodeLabel, 0);

                    html += '</ul>';

                    element.html('').append($compile(html)(scope));
                };

                //Add with root
                scope[treeId].addNodeLabel = scope[treeId].addNodeLabel || function (selectedNode, level) {
                    //console.log("add with root " + selectedNode + " on level " + level);
                    scope.$emit('Menu.Add', {
                        Id: selectedNode,
                        level: level
                    });
                };

                //remove node
                scope[treeId].removeNodeLabel = scope[treeId].removeNodeLabel || function (selectedNode, level) {
                    //console.log("remove node " + selectedNode + " on level " + level);
                    scope.$emit('Menu.Remove', {
                        Id: selectedNode,
                        level: level
                    });
                };

                var html = '<ul class="list-group" add-list>';

                html += templCreation(scope[treeModel], true, treeId, nodeChildren, nodeId, nodeLabel, 0);

                html += '</ul>';

                element.html('').append($compile(html)(scope));
            }
        }
    }
}])

.directive('addList', function () {

    /**
       * Checks whether the mouse pointer is in the first half of the given target element.
       *
       * In Chrome we can just use offsetY, but in Firefox we have to use layerY, which only
       * works if the child element has position relative. In IE the events are only triggered
       * on the listNode instead of the listNodeItem, therefore the mouse positions are
       * relative to the parent element of targetNode.
       */
    function isMouseInFirstHalf(event, targetNode, relativeToParent) {
        var mousePointer = (event.offsetY || event.layerY);
        var targetSize = targetNode.offsetHeight;
        var targetPosition = targetNode.offsetTop;
        targetPosition = relativeToParent ? targetPosition : 0;
        return mousePointer < targetPosition + targetSize / 2;
    }

    return {
        scope: {},
        link: function (scope, element) {
            // again we need the native object
            var el = element[0];

            el.addEventListener(
                'dragover',
                function (e) {
                    e.dataTransfer.dropEffect = 'move';
                    // allows us to drop
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragenter',
                function (e) {
                    this.classList.add('over');
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragleave',
                function (e) {
                    this.classList.remove('over');
                    return false;
                },
                false
            );

            el.addEventListener(
                'drop',
                function (e) {

                    // The default behavior in Firefox is to interpret the dropped element as URL and
                    // forward to it. We want to prevent that even if our drop is aborted.
                    e.preventDefault();

                    this.classList.remove('over');

                    //var item = document.getElementById(e.dataTransfer.getData('Text'));
                    //this.appendChild(item);

                    //get origin id
                    var originId = e.dataTransfer.getData('Text');
                    
                    var targetNode = e.target;
                    while (targetNode.parentNode !== element[0] && targetNode.parentNode) {
                        targetNode = targetNode.parentNode;
                    }

                    //get target id
                    var targetId = angular.element(targetNode)[0].dataset.nodeid;

                    var isAboveTarget = false;
                    if(isMouseInFirstHalf(e, targetNode))
                        isAboveTarget = true;

                    scope.$emit('Menu.Change', {
                        origin: originId,
                        target: targetId,
                        AboveTarget: isAboveTarget
                    });

                    // Stops some browsers from redirecting.
                    if (e.stopPropagation) e.stopPropagation();

                    return false;
                },
                false
            );
        }
    }
})

.directive('addDraggable', function () {
    return function (scope, element) {
        // this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function (e) {
                e.dataTransfer.effectAllowed = 'move';
                //e.dataTransfer.setData('Text', this.id);
                //console.log(this);
                e.dataTransfer.setData('Text', this.dataset.nodeid);
                this.classList.add('drag');
                return false;
            },
            false
        );

        el.addEventListener(
            'dragend',
            function (e) {
                this.classList.remove('drag');
                return false;
            },
            false
        );
    }
})

.directive('accordionModel', ['$compile', function ($compile) {

    function searchData(dataSearch, children, id) {
        for (var i = 0; i < dataSearch.length; i++) {
            if (dataSearch[i][children] == id)
                return dataSearch[i];

            if (dataSearch[i].nodes) {
                var find = searchData(dataSearch[i].nodes, children, id);

                if (find != null)
                    return find;
            }
        }

        return null;
    }

    function clearSelectedData(dataSearch) {
        for (var i = 0; i < dataSearch.length; i++) {
            dataSearch[i].selected = false;
            
            if (dataSearch[i].nodes) {
                clearSelectedData(dataSearch[i].nodes);
            }
        }
    }

    function closeOther(dataSearch, nodeId, selectedNode) {

        for (var i = 0; i < dataSearch.length; i++) {
            //console.log(dataSearch[i][nodeId]);
            if(dataSearch[i][nodeId] != selectedNode)
                dataSearch[i].expanded = false;
        }
    }

    function templCreation(node, hideChild, accordionId, children, id, label, level, nodeCount) {
        var html = '';

        angular.forEach(node, function (item, index) {
            var datID = String(item[id]).replace(/-/g, '');
            html += '<li ng-click="' + accordionId + '.selectNodeHead(\'' + item[id] + '\', ' + level + ')" class="list-group-item node-tree';

            if (item.selected && level > 0)
                html += ' node-selected active';

            if (level == 0) {
                html += ' node-header ';
            }

            html += '"';

            if (!hideChild) {
                html += ' ng-hide="true"';
                item.expanded = false;
            }

            html += ' data-nodeid="' + item[id] + '" >';

            html += '<div>' + item[label] + '';
            //html += item[label];

//            if (nodeCount) {
//                html += '<span class=" pull-right badge">' + item["count"] + '</span></div>';
//            }

            html += '</li>';

            if (item[children]) {
                html += templCreation(item[children], item.expanded, accordionId, children, id, label, level + 1, nodeCount);
            }
        });

        return html;
    }

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //tree id
            var accordionId = attrs.accordionId;

            //tree model
            var accordionModel = attrs.accordionModel;

            //node id
            var nodeId = attrs.nodeId || 'id';

            //node label
            var nodeLabel = attrs.nodeLabel || 'label';

            //node count
            var nodeCount = attrs.nodeCount || 'count';

            //children
            var nodeChildren = attrs.nodeChildren || 'children';

            scope.$watch("contentMenus", function (newValue, oldValue) {
                //This gets called when data changes.
                //console.log('change');

                var html = '<ul class="list-group" add-list>';

                html += templCreation(scope[accordionModel], true, accordionId, nodeChildren, nodeId, nodeLabel, 0, nodeCount);

                html += '</ul>';

                element.html('').append($compile(html)(scope));
            });

            //check tree id, tree model
            if (accordionId && accordionModel) {

                scope[accordionId] = scope[accordionId] || {};

                //event if node head clicks,
                scope[accordionId].selectNodeHead = scope[accordionId].selectNodeHead || function (selectedNode, level) {

                    //Collapse or Expand

                    //console.log("head " + selectedNode);

                    clearSelectedData(scope[accordionModel], nodeChildren);

                    var dataFound = searchData(scope[accordionModel], nodeId, selectedNode);
                    dataFound.expanded = !dataFound.expanded;
                    dataFound.selected = true;

                    if (level == 0)
                        closeOther(scope[accordionModel], nodeId, selectedNode);
                    
                    var html = '<ul class="list-group" add-list>';

                    html += templCreation(scope[accordionModel], true, accordionId, nodeChildren, nodeId, nodeLabel, 0, nodeCount);

                    html += '</ul>';

                    element.html('').append($compile(html)(scope));

                    scope.$emit('Content.Selected', {
                        Id: selectedNode,
                        level: level
                    });
                };


                var html = '<ul class="list-group" add-list>';

                html += templCreation(scope[accordionModel], true, accordionId, nodeChildren, nodeId, nodeLabel, 0, nodeCount);

                html += '</ul>';

                element.html('').append($compile(html)(scope));
            }
        }
    }
}])

/*
 * http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file
 * 
 */
.directive("fileimage", [function () {
    return {
        scope: {
            fileimage: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    //scope.$apply(function () {
                    //    scope.fileread = loadEvent.target.result;
                    //});

                    //get dimension of image
                    var image = new Image();
                    image.src = loadEvent.target.result;

                    image.onload = function () {
                        // access image size here 

                        if (attributes.maxwidth >= this.width && attributes.maxheight >= this.height) {
                            scope.$apply(function () {
                                scope.fileimage = loadEvent.target.result;
                            });
                        }
                        else {
                            //throw 'Invalid image size!';
                            scope.$emit('Image.Validation', {
                                message: 'Invalid image size! Please choose another one.\n' +
                                        'Valid size is max ' + attributes.maxwidth + ' width and ' + attributes.maxheight + ' height\n' +
                                        'but your image size is ' + this.width + ' width and ' + this.height + ' height'
                            });
                        }
                    };
                }
                reader.readAsDataURL(changeEvent.target.files[0]);

                //if only file definition
                //scope.$apply(function () {
                //    scope.fileimage = changeEvent.target.files[0];
                //     or all selected files:
                //     scope.fileread = changeEvent.target.files;
                //});

            });
        }
    }
}]);