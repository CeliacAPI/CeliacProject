// declaring global variable
var celiacApp = {};

// creating an object inside global variable to hold user allergy selections
celiacApp.allergies = ['393^Gluten-Free'];

// method to hide start button and show dairy allergy question
celiacApp.getStarted = function() {
	// on click of start button perform the following method
	$('#buttonStart').on('click', function() {
		// fadeOut wrapperIntro div
		$(this).parent('div').fadeOut(600, function() {
			// fadeIn wrapperAllergies div
			$('.wrapperAllergies').fadeIn(600);
		});
	});
};

// method to save allergy choice and call getMenu method
celiacApp.allergyChoice = function(){
	$('input[name=dairyAllergy]').on('click', function(){
		if ($(this).attr('id') === 'yesDairy') {
			// fadeOut wrapperAllergies
			$('.wrapperAllergies').fadeOut(600, function(){
				// fadeIn wrapperSubmit
				$('.wrapperSubmit').fadeIn(600);
			});
			// save allergy choice in allergies object
			celiacApp.allergies.push('396^Dairy-Free')
			// call getMenu function passing in allergies object
			celiacApp.getBreakfast(celiacApp.allergies);
		} else {
			// fadeOut wrapperAllergies
			$('.wrapperAllergies').fadeOut(600, function(){
				// fadeIn wrapperSubmit
				$('.wrapperSubmit').fadeIn(600);
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

// method to show all days
celiacApp.displayAll = function() {
	// fadeOut wrapperSubmit & fadeIn wrapperMeals
	$('.wrapperSubmit').fadeOut(600, function(){
		$('.wrapperMeals').fadeIn(600);
	});
};

// method to expand each day
celiacApp.expandDay = function() {
	// on click of plus icon
	$('.dayName > a > .fa-plus').click(function(e) {
		// prevent default link action
		e.preventDefault();
		// slide dayMeals div down
		$(this).parent().parent().next('div').slideDown(400);
		console.log($(this).parent().parent().next('div'));
		// show minus icon
		$(this).siblings('i').removeClass('hide');
		console.log($(this).siblings('i'));
		// hide plus icon
		$(this).addClass('hide');
		console.log($(this));
	});
}

// method to collapse each day
celiacApp.collapseDay = function() {
	// on click of minus icon
	$('.dayName > a > .fa-minus').click(function(e) {
		// prevent default link action
		e.preventDefault();
		// slide dayMeals div up
		$(this).parent().parent().next('div').slideUp(400);
		console.log($(this).parent().parent().next('div'));
		// show plus icon
		$(this).siblings('i').removeClass('hide');
		console.log($(this).siblings('i'));
		// hide minus icon
		$(this).addClass('hide');
		console.log($(this));
	});
}

// method to provide new meal
celiacApp.newMeal = function() {
	// for (var i = 0; i < 10;i++) {
	// on click of shuffle icon
		$('.dayMeal > .meal > a').click(function(e) {
			// prevent default link action
			e.preventDefault();
			// saving meal type in a variable
			var mealType = $(this).data('meal');
			// ajax request to yummly API for new meal
			$.ajax({
			  url: 'http://api.yummly.com/v1/api/recipes',
			  method: 'GET',
			  dataType: 'json',
			  data: {
			    _app_id: 'c96ac366',
			    _app_key: 'db32796dfa41f628acd8aad117494570',
			    requirePictures: 'true',	
			    allowedCourse: 'course^course-Breakfast and Brunch',
			    allowedAllergy: celiacApp.allergies
			  },
			  // if successful
			  success: function(result) {
			  	// console log returned meals
			  	console.log(result.matches[7]);
			  	// create variable to hold recipeUrl
			  	var recipeUrl = matches[7].imageUrlsBySize[90].replace("=s90-c","=s300-c");
			  	// show recipeImage
			  	console.log($(this).sibling('figure'));
			  	// show recipeName
			  	var $recipeTitle = matches[i].recipeName;
			  	$('.breakfast p').eq(i).append($recipeTitle);
			  },
			  // if not successful
			  error: function() {
			  	console.log('it didn\'t work!');
			  }
			});
		});
	// };
};

// init function
celiacApp.init = function() {
	celiacApp.getStarted();
	celiacApp.allergyChoice();
	celiacApp.expandDay();
	celiacApp.collapseDay();
	celiacApp.newMeal();
};

// doc ready call init function
$(document).ready(function(){
  celiacApp.init();
});
