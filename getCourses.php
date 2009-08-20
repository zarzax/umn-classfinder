<?php
header('content-type: text/xml');

echo '<?xml version="1.0" encoding="ISO-8859-1"?>
<courses>';

$username="project-team";
$password="csci5115";
$database="course scheduler";
$server="localhost";

$depCode = "";
if(isset($_GET['deptCode']))
	$depCode = $_GET['deptCode'];
$cLevel = "";
if(isset($_GET['cLev']))
	$cLevel = $_GET['cLev'];
$searchWord = "";
if(isset($_GET['keyword']))
	$searchWord = $_GET['keyword'];
$cStartTime = "";
if(isset($_GET['sTime']))
	$cStartTime = $_GET['sTime'];
$cEndTime = "";
if(isset($_GET['eTime']))
	$cEndTime = $_GET['eTime'];
$dMonday = 1;
if(isset($_GET['Monday']))
	$dMonday = $_GET['Monday'];
$dTuesday = 1;
if(isset($_GET['Tuesday']))
	$dTuesday = $_GET['Tuesday'];
$dWednesday = 1;
if(isset($_GET['Wednesday']))
	$dWednesday = $_GET['Wednesday'];
$dThursday = 1;
if(isset($_GET['Thursday']))
	$dThursday = $_GET['Thursday'];
$dFriday = 1;
if(isset($_GET['Friday']))
	$dFriday = $_GET['Friday'];
$dSaturday = 1;
if(isset($_GET['Saturday']))
	$dSaturday = $_GET['Saturday'];
$courseType = 1;
if(isset($_GET['cType']))
	$courseType = $_GET['cType'];
$creditsLow = "";
if(isset($_GET['cLow']))
	$creditsLow = $_GET['cLow'];
$creditsHigh = "";
if(isset($_GET['cHigh']))
	$creditsHigh = $_GET['cHigh'];
$campusLocations = "";
if(isset($_GET['campusLocations']))
	$campusLocations = $_GET['campusLocations'];

$campusLocations = str_replace("\\","",$campusLocations);


$con = mysql_connect($server,$username,$password);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db($database, $con);

$query="SELECT * FROM ((SectionTable INNER JOIN CourseTable ON SectionTable.CourseID = CourseTable.CourseID) INNER JOIN DepartmentTable ON CourseTable.DepartmentID = DepartmentTable.DepartmentID) INNER JOIN ClassTable ON ClassID IN ( DiscussionID, LabID, LectureID ) WHERE 1 AND (SectionTable.LectureID > 0 OR SectionTable.DiscussionID > 0 OR SectionTable.LabID > 0)";

if($searchWord != "")
{
	$query = $query . " AND (CourseTable.CourseName like '%" . $searchWord . "%'";
	//$query = $query . " OR CourseTable.Description like '%" . $searchWord . "%'";
	$query = $query . " OR CourseTable.CourseNumber like '%" . $searchWord . "%'";
	$query = $query . " OR DepartmentTable.DepartmentCode like '%" . $searchWord . "%'";
	$query = $query . " OR DepartmentTable.DepartmentName like '%" . $searchWord . "%')";
}
if($depCode != "" && $depCode != "All")
	$query = $query . " AND DepartmentTable.DepartmentCode = '$depCode'";
if($cLevel != "")
	$query = $query . " AND LEFT(CourseTable.CourseNumber,1) = '$cLevel'";

// Advanced Filters
if($cStartTime != "" && cEndTime != "")
	$query = $query . " AND (ClassTable.StartTime >= '$cStartTime' AND ClassTable.EndTime <= '$cEndTime')";

if($dMonday == 0)
	$query = $query . " AND ClassTable.Monday = '$dMonday'";
if($dTuesday == 0)
	$query = $query . " AND ClassTable.Tuesday = '$dTuesday'";
if($dWednesday == 0)
	$query = $query . " AND ClassTable.Wednesday = '$dWednesday'";
if($dThursday == 0)
	$query = $query . " AND ClassTable.Thursday = '$ddThursday'";
if($dFriday == 0)
	$query = $query . " AND ClassTable.Friday = '$dFriday'";
if($dSaturday == 0)
	$query = $query . " AND ClassTable.Saturday = '$dSaturday'";

$query = $query . " AND ClassTable.CourseType = '$courseType'";

if($creditsLow != "" && creditsHigh != "")
	$query = $query . " AND (SectionTable.Credits >= $creditsLow AND SectionTable.Credits <= $creditsHigh)";

if($campusLocations != "")
	$query = $query . " AND ClassTable.Campus IN $campusLocations";


// End Advanced Filters
	
$query = $query . " ORDER BY DepartmentCode, CourseTable.CourseID, SectionTable.SectionID, ClassTable.ClassID";

$result=mysql_query($query);

$curCourse = "";
$curSection = "";
$courseString = "";
$sectionString = "";
$firstCourse = 0;
$firstSection = 0;
$classSection = 1;
$numSections = 0;
$courseAdded = 0;

while($row = mysql_fetch_array($result))
{
	$count = 0;
	if($row['LectureID'] > 0)
		$count++;
	if($row['DiscussionID'] > 0)
		$count++;
	if($row['LabID'] > 0)
		$count++;

	$course = $row['CourseID'];

	if($course != $curCourse)
	{
		$curCourse = $course;
		$cName = $row['CourseName'];
		$cNumber = $row['CourseNumber'];
		$dCode = str_replace("&","&amp;",$row['DepartmentCode']);
		$cDescription = $row['Description'];
		
		if($firstCourse != 0)
		{
			if($numSections > 0 && $courseAdded == 0)
			{
				echo $courseString;
				$courseAdded = 1;
			}

			echo $sectionString;
			echo "</section>";

			if($numSections > 0)
			{	
				echo "</sections>";
				echo "</course>";
			}
		}
		
		$firstCourse = 1;
		$firstSection = 0;
		$numSections = 0;
		$courseString = "";
		$courseAdded = 0;
		$sectionString = "";
		
		$courseString = $courseString . "<course>";
		$courseString = $courseString . "<cname>" . $cName . "</cname>";
		//$courseString = $courseString . "<cname>" . $campusLocations . "</cname>";
		$courseString = $courseString . "<cnumber>" . $cNumber . "</cnumber>";
		$courseString = $courseString . "<dcode>" . $dCode . "</dcode>";
		$courseString = $courseString . "<cdescription>" . $cDescription . "</cdescription>";
		$courseString = $courseString . "<sections>";
	}

	$section = $row['SectionID'];

	if($section != $curSection)
	{
		
		$curSection = $section;
		if($firstSection != 0)
		{
			if($classSection == $count)
			{
				echo $sectionString;
				echo "</section>";
			}
			$sectionString = "";
		}
		
		$firstSection = 1;
		$classSection = 1;

		$sectionString = $sectionString . "<section>";
		$sectionString = $sectionString . "<specialnumber>" . $row['5digitNum'] . "</specialnumber>";
		$sectionString = $sectionString . "<credits>" . $row['Credits'] . "</credits>";
	}
	else
		$classSection++;

	$stime = $row['StartTime'];
	$etime = $row['EndTime'];

	$sectionString = $sectionString . "<class>";
	$sectionString = $sectionString . "<classid>" . $row['ClassID'] . "</classid>";
	$sectionString = $sectionString . "<classtype>" . $row['ClassType'] . "</classtype>";
	$sectionString = $sectionString . "<sectionnum>" . $row['SectionNum'] . "</sectionnum>";
	$sectionString = $sectionString . "<starttime>" . $stime . "</starttime>";
	$sectionString = $sectionString . "<endtime>" . $etime . "</endtime>";
	$sectionString = $sectionString . "<monday>" . $row['Monday'] . "</monday>";
	$sectionString = $sectionString . "<tuesday>" . $row['Tuesday'] . "</tuesday>";
	$sectionString = $sectionString . "<wednesday>" . $row['Wednesday'] . "</wednesday>";
	$sectionString = $sectionString . "<thursday>" . $row['Thursday'] . "</thursday>";
	$sectionString = $sectionString . "<friday>" . $row['Friday'] . "</friday>";
	$sectionString = $sectionString . "<saturday>" . $row['Saturday'] . "</saturday>";
	$sectionString = $sectionString . "<location>" . $row['Location'] . "</location>";
	$sectionString = $sectionString . "<campus>" . $row['Campus'] . "</campus>";
	$sectionString = $sectionString . "<professorname>" . $row['ProfessorLastName'] . ", " . $row['ProfessorFirstName'] . "</professorname>";
	$sectionString = $sectionString . "</class>";

	if($classSection == $count)
		$numSections++;

	if($numSections > 0 && $courseAdded == 0)
	{
		echo $courseString;
		$courseAdded = 1;
	}
		
}

if($classSection == $count)
{

	echo $sectionString;
	echo "</section>";
	echo "</sections>";
	echo "</course>";
}
echo "</courses>";

mysql_close();
?>


