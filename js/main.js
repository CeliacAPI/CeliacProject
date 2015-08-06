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
	// ajax request to yummly API
	$.ajax({
	  url: 'http://api.yummly.com/v1/api/recipes',
	  method: 'GET',
	  dataType: 'json',
	  data: {
	    _app_id: 'c96ac366',
	    _app_key: 'db32796dfa41f628acd8aad117494570',
	    requirePictures: 'true',	
	    allowedCourse: 'course^course-Breakfast and Brunch',
	    excludedCourse: 'course^course-Main Dishes',
	    allowedAllergy: '393^Gluten-Free'
	  },
	  // if successful
	  success: function(result) {
	  	console.log('it worked!');
	  	// console.log(result.matches);
	  	celiacApp.displayBreakfast(result.matches);
	  },
	  // if not successful
	  error: function() {
	  	console.log('it didn\'t work!');
	  }
	});
};

celiacApp.displayBreakfast = function(matches){
	for (var i = 0; i < matches.length;i++){
		// console.log(matches[i]);
		var recipeId = matches[i].id; // in case we need to remove duplicates
		// console.log(recipeId);
		var recipeUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		console.log(recipeUrl);
		// show recipeImage
		// $('.breakfastImg').attr('src', recipeImage);
		var $recipeImg = $('<img>').attr('src', recipeUrl);
		$('.breakfast figure').append($recipeImg);

	
		// define var for recipeTitle
		var recipeTitle = matches[i].recipeName;
		// console.log(recipeTitle);
	}
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
