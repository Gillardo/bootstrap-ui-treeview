angular.module('ui.bootstrap.treeview', []).factory('TreeViewService', function () {
    var factory = {};

    factory.selectedNode = null;

    factory.unselectNode = function () {
        if (factory.selectedNode) factory.selectedNode.selected = undefined;

        factory.selectedNode = null;
    };

    factory.selectNode = function (node) {
        if (factory.selectedNode) factory.selectedNode.selected = undefined;

        factory.selectedNode = node;

        node.selected = true;
    };

    factory.toggleNode = function (node) {
        // no node selected
        if (!node) return;

        // no children
        if (!node.children) return;

        // collapse / expand
        if (node.children && node.children.length > 0) {
            node.collapsed = !node.collapsed;
        }
    };

    factory.toggleAll = function (node) {
        // no node selected
        if (!node) return;

        // set all children equal to what the parent will be, 
        // else can get out of sync
        var collapsed = !node.collapsed;

        var iterate = function (child) {
            if (!child.children) {
                return null;
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