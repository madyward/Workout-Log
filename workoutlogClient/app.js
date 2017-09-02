$(document).ready(function(){					//DOM ready to execute code
	$("#testAPI").on("click", function(){		//"click" event now attached to #testAPI
		console.log("It's working!");			//When #testAPI is clicked, "It's working!" will be printed
	});											//to the console. ^^^^^

	var test = $.ajax({							//test variable (AJAX GET request for the url) created
		type: "GET",
		url: "http://localhost:3000/api/test"    //Note - port 3000 is the port specified in app.js for
	})												//the workoutlogServer folder ^^^^^
	.done(function(data){				//.done (success) callback returns the data/results pulled from url.
		console.log(data);			//data pulled is printed to the console.
	})
	.fail(function(){				//If unsuccessful, .fail will take place of .done and
		console.log("Oh no!");		//"Oh no!" will print to the console in it's place ^^^^^
	})
});