// https://github.com/Gillardo/bootstrap-ui-treeview
// Version: 2.0.1
// Released: 2015-11-19 
angular.module('ui.bootstrap.treeview', []).factory('TreeViewService', function () {
    var factory = {};

    factory.treeView = [];
    factory._restoreNode = undefined;

    factory.selectedNode = undefined;

    factory.unselectNode = function () {
        factory.selectedNode = undefined;
    };

    factory.selectNode = function (node) {
        if (factory.selectedNode) factory.selectedNode.selected = undefined;

        factory.selectedNode = node;

        node.selected = true;
    };

    factory.toggleNode = function (node) {
        if (!node.children) return;

        // collapse / expand
        if (node.children && node.children.length > 0) {
            node.collapsed = !node.collapsed;
        }
    };

    factory.hasChild = function (list, id) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                return true;
            }
        }
        return false;
    };

    factory.restoreToNode = function (node) {
        factory._restoreNode = node;
    };

    factory.restore = function () {
        if (!factory._restoreNode) return;

        var id = factory._restoreNode.id;

        var hasRestoreNode = function (node) {
            if (node.id == id) {

                // set node as selected
                node.selected = true;

                // save node to service
                factory.selectedNode = node;

                return true;
            } else {
                if (!node.children) return;

                for (var i = 0; i < node.children.length; i++) {
                    if (hasRestoreNode(node.children[i])) {
                        return true;
                    }
                }
            }

            return false;
        };

        var collapse = function (node) {
            if (hasRestoreNode(node)) {
                node.collapsed = true;

                if (!node.children) return;

                for (var i = 0; i < node.children.length; i++) {
                    collapse(node.children[i]);
                }
            } else {
                node.collapsed = false;
            }
        };

        // check if this node contains the child id
        for (var i = 0; i < factory.treeView.length; i++) {
            collapse(factory.treeView[i]);
        }
    };

    factory.toggleAll = function (node) {
        // set all children equal to what the parent will be, 
        // else can get out of sync
        var collapsed = !node.collapsed;

        var iterate = function (child) {
            if (!child.children) {
                return;
            } else {
                child.collapsed = collapsed;

                for (var i = 0; i < child.children.length; i++) {
                    iterate(child.children[i]);
                }
            }
        };

        if (node) {
            iterate(node);
        }

    };

    return factory;
});
angular.module('ui.bootstrap.treeview').directive('treeView', ['$compile', 'TreeViewService', '$templateCache', function ($compile, TreeViewService, $templateCache) {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            ngModel: '='
        },
        controller: function() {
            // toggle when icon clicked
            this.toggleNode = function (node) {
                TreeViewService.toggleNode(node);
            };

            // select when name clicked
            this.selectNode = function (e, node) {
                TreeViewService.selectNode(node);

                e.stopPropagation();
                e.preventDefault();
            };
        },
        controllerAs: 'ctrl',
        link: function (scope, element, attrs, ctrl) {
            var isRoot = (!attrs.treeRoot ? true : false);
            var nodeLabel = attrs.nodeLabel || 'label';
            var itemClass = attrs.itemClass || '';
            var itemInclude = attrs.itemNgInclude || '';
            var itemIncludeHtml = '';

            if (itemInclude && itemInclude.length > 0) {
                itemIncludeHtml = $templateCache.get(attrs.itemNgInclude);
            }

            // remove attributes
            element.removeAttr('node-label');
            element.removeAttr('item-class');
            element.removeAttr('item-ng-include');
            element.removeAttr('tree-root');

            // template
            var template =
                '<ul>' +
                    '<li ng-repeat="node in ctrl.ngModel">' +
                        '<div class="node">' +
                            '<div' + (itemClass != '' ? ' class="' + itemClass + '"': '') + '>' +
                                '<i ng-click="ctrl.toggleNode(node)" ng-show="node.children && node.children.length > 0" ng-class="!node.collapsed ? \'has-child\' : \'has-child-open\'"></i>' +
                                '<i ng-click="ctrl.toggleNode(node)" class="no-child" ng-show="!node.children || node.children.length == 0"></i>' +
                                '<span ng-click="ctrl.selectNode($event, node)" ng-bind="node.' + nodeLabel + '" ng-class="{\'selected\' : node.selected}"></span>' +
                            '</div>' +
                            itemIncludeHtml +
                        '</div>' +
                        '<tree-view uib-collapse="!node.collapsed" ng-model="node.children" tree-root="false" node-label="' + nodeLabel + '" item-ng-include="' + itemInclude + '" item-class="' + itemClass + '"></tree-view>' +
                    '</li>' +
                '</ul>';

            // if root node
            if (isRoot) {
                // store our list
                TreeViewService.treeView = ctrl.ngModel;
            }

            var compiledHtml = $compile(template)(scope);

            element.append(compiledHtml);
        }
    };
}]);