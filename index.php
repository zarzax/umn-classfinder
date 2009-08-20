<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Class Scheduler</title>
	
	<!-- JavaScript Files -->
	<script language="JavaScript" type="text/javascript" src="js/coursesearch.js"></script>
	<script language="JavaScript" type="text/javascript" src="js/selectableelements.js"></script>
	<script language="JavaScript" type="text/javascript" src="js/selectedcourses.js"></script>

	<!-- Apple Menu JavaScript Files -->
	<script src="js/apple/prototype.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/apple/scriptaculous.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/apple/browserdetect.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/apple/event_mixins.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/apple/drawers.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/apple/slider.js" type="text/javascript" charset="utf-8"></script>

	<!-- CSS Files -->
	<link href="css/styles.css" rel="stylesheet" type="text/css" />
	<link href="css/courselist.css" rel="stylesheet" type="text/css" />

	<!-- Apple Menu CSS Files -->
	<link href="css/apple/home.css" rel="stylesheet" type="text/css" charset="utf-8" />
	<link href="css/apple/base.css" rel="stylesheet" type="text/css" charset="utf-8" />
	
	<!-- Visual Planner Files -->
	<? $rowHeight = 35; ?>
	<link href="css/visual-planner.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/ajax.js"></script>
	<script type="text/javascript">
		// It's important that this JS section is above the line below where dhtmlgoodies-week-planner.js is included
		var itemRowHeight= 35;
		var initDateToShow = '2006-02-13';	// Initial date to show
	</script>
	<script src="js/dhtmlgoodies-week-planner.js?random=20060214" type="text/javascript"></script>
	<!-- End Visual Planner Header -->

</head>

<body onload="requestInfo();">
<!-- Class Scheduler -->

<div id="searchBlock" style="width:1000px;">
<table border="0" cellspacing="0" cellpadding="0" style="margin-top: 5px; margin-left: 5px;">
	<tr>
		<td>	
			<div id="container">
			<div id="main">
			<div id="content" class="grid3cola">
			<div class="column last sidebar">
			<div id="latest" class="box">
				<ul class="drawers slider">
					<li id="search">
						<h3 class="drawer-handle open">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search</h3>
						<div class="drawer-content open">
							
							<table border="0" cellspacing="0" cellpadding="0" style="width:290px;">
								<tr>
									<td style="width:95px;font-weight:bold;">
										Term
									</td>
									<td style="width:195px;">
										<select id="term" style="width:195px;">
											<option>Fall 07</option>
										</select>
									</td>
								</tr>
							</table>

							<!-- OLD STYLE <input type="text" id="keyword" onchange="keywordSearch();" onkeyup="if((event.keyCode||event.which) == 13){this.blur();};" style="width:300px;" /> -->
							<input type="text" id="keyword" style="width:190px;" /><input type="button" value="Search" onclick="requestInfo()" style="width:95px;" />

							<select id="departmentSelect" size="2" onchange="getCourses();" style="width:290px;height:230px;">
								<option></option>
							</select>
						</div>
					</li>
					<li id="advancedFilters">
						<!-- Does not work in IE -->
						
						<h3 class="drawer-handle"><span id="advFilterStatus" class="drawer-handle-span-off">Off</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advanced Filters</h3>
						<div class="drawer-content">
							<span style="font-weight:bold;">Time Range:</span>&nbsp;&nbsp;
							<select id="StartTime">
								<option value="00:00" selected="selected">12:00 AM</option>
								<option value="01:00">1:00 AM</option>
								<option value="02:00">2:00 AM</option>
								<option value="03:00">3:00 AM</option>
								<option value="04:00">4:00 AM</option>
								<option value="05:00">5:00 AM</option>
								<option value="06:00">6:00 AM</option>
								<option value="07:00">7:00 AM</option>
								<option value="08:00">8:00 AM</option>
								<option value="09:00">9:00 AM</option>
								<option value="10:00">10:00 AM</option>
								<option value="11:00">11:00 AM</option>
								<option value="12:00">12:00 PM</option>
								<option value="13:00">1:00 PM</option>
								<option value="14:00">2:00 PM</option>
								<option value="15:00">3:00 PM</option>
								<option value="16:00">4:00 PM</option>
								<option value="17:00">5:00 PM</option>
								<option value="18:00">6:00 PM</option>
								<option value="19:00">7:00 PM</option>
								<option value="20:00">8:00 PM</option>
								<option value="21:00">9:00 PM</option>
								<option value="22:00">10:00 PM</option>
								<option value="23:00">11:00 PM</option>
								<option value="23:59">11:59 PM</option>
							</select>
							&nbsp;to&nbsp;
							<select id="EndTime">
								<option value="00:00">12:00 AM</option>
								<option value="01:00">1:00 AM</option>
								<option value="02:00">2:00 AM</option>
								<option value="03:00">3:00 AM</option>
								<option value="04:00">4:00 AM</option>
								<option value="05:00">5:00 AM</option>
								<option value="06:00">6:00 AM</option>
								<option value="07:00">7:00 AM</option>
								<option value="08:00">8:00 AM</option>
								<option value="09:00">9:00 AM</option>
								<option value="10:00">10:00 AM</option>
								<option value="11:00">11:00 AM</option>
								<option value="12:00">12:00 PM</option>
								<option value="13:00">1:00 PM</option>
								<option value="14:00">2:00 PM</option>
								<option value="15:00">3:00 PM</option>
								<option value="16:00">4:00 PM</option>
								<option value="17:00">5:00 PM</option>
								<option value="18:00">6:00 PM</option>
								<option value="19:00">7:00 PM</option>
								<option value="20:00">8:00 PM</option>
								<option value="21:00">9:00 PM</option>
								<option value="22:00">10:00 PM</option>
								<option value="23:00">11:00 PM</option>
								<option value="23:59" selected="selected">11:59 PM</option>
							</select><br/>
							
							<table border="0" cellspacing="0" cellpadding="0" style="width:230px; margin-top:5px;">
								<tr>
									<td rowspan="2" style="width:80px;font-weight:bold;">Days:</td>
									<td style="width:25px;padding-left:4px;">M</td>
									<td style="width:25px;padding-left:4px;">Tu</td>
									<td style="width:25px;padding-left:4px;">W</td>
									<td style="width:25px;padding-left:4px;">Th</td>
									<td style="width:25px;padding-left:4px;">F</td>
									<td style="width:25px;padding-left:4px;">Sa</td>
								</tr>
								<tr>	
									<td><input type="checkbox" id="exM" class="checkbox" checked="checked" /></td>
									<td><input type="checkbox" id="exTu" class="checkbox" checked="checked" /></td>
									<td><input type="checkbox" id="exW" class="checkbox" checked="checked" /></td>
									<td><input type="checkbox" id="exTh" class="checkbox" checked="checked" /></td>
									<td><input type="checkbox" id="exF" class="checkbox" checked="checked" /></td>
									<td><input type="checkbox" id="exSa" class="checkbox" checked="checked" /></td>
								</tr>
							</table><br/>
							
							<span style="font-weight:bold;">Course Type:</span><br/>
							<input type="radio" id="CourseType1" name="CourseType" checked="checked">&nbsp;Regular</input><br/>
							<input type="radio" id="CourseType2" name="CourseType">&nbsp;Independent and Distance Learning</input><br/><br/>

							<span style="font-weight:bold;">Credit Range:</span>&nbsp;&nbsp;
							<select id="CreditsLow">
								<option value="0" selected="selected">0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9+</option>
							</select>
							&nbsp;to&nbsp;
							<select id="CreditsHigh">
								<option value="0">0</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9" selected="selected">9+</option>
							</select><br/><br/>

							<span style="font-weight:bold;">Campus Areas:</span><br/>
							<input type="checkbox" id="CampusEB" class="checkbox" checked="checked">East Bank</input>
							<input type="checkbox" id="CampusWB" class="checkbox" checked="checked">West Bank</input>
							<input type="checkbox" id="CampusSTP" class="checkbox" checked="checked">St. Paul</input>
							<input type="checkbox" id="CampusR" class="checkbox" checked="checked">Rochester</input><br/>
							<input type="checkbox" id="OffCampusTC" class="checkbox" checked="checked">Off Campus - TC</input>
							<input type="checkbox" id="OffCampusR" class="checkbox" checked="checked">Off Campus - Rochester</input><br/><br/>

							<input type="button" value="Reset" onclick="resetFilters();" style="width:130px;" />&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="button" value="Apply Filters" onclick="applyFilters();" style="width:130px;" />												
						</div>
					</li>
				</ul><!--/drawers-->
			<div class="drawercap"></div>
			</div><!--/latest-->
			</div><!--/column.last-->
			</div><!--/content-->
			</div><!--/main-->
			</div><!--/#container-->
		</td>
		<td valign="top">
			<table border="0" cellspacing="0" cellpadding="0" style="width:700px;">
				<tr>
					<td style="width:10px;height:23px;background:url('images/line.gif');">&nbsp;</td>
					<td id="tAll" style="width:66px;height:23px;background:url('images/white-tab.jpg');" align="center"><a href="#" class="courseLevel" onclick="getCoursesByLevel('all')"><strong>All</strong></a></td>
					
					<td style="width:1px;height:23px;background:url('images/line.gif');">&nbsp;</td>
					<td id="t1xxx" style="width:66px;height:23px;background:url('images/grey-tab.jpg');" align="center"><a href="#" class="courseLevel" onclick="getCoursesByLevel('1')"><strong>1xxx</strong></a></td>
					
					<td style="width:1px;height:23px;background:url('images/line.gif');">&nbsp;</td>
					<td id="t2xxx" style="width:66px;height:23px;background:url('images/grey-tab.jpg');" align="center"><a href="#" class="courseLevel" onclick="getCoursesByLevel('2')"><strong>2xxx</strong></a></td>

					<td style="width:1px;height:23px;background:url('images/line.gif');">&nbsp;</td>
					<td id="t3xxx" style="width:66px;height:23px;background:url('images/grey-tab.jpg');" align="center"><a href="#" class="courseLevel" onclick="getCoursesByLevel('3')"><strong>3xxx</strong></a></td>
					
					<td style="width:1px;height:23px;background:url('images/line.gif');">&nbsp;</td>
					<td id="t4xxx" style="width:66px;height:23px;background:url('images/grey-tab.jpg');" align="center"><a href="#" class="courseLevel" onclick="getCoursesByLevel('4')"><strong>4xxx</strong></a></td>

					<td style="width:1px;height:23px;background:url('images/line.gif');">&nbsp;</td>
					<td id="t5xxx" style="width:66px;height:23px;background:url('images/grey-tab.jpg');" align="center"><a href="#" class="courseLevel" onclick="getCoursesByLevel('5')"><strong>5xxx</strong></a></td>
					
					<td style="width:1px;height:23px;background:url('images/line.gif');">&nbsp;</td>
					<td id="t6xxx" style="width:66px;height:23px;background:url('images/grey-tab.jpg');" align="center"><a href="#" class="courseLevel" onclick="getCoursesByLevel('6')"><strong>6xxx</strong></a></td>

					<td style="width:1px;height:23px;background:url('images/line.gif');">&nbsp;</td>
					<td id="t8xxx" style="width:66px;height:23px;background:url('images/grey-tab.jpg');" align="center"><a href="#" class="courseLevel" onclick="getCoursesByLevel('8')"><strong>8xxx</strong></a></td>
					
					<td style="width:155px;height:23px;background:url('images/line.gif');">&nbsp;</td>
				</tr>
			</table>

			<div id="results" class="div-list" onclick="this.focus();" onkeydown="if((event.keyCode||event.which) == 40 || (event.keyCode||event.which) == 38){ changeClass(event.keyCode); }" onselectstart="return false;">
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<div id="selectedCourses" class="courses" style="width:300px;height:525px;border: 1px solid black;">
				<h2>Course List</h2>
				<ul id="CourseList" class="CourseListContainer" style="width:300px;">
					<li style="display:none;"></li>
 				</ul>	
			</div>
		</td>
		<td>
			<!-- Visual Planner -->
			<form>
			<div id="weekScheduler_container">
				<div id="weekScheduler_top">
					<div class="spacer"><span></span></div>
					<div class="days" id="weekScheduler_dayRow">
						<div>Monday <span></span></div>
						<div>Tuesday <span></span></div>
						<div>Wednesday <span></span></div>
						<div>Thursday <span></span></div>
						<div>Friday <span></span></div>
						<div>Saturday <span></span></div>	
					</div>	
				</div>
				<div id="weekScheduler_content">
					<div id="weekScheduler_hours">
						<?
						$startHourOfWeekPlanner = 8;	// Start hour of week planner
						$endHourOfWeekPlanner = 21;	// End hour of weekplanner.

						$date = mktime($startHourOfWeekPlanner,0,0,5,5,2006);
						for($no=$startHourOfWeekPlanner;$no<=$endHourOfWeekPlanner;$no++){

						$hour = $no;

						// Remove these two lines in case you want to show hours like 08:00 - 23:00
						$suffix = strtoupper(date("a",$date));
						$hour = date("g",$date);

						// $suffix = "00"; // Enable this line in case you want to show hours like 08:00 - 23:00 


						$time = $hour."<span class=\"content_hour\">$suffix</span>";	
						$date = $date + 3600;		
						?>
						<div class="calendarContentTime"><? echo $time; ?></div>
						<?			
						}
						?>
					</div>	
					<div id="weekScheduler_appointments">
						<?
						for($no=0;$no<6;$no++){	// Looping through the days of a week
						?>
						<div class="weekScheduler_appointments_day">
							<?
							for($no2=$startHourOfWeekPlanner;$no2<=$endHourOfWeekPlanner;$no2++){
							echo "<div id=\"weekScheduler_appointment_hour".$no."_".$no2."\" class=\"weekScheduler_appointmentHour\"></div>\n";					
							}				
							?>				
						</div>
						<?
						}
						?>		
					</div>
				</div>
			</div>
			</form>
		</td>
	</tr>
</table>

</div>

<script type="text/javascript">
	var d1 = new SelectableElements(document.getElementById("results"), false);
	d1.onchange = selectedDiv;
</script>

<input type="hidden" id="curTab" value="all" />
<div id='tempholder' style="display:none"></div>

</body>
</html>
