var xmlDeptRequest = "";
var xmlCoursesRequest = "";
var urlRequest = "";
var divIndex = -1;

function getDepartments()
{
	clearSelect("departmentSelect");

	xmlDeptRequest = null;
	
	urlRequest = "getDepartments.php?keyword=" + document.getElementById('keyword').value;
	// Advanced Filter	
	urlRequest = urlRequest + "&sTime=" + document.getElementById('StartTime').value + "&eTime=" + document.getElementById('EndTime').value;
	
	if (window.XMLHttpRequest) // code for Mozilla, etc.
	{
  		xmlDeptRequest = new XMLHttpRequest();
	}
	else if(window.ActiveXObject) // code for IE
	{
  		xmlDeptRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlDeptRequest !== null)
  	{
  		xmlDeptRequest.open("GET",urlRequest,true);
		xmlDeptRequest.onreadystatechange = handleDeptHttpResponse;
		xmlDeptRequest.send(null);	
  	}
	else
  	{
  		alert("Your browser does not support XMLHttp.");
  	}
};

function getCourses()
{
	
	var dVal = "";
	var lev = "";

	xmlCoursesRequest = null;
	var departmentList = document.getElementById('departmentSelect');

	clearSelect("results");

	document.getElementById('results').innerHTML = "Searching database...";

	if(document.getElementById('StartTime').selectedIndex > document.getElementById('EndTime').selectedIndex)
	{
		var intHolder = document.getElementById('StartTime').selectedIndex;
		document.getElementById('StartTime').options[document.getElementById('EndTime').selectedIndex].selected = true;
		document.getElementById('EndTime').options[intHolder].selected = true;
	}
	if(document.getElementById('CreditsLow').selectedIndex > document.getElementById('CreditsHigh').selectedIndex)
	{
		var intHolder = document.getElementById('CreditsLow').selectedIndex;
		document.getElementById('CreditsLow').options[document.getElementById('CreditsHigh').selectedIndex].selected = true;
		document.getElementById('CreditsHigh').options[intHolder].selected = true;
	}

	if(document.getElementById('curTab').value != 'all')
	{
		lev = document.getElementById('curTab').value;
	}
	if(departmentList.selectedIndex != -1)
	{
		dVal = departmentList.options[departmentList.selectedIndex].value;
	}

	var sMonday = 0;
	var sTuesday = 0;
	var sWednesday = 0;
	var sThursday = 0;
	var sFriday = 0;
	var sSaturday = 0;
	if(document.getElementById('exM').checked)
		sMonday = 1;
	if(document.getElementById('exTu').checked)
		sTuesday = 1;
	if(document.getElementById('exW').checked)
		sWednesday = 1;
	if(document.getElementById('exTh').checked)
		sThursday = 1;
	if(document.getElementById('exF').checked)
		sFriday = 1;
	if(document.getElementById('exSa').checked)
		sSaturday = 1;

	var cType = 1;
	if(document.getElementById('CourseType2').checked)
		cType = 0;
	var cLoc = "";
	if(document.getElementById('CampusEB').checked)
		cLoc = cLoc + "'TCEASTBANK',";
	if(document.getElementById('CampusWB').checked)
		cLoc = cLoc + "'TCWESTBANK',";
	if(document.getElementById('CampusSTP').checked)
		cLoc = cLoc + "'STPAUL',";
	if(document.getElementById('CampusR').checked)
		cLoc = cLoc + "'ROCHESTER',";
	if(document.getElementById('OffCampusTC').checked)
		cLoc = cLoc + "'OFFCMPTC',";
	if(document.getElementById('OffCampusR').checked)
		cLoc = cLoc + "'OFFCMPROCH',";

	if(cLoc.length > 0)
	{
		cLoc = cLoc.substring(0,cLoc.length-1);
		cLoc = "(" + cLoc + ")";
	}
	else
	{
		cLoc = "(null)";
	}
	
	urlRequest = "getCourses.php";
	// Search
	urlRequest = urlRequest + "?cLev=" + lev + "&deptCode=" + dVal + "&keyword=" + document.getElementById('keyword').value;
	// Advanced Filters	
	urlRequest = urlRequest + "&sTime=" + document.getElementById('StartTime').value + "&eTime=" + document.getElementById('EndTime').value;
	urlRequest = urlRequest + "&Monday=" + sMonday + "&Tuesday=" + sTuesday + "&Wednesday=" + sWednesday + "&Thursday=" + sThursday + "&Friday=" + sFriday + "&Saturday=" + sSaturday;
	urlRequest = urlRequest + "&cType=" + cType;
	urlRequest = urlRequest + "&cLow=" + document.getElementById('CreditsLow').value + "&cHigh=" + document.getElementById('CreditsHigh').value;
	urlRequest = urlRequest + "&campusLocations=" + cLoc;
	

	if (window.XMLHttpRequest) // code for Mozilla, etc.
	{
  		xmlCoursesRequest = new XMLHttpRequest();
	}
	else if(window.ActiveXObject) // code for IE
	{
  		xmlCoursesRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlCoursesRequest !== null)
  	{
		xmlCoursesRequest.open("GET",urlRequest,true);
		xmlCoursesRequest.onreadystatechange = handleCourseHttpResponse;
		xmlCoursesRequest.send(null);
	}
	else
  	{
  		alert("Your browser does not support XMLHttp.");
  	}
};


function getCoursesByLevel(lev)
{
	document.getElementById('curTab').value=lev;
		
	// Change Background Images
	document.getElementById('tAll').style.backgroundImage="url(images/grey-tab.jpg)";
	document.getElementById('t1xxx').style.backgroundImage="url(images/grey-tab.jpg)";
	document.getElementById('t2xxx').style.backgroundImage="url(images/grey-tab.jpg)";
	document.getElementById('t3xxx').style.backgroundImage="url(images/grey-tab.jpg)";
	document.getElementById('t4xxx').style.backgroundImage="url(images/grey-tab.jpg)";
	document.getElementById('t5xxx').style.backgroundImage="url(images/grey-tab.jpg)";
	document.getElementById('t6xxx').style.backgroundImage="url(images/grey-tab.jpg)";
	document.getElementById('t8xxx').style.backgroundImage="url(images/grey-tab.jpg)";

	if(lev == "all")
	{
		document.getElementById('tAll').style.backgroundImage="url(images/white-tab.jpg)";
		lev = "";
	}
	else
	{
		document.getElementById('t' + lev + 'xxx').style.backgroundImage="url(images/white-tab.jpg)";
	}

	getCourses();
};

function requestInfo()
{
	getDepartments();
	getCoursesByLevel('all');
};

function handleDeptHttpResponse()
{
	if(xmlDeptRequest.readyState == 4)
	{
		if(xmlDeptRequest.status == 200)
		{
			var xmlDocument = xmlDeptRequest.responseXML.documentElement;
			var deptList = xmlDocument.getElementsByTagName('department');	
			
			addDepartment("All","All Subjects", -1,true);

			for(var x = 0; x < deptList.length; x++)
			{				
				var code = "";
				var name = "";
				var count = -1;	

				if(deptList[x].getElementsByTagName("dcode")[0].childNodes[0] !== null)
				{
					code = deptList[x].getElementsByTagName("dcode")[0].childNodes[0].nodeValue;
				}				
				if(deptList[x].getElementsByTagName("dname")[0].childNodes[0] !== null)
				{				
					name = deptList[x].getElementsByTagName("dname")[0].childNodes[0].nodeValue;
				}
				if(deptList[x].getElementsByTagName("dcount")[0].childNodes[0] !== null)
				{				
					count = deptList[x].getElementsByTagName("dcount")[0].childNodes[0].nodeValue;
				}							
								
				addDepartment(code,name,count,false);
			}			
		}
		else
		{
			alert("Error receiving data: " + xmlDeptRequest.statusText);
		}
	}
};


function handleCourseHttpResponse()
{
	if(xmlCoursesRequest.readyState == 4 )
	{
		if(xmlCoursesRequest.status == 200)
		{
			document.getElementById('results').innerHTML = "";
		
			var xmlDocument = xmlCoursesRequest.responseXML.documentElement;
			
			if(xmlDocument)
			{
				var courseResults = xmlDocument.getElementsByTagName('course');
			}
			else
			{
				var divResults = document.getElementById('results');
				divResults.innerHTML = "&nbsp;&nbsp;0 Courses Found.";
				return false;
			}
						
			

			var cIndex = 0;
			var zeroCheck = 0;
			for(var x = 0; x < courseResults.length; x++)
			{
				zeroCheck++;				
				cname = "";
				cnumber = "";
				dcode = "";
				cdescription = "";
			
				var courseXML = "";
				if(window.XMLSerializer)
				{
					var xmlSerializer = new XMLSerializer();
					courseXML = xmlSerializer.serializeToString(courseResults[x]);
				}
				else
				{
					courseXML = courseResults[x].xml;
				}			
		
				courseXML = courseXML.replace(/\n/g,"");
				courseXML = courseXML.replace(/\r/g,"");
				courseXML = courseXML.replace(/'/g,"\\\'");
				courseXML = courseXML.replace(/"/g,"\"");
				
				
				if(courseResults[x].getElementsByTagName("cname")[0].childNodes[0] !== null)
				{
					cname = courseResults[x].getElementsByTagName("cname")[0].childNodes[0].nodeValue;
				}				
				if(courseResults[x].getElementsByTagName("cnumber")[0].childNodes[0] !== null)
				{				
					cnumber = courseResults[x].getElementsByTagName("cnumber")[0].childNodes[0].nodeValue;
				}							
				if(courseResults[x].getElementsByTagName("dcode")[0].childNodes[0] !== null)
				{				
					dcode= courseResults[x].getElementsByTagName("dcode")[0].childNodes[0].nodeValue;
				}
				if(courseResults[x].getElementsByTagName("cdescription")[0].childNodes[0] !== null)
				{				
					cdescription = courseResults[x].getElementsByTagName("cdescription")[0].childNodes[0].nodeValue;											
				}

				addCourseResult(cname,cnumber,dcode,cdescription,cIndex);

				var numSections = courseResults[x].getElementsByTagName("sections")[0].childNodes.length;
				var sectionList = courseResults[x].getElementsByTagName("sections");
				for(var y = 0; y < numSections; y++)
				{
					var divID = dcode + "-" + cnumber + "-info";
					var divTag = document.getElementById(divID);
					var specialNumber = sectionList[0].childNodes[y].getElementsByTagName("specialnumber")[0].childNodes[0].nodeValue;
					var creditNumber = sectionList[0].childNodes[y].getElementsByTagName("credits")[0].childNodes[0].nodeValue;
									
					for(var j = 0; j<sectionList[0].childNodes[y].getElementsByTagName("class").length; j++)
					{
						
						
						var classType = sectionList[0].childNodes[y].getElementsByTagName("classtype")[j].childNodes[0].nodeValue;
						var secNum = sectionList[0].childNodes[y].getElementsByTagName("sectionnum")[j].childNodes[0].nodeValue;
						
						// Gets and formats the class time 
						var sTime = sectionList[0].childNodes[y].getElementsByTagName("starttime")[j].childNodes[0].nodeValue;
						var eTime = sectionList[0].childNodes[y].getElementsByTagName("endtime")[j].childNodes[0].nodeValue;
						var sTimePieces = sTime.split(":");
						var eTimePieces = eTime.split(":");
						if(sTimePieces[0] > 12)
						{
							if(sTimePieces[0] == 24)
								sTime = (sTimePieces[0]-12) + ":" + sTimePieces[1] + " AM";
							else
								sTime = (sTimePieces[0]-12) + ":" + sTimePieces[1] + " PM";
						}
						else
						{
							if(sTimePieces[0] == 12)
								sTime = sTimePieces[0] + ":" + sTimePieces[1] + " PM";
							else
								sTime = sTimePieces[0] + ":" + sTimePieces[1] + " AM";
						}
						if(eTimePieces[0] > 12)
						{
							if(eTimePieces[0] == 24)
								eTime = (eTimePieces[0]-12) + ":" + eTimePieces[1] + " AM";
							else
								eTime = (eTimePieces[0]-12) + ":" + eTimePieces[1] + " PM";
						}
						else
						{
							if(eTimePieces[0] == 12)
								eTime = eTimePieces[0] + ":" + eTimePieces[1] + " PM";
							else
								eTime = eTimePieces[0] + ":" + eTimePieces[1] + " AM";
						}
						
						var monday = sectionList[0].childNodes[y].getElementsByTagName("monday")[j].childNodes[0].nodeValue;
						var tuesday = sectionList[0].childNodes[y].getElementsByTagName("tuesday")[j].childNodes[0].nodeValue;
						var wednesday = sectionList[0].childNodes[y].getElementsByTagName("wednesday")[j].childNodes[0].nodeValue;
						var thursday = sectionList[0].childNodes[y].getElementsByTagName("thursday")[j].childNodes[0].nodeValue;
						var friday = sectionList[0].childNodes[y].getElementsByTagName("friday")[j].childNodes[0].nodeValue;
						var saturday = sectionList[0].childNodes[y].getElementsByTagName("saturday")[j].childNodes[0].nodeValue;
						var location = "";
						var campus = "";
												
						if(sectionList[0].childNodes[y].getElementsByTagName("campus")[j].childNodes[0] != null)	
						{	
							campus = sectionList[0].childNodes[y].getElementsByTagName("campus")[j].childNodes[0].nodeValue;
						}
						if(sectionList[0].childNodes[y].getElementsByTagName("location")[j].childNodes[0] != null)
						{
							location = sectionList[0].childNodes[y].getElementsByTagName("location")[j].childNodes[0].nodeValue;
						}
						
						var professorName = sectionList[0].childNodes[y].getElementsByTagName("professorname")[j].childNodes[0].nodeValue;
						var classDays = "";

						if(monday == 1)
							classDays = classDays + "M";
						if(tuesday == 1)
						{
							if(classDays.length > 0)
								classDays = classDays + ",Tu";
							else
								classDays = classDays + "Tu";
						}
						if(wednesday == 1)
						{
							if(classDays.length > 0)
								classDays = classDays + ",W";
							else
								classDays = classDays + "W";
						}
						if(thursday == 1)
						{
							if(classDays.length > 0)
								classDays = classDays + ",Th";
							else
								classDays = classDays + "Th";
						}
						if(friday == 1)
						{
							if(classDays.length > 0)
								classDays = classDays + ",F";
							else
								classDays = classDays + "F";
						}
						if(saturday == 1)
						{
							if(classDays.length > 0)
								classDays = classDays + ",Sa";
							else
								classDays = classDays + "Sa";
						}
						
						var lecID = "";
						if(classType == "LEC" && sectionList[0].childNodes[y].getElementsByTagName("class").length > 1)
						{
							lecID = "LEC" +  sectionList[0].childNodes[y].getElementsByTagName("classid")[j].childNodes[0].nodeValue;
							
							if(document.getElementById(lecID) == null)
							{	
								var newDiv = document.createElement('div');
	
								newDiv.id = lecID;
								newDiv.innerHTML = "-" + secNum + "&nbsp;" + classType + ", " + sTime + " - " + eTime + ", " + classDays + " " + professorName + " " + location + " " + campus + "<br/>";

								divTag.appendChild(newDiv);
							}
						}
						else if(j > 0)
						{
							lecID = "LEC" +  sectionList[0].childNodes[y].getElementsByTagName("classid")[j-1].childNodes[0].nodeValue;
							var curID = classType +  sectionList[0].childNodes[y].getElementsByTagName("classid")[j].childNodes[0].nodeValue;							
							var oldDiv = document.getElementById(lecID);
							
							if(document.getElementById(curID) == null)
							{
								var newDiv2 = document.createElement('div');
	
								newDiv2.style.marginLeft = "20px";
								newDiv2.id = curID;
								newDiv2.innerHTML = "-" + secNum + "&nbsp;" + classType + ", " + sTime + " - " + eTime + ", " + classDays + " " + professorName + "<br/>";
								newDiv2.innerHTML = newDiv2.innerHTML + "<input class=\"button\" type=\"button\" value=\"Add\" onclick=\"addCourse(\'" + courseXML + "','" + specialNumber + "\');\" />&nbsp;" + specialNumber + "&nbsp;" + creditNumber + "&nbsp;Credits, " + location + " " + campus + "<br/>";

								oldDiv.appendChild(newDiv2);
							}
						}
						else
						{
							var curID = classType +  sectionList[0].childNodes[y].getElementsByTagName("classid")[j].childNodes[0].nodeValue;							
							
							if(document.getElementById(curID) == null)
							{
								var newDiv3 = document.createElement('div');
								newDiv3.style.marginLeft = "20px";
								newDiv3.id = curID;
								newDiv3.innerHTML = "-" + secNum + "&nbsp;" + classType + ", " + sTime + " - " + eTime + ", " + classDays + " " + professorName + ", " + location + " " + campus + "<br/>";
								newDiv3.innerHTML = newDiv3.innerHTML + "<input class=\"button\" type=\"button\" value=\"Add\" onclick=\"addCourse(\'" + courseXML + "','" + specialNumber + "\');\" />&nbsp;" + specialNumber + "&nbsp;" + creditNumber + "&nbsp;Credits<br/>";
								divTag.appendChild(newDiv3);
							}
						}
					}
				}
			if(cIndex == 1)
				cIndex = 0;
			else
				cIndex++;

			}

			if(zeroCheck == 0)
			{
				var divResults = document.getElementById('results');
				divResults.innerHTML = "&nbsp;&nbsp;0 Courses Found.";
				return false;
			}
			
			var resultsDiv = document.getElementById('results');
			if(resultsDiv.childNodes.length > 0)
			{
				d1.setItemSelected(d1.getItem(0),true);
				resultsDiv.childNodes[1].style.display = "block";
			}

			// resultsDiv.blur();
			// document.getElementById('departmentSelect').focus();
		}
		else
		{
			alert("Error receiving data: " + xmlCoursesRequest.statusText);
		}
	}
};


// Adds Departments to Dropdown
function addDepartment(code, dName, dCount, sel)
{
	// Adding a department option

	var newOption = document.createElement('option');
	var theText = "";
	if(dCount != -1)
		theText = document.createTextNode(dName + " - " + code + " (" + dCount + ")");
	else
		theText = document.createTextNode(dName + " - " + code);

	if(code == "All")
		theText = document.createTextNode(dName);

	newOption.appendChild(theText);
	newOption.value = code;
	newOption.selected = sel;

	var departmentList = document.getElementById('departmentSelect');
	departmentList.appendChild(newOption);
};

// Adds Courses to Results
function addCourseResult(name, number, code, description, color)
{
	// Adding the Search Results

	var newDiv = document.createElement('div');
	
	newDiv.id = code + "-" + number;
	//newDiv.innerHTML = "<a href='#'><img src='images/expand.gif' border='0' /></a> ";
	newDiv.innerHTML = code + " " + number + " " + name;
	if(color == 0)
		newDiv.className = "white";
	else
		newDiv.className = "darkgrey";

	var divResults = document.getElementById('results');
	divResults.appendChild(newDiv);

	var infoDiv = document.createElement('div');

	description = description.replace(/"/g, "\\\"");
	description = description.replace(/'/g, "\\\'");

	infoDiv.id = code + "-" + number + "-info";
	infoDiv.innerHTML = "<a href=\"#\" onclick=\"alert('" + description + "')\">Course Description</a><br/>";
	infoDiv.style.display = "none";
	infoDiv.style.borderBottom = "1px solid black";
	if(color == 0)
		infoDiv.className = "white";
	else
		infoDiv.className = "grey";

	divResults.appendChild(infoDiv);
};


// Clears a select field
function clearSelect(elem)
{
	var list = document.getElementById(elem);

	while(list.childNodes[0])
	{
		list.removeChild(list.childNodes[0]);
	}
};

function selectedDiv(){
	var resultsDiv = document.getElementById("results");
	var textIndex = parseInt(d1.getSelectedIndexes());
	var activeChild = resultsDiv.childNodes[textIndex];
	
	if(activeChild.id.search("info") != -1)
	{
		d1.setItemSelected(d1.getItem(textIndex-1),true);
		resultsDiv.focus();
		return false;
	}
	

	if(resultsDiv.childNodes.length <= divIndex)
		divIndex = -1;
	if(divIndex != -1)
		resultsDiv.childNodes[divIndex].style.display = "none";
	
	var infoID = activeChild.id + "-info";
	var childInfo = document.getElementById(infoID);

	childInfo.style.display = "block";
	divIndex = parseInt(textIndex) + 1;

	window.status = textIndex;
	resultsDiv.focus();
};

function changeClass(key)
{
	if(key == 38) // Up Key was pressed
	{
		var resObj = document.getElementById('results');
		var len = resObj.childNodes.length;
		var textIndex = parseInt(d1.getSelectedIndexes());
		if(textIndex == 0 || textIndex == null)
			return false;
		else
		{
			d1.setItemSelected(d1.getItem(textIndex-2),true);
			resObj.childNodes[textIndex+1].style.display = "none";
			resObj.childNodes[textIndex-1].style.display = "block";
		}
	}
	else if(key == 40) // Down Key was pressed
	{
		var resObj = document.getElementById('results');
		var len = resObj.childNodes.length;
		var textIndex = parseInt(d1.getSelectedIndexes());
		if(textIndex == len-2 || textIndex == null)
			return false;
		else
		{
			d1.setItemSelected(d1.getItem(textIndex+2),true);
			resObj.childNodes[textIndex+1].style.display = "none";
		}
	}
	else // Another Key was pressed
		alert("An invalid key was pressed.");
};

function applyFilters()
{
	var filtersApplied = 1;
	if(document.getElementById('StartTime').options[0].selected == true && document.getElementById('EndTime').options[24].selected === true)
	{
		if(document.getElementById('exM').checked == true && document.getElementById('exTu').checked == true && document.getElementById('exW').checked == true && document.getElementById('exTh').checked == true && document.getElementById('exF').checked == true && document.getElementById('exSa').checked == true)
		{
			if(document.getElementById('CourseType1').checked == true &&	document.getElementById('CreditsLow').options[0].selected == true && document.getElementById('CreditsHigh').options[9].selected == true)
			{
				if(document.getElementById('CampusEB').checked == true && document.getElementById('CampusWB').checked == true && document.getElementById('CampusSTP').checked == true && document.getElementById('CampusR').checked == true && document.getElementById('OffCampusTC').checked == true && document.getElementById('OffCampusR').checked == true)
					filtersApplied = 0;
			}	
		}
	}
	
	var advFilterTag = document.getElementById('advFilterStatus');

	if(filtersApplied == 1)
	{
		advFilterTag.className = "drawer-handle-span-on-open";
		advFilterTag.innerHTML = "On";
	}
	else
	{
		advFilterTag.className = "drawer-handle-span-off-open";
		advFilterTag.innerHTML = "Off";
	}

	getCoursesByLevel('all');
}

function resetFilters()
{
	document.getElementById('StartTime').options[0].selected = true;
	document.getElementById('EndTime').options[24].selected = true;
	
	document.getElementById('exM').checked = true;
	document.getElementById('exTu').checked = true;
	document.getElementById('exW').checked = true;
	document.getElementById('exTh').checked = true;
	document.getElementById('exF').checked = true;
	document.getElementById('exSa').checked = true;

	document.getElementById('CourseType1').checked = true;

	document.getElementById('CreditsLow').options[0].selected = true;
	document.getElementById('CreditsHigh').options[9].selected = true;	

	document.getElementById('CampusEB').checked = true;
	document.getElementById('CampusWB').checked = true;
	document.getElementById('CampusSTP').checked = true;
	document.getElementById('CampusR').checked = true;
	document.getElementById('OffCampusTC').checked = true;
	document.getElementById('OffCampusR').checked = true;

	document.getElementById('advFilterStatus').className = "drawer-handle-span-off-open";
	document.getElementById('advFilterStatus').innerHTML = "Off";

	document.getElementById('keyword').value = "";	

	getCoursesByLevel('all');
};