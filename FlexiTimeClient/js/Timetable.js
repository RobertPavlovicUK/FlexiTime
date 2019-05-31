function Timetables() {
	var selectionBuffer = new SelectionBuffer();
	var TimetableArray = [];
	function Timetable(name) {

		var timetableName = name;	

		return {
			
			timetableName: name
		}

	}

	function addCarousel() {
		if ($(".carousel-inner").children().length == 0) {
			var first = $(".carousel-inner").append(timetable);
			$(".carousel-item").addClass("active");
			$(".carousel-indicators").append(carouselSlideData);

			var indicator = $(".carousel-indicators").children()
			$(indicator).addClass("active");

			$(indicator).attr("data-slide-to", 0);

			console.log("first");
		} else {
			$(".carousel-inner").append(timetable);
			$(".carousel-indicators").append(carouselSlideData);


			$.each($(".indicators"), function (i) {

				$(this).attr("data-slide-to", i);
			});

		}

	}

	return {
		DisplayTables: function (response) {

			for (var i=0; i < TimetableArray.length; i++)
			{
				addCarousel()
				$.each($(".carousel-item"), function (y) {

					if (i == y) {
						$(this).find(".title").text(TimetableArray[i].timetableName);

					}
				});
			}

			console.log(selectionBuffer.getList());
			for (var i = 0; i < selectionBuffer.BufferList.length; i++) {
				day = selectionBuffer.BufferList[i].dayI;
				hour = selectionBuffer.BufferList[i].hoursI;
			//console.log(day + "s" + hour);
				tag = GetTag(day, hour);
				$(tag).text("");
			
			}
			
		},
		CreateTimetable: function (name) {
			var tempTimetable = new Timetable(name);
			addCarousel();
		
			var title = $(".title");
			var titleLenth = $(title).length;
			$.each($(".title"), function (i) {
			
				if (i == titleLenth-1) {
				
					$(this).text(name);
				}
			});
			
			TimetableArray.push(tempTimetable);
		},
		TimetableList: function () {
			return TimetableArray;
		},
		SelectionBuffer: function () {
			return selectionBuffer;
		},
		TimetableListSET: function (t) {
		TimetableArray = t;
		},
		SelectionBufferSET: function (t) {
			selectionBuffer.BufferList = t;
		},
		Test: function (){
			console.log(this.selectionBuffer);
		}
	}


	
}

$(document).ready(function () {

	var user = sessionStorage.getItem("login");
	currentuser = JSON.parse(user);
	var closeBuffer = new SelectionBuffer();

	var selectedFromUsersBuffer;
	function ajaxGetSelected() {
		$.ajax({
			type: "POST",
			url: "http://" + currentIP + ":8080/FlexiTime/api/User/GetEmpSelections",
			dataType: "json",
			Accept: "application/json",
			contentType: "application/json",
			data: currentuser.OrganizationName,
			success: function (response) {
				console.log(response);
				selectedFromUsersBuffer = response;
				console.log(response.selectedSlots.length);
				console.log("???????");
				for (var i = 0; i < response.selectedSlots.length; i++)
				{
					console.log("??");
			dayI = response.selectedSlots[i].dayI;
			hoursI = response.selectedSlots[i].hoursI;
					tag = GetTag(dayI, hoursI);
					console.log(tag);
					if (response.selectedSlots[i].bookedBy === currentuser.firstName) {
						$(tag).addClass("selection-my-taken");
					} else {
			$(tag).addClass("selection-taken");

					}
		}


			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
			}
		});
	}


	$.ajax({
		type: "POST",
		url: "http://" + currentIP + ":8080/FlexiTime/api/User/GetTables",
		dataType: "json",
		Accept: "application/json",
		contentType: "application/json",
		data: currentuser.OrganizationName,
		success: function (response) {

			var gotTable = new Timetables();
			gotTable.SelectionBufferSET(response.selectedSlots);
			gotTable.TimetableListSET(response.timetableArray);
			console.log(response.selectedSlots);
			gotTable.DisplayTables(response);
			ajaxGetSelected();
			
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
		}
	});





















	var buffer = new SelectionBuffer();
	
	var tables = new Timetables();
	$(document).on("click", ".create", function () {
		tables.CreateTimetable($(".time-table-name").val());


	});

	$(document).on("click", ".sub-tables", function () {



		if (currentuser.Position == "employee" && buffer.getList().length > 0) {
			
			
			var tabless = new AjaxTimetableObject(null, buffer.getList(), currentuser.OrganizationName, currentuser.firstName);
			tabless = JSON.stringify(tabless);
			console.log("AJAX call");
			$.ajax({
				type: "POST",
				url: "http://" + currentIP + ":8080/FlexiTime/api/User/EmpSelection",
				dataType: "json",
				Accept: "application/json",
				contentType: "application/json",
				data: tabless,
				success: function (response) {

					setTimeout(function () {


						location.reload(true);
					}, 400);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
				}
			});


		}
		
		if (currentuser.Position == "manager" && closeBuffer.getList().length > 0) {
			console.log("remove")
			console.log("heeerreee");
			var tabless = new AjaxTimetableObject(null, closeBuffer.getList(), currentuser.OrganizationName, currentuser.firstName);
			tabless = JSON.stringify(tabless);
			console.log("AJAX call");
			$.ajax({
				type: "POST",
				url: "http://" + currentIP + ":8080/FlexiTime/api/User/DeleteLists",
				dataType: "json",
				Accept: "application/json",
				contentType: "application/json",
				data: tabless,
				success: function (response) {
					setTimeout(function (){


					location.reload(true);
					},400);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
				}
			});


		}
		if (currentuser.Position == "manager" && tables.TimetableList().length > 0) {
			console.log("heeerreee");
			var tabless = new AjaxTimetableObject(tables.TimetableList(), buffer.getList(), currentuser.OrganizationName, currentuser.firstName);
			tabless = JSON.stringify(tabless);
			console.log("AJAX call");
			$.ajax({
				type: "POST",
				url: "http://" + currentIP + ":8080/FlexiTime/api/User/SubmitTables",
				dataType: "json",
				Accept: "application/json",
				contentType: "application/json",
				data: tabless,
				success: function (response) {

					console.log("Hello");
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
				}
			});


		} else {

			var tabless = new AjaxTimetableObject(null, buffer.getList(), currentuser.OrganizationName, currentuser.firstName);
			tabless = JSON.stringify(tabless);
			console.log("AJAX call");
			$.ajax({
				type: "POST",
				url: "http://" + currentIP + ":8080/FlexiTime/api/User/SubmitUpdateTables",
				dataType: "json",
				Accept: "application/json",
				contentType: "application/json",
				data: tabless,
				success: function (response) {

					setTimeout(function () {


						location.reload(true);
					}, 100);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
				}
			});

		}
		

	});

	

	$(document).on("mouseover", "td", function () {
		if ($(this).hasClass("selection-my-taken") || $(this).hasClass("selection-taken")) {

			var index = getIndexes($(this));
			var bookedBy = "";
			var splitArray = index.split(",");

			for (var i = 0; i < selectedFromUsersBuffer.selectedSlots.length; i++) {

				var dayString = selectedFromUsersBuffer.selectedSlots[i].dayI.toString();
				var hoursString = selectedFromUsersBuffer.selectedSlots[i].hoursI.toString();
				console.log(selectedFromUsersBuffer.selectedSlots[i]);
				if (splitArray[0] === dayString && splitArray[1] === hoursString) {

					bookedBy = selectedFromUsersBuffer.selectedSlots[i].bookedBy;
					break;
				}

			}

			$(".info-area").html("<p> Booked by</p>" + bookedBy);

		}
	});
	$(document).on("click", "td", function () {

		

		if (currentuser.Position === "manager") {
			console.log("hellooo");
			if (!$(this).hasClass("selected-slot") ) {

				if ($(this).html() === "/") {
					buffer.addToList($(this));
				$(this).html("");
				} else {

					closeBuffer.addToList($(this));
					$(this).html("/");
				}
				

			} else {
				console.log("in here");
				if ($(this).html() === "/") {
					console.log("removed from close buffer");
					closeBuffer.removeFromList($(this));
					$(this).html("");
				} else {

					buffer.removeFromList($(this));
					$(this).html("/");
				}
				
			}
		}
		if (currentuser.Position === "employee") {
			if (!$(this).hasClass("selected-slot") && $(this).html() !== "/") {

				if (!$(this).hasClass("selection-taken") && !$(this).hasClass("selection-my-taken")) {
					buffer.addToList($(this));
					console.log(buffer.BufferList);
				}

			} else {
				buffer.removeFromList($(this));


			}
		}

	});

	$(document).on("click", "btn-modal", function () {
		var list = buffer.getList();



	});




});
	

