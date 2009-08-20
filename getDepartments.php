<?php
header('content-type: text/xml');

$username="project-team";
$password="csci5115";
$database="course scheduler";
$server="localhost";

$searchWord = "";
if(isset($_GET['keyword']))
	$searchWord = $_GET['keyword'];
$cStartTime = "";
if(isset($_GET['sTime']))
	$cStartTime = $_GET['sTime'];
$cEndTime = "";
if(isset($_GET['eTime']))
	$cEndTime = $_GET['eTime'];

$con = mysql_connect($server,$username,$password);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db($database, $con);

// Show Department with Active Sections
$query="SELECT DepartmentTable.DepartmentCode, DepartmentTable.DepartmentName, COUNT(DISTINCT CourseTable.CourseName) As DepartmentCount FROM ((SectionTable INNER JOIN CourseTable ON SectionTable.CourseID = CourseTable.CourseID) INNER JOIN DepartmentTable ON CourseTable.DepartmentID = DepartmentTable.DepartmentID) INNER JOIN ClassTable ON ClassID IN ( DiscussionID, LabID, LectureID ) WHERE 1 AND (SectionTable.LectureID > 0 OR SectionTable.DiscussionID > 0 OR SectionTable.LabID > 0)";

if($searchWord != "")
{
	$query = $query . " AND (CourseTable.CourseName like '%" . $searchWord . "%'";
	//$query = $query . " OR CourseTable.Description like '%" . $searchWord . "%'";
	$query = $query . " OR CourseTable.CourseNumber like '%" . $searchWord . "%'";
	$query = $query . " OR DepartmentTable.DepartmentCode like '%" . $searchWord . "%'";
	$query = $query . " OR DepartmentTable.DepartmentName like '%" . $searchWord . "%')";
}

/*if($cStartTime != "" && cEndTime != "")
	$query = $query . " AND (ClassTable.StartTime >= '$cStartTime' AND ClassTable.EndTime <= '$cEndTime')";*/

$query = $query . " GROUP BY DepartmentTable.DepartmentCode";
// Shows All Departments
// $query="SELECT * FROM DepartmentTable WHERE Active='1' ORDER BY DepartmentName";

$result=mysql_query($query);

echo '<?xml version="1.0" encoding="ISO-8859-1"?>
<departments>';

while($row = mysql_fetch_array($result))
{
	$dCode = $row['DepartmentCode'];
	$dName = str_replace("&","&amp;",$row['DepartmentName']);
	$dCount = $row['DepartmentCount'];

	echo "<department>";
	echo "<dcode>" . $dCode . "</dcode>";
	echo "<dname>" . $dName . "</dname>";
	echo "<dcount>" . $dCount . "</dcount>";
	echo "</department>";
}

echo "</departments>";

mysql_close();
?>


