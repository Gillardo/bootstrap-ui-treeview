angular.module('ui.bootstrap.treeview', []).factory('TreeViewService', function () {
    function TreeViewService() {
        var that = this;

        this.nodes = [];
        this.selectedNode = undefined;
        this.collapsed = [];

    }

    return TreeViewService;
});
