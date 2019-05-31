package Server;

import java.sql.*;

public class MySqlDatabase {
	
	java.sql.Connection con;
	public static MySqlDatabase instance;
	
	public MySqlDatabase()
	{
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost/mydb?user=root&password=root");
			System.out.println("Connected");
			
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public static MySqlDatabase getInstance() {
		if(instance != null)
		{
			return instance;
			
		}
		
		instance = new MySqlDatabase();
		return instance;
	}
	
	public Connection getDBConnection()
	{
		return con;
	}
	
	
	
	

}
