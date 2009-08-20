<?
/*	

A script from www.dhtmlgoodies.com
This file illustrates how items could be saved to the server 
*/

/* Connection to database */

/* Remove this comment if you have a mysql database connection

$db = mysql_connect("hostname","username","password");
mysql_select_db("databasename",$db);

*/



if(isset($_GET['saveAnItem'])){

	$description = $_GET['description'];
	$description = str_replace("'","&#039;",$_GET['description']);
	#$description = mysql_real_escape_string($description);	// If you have support for mysql_real_escape_string
	
	
	if(isset($_GET['newItem'])){	// This is a new item 
		// Save the item to the server and 
		
		/*
		$sql = "insert into weekSchedule(description,bgColorCode,eventStartDate,eventEndDate)
		values('".$description."','".$_GET['bgColorCode']."','".date("Y-m-d H:i:s",strtotime($_GET['eventStartDate']))."','".date("Y-m-d H:i:s",strtotime($_GET['eventEndDate']))."')";
		//mysql_query($sql);
		
		$id = mysql_insert_id($db);	
		
		echo $id;	// The id is sent back to ajax so that it could update the id of the entry, i.e. update it next time instead of saving another new item.
		*/
	}else{
		/*
		$sql = "update weekSchedule set description='".$description."',bgColorCode='".$_GET['bgColorCode']."',
		eventStartDate='".date("Y-m-d H:i:s",strtotime($_GET['eventStartDate']))."',
		eventEndDate='".date("Y-m-d H:i:s",strtotime($_GET['eventEndDate']))."' where ID='".$_GET['id']."'";
		//mysql_query($sql);
		*/
	}	
}

echo mktime();	// Just for testing - remove this line if you put this into production.

?>