window.onload = function() {
  console.log("JavaScript file loaded correctly");
}

//  Once again, using these iterators is a C like stylistic choice
//  Another approch might be to use the todo item as a key in a map, and pair
//  the item with a bool. But if I did that, I'd probably have to check for
//  uniqueness.

var todoIterator = 0;
var app = angular.module("todo", []);
app.controller("ctrl", function($scope){

  $scope.todoItems = [];
  $scope.finishedItems = [];

  $scope.append = function(){
    //  Do not add items which are empty to the list or database
    if($scope.todoBody != "" && $scope.todoBody != undefined)
    {
      $scope.item = {"todo": $scope.todoBody, "checked": false,
      "pos": todoIterator};
      $scope.todoItems.push($scope.item);
      console.log("Add new item: \"" + $scope.todoBody + "\"");
      ++todoIterator;
      console.log("todoIterator: " + String(todoIterator));
    }
  }

  $scope.checked = function(arg){

    //  Push the item to the other list
    $scope.finishedItems.push($scope.todoItems[arg.pos]);

    //  Remove the item from the first list
    if($scope.todoItems.length == 1)
    {
      $scope.todoItems.splice(0, 1);
    }
    $scope.todoItems.splice(arg.pos, 1);

    //  Flip the true/false value, de/increment iterators and log to console
    arg.checked = !arg.checked;
    console.log("\"" + arg.todo + "\" was checked and is now: " +
    String(arg.checked));
    --todoIterator;
    console.log("todoIterator: " + String(todoIterator));
  }
});
