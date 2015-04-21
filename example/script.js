var app = angular.module('app', ['ui.bootstrap', 'ui.bootstrap.treeview']);

app.controller('MyController', ['$scope', 'TreeViewService', function($scope, TreeViewService) {

    $scope.myData = [
        {
            id: 1,
            name: 'first',
            children: []
        },
        {
            id: 2,
            name: 'second',
            children: [
                {
                    id: 10,
                    name: 'child of second',
                    children: [
                        {
                            id: 20,
                            name: 'grand child',
                            children: []
                        }
                    ]
                }
            ]
        }
    ];

    $scope.$watch(function() {
        return TreeViewService.selectedNode;
    }, function() {
        $scope.selectedNode = TreeViewService.selectedNode;
    });

    $scope.toggleAll = function() {
        TreeViewService.toggleAll($scope.myData[1]);
    };

    $scope.toggle = function() {
        TreeViewService.toggleNode(TreeViewService.selectedNode);
    };

    $scope.select = function() {
        TreeViewService.selectNode($scope.myData[0]);
    };

    $scope.unselect = function() {
        TreeViewService.unselectNode();
    }
}]);