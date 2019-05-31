package Server;

public class Organization {
	String firstname;
	String secondname;
	String organization;
	String email;
	String loginprefix;
	String telnum;
	String password;
	Users[] usersList ;
	public Organization() {}
	public Organization(String firstname,String secondname, String organization, String email, String loginprefix, String telnum,
			String password, Users[] usersList) {
	
		this.firstname = firstname;
		this.secondname = secondname;
		this.organization = organization;
		this.email = email;
		this.loginprefix = loginprefix;
		this.telnum = telnum;
		this.password = password;
		this.usersList = usersList;
	}
	
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getSecondname() {
		return secondname;
	}
	public void setSecondname(String secondname) {
		this.secondname = secondname;
	}
	public String getOrganization() {
		return organization;
	}
	public void setOrganization(String organization) {
		this.organization = organization;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLoginprefix() {
		return loginprefix;
	}
	public void setLoginprefix(String loginprefix) {
		this.loginprefix = loginprefix;
	}
	public String getTelnum() {
		return telnum;
	}
	public void setTelnum(String telnum) {
		this.telnum = telnum;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Users[] getUsersList() {
		return usersList;
	}
	public void setUsersList(Users[] usersList) {
		this.usersList = usersList;
	}
	

}
