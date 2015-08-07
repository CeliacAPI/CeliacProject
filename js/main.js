// declaring global variable
var celiacApp = {};

// creating an object inside global variable to hold user allergy selections
celiacApp.allergies = ['393^Gluten-Free'];

// method to hide start button and show dairy allergy question
celiacApp.getStarted = function() {
	// on click of start button perform the following method
	$('#buttonStart').on('click', function() {
		// fadeOut start button
		$('#buttonStart').fadeOut(1000, function() {
			// fadeIn wrapperAllergies div
			$('.wrapperAllergies').fadeIn(1000);
		});
	});
};

// method to save allergy choice and call getMenu method
celiacApp.allergyChoice = function(){
	$('input[name=dairyAllergy]').on('click', function(){
		if ($(this).attr('id') === 'yesDairy') {
			// fadeOut wrapperAllergies
			$('.wrapperAllergies').fadeOut(1000, function(){
				// fadeIn wrapperSubmit
				$('.wrapperSubmit').fadeIn(1000);
			});
			// save allergy choice in allergies object
			celiacApp.allergies.push('396^Dairy-Free')
			// call getMenu function passing in allergies object
			celiacApp.getBreakfast(celiacApp.allergies);
		} else {
			// fadeOut wrapperAllergies
			$('.wrapperAllergies').fadeOut(1000, function(){
				// fadeIn wrapperSubmit
				$('.wrapperSubmit').fadeIn(1000);
			});
			// call getMenu function passing in allergies object
			celiacApp.getBreakfast(celiacApp.allergies);
		};
	});
};

// method to get breakfast
celiacApp.getBreakfast = function() {
	// on click of get meal plan button
	// get breakfasts
	$('#buttonMeals').on('click', function(){
		$.ajaxSettings.traditional = true;
		// ajax request to yummly API for breakfast meals
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
		  	// console log returned meals
		  	console.log(result.matches);
		  	celiacApp.displayBreakfast(result.matches);
		  	celiacApp.getLunch(celiacApp.allergies);
		  },
		  // if not successful
		  error: function() {
		  	console.log('it didn\'t work!');
		  }
		});
	});
};

// method to get lunch
celiacApp.getLunch = function() {
	$.ajaxSettings.traditional = true;
	// ajax request to yummly API for lunch meals
	$.ajax({
	  url: 'http://api.yummly.com/v1/api/recipes',
	  method: 'GET',
	  dataType: 'json',
	  data: {
	    _app_id: 'c96ac366',
	    _app_key: 'db32796dfa41f628acd8aad117494570',
	    requirePictures: 'true',	
	    allowedCourse: 'course^course-Salads',
	    excludedCourse: 'course^course-Main Dishes',
	    allowedAllergy: celiacApp.allergies
	  },
	  // if successful
	  success: function(result) {
	  	// console log returned meals
	  	console.log(result.matches);
	  	celiacApp.displayLunch(result.matches);
	  	celiacApp.getSnacks(celiacApp.allergies);
	  },
	  // if not successful
	  error: function() {
	  	console.log('it didn\'t work!');
	  }
	});
};

// method to get snacks
celiacApp.getSnacks = function() {
	$.ajaxSettings.traditional = true;
	// ajax request to yummly API for snacks
	$.ajax({
	  url: 'http://api.yummly.com/v1/api/recipes',
	  method: 'GET',
	  dataType: 'json',
	  data: {
	    _app_id: 'c96ac366',
	    _app_key: 'db32796dfa41f628acd8aad117494570',
	    q: 'snack',
	    requirePictures: 'true',	
	    // allowedCourse: 'course^course-Lunch and Snacks',
	    excludedCourse: 'course^course-Main Dishes',
	    allowedAllergy: celiacApp.allergies
	  },
	  // if successful
	  success: function(result) {
	  	// console log returned meals
	  	console.log(result.matches);
	  	celiacApp.displaySnacks(result.matches);
	  	celiacApp.getDinner(celiacApp.allergies);
	  },
	  // if not successful
	  error: function() {
	  	console.log('it didn\'t work!');
	  }
	});
};

// method to get dinner
celiacApp.getDinner = function() {
	$.ajaxSettings.traditional = true;
	// ajax request to yummly API for snacks
	$.ajax({
	  url: 'http://api.yummly.com/v1/api/recipes',
	  method: 'GET',
	  dataType: 'json',
	  data: {
	    _app_id: 'c96ac366',
	    _app_key: 'db32796dfa41f628acd8aad117494570',
	    requirePictures: 'true',	
	    allowedCourse: 'course^course-Main Dishes',
	    allowedAllergy: celiacApp.allergies
	  },
	  // if successful
	  success: function(result) {
	  	// console log returned meals
	  	console.log(result.matches);
	  	celiacApp.displayDinner(result.matches);
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

celiacApp.displayLunch = function(matches){
	for (var i = 0; i < matches.length;i++){
	 // console.log(matches[i]);
		// var recipeId = matches[i].id; // in case we need to remove duplicates
		// console.log(recipeId);
		var recipeUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		// console.log(recipeUrl);
		// show recipeImage
		var $recipeImg = $('<img>').attr('src', recipeUrl);
		$('.lunch figure').eq(i).append($recipeImg);
		// show recipeName
		var $recipeTitle = matches[i].recipeName;
		$('.lunch p').eq(i).append($recipeTitle);
	}
};

celiacApp.displaySnacks = function(matches){
	for (var i = 0; i < matches.length;i++){
	 // console.log(matches[i]);
		// var recipeId = matches[i].id; // in case we need to remove duplicates
		// console.log(recipeId);
		var recipeUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		// console.log(recipeUrl);
		// show recipeImage
		var $recipeImg = $('<img>').attr('src', recipeUrl);
		$('.snack figure').eq(i).append($recipeImg);
		// show recipeName
		var $recipeTitle = matches[i].recipeName;
		$('.snack p').eq(i).append($recipeTitle);
	}
};

celiacApp.displayDinner = function(matches){
	for (var i = 0; i < matches.length;i++){
	 // console.log(matches[i]);
		// var recipeId = matches[i].id; // in case we need to remove duplicates
		// console.log(recipeId);
		var recipeUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		// console.log(recipeUrl);
		// show recipeImage
		var $recipeImg = $('<img>').attr('src', recipeUrl);
		$('.dinner figure').eq(i).append($recipeImg);
		// show recipeName
		var $recipeTitle = matches[i].recipeName;
		$('.dinner p').eq(i).append($recipeTitle);
		// call displayAll
		celiacApp.displayAll();
	}
};

celiacApp.displayAll = function() {
	// fadeOut wrapperSubmit & fadeIn wrapperMeals
	$('.wrapperSubmit').fadeOut(1000, function(){
		$('.wrapperMeals').fadeIn(1000);
	});
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
