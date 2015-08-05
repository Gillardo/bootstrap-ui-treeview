# Bootstrap-UI/treeview

AngularJs directive to show a treeview like structure of an item. Uses the bootstrap-UI collapse directive for a nice sliding animation

[Demo](http://plnkr.co/edit/n3KejGp2eAGc1S4VKoAK?p=preview)

## Installation
To use the directive you must have the following angular-ui bootstrap directives included already
* Collapse

You should already have the ui.bootstrap dependancy included in your app.js file like below, You then need to add ui.bootstrap.treeview, as so
```sh
angular.module('app', ['ui.bootstrap', 'ui.bootstrap.treeview']);
```
Download the source from dist/tree-view.min.js file and include it in your project.

Or use bower

```
bower install bootstrap-ui-treeview -S
```

and link with ``` bower_components/bootstrap-ui-treeview/dist/treeview.min.js ```


## Usage
You have the following properties available to use with the directive.  All are optional unless stated otherwise
* treeView (required) - Your object that contains items
* nodeLabel - (string)
* itemClass - (string)
* itemNgInclude (string)
 
##### nodeLabel
The name of the property that you want to display for each item
##### itemNgInclude
A string if you want to include an include for each repeated item. Each item is referenced as a node and you can reference any property within that node
##### itemClass
A string if you want to apply a css class to each item. This is needed to format items better if you use pull-right in your itemNgInclude template, you can then use pull-left on the item

Each item must have a children property, this is what will contain a further list of more items.

#### Service
There is a tree-view service included as well, so you can access the tree-view from another controller/directive/service.  On the service there are the following methods

##### unselectNode()
Call this function to unselect a selected node

##### selectNode(node)
Pass in a node from the tree-view to select it.  This method is called via the directive to select the node upon clicking on it

##### toogleNode(node)
When called, the node passed in be toggled between being expanded or closed state

##### toggleAll(node)
The node and all its children will change to either expanded or closed state.

## Css
In order for you to add styles to the tree-view, each tree-view is created with a className of tree-view.  You can override any styling you want, by creating your own css.

If you would like to use a bootstrap dropdown (or another element that uses collapse class) within an item-ng-include template, the dropdown will be cut off when you are on the last element of the tree-view.  To get round this you need to apply the following css class rule (thanks jziolkow)

```sh
.tree-view.collapse.in {
    overflow: visible;
}
```


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