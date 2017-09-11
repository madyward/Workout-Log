/*Use cancel button ids to create two if statements - if button .on "click", .then .addClass "active" to username field */

$(function(){
	$.extend(WorkoutLog, {
		/*Sign Up Method:*/
		signup: function(){

			/* Username and Password variables: */
			var username = $("#su_username").val();
			var password = $("#su_password").val();

			/* User object: */
			var user = {	//Can also be...  var user = {user: {username: username, password: password}};
				user: {
					username: username,
					password: password
				}
			};

			/*  */


			/* Sign Up post: */
			var signup = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			});
			
			/*Sign Up done/fail:*/
			signup.done(function(data){
				if (data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
					
					console.log("You made it!");
					console.log(data.sessionToken);
				}
				$("#signup-modal").modal("hide");	//This line gets the modal out of the way if the user has signed up
				$(".disabled").removeClass("disabled");	//Removes the disabled class once user is signed up (so, now enabled)
				$(".hidden").removeClass("hidden");	//Removes the hidden class once user is signed up (so, now shown)
				$(".tab1").show();	//Elements with tab1 class are now shown
				$("#loginout").text("Logout");	//Logout tab now shows (as - Logout) when user is signed up
				$("#defineTab").text("Define Rides"); //Define tab also now shows (as - Define Rides) once user is signed up
				$("#logTab").text("Riding Log"); //Log tab now shows up (as - Riding Log), too, when user is signed up.
				$("#historyTab").text("View History"); //And.. history tab shows (as  - View History) once user signed up
				/*Go to define tab*/
				$(".nav-tabs a[href='#define']").tab("show");

				$('a[href="#define"]').tab("show");
				$("#su_username").val("");
				$("#su_password").val("");
			})

			.fail(function(){
				$("#su_error").text("There was an issue with sign up").show();
			});
		},
		/*Login Method:*/
		login: function(){
			/*Login variables:*/
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = { user: {
				username: username,
				password: password
			}};

			/*Login POST:*/
			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify(user),
				contentType: "application/json"
			});

			/*Login done/fail:*/
			login.done(function(data){
				if (data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
				}
				$("#login-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$(".hidden").removeClass("hidden");
				$(".tab1").show();
				$("#loginout").text("Logout");
				$("#defineTab").text("Define Rides");
				$("#logTab").text("Riding Log");
				$("#historyTab").text("View History");		
				$("#li_username").val("");
				$("#li_password").val("");
				$('a[href="#define"]').tab("show");
			})
			.fail(function(){
				$("#li_error").text("There was an issue with your username or password.").show();
			});

		},

		/*Loginout (AKA logout) Method:*/
		loginout: function(){
			if (window.localStorage.getItem("sessionToken")){
				window.localStorage.removeItem("sessionToken");
			}
			$(".tab1").hide().addClass("disabled");
		}

		
	});
	/*Bind Events:*/
	$("#login").on("click", WorkoutLog.login);
	$("#signup").on("click", WorkoutLog.signup);
	//Cleaner way to write the code here? $(signup).click(WorkoutLog.signup);
	$("#loginout").on("click", WorkoutLog.loginout);

	if (window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Logout");
	}
});