package Server;

import javax.ws.rs.Consumes;
import javax.ws.rs.*;

@Path("/User")
public class UsersResource {
	Database db;
	public UsersResource()
	{
		db = new Database();
	}
	
	@Path("/Register")
	@Consumes("application/json")
	@POST
	public String RegisterUser(Organization org)
	{
		System.out.println(""+org.firstname);
		return db.RegisterOrganization(org);
	}
	
	@Path("/Login")
	@Consumes("application/json")
	@POST
	public String LogInUser(String string)
	{
		System.out.println("test"+string);
		return db.LogIn(string);
	}
	
	@Path("/SubmitTables")
	@Consumes("application/json")
	@POST
	public String submitTables(Timetables t)
	{
		
		db.CreateTable(t);
		return "Got something";
	}
	@Path("/SubmitUpdateTables")
	@Consumes("application/json")
	@POST
	public String submitUpdateTables(Timetables t)
	{
		
		db.CreateTable(t);
		return "Got something";
	}
	
	@Path("/GetTables")
	@Consumes("application/json")
	@Produces("application/json")
	@POST
	public Timetables GetTables(String t)
	{
		
		
		return db.getTimetables(t);
	}
	
	@Path("/DeleteLists")
	@Consumes("application/json")
	@POST
	public void RemoveSelection(Timetables t)
	{
		System.out.println("Removing");
		
		 db.DeleteOpenedSlots(t);
	}
	
	@Path("/EmpSelection")
	@Consumes("application/json")
	@POST
	public void EmpSelection(Timetables t)
	{
		
		
		 db.employeeSelection(t);
	}
	
	@Path("/GetEmpSelections")
	@Consumes("application/json")
	@Produces("application/json")
	@POST
	public Timetables GetEmpSelections(String t)
	{
		
		
		return db.getEmpSelections(t);
	}
	
}
