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

            elem.html(compiledHtml);
        }
    };
}]);