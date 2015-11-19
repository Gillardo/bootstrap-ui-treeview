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