<?php
/*
  Plugin Name: To-Do List
  Description: To-Do List plugin for Wordpress
  Author: Edward Lloyd Dickenson
  Author URI: https://github.com/EdwardLDickenson
  Version: 0.1
*/

//  The HTML was broken up into different functions so that the user could
//  decide which order, completed or uncompleted first, they want to display
//  information.

function startTodo()
{
    $path = get_template_directory_uri() . "/todo/";
    wp_register_style("style", $path . "todo.css");
    wp_enqueue_style("style");

    wp_register_script("script", $path . "todo.js");
    wp_enqueue_script("script");

    $result = "
    <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js'></script>
    <div data-ng-app='todo' data-ng-controller='ctrl'>
      <h1>To-Do List</h1>
      <form>
        <!-- I could make the rows and columns for the textarea variables and figure out the lenght of the strings in JavaScript, but that is probably not necessary here -->
        <textarea data-ng-model='todoBody' placeholder='Input a new To-Do item here' rows='4' cols='26'></textarea><br>
        <input type='button' value='Add New To-Do Item' data-ng-click='append()'></input>
      </form>
    ";

    return $result;
}
add_shortcode("start", "startTodo");

function uncompletedTasks()
{
  $result = "
  <h4>Uncompleted To-Do Tasks</h4>
  <ul>
      <li data-ng-repeat='value in todoItems'><div>
        <input type='checkbox' data-ng-model='finished' data-ng-click='checked(value)'></input>
        {{value.todo}}
      </div></li>
  </ul>
  ";

  return $result;
}
add_shortcode("uncompleted", "uncompletedTasks");

function completedTasks()
{
  $result = "
  <h4>Completed To-Do Tasks</h4>
  <ul>
    <li data-ng-repeat='value in finishedItems'><div>
      {{value.todo}}
    </div></li>
  </ul>
  ";

  return $result;
}
add_shortcode("completed", "completedTasks");

function endTodo()
{
  $result = "
    </div>
  ";

  return $result;
}
add_shortcode("end", "endTodo");

?>
