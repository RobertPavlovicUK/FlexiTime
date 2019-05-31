

	function Employee(firstName, secondName, OrganizationName,email,prefix,num, Position, Password, Manager) {
		this.firstName = firstName;
		this.seconName = secondName;
		this.OrganizationName = OrganizationName;
		this.email = email
		this.prefix = prefix
		this.num = num
		this.Position = Position
		this.Password = Password;
		this.Manager = Manager;
		

		this.register = function (users) {
			var user = {
				firstname: this.firstName,
				secondname: this.secondName,
				organization: this.OrganizationName,
				email: this.email,
				loginprefix: this.prefix,
				telnum: this.num,
				password: this.Password,
				usersList: users,
				
			}
			
			user1 = JSON.stringify(user);
			$.ajax({
				type: "POST",
				url: "http://" + currentIP + ":8080/FlexiTime/api/User/Register",
				
				Accept: "application/json",
				contentType: "application/json",
				data: user1

				,
				success: function (response) {
					
					if (response === "Registration succesful") {
						console.log("redirection");
						window.location.href = "http://" + currentIP + ":8080/MyApp/LogIn.html";
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
				}
			});
			
		}
			
		

	
	}
$(document).ready(function () {

	$(document).on("keyup", ".focus-event", function () {
		var firstPasswordField = $(".focus-event-first");
		var secondPasswordField = $(".focus-event-second")
		if ($(this).val() !== "") {

			if (secondPasswordField.val() === firstPasswordField.val()) {

				$(".focus-event").removeClass("error-shadow");

			} else {

				$(this).addClass("error-shadow");

			}

		}
		else {
			$(".focus-event").removeClass("error-shadow");


		}

	});
			
	$(document).on("click", ".submit", function () {
		// Events for highlithing empty fields
		
		var getAllUsers = function() {
			var users = [];
			$.each($(".test"), function () {

				var inp = $(this).find("input");
				var sel = $(this).find("select");
				if (inp.val() !== "") {
					users.push({
						username: inp.val(),
						position: sel.val(),

					});
				}
				 
			});
			

			return users;
		}
		var currentLogIn = new Employee($(".firstname").val(), $(".secondname").val(), $(".organization").val(), $(".email").val(), $(".loginprefix").val(), $(".telnum").val(), "Manager", $(".password").val(), "Q")
		
			currentLogIn.register(getAllUsers());
		
		$.each($(".generated-field"), function (i) {
			var temp = $(this).find("input");
			var firstIndex = i;
			$.each($(".generated-field"), function (i) {
				var temp1 = $(this).find("input");
				if ($(temp1).val() === $(temp).val() && $(temp1).val() != "" && firstIndex != i) {
					
					$(this).find("input").addClass("error-shadow");
				} 
					
			});

			if (i == $(".generated-field").length - 1) {
				var temp = $(this).find("input");
				
				if ($(temp).val() == "") {
					this.remove();
				}
			}


		});
	
	});
//	localStorage.setItem("currentUser", JSON.stringify(currentLogIn));
	
	//var employee = localStorage.getItem("LoginDetails");
	
});

