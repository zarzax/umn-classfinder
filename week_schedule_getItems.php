<?
echo '<?xml version="1.0" ?>';

/* Input to this file:

$_GET['year'];
$_GET['month'];
$_GET['day'];

*/

$startOfWeek = date("Y-m-d H:i:s",mktime(0,0,0,$_GET['month'],$_GET['day'],$_GET['year']));
$endOfWeek = strtotime($startOfWeek."+1 WEEK");

// You will typically make a db query like this:
/*
$res = mysql_query("select * from weekSchedule where eventStartDate>='$startOfWeek' and eventEndDate<'$endOfWeek'");
while($inf = mysql_fetch_array($res)){
	?>
	<item>
		<id><? echo $inf["ID"]; ?></id>
		<description><? echo $inf["description"]; ?></description>
		<eventStartDate><? echo gmdate('D, d M Y H:i:s',strtotime($inf["eventStartDate"])) . ' GMT'; ?></eventStartDate>
		<eventEndDate><? echo gmdate('D, d M Y H:i:s',strtotime($inf["eventEndDate"])) . ' GMT'; ?></eventEndDate>
		<bgColorCode><? echo $inf["bgColorCode"]; ?></bgColorCode>
	</item>
	<?
	
}

*/


/**************************************************************************************
*
* The code below is just an example used for the demo
*
***************************************************************************************/

$week1 = date("2006-02-13 00:00:00");
$week2 = date("2006-02-20 00:00:00");
$week3 = date("2006-02-27 00:00:00");
$week4 = date("2006-03-06 00:00:00");
$week5 = date("2006-03-13 00:00:00");

if($startOfWeek>=$week1 && $startOfWeek<$week2){
?>
<item>
	<id>1</id>
	<description>CSCI 5115</description>
	<eventStartDate>Mon, 13 Feb 2006 10:30 CST</eventStartDate>
	<eventEndDate>Mon, 13 Feb 2006 12:00 CST</eventEndDate>
	<bgColorCode>#FFFFFF</bgColorCode>
</item>
<item>
	<id>2</id>
	<description>CSCI 5115</description>
	<eventStartDate>Wed, 15 Feb 2006 10:30 CST</eventStartDate>
	<eventEndDate>Wed, 15 Feb 2006 12:00 CST</eventEndDate>
	<bgColorCode>#FFFFFF</bgColorCode>
</item>
<item>
	<id>3</id>
	<description>ACCT 2205</description>
	<eventStartDate>Tue, 14 Feb 2006 13:00 CST</eventStartDate>
	<eventEndDate>Tue, 14 Feb 2006 15:00 CST</eventEndDate>
	<bgColorCode>#FFFF00</bgColorCode>
</item>
<item>
	<id>4</id>
	<description>CSCI 1901</description>
	<eventStartDate>Wed, 15 Feb 2006 18:00 CST</eventStartDate>
	<eventEndDate>Wed, 15 Feb 2006 22:00 CST</eventEndDate>
	<bgColorCode>#EEEEEE</bgColorCode>
</item>
<?php

}

?>







