var app = angular.module('app', ['ui.bootstrap', 'ui.bootstrap.treeview']);

app.controller('MyController', ['$scope', 'TreeViewService', function($scope, TreeViewService) {

    var service = new TreeViewService;

    $scope.myService = service;
    $scope.myService.nodes = [
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

    $scope.select = function() {
        service.selectedNode = service.nodes[0];
    };

    $scope.unselect = function() {
        service.selectedNode = undefined;
    }
}]);