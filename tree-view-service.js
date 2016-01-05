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
