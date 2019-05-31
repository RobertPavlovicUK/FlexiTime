// Your code here!
function mySingleton() {

	var instance;

	function init() {

		var test = "singleton";

		return {
			getTest: function () {
				return test;
			}
		};


	}
	return {
		getInstance: function () {

			instance = init();
			return instance;
		}
	}

	

}

