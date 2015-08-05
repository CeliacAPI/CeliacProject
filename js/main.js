// declare one global variable with the value of an empty object
// replace globalVariableName with something meaningful to the project
var celiacApp = {};

// if there is a value you will use over and over you might want to store it as a property in your global variable
// replace 'property' with a name that makes sense for the value you want to store (it can be a url, a string, a key, a number, etc.)
celiacApp.url = 'http://www.urlhere.com';

// write your pseudocode here
// and then write a series of functions to execute each step
// each of these functions will be stored as methods in the global variable

// method1
celiacApp.getMenu = function() {

};

// method2
celiacApp.showMenu = function() {

};

// define your init function
// this starts everything going on the page
celiacApp.init = function() {
	// calling method1
	celiacApp.getMenu();
	// calling method2
	celiacApp.showMenu();
};

// document ready function which calls your init function
$(document).ready(function(){
  celiacApp.init();
});
