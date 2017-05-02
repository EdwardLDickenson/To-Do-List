window.onload = function() {
  console.log("JavaScript file loaded correctly");
}

var app = angular.module("todo", []);
app.controller("ctrl", function($scope){

  $scope.todoItems = [];
  $scope.finishedItems = [];

  $scope.append = function(){
    //  Do not add items which are empty to the list or database
    if($scope.todoBody != "" && $scope.todoBody != undefined)
    {
      $scope.item = {"todo": $scope.todoBody, "checked": false};
      $scope.todoItems.push($scope.item);
      console.log("Add new item: \"" + $scope.todoBody + "\"");
    }
  }

  $scope.checked = function(arg){

    //  Push the item to the other list
    if($scope.todoItems.length == 1)
    {
      $scope.finishedItems.push($scope.todoItems[0]);
    }
    else
    {
      //  I started out by using an iterator, but that created a lot of manual
      //  work.  So I just decided to let the JS do that work and use indexOf.
      $scope.finishedItems.push($scope.todoItems[$scope.todoItems.indexOf(arg)]);
    }

    if($scope.todoItems.length == 1)
    {
      $scope.todoItems.splice(0, 1);
    }

    else
    {
      $scope.todoItems.splice($scope.todoItems.indexOf(arg), 1);
    }

    //  Flip the true/false value and log to console
    arg.checked = !arg.checked;
    console.log("\"" + arg.todo + "\" was checked and is now: " +
    String(arg.checked));
  }
});
