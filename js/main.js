// declaring global variable
var celiacApp = {};

// storing the yummly root url as a property in the global variable
celiacApp.yummlyRoot = 'http://www.yummly.com/recipe/';

// creating an object inside global variable to hold user allergy selections
celiacApp.allergies = ['393^Gluten-Free'];

// creating an empty array inside global variable to hold returned breakfasts
celiacApp.breakfasts = [];

// creating an empty array inside global variable to hold returned lunches
celiacApp.lunches = [];

// creating an empty array inside global variable to hold returned snacks
celiacApp.snacks = [];

// creating an empty array inside global variable to hold returned dinners
celiacApp.dinners = [];

// method to hide start button and show dairy allergy question
celiacApp.getStarted = function() {
	$('.title-wrapper').fadeIn(1000);
	$('h1').fadeIn(1000);
	$('.wrapper').fadeIn(1000);
	// on click of start button
	$('#buttonStart').on('click', function() {
		// fadeOut wrapperIntro div
		$(this).parent('div').fadeOut(600, function() {
			// fadeIn wrapperAllergies div
			$('.wrapperAllergies').fadeIn(600);
		});
	});
};

// method to save allergy choice and call getBreakfasst method
celiacApp.allergyChoice = function(){
	// on click of radio button
	$('input[name=dairyAllergy]').on('click', function(){
		// if user has a dairy allergy
		if ($(this).attr('id') === 'yesDairy') {
			// fadeOut wrapperAllergies
			$('.wrapperAllergies').fadeOut(600, function(){
				// fadeIn wrapperSubmit
				$('.wrapperSubmit').fadeIn(600);
			});
			// save allergy choice in allergies object
			celiacApp.allergies.push('396^Dairy-Free');
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
	$('#buttonMeals').on('click', function(){
		// fade out h1
		$('h1').fadeOut();
		// fade out footer
		$('footer').fadeOut();
		// fade out wrapper div
		$('.wrapper').fadeOut(400, function() {
			// fade in loading div
			$('.wrapperLoading').fadeIn();
		});
		// Drew told us to add this line of code ???
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
		    maxResult: 100,
		    allowedAllergy: celiacApp.allergies
		  },
		  // if successful
		  success: function(result) {
		  	// push returned breakfasts to array
		  	celiacApp.breakfasts.push(result.matches);
		  	// console log breakfasts array
		  	console.log(celiacApp.breakfasts);
		  	// call displayBreakfast method 
		  	celiacApp.displayBreakfast(result.matches);
		  	// call getLunch method
		  	celiacApp.getLunch(celiacApp.allergies);
		  },
		  // if not successful
		  error: function() {
		  	console.log('AJAX request for Yummly breakfasts not successful!');
		  }
		});
	});
};

// method to get lunch
// refer to getBreakfast method for comments
celiacApp.getLunch = function() {
	$.ajaxSettings.traditional = true;
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
	    maxResult: 100,
	    allowedAllergy: celiacApp.allergies
	  },
	  // if successful
	  success: function(result) {
	  	celiacApp.lunches.push(result.matches);
	  	console.log(celiacApp.lunches);
	  	celiacApp.displayLunch(result.matches);
	  	celiacApp.getSnacks(celiacApp.allergies);
	  },
	  // if not successful
	  error: function() {
	  	console.log('AJAX request for Yummly lunches not successful!');
	  }
	});
};

// method to get snacks
// refer to getBreakfast method for comments
celiacApp.getSnacks = function() {
	$.ajaxSettings.traditional = true;
	$.ajax({
	  url: 'http://api.yummly.com/v1/api/recipes',
	  method: 'GET',
	  dataType: 'json',
	  data: {
	    _app_id: 'c96ac366',
	    _app_key: 'db32796dfa41f628acd8aad117494570',
	    q: 'snack',
	    requirePictures: 'true',
	    allowedCourse: 'course^course-Lunch and Snacks',
	    excludedCourse: 'course^course-Main Dishes',
	    maxResult: 100,
	    allowedAllergy: celiacApp.allergies
	  },
	  // if successful
	  success: function(result) {
	  	celiacApp.snacks.push(result.matches);
	  	console.log(celiacApp.snacks);
	  	celiacApp.displaySnacks(result.matches);
	  	celiacApp.getDinner(celiacApp.allergies);
	  },
	  // if not successful
	  error: function() {
	  	console.log('AJAX request for Yummly snacks not successful!');
	  }
	});
};

// method to get dinner
// refer to getBreakfast method for comments
celiacApp.getDinner = function() {
	$.ajaxSettings.traditional = true;
	$.ajax({
	  url: 'http://api.yummly.com/v1/api/recipes',
	  method: 'GET',
	  dataType: 'json',
	  data: {
	    _app_id: 'c96ac366',
	    _app_key: 'db32796dfa41f628acd8aad117494570',
	    requirePictures: 'true',	
	    allowedCourse: 'course^course-Main Dishes',
	    maxResult: 100,
	    allowedAllergy: celiacApp.allergies
	  },
	  // if successful
	  success: function(result) {
	  	celiacApp.dinners.push(result.matches);
	  	console.log(celiacApp.dinners);
	  	celiacApp.displayDinner(result.matches);
	  },
	  // if not successful
	  error: function() {
	  	console.log('AJAX request for Yummly dinners not successful!');
	  }
	});
};

// method to display breakfast recipes
celiacApp.displayBreakfast = function(matches){
	for (var i = 0; i < matches.length; i++){
		// console log returned breakfast recipes
	 	// console.log(matches[i]);
	 	// creating a variable to hold the recipe img url
		var recipeImgUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		// create a variable to hold the recipe img url inside img tags
		var $recipeImg = $('<img>').attr('src', recipeImgUrl);
		// inserting the created img tags into the existing figure tags
		$('.breakfast figure').eq(i).append($recipeImg);
		// creating a variable to hold the recipe id
		var $recipeId = matches[i].id;
		// creating a variable to hold the recipe url (root url + recipe id)
		var $recipeUrl = celiacApp.yummlyRoot.concat($recipeId);
		// inserting the recipe url 
		$('.breakfast .flex-mealName a').eq(i).attr('href', $recipeUrl);
		// creating a variable to hold the recipe title
		var $recipeTitle = matches[i].recipeName;
		// inserting the recipe name inside the existing a tags
		$('.breakfast .flex-mealName a').eq(i).append($recipeTitle);
		// creating a variable to hold the recipe ingredients
		var $recipeIngredients =  matches[i].ingredients;
		// creating a variable to hold the recipe ingredients as a string
		var $ingredientsString = $recipeIngredients.join(', ');
		// inserting the ingredients into the existing p tag
		$('.breakfast .flex-mealInfo .flex-mealName .recipeIngredients').eq(i).append($ingredientsString);
		// creating a variable to hold recipe email root message
		var emailRoot = 'mailto:?subject=Gluten-Free Breakfast Recipe&body=';
		// creating a variable to hold recipe email content
		var emailContent = '%0D%0A' + $recipeTitle + '%0D%0A' + $recipeUrl + '%0D%0A%0D%0Avia http://www.celiacmenuplanner.com';
		// creating a variable to hold recipe email message
		var $recipeEmail = emailRoot.concat(emailContent);
		// inserting the recipe name and link inside the existing a mail to tag
		$('.breakfast .flex-mealLinks .email').eq(i).attr('href', $recipeEmail);
	}
};

// method to display lunch recipes
// refer to displayBreakfast for comments
celiacApp.displayLunch = function(matches){
	for (var i = 0; i < matches.length;i++){
		var recipeImgUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		var $recipeImg = $('<img>').attr('src', recipeImgUrl);
		$('.lunch figure').eq(i).append($recipeImg);
		var $recipeId = matches[i].id;
		var $recipeUrl = celiacApp.yummlyRoot.concat($recipeId);
		$('.lunch .flex-mealName a').eq(i).attr('href', $recipeUrl);
		var $recipeTitle = matches[i].recipeName;
		$('.lunch .flex-mealName a').eq(i).append($recipeTitle);
		var $recipeIngredients =  matches[i].ingredients;
		var $ingredientsString = $recipeIngredients.join(', ');
		$('.lunch .flex-mealInfo .flex-mealName .recipeIngredients').eq(i).append($ingredientsString);
		var emailRoot = 'mailto:?subject=Gluten-Free Lunch Recipe&body=';
		var emailContent = '%0D%0A' + $recipeTitle + '%0D%0A' + $recipeUrl + '%0D%0A%0D%0Avia http://www.celiacmenuplanner.com';
		var $recipeEmail = emailRoot.concat(emailContent);
		$('.lunch .flex-mealLinks .email').eq(i).attr('href', $recipeEmail);
	}
};

// method to display snack recipes
// refer to displayBreakfast for comments
celiacApp.displaySnacks = function(matches){
	for (var i = 0; i < matches.length;i++){
		var recipeImgUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		var $recipeImg = $('<img>').attr('src', recipeImgUrl);
		$('.snack figure').eq(i).append($recipeImg);
		var $recipeId = matches[i].id;
		var $recipeUrl = celiacApp.yummlyRoot.concat($recipeId);
		$('.snack .flex-mealName a').eq(i).attr('href', $recipeUrl);
		var $recipeTitle = matches[i].recipeName;
		$('.snack .flex-mealName a').eq(i).append($recipeTitle);
		var $recipeIngredients =  matches[i].ingredients;
		var $ingredientsString = $recipeIngredients.join(', ');
		$('.snack .flex-mealInfo .flex-mealName .recipeIngredients').eq(i).append($ingredientsString);
		var emailRoot = 'mailto:?subject=Gluten-Free Snack Recipe&body=';
		var emailContent = '%0D%0A' + $recipeTitle + '%0D%0A' + $recipeUrl + '%0D%0A%0D%0Avia http://www.celiacmenuplanner.com';
		var $recipeEmail = emailRoot.concat(emailContent);
		$('.snack .flex-mealLinks .email').eq(i).attr('href', $recipeEmail);
	}
};

// method to display dinner recipes
// refer to displayBreakfast for comments
celiacApp.displayDinner = function(matches){
	for (var i = 0; i < matches.length;i++){
		var recipeImgUrl = matches[i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
		var $recipeImg = $('<img>').attr('src', recipeImgUrl);
		$('.dinner figure').eq(i).append($recipeImg);
		var $recipeId = matches[i].id;
		var $recipeUrl = celiacApp.yummlyRoot.concat($recipeId);
		$('.dinner .flex-mealName a').eq(i).attr('href', $recipeUrl);
		var $recipeTitle = matches[i].recipeName;
		$('.dinner .flex-mealName a').eq(i).append($recipeTitle);
		var $recipeIngredients =  matches[i].ingredients;
		var $ingredientsString = $recipeIngredients.join(', ');
		$('.dinner .flex-mealInfo .flex-mealName .recipeIngredients').eq(i).append($ingredientsString);
		var emailRoot = 'mailto:?subject=Gluten-Free Dinner Recipe&body=';
		var emailContent = '%0D%0A' + $recipeTitle + '%0D%0A' + $recipeUrl + '%0D%0A%0D%0Avia http://www.celiacmenuplanner.com';
		var $recipeEmail = emailRoot.concat(emailContent);
		$('.dinner .flex-mealLinks .email').eq(i).attr('href', $recipeEmail);
		// calling the displayAll method
		celiacApp.displayAll();
	}
};

// method to show all days
celiacApp.displayAll = function() {
	// fadeOut loading div
	$('.wrapperLoading').fadeOut(600, function(){
		// fadeIn wrapperMeals
		$('.wrapperMeals').fadeIn(600);
		// fadeIn footer
		$('footer').fadeIn(600);
	});
};

// method to expand each day
// called by init function
celiacApp.expandDay = function() {
	// on click of plus icon
	$('.dayName > a > .fa-plus').click(function(e) {
		// prevent default link action
		e.preventDefault();
		// slide dayMeals div down
		$(this).parent().parent().next('div').slideDown(1000);
		// show minus icon
		$(this).siblings('i').removeClass('hide');
		// hide plus icon
		$(this).addClass('hide');
	});
}

// method to collapse each day
// called by init function
celiacApp.collapseDay = function() {
	// on click of minus icon
	$('.dayName > a > .fa-minus').click(function(e) {
		// prevent default link action
		e.preventDefault();
		// slide dayMeals div up
		$(this).parent().parent().next('div').slideUp(1000);
		// show plus icon
		$(this).siblings('i').removeClass('hide');
		// hide minus icon
		$(this).addClass('hide');
	});
}

// method to provide new meal
// called by init function
celiacApp.newMeal = function() {
	for (var i = 6; i <= 6; i++) {
	// on click of shuffle icon
		$('.shuffle').click(function(e) {
			// prevent default link action
			e.preventDefault();
			// saving meal type in a variable
			var $mealType = $(this).data('meal');
			// console.log($mealType);
			// if else statements to call new meals from meal arrays
			if ($mealType === 'breakfast') {
				// console log new breakfast recipe object
			 	// console.log(celiacApp.breakfasts[0][i]);
			 	// creating a variable to hold new breakfast img url
			 	var $newImgUrl = celiacApp.breakfasts[0][i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
				// // creating a variable to hold the recipe img url inside img tags
				var $newImg = $('<img>').attr('src', $newImgUrl);
				// replacing the existing img tag with the new img tags
				$(this).parent('div').parent('div').parent('div').find('figure').children('img').replaceWith($newImg);
				// creating a variable to hold the new breakfast recipe id
				var $newRecipeId = celiacApp.breakfasts[0][i].id;
				// creating a variable to hold the recipe url (root url + recipe id)
				var $newRecipeUrl = celiacApp.yummlyRoot.concat($newRecipeId);
				// inserting the recipe url 
				$(this).parent('div').parent('div').find('a.recipeUrl').attr('href', $newRecipeUrl);
				// creating a variable to hold the new recipe title
				var $newRecipeTitle = celiacApp.breakfasts[0][i].recipeName;
				// inserting the recipe name inside the existing a tags
				$(this).parent('div').parent('div').find('a.recipeUrl').html($newRecipeTitle);
				// creating a variable to hold the recipe ingredients
				var $newRecipeIngredients =  celiacApp.breakfasts[0][i].ingredients;
				// creating a variable to hold the recipe ingredients as a string
				var $newIngredientsString = $newRecipeIngredients.join(', ');
				// inserting the ingredients into the existing p tag
				$(this).parent('div').parent('div').find('p.recipeIngredients').html('Ingredients: ' + $newIngredientsString);
				// creating a variable to hold recipe email root message
				var emailRoot = 'mailto:?subject=Gluten-Free Breakfast Recipe&body=';
				// creating a variable to hold recipe email content
				var newEmailContent = '%0D%0A' + $newRecipeTitle + '%0D%0A' + $newRecipeUrl + '%0D%0A%0D%0Avia http://www.celiacmenuplanner.com';
				// creating a variable to hold recipe email message
				var $newRecipeEmail = emailRoot.concat(newEmailContent);
				// inserting the recipe name and link inside the existing a mail to tag
				$(this).parent('div').find('a.email').attr('href', $newRecipeEmail);
				// adding 1 to var i
				i = i+1;
				// console.log(i);
			} else if ($mealType === 'lunch') {
			 	// console.log(celiacApp.lunches[0][i]);
			 	var $newImgUrl = celiacApp.lunches[0][i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
				var $newImg = $('<img>').attr('src', $newImgUrl);
				$(this).parent('div').parent('div').parent('div').find('figure').children('img').replaceWith($newImg);
				var $newRecipeId = celiacApp.lunches[0][i].id;
				var $newRecipeUrl = celiacApp.yummlyRoot.concat($newRecipeId);
				$(this).parent('div').parent('div').find('a.recipeUrl').attr('href', $newRecipeUrl);
				var $newRecipeTitle = celiacApp.lunches[0][i].recipeName;
				$(this).parent('div').parent('div').find('a.recipeUrl').html($newRecipeTitle);
				var $newRecipeIngredients =  celiacApp.lunches[0][i].ingredients;
				var $newIngredientsString = $newRecipeIngredients.join(', ');
				$(this).parent('div').parent('div').find('p.recipeIngredients').html('Ingredients: ' + $newIngredientsString);
				var emailRoot = 'mailto:?subject=Gluten-Free Lunch Recipe&body=';
				var newEmailContent = '%0D%0A' + $newRecipeTitle + '%0D%0A' + $newRecipeUrl + '%0D%0A%0D%0Avia http://www.celiacmenuplanner.com';
				var $newRecipeEmail = emailRoot.concat(newEmailContent);
				$(this).parent('div').find('a.email').attr('href', $newRecipeEmail);
				i = i+1;
				// console.log(i);
			} else if ($mealType === 'snack') {
			 	// console.log(celiacApp.snacks[0][i]);
			 	var $newImgUrl = celiacApp.snacks[0][i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
				var $newImg = $('<img>').attr('src', $newImgUrl);
				$(this).parent('div').parent('div').parent('div').find('figure').children('img').replaceWith($newImg);
				var $newRecipeId = celiacApp.snacks[0][i].id;
				var $newRecipeUrl = celiacApp.yummlyRoot.concat($newRecipeId);
				$(this).parent('div').parent('div').find('a.recipeUrl').attr('href', $newRecipeUrl);
				var $newRecipeTitle = celiacApp.snacks[0][i].recipeName;
				$(this).parent('div').parent('div').find('a.recipeUrl').html($newRecipeTitle);
				var $newRecipeIngredients =  celiacApp.snacks[0][i].ingredients;
				var $newIngredientsString = $newRecipeIngredients.join(', ');
				$(this).parent('div').parent('div').find('p.recipeIngredients').html('Ingredients: ' + $newIngredientsString);
				var emailRoot = 'mailto:?subject=Gluten-Free Snack Recipe&body=';
				var newEmailContent = '%0D%0A' + $newRecipeTitle + '%0D%0A' + $newRecipeUrl + '%0D%0A%0D%0Avia http://www.celiacmenuplanner.com';
				var $newRecipeEmail = emailRoot.concat(newEmailContent);
				$(this).parent('div').find('a.email').attr('href', $newRecipeEmail);
				i = i+1;
				// console.log(i);
			} else {
			 	// console.log(celiacApp.dinners[0][i]);
			 	var $newImgUrl = celiacApp.dinners[0][i].imageUrlsBySize[90].replace("=s90-c","=s300-c");
				var $newImg = $('<img>').attr('src', $newImgUrl);
				$(this).parent('div').parent('div').parent('div').find('figure').children('img').replaceWith($newImg);
				var $newRecipeId = celiacApp.dinners[0][i].id;
				var $newRecipeUrl = celiacApp.yummlyRoot.concat($newRecipeId);
				$(this).parent('div').parent('div').find('a.recipeUrl').attr('href', $newRecipeUrl);
				var $newRecipeTitle = celiacApp.dinners[0][i].recipeName;
				$(this).parent('div').parent('div').find('a.recipeUrl').html($newRecipeTitle);
				var $newRecipeIngredients =  celiacApp.dinners[0][i].ingredients;
				var $newIngredientsString = $newRecipeIngredients.join(', ');
				$(this).parent('div').parent('div').find('p.recipeIngredients').html('Ingredients: ' + $newIngredientsString);
				var emailRoot = 'mailto:?subject=Gluten-Free Dinner Recipe&body=';
				var newEmailContent = '%0D%0A' + $newRecipeTitle + '%0D%0A' + $newRecipeUrl + '%0D%0A%0D%0Avia http://www.celiacmenuplanner.com';
				var $newRecipeEmail = emailRoot.concat(newEmailContent);
				$(this).parent('div').find('a.email').attr('href', $newRecipeEmail);
				i = i+1;
				// console.log(i);
			}
		});
	}
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

// end of js