function SelectionBuffer() {

	this.BufferList=[{
		dayI: -1,
		hoursI: -1,
		bookedBy: ""
	}];
	this.getList = function () {

		return this.BufferList;
	};
	this.addToList = function (tag) {
		var indexes = getIndexes(tag);
		console.log(tag);
		console.log(this.BufferList);
		console.log("2");
		var ar = indexes.toString().split(",");
		
		var BufferListt= { dayI: ar[0], hoursI: ar[1] }
		this.BufferList.push(BufferListt);
		
		$(tag).addClass("selected-slot");
	};

	

	this.removeFromList = function(tag) {

		for (var i = 0; i < this.BufferList.length; i++)
		{
			var TagIndex = getIndexes(tag);
			var t = GetTag(this.BufferList[i].dayI, this.BufferList[i].hoursI);
			console.log(this.BufferList[i]);
			console.log(t);
			console.log("??");
			var TagIndexN = getIndexes(t);
			console.log(TagIndex);
			console.log(TagIndexN);
			if (TagIndex === TagIndexN) {
			console.log("removed from ")
				this.BufferList.splice(i, 1);
				$(tag).removeClass("selected-slot");
			
				return;

			}
		}

	}
}

function GetTag(day, hour) {
	var result;
	$("tr").each(function (i) {
		
		if (day == i) {

			var childrens = $(this).children();
			$(childrens).each(function (i) {

				if (i == hour) {


					result = $(this);
				}

			});



		}

	});

	return result;

}
function getIndexes(tag) {
	
	
	var element = $(tag);
	var	par = $(tag).parent();

		var indexes = "";
	
	$("tr").each(function (i) {
		
		if ($(this).is(par)) {

			
			indexes += i+",";
			$.each($(this).children(), function (i) {
				if ($(this).is(element)) {

					indexes += ""+i;
				}
			});
		}
	});
	
		return indexes;
}

function removeTag(tag) {

	var indexes = getIndexes(tag);



}

function getDay(index) {

	switch (index) {

		case 1: return "Monday";

		case 2: return "Tuesday";

		case 3: return "Wednesday";

		case 4: return "Thursday";

		case 5: return "Friday";

		case 6: return "Saturday";

		case 7: return "Sunday";

	}


}

