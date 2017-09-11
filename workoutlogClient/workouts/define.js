$(function(){
	$.extend(WorkoutLog, {
		definition: {
			userDefinitions: [],
			create: function(){
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				};
				var postData = {definition: def};
				var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});
				define.done(function(data){
					WorkoutLog.definition.userDefinitions.push(data.definition);
					$("#def-description").val("");
					$("#def-log").val("");
					$('a[href="#log"]').tab("show"); //Targets the log tab so once user has defined workout, they're 
																							//taken to the log tab
				});
			},
			fetchAll: function(){
				var fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "definition",
					headers: {
						"authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data){
					WorkoutLog.definition.userDefinitions = data;
				})
				.fail(function(err){
					console.log(err);
				});
			}
		}
	});
	/*Bindings*/
	$("#def-save").on("click", WorkoutLog.definition.create);	//When the Save button is clicked, it's attached to 
																										//definition.create

	/*Fetch definitions if we are already authenticated and refreshed*/
	if (window.localStorage.getItem("sessionToken")){ //sessionToken is checked locally (localStorage), and retrieved if so. 
		WorkoutLog.definition.fetchAll();
	}
});