# Bootstrap-UI/treeview

AngularJs directive to show a treeview like structure of an item. Uses the bootstrap-UI collapse directive for a nice sliding animation

## Installation
To use the directive you must have the following angular-ui bootstrap directives included already
* Collapse

You should already have the ui.bootstrap dependancy included in your app.js file like below, You then need to add ui.bootstrap.treeview, as so
```sh
angular.module('app', ['ui.bootstrap', 'ui.bootstrap.treeview']);
```
Download the source from dist/tree-view.min.js file and include it in your project.

## Usage
You have the following properties available to use with the directive.  All are optional unless stated otherwise
* treeView (required) - Your object that contains items
* nodeLabel - (string)
* itemNgInclude (string)
 
##### nodeLabel
The name of the property that you want to display for each item
##### itemNgInclude
A string if you want to include an include for each repeated item. Each item is referenced as a node and you can reference any property within that node

Each item must have a children property, this is what will contain a further list of more items.

## Example
Here is an example to use the directive with a bootstrap input, displaying a calendar button

####DATA
```sh
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
```

####HTML
```sh
<script type="text/ng-template" id="my/url/to/a/template.html">
    <div class="pull-right" style="background:yellow;color:red;padding:5px">{{ node.name }}</div>
</script>
<div tree-view="myData" node-label="name" item-ng-include="my/url/to/a/template.html"></div>
```

And you end up with a treeview like so

![alt tag](http://imageshack.com/a/img909/2623/gn5r3S.gif)

## Support
This was developed using angular-ui bootstrap Version: 0.12.0 - 2014-11-16.  If you have a bug, please check what version of angular-ui you are using.  If you are using a version prior to this, then please upgrade if you can and try it. If the problem persists, please let me know.  I do have a day job but will try to get back to you asap.  If you can fix the bug, then let me know how, or even better, submit a pull request.