angular.module('AppUI')

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

            html += '<span class="pull-right icon glyphicon glyphicon-ok-sign" ng-show="options' + datID + '" ng-click="' + treeId + '.editNodeLabel(\'' + item[id] + '\', ' + level + ')"></span>';
            html += '<span class="pull-right icon glyphicon glyphicon-plus-sign" ng-show="options' + datID + '" ng-click="' + treeId + '.addNodeLabel(\'' + item[id] + '\', ' + level + ')"></span>';
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

                    dataFound.selected = true;

                    scope.$emit('Menu.Selected', {
                        Id: selectedNode,
                        level: level
                    });

                    var html = '<ul class="list-group" add-list>';

                    html += templCreation(scope[treeModel], true, treeId, nodeChildren, nodeId, nodeLabel, 0);

                    html += '</ul>';

                    element.html('').append($compile(html)(scope));
                };

                //edit
                scope[treeId].editNodeLabel = scope[treeId].addNodeLabel || function (selectedNode, level) {
                    //console.log("edit with root " + selectedNode + " on level " + level);
                    scope.$emit('Menu.Edit', {
                        Id: selectedNode,
                        level: level
                    });
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
                    if (isMouseInFirstHalf(e, targetNode))
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