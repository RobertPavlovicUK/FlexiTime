var SelectedOption = {
	selectedList: [],
	getList: function () {

		return this.selectedList;
	},
	addToList: function (tag) {

		this.selectedList.push(tag);
		$(tag).addClass("selected-slot");
	}

};