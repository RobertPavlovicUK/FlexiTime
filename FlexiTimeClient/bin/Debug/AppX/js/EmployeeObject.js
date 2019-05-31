function Employee(OrganizationName, Position, Password, Manager) {
	this.OrganizationName = OrganizationName;
	this.Position = Position
	this.Password = Password;
	this.Manager = Manager;
	this.Test = function (test) {
		console.log("From Function"+test);
	}
}