$(function(){
	$.extend(WorkoutLog, {
		//Sign Up Method:
		signup: function(){
			//Username and Password variables:
			var username = $("#su_username").val();
			var password = $("#su_password").val();
			//User object:
			var user = {
				user:{
					username: username,
					password: password
				}
			};
			//Sign Up post:
			var signup = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			});
			//Sign Up done/fail:
			signup.done(function(data){
				if(data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken);
				}
				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("diabled");
				$("#loginout").text("Logout");
			}).fail(function(){
				$("#su_error").text("There was an issue with sign up").show();
			});
		}
		//Login Method:

		//Loginout Method:

		//Bind Events:
		$("#signup").on("click", WorkoutLog.signup);
	})
});