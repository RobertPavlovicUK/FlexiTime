package Server;

public class Timetables {
	
	Timetable[] TimetableArray;
	SelectedSlots[] selectedSlots;
	String organizationName;
	String sender;
	
	public Timetables() {}
	
	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	
	public Timetables(Timetable[] TimetableArray,SelectedSlots[] selectedSlots) {
		this.TimetableArray =TimetableArray;
		this.selectedSlots = selectedSlots;
		
	}
	
	
	public Timetable[] getTimetableArray() {
		return TimetableArray;
	}
	public void setTimetableArray(Timetable[] TimetableArray) {
		this.TimetableArray = TimetableArray;
	}
	public SelectedSlots[] getSelectedSlots() {
		return selectedSlots;
	}
	public void setSelectedSlots(SelectedSlots[] selectedSlots) {
		this.selectedSlots = selectedSlots;
	}
}
