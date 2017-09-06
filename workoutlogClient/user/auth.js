$(function(){
	$.extend(WorkoutLog, {
		//Sign Up Method:
		signup: function(){
			//Username and Password variables:
			var username = $("#su_username").val();
			var password = $("#su_password").val();
			//User object:
			var user = {
				user: {
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
				if (data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
					
					console.log("You made it!");
					console.log(data.sessionToken);
				}
				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");
				//go to define tab
				$(".nav-tabs a[href='#define']").tab("show");

				$('a[href="#define"]').tab("show");
				$("#su_username").val("");
				$("#su_password").val("");
			})
			.fail(function(){
				$("#su_error").text("There was an issue with sign up").show();
			});
		},
		//Login Method:
		login: function(){
			//Login variables:
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = { user: {
				username: username,
				password: password
			}};

			//Login POST:
			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify(user),
				contentType: "application/json"
			});

			//Login done/fail:
			login.done(function(data){
				if (data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
				}
				$("#login-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");
				$("#li_username").val("");
				$("#li_password").val("");
				$('a[href="#define"]').tab("show");
			})
			.fail(function(){
				$("#li_error").text("There was an issue with your username or password.").show();
			});

		},

		//Loginout Method:
		loginout: function(){
			if (window.localStorage.getItem("sessionToken")){
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
			}
			//TODO: On logout, make sure stuff is disabled.
		}

		
	});
	//Bind Events:
	$("#login").on("click", WorkoutLog.login);
	$("#signup").on("click", WorkoutLog.signup);
	$("#loginout").on("click", WorkoutLog.loginout);

	if (window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Logout");
	}
});