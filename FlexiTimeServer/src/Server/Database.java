package Server;

import java.io.Console;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.sun.javafx.css.StyleClassSet;

public class Database {
	
	Connection con;
	public Database()
	{
		 con = MySqlDatabase.getInstance().getDBConnection();
		
		
	}
	
	public String RegisterOrganization(Organization org)
	{ try {
		System.out.println(""+org.organization);
		String selectOrg1 = "Select OrganizationName,LogInPrefix from organization where organizationName = ?";
		PreparedStatement stm = con.prepareStatement(selectOrg1);
		String orgName = null;
		String orgPrefix = "";
		Boolean exists = false;
		stm = con.prepareStatement(selectOrg1);
		stm.setString(1, org.organization);
		ResultSet rs1 = stm.executeQuery();
		
		while(rs1.next())
		{
			orgName = rs1.getString("OrganizationName");
			orgPrefix = rs1.getString("LogInPrefix");
			if(org.loginprefix.equals(orgPrefix))
				{
				System.out.println("should stay here");
					exists = true;
				}
		}
		
		if(!exists)
		{
		
		String orgQuery = "Insert into organization (FirstName,SecondName,OrganizationName,LogInPrefix,telNum,password) values(?,?,?,?,?,?)";
		
		 stm = con.prepareStatement(orgQuery);
		System.out.println(org.firstname);
		stm.setString(1, org.firstname );
		stm.setString(2, org.secondname);
		stm.setString(3, org.organization);
		stm.setString(4, org.loginprefix);
		stm.setString(5, org.telnum);
		stm.setString(6, org.password);
		stm.executeUpdate();
		
		
		String orgID = GetOrganizationId(org.loginprefix);
		
		for(Users u : org.getUsersList())
		{
			System.out.println(u.username);
			String userQuery= "Insert into users(username,position,organizationID,login) values (?,?,?,?)";

			stm = con.prepareStatement(userQuery);
			stm.setString(1, u.getUsername());
			stm.setString(2, u.getPosition());
			stm.setString(3, orgID);
			System.out.println(""+u.username);
			String user[] = u.username.split(" ");
			if(user.length == 2)
			{
					stm.setString(4,user[0].toLowerCase()+""+user[1].toLowerCase()+"@"+org.getLoginprefix());
			}else
				stm.setString(4,u.getUsername().toLowerCase()+"@"+org.getLoginprefix());
				
		
			stm.executeUpdate();
			
			
		}
		}
		else
		{
			return "Prefix already exists";
		}
		
	} catch(Exception e)
	{}
	return "Registration succesful";
	}
	
	private String GetOrganizationId(String prefix) throws Exception
	{
		PreparedStatement stm;
		String orgID = null;
		String selectOrg = "Select OrganizationID from organization where LogInPrefix = ?";
		stm = con.prepareStatement(selectOrg);
		stm.setString(1, prefix);
		ResultSet rs = stm.executeQuery();
		
		while(rs.next())
		{
		 orgID = rs.getString("OrganizationID");
		 System.out.println(orgID);
		}
		System.out.println("returnning"+orgID);
		return orgID;
	}

	public String LogIn(String s)
	{
		try {
		String[] userArray = s.split(",");
	//	System.out.println(""+userArray.length);
	//	System.out.println(""+userArray[0]);
		String username = userArray[0];
		String[] usernameArray  = username.split("@");
		String prefix = usernameArray[1];
	
		String prefixID = GetOrganizationId(prefix);
		String password = userArray[1];
		PreparedStatement stm;
		String query = "Select * from users where login = ?";
		stm = con.prepareStatement(query);
		stm.setString(1, username);
		
		ResultSet rs = stm.executeQuery();
		
		String actualUsername = null;
		String actualPassword = null;
		String actualLogIn = null;
		String actualPosition = null;
		String actualOrg = null;
		while(rs.next())
		{
			actualUsername = rs.getString("username");
			actualPosition = rs.getString("position");
			actualLogIn = rs.getString("login");		
		}
		
		query = "Select * from organization where OrganizationID = ?";
		stm = con.prepareStatement(query);
		
		stm.setString(1, prefixID);
		rs = stm.executeQuery();
		while(rs.next())
		{
			System.out.println(rs.getString("Password")+"password");
			actualPassword = rs.getString("Password");	
			actualOrg = rs.getString("OrganizationName");
		}
		System.out.println(prefixID);
		System.out.println(actualUsername+"s");
		System.out.println(actualPassword);
		System.out.println(actualLogIn);
		System.out.println(actualPosition);
		
		
		if(actualPassword.equals(password))
		{
			if(actualLogIn.equals(username))
			{
				return "Succesfull,"+actualUsername+","+actualPosition+","+actualOrg;
			}
		}
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
		
		return "Something went wrong please try again";
	}
	
	public void CreateTable(Timetables s)
	{	try {
		if(s.TimetableArray != null)
		{
		System.out.println(s.TimetableArray.length);
		for(Timetable ss : s.TimetableArray)
		{
		String query  = "INSERT Into timetables(Timetablename,organizationName) values(?,?)";
		PreparedStatement stm = con.prepareStatement(query);
		
		stm.setString(1, ss.getTimetableName());
		stm.setString(2, s.getOrganizationName());
		stm.executeUpdate();
		System.out.println("first");
		}
		}
		System.out.println("first1");
		for(SelectedSlots ss : s.selectedSlots)
		{
		String query  = "INSERT Into timetableopenedslots(dayI,hoursI,organizationName) values(?,?,?)";
		PreparedStatement stm = con.prepareStatement(query);
		
		stm.setInt(1, ss.getDayI());
		stm.setInt(2, ss.getHoursI());
		stm.setString(3, s.getOrganizationName());
		stm.executeUpdate();
		System.out.println("second");
		}
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
		
	}
	
	public Timetables getTimetables(String orgName)
	{
		try {
			Timetables timetables = new Timetables();
			ArrayList<SelectedSlots> slots = new ArrayList<SelectedSlots>();
			ArrayList<Timetable> tables = new ArrayList<Timetable>();
			
			String selecteTimetablesOpenedSlots = "SELECT * FROM timetableopenedslots where OrganizationName = ?";
			PreparedStatement st = con.prepareStatement(selecteTimetablesOpenedSlots);
			st.setString(1, orgName);
			ResultSet rs = st.executeQuery();
			while(rs.next())
			{
				SelectedSlots temp = new SelectedSlots();
				temp.setDayI(rs.getInt("dayI"));
				temp.setHoursI(rs.getInt("hoursI"));
				slots.add(temp);
			}
			timetables.setSelectedSlots(slots.toArray(new SelectedSlots[slots.size()]));
			
			
			
			String selecteTimetable = "SELECT * FROM timetables where organizationName = ?";
			System.out.println(""+orgName);
			st =con.prepareStatement(selecteTimetable);
			st.setString(1, orgName);
			 rs = st.executeQuery();
			while(rs.next())
			{
				Timetable temp = new Timetable();
				temp.setTimetableName(rs.getString(2));
				System.out.println(""+temp.getTimetableName());
				tables.add(temp);
			}
			timetables.setTimetableArray( tables.toArray(new Timetable[tables.size()]));
			
			return timetables;
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			return null;
	
	}
	
	public void DeleteOpenedSlots(Timetables s)
	{ try {
		for(SelectedSlots ss:s.getSelectedSlots())
		{	String query = "DELETE FROM timetableopenedslots where dayI =? and hoursI =?";
			PreparedStatement st = con.prepareStatement(query);
			st.setInt(1, ss.getDayI());
			st.setInt(2, ss.getHoursI());
			st.executeUpdate();
			
		}
	}
	catch(Exception e)
	{
		
	}
	
	
}
	public void employeeSelection(Timetables s)
	{try {
		SelectedSlots []  slots = s .getSelectedSlots();
		for(SelectedSlots t : slots)
		{
		String query = "INSERT INTO timetableselectedslots (dayI,hoursI,orgName,BookedBy) values(?,?,?,?)";
		PreparedStatement st = con.prepareStatement(query);
		st.setInt(1, t.dayI);
		st.setInt(2, t.hoursI);
		st.setString(3, s.organizationName);
		st.setString(4, s.getSender());
		st.executeUpdate();
		
		}
	}catch(Exception e) {}
	}
	
	public Timetables getEmpSelections(String orgName)
	{
		try {
			Timetables timetables = new Timetables();
			ArrayList<SelectedSlots> slots = new ArrayList<SelectedSlots>();
			
			
			String selecteTimetablesOpenedSlots = "SELECT * FROM timetableselectedslots where OrgName = ?";
			PreparedStatement st = con.prepareStatement(selecteTimetablesOpenedSlots);
			st.setString(1, orgName);
			ResultSet rs = st.executeQuery();
			while(rs.next())
			{
				SelectedSlots temp = new SelectedSlots();
				temp.setDayI(rs.getInt("dayI"));
				temp.setHoursI(rs.getInt("hoursI"));
				temp.setBookedBy(rs.getString("BookedBy"));
				slots.add(temp);
			}
			timetables.setSelectedSlots(slots.toArray(new SelectedSlots[slots.size()]));
			
			
		
			return timetables;
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			return null;
	
	}
	
}
