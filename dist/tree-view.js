// https://github.com/Gillardo/bootstrap-ui-treeview
// Version: 3.0.1
// Released: 2016-01-05 
angular.module('ui.bootstrap.treeview', []).factory('TreeViewService', function () {
    function TreeViewService() {
        var that = this;

        this.nodes = [];
        this.selectedNode = undefined;
        this.collapsed = [];

        // will search all nodes for this node, and expand each parent node
        this.collapseTo = function(node) {

            function iterate(list) {

                for (var i = 0; i < list.length; i++) {
                    var found = false;

                    if (list[i] == node) {
                        found = true;
                    } else if (angular.isDefined(list[i].children)) {
                        found = iterate(list[i].children);
                    }

                    if (found == true) {
                        that.collapsed.push(list[i]);
                        return true;
                    }
                }

                return false;
            }

            iterate(that.nodes);
        };
    }

    return TreeViewService;
});

angular.module('ui.bootstrap.treeview').directive('treeView', ['$compile', '$templateCache', function ($compile, $templateCache) {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            treeService: '='
        },
        controller: function () {

            var that = this;

            this.isCollapsed = function(node) {
                return that.treeService.collapsed.indexOf(node) > -1;
            };

            // toggle when icon clicked
            this.toggleNode = function (node) {

                if (!node.children) return;

                // collapse / expand
                if (node.children && node.children.length > 0) {
                    // add the node to our collapsed array
                    var index = that.treeService.collapsed.indexOf(node);

                    if (index == -1)
                        that.treeService.collapsed.push(node);
                    else
                        that.treeService.collapsed.splice(index, 1);
                }
            };

            // select when name clicked
            this.selectNode = function (e, node) {
                that.treeService.selectedNode = node;

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
                    '<li ng-repeat="node in [REPLACENODES]">' +
                        '<div ng-click="ctrl.selectNode($event, node)" class="node" ng-class="{\'selected\' : node == ctrl.treeService.selectedNode}">' +
                            '<div ' + (itemClass != '' ? ' class="' + itemClass + '"' : '') + '>' +
                                '<i ng-click="ctrl.toggleNode(node)" ng-show="node.children && node.children.length > 0" ng-class="!ctrl.isCollapsed(node) ? \'has-child\' : \'has-child-open\'"></i>' +
                                '<i ng-click="ctrl.toggleNode(node)" class="no-child" ng-show="!node.children || node.children.length == 0"></i>' +
                                '<span ng-bind="node.' + nodeLabel + '" ng-class="{\'selected\' : node == ctrl.treeService.selectedNode}"></span>' +
                            '</div>' +
                        itemIncludeHtml +
                        '</div>' +
                        '<tree-view uib-collapse="!ctrl.isCollapsed(node)" tree-service="ctrl.treeService" node-children="node.children" tree-root="false" node-label="' + nodeLabel + '" item-ng-include="' + itemInclude + '" item-class="' + itemClass + '"></tree-view>' +
                    '</li>' +
                '</ul>';

            if (!isRoot) {
                template = template.replace('[REPLACENODES]', '$parent.node.children');
            } else {
                template = template.replace('[REPLACENODES]', 'ctrl.treeService.nodes');
            }

            var compiledHtml = $compile(template)(scope);

            element.append(compiledHtml);
        }
    };
}]);