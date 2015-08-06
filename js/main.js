// declaring global variable
var celiacApp = {};

// creating an object inside global variable to hold user allergy selections
celiacApp.allergies = ['393^Gluten-Free'];

// method to hide start button and show dairy allergy question
celiacApp.getStarted = function() {
	// on click of start button perform the following method
	$('#buttonStart').on('click', function() {
		// hide start button
		$('#buttonStart').addClass('hide');
		// show dairy allergy question
		$('.wrapperAllergies').removeClass('hide');
	});
};

celiacApp.allergyChoice = function(){
	$('input[name=dairyAllergy]').on('click', function(){
		if ($(this).attr('id') === 'yesDairy') {
			// hide wrapper allergies
			$('.wrapperAllergies').fadeOut(2000).addClass('hide');
			// show wrapperSubmit
			$('.wrapperSubmit').fadeOut(2000).removeClass('hide');
			// save allergy choice in object
			celiacApp.allergies.push('396^Dairy-Free')
			// call getMenu function
			celiacApp.getMenu(celiacApp.allergies);
		} else {
			// hide wrapper allergies
			$('.wrapperAllergies').fadeOut(2000).addClass('hide');
			// show wrapperSubmit
			$('.wrapperSubmit').fadeOut(2000).removeClass('hide');
			// call getMenu function
			celiacApp.getMenu(celiacApp.allergies);
		};
	});
};

// method1
celiacApp.getMenu = function() {
	$('#buttonMeals').on('click', function(){
		$.ajaxSettings.traditional = true;
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
		    allowedAllergy: celiacApp.allergies
		  },
		  // if successful
		  success: function(result) {
		  	// console.log('it worked!');
		  	console.log(result.matches);
		  	celiacApp.displayBreakfast(result.matches);
		  	// celiacApp.displayLunch(result.matches);
		  },
		  // if not successful
		  error: function() {
		  	console.log('it didn\'t work!');
		  }
		});
	});
};

celiacApp.displayBreakfast = function(matches){
	for (var i = 0; i < matches.length;i++){
	 // console.log(matches[i]);
		// var recipeId = matches[i].id; // in case we need to remove duplicates
		// console.log(recipeId);
		var recipeUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		// console.log(recipeUrl);
		// show recipeImage
		var $recipeImg = $('<img>').attr('src', recipeUrl);
		$('.breakfast figure').eq(i).append($recipeImg);
		// show recipeName
		var $recipeTitle = matches[i].recipeName;
		$('.breakfast p').eq(i).append($recipeTitle);
	}
};

celiacApp.displyLunch = function() {
	for (var i = 0; i < matches.length;i++){
	 console.log(matches[i]);
		// var recipeId = matches[i].id; // in case we need to remove duplicates
		// console.log(recipeId);
		var recipeUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		console.log(recipeUrl);
		// show recipeImage
		var $recipeImg = $('<img>').attr('src', recipeUrl);
		$('.breakfast figure').eq(i).append($recipeImg);
		// show recipeName
		var $recipeTitle = matches[i].recipeName;
		$('.breakfast p').eq(i).append($recipeTitle);
	}
};

// define your init function
// this starts everything going on the page
celiacApp.init = function() {
	celiacApp.getStarted();
	celiacApp.allergyChoice();
};

// document ready function which calls your init function
$(document).ready(function(){
  celiacApp.init();
});
