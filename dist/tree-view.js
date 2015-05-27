// https://github.com/Gillardo/bootstrap-ui-treeview
// Version: 1.0.1
// Released: 2015-05-27 
angular.module('ui.bootstrap.treeview', []).factory('TreeViewService', function () {
    var factory = {};

    factory.treeView = [];
    factory._restoreNode = null;

    factory.selectedNode = null;

    factory.unselectNode = function () {
        factory.selectedNode = null;
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
angular.module('ui.bootstrap.treeview').directive('treeView', ['$compile', 'TreeViewService', function ($compile, TreeViewService) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var model = attrs.treeView;
            var isRoot = (!attrs.treeRoot ? true : false);
            var nodeLabel = attrs.nodeLabel || 'label';
            var itemInclude = attrs.itemNgInclude || '';
            var itemIncludeHtml = '';

            if (itemInclude && itemInclude.length > 0) {
                itemIncludeHtml = '<div ng-include="\'' + attrs.itemNgInclude + '\'"></div>'
            }

            // template
            var template =
                '<ul class="tree-view">' +
                '<li ng-repeat="node in ' + model + '">' +
                '<div>' +
                '<div>' +
                '<i ng-click="toggleNode(node)" ng-show="node.children && node.children.length > 0" ng-class="!node.collapsed ? \'has-child\' : \'has-child-open\'"></i>' +
                '<i ng-click="toggleNode(node)" class="no-child" ng-show="!node.children || node.children.length == 0"></i>' +
                '<span ng-click="selectNode(node)" ng-bind="node.' + nodeLabel + '" ng-class="{\'selected\' : node.selected}"></span>' +
                '</div>' +
                itemIncludeHtml +
                '</div>' +
                '<div class="tree-view" collapse="!node.collapsed" tree-view="node.children" tree-root="false" node-label="' + nodeLabel + '" item-ng-include="' + itemInclude + '" ></div>' +
                '</li>' +
                '</ul>';

            // root node
            if (isRoot) {

                // store our list
                TreeViewService.treeView = scope.$eval(attrs.treeView);

                // restore to previously opened node, if one
                TreeViewService.restore();

                // toggle when icon clicked
                scope.toggleNode = function (node) {
                    TreeViewService.toggleNode(node);
                };

                // select when name clicked
                scope.selectNode = function (node) {
                    TreeViewService.selectNode(node);
                };
            }

            var compiledHtml = $compile(template)(scope);

            elem.append(compiledHtml);
        }
    };
}]);