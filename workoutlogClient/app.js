/* $(document).ready(function(){					//DOM ready to execute code
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
}); */

$(function(){
	var WorkoutLog = (function($, undefined){
		var API_BASE = "http://localhost:3000/api/";
		var userDefinitions = [];
		var setAuthHeader = function(sessionToken) {
			window.localStorage.setItem("sessionToken", sessionToken);
			//set the authorization header
			//this can be done on individual calls
			//here we showcase ajaxSetup as a global tool
			$.ajaxSetup({
				"headers": {
					"Authorization": sessionToken
				}
			});
		};
		//public
		return {
			API_BASE: API_BASE,
			setAuthHeader: setAuthHeader
		};
	})(jQuery);
	//ensure .disabled aren't clickable
	$('.nav-tabs a[data-toggle="tab"]').on("click", function(e){
		var token = window.localStorage.getItem("sessionToken");
		if ($(this).hasClass("disabled") && !token){
			e.preventDefault();
			return false;
		}
	});
	//bind tab change events
	$('a[data-toggle="tab"]').on("shown.bs.tab", function(e){
		var target = $(e.target).attr("href"); //actived tab
		if (target === "#log"){
			WorkoutLog.log.setDefinitions();
		}
		if (target === "#update-log"){
			WorkoutLog.log.setDefinitions();
		}
		if (target === "#history"){
			WorkoutLog.log.setHistory();
		}
	});


	//bind enter key
	$(document).on("keypress", function(e){
		if(e.which === 13) { //enter key
			if ($("#signup-modal").is(":visible")){
				$("#signup").trigger("click");
			}
			if($("#login-modal").is(":visible")){
				$("#login").trigger("click");
			}
		}
	});

	//bind tab change events
	//bootstrap tab -- binding to a bootstrap event
	$('a[data-toggle="tab"]').on("shown.bs.tab", function(e){
		var target = $(e.target).attr("href"); //activated tab
		if (target === "#log"){
			WorkoutLog.log.setDefinitions();
		}
		if (target === "#history"){
			WorkoutLog.log.setHistory();
		}
	})

	//set header if we
	var token = window.localStorage.getItem("sessionToken");
	if (token){
		WorkoutLog.setAuthHeader(token);
	}
	//expose this to the other workoutlog modules
	window.WorkoutLog = WorkoutLog;
});