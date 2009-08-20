<?

if(isset($_GET['eventToDeleteId'])){
	
	
	// db query where you delete your event
	// mysql_query("delete from events where ID='".$_GET['eventToDeleteId']."'");
	
	echo "OK";	// This value is sent back to the script. The script looks for the value "OK". This confirms that the event has been deleted.
	
}

?>