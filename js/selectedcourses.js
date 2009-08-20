function addCourse(xmlcontent,digitnum)
{
	var xmlDoc;
	var stylesheet;
	var fragment;
	var fragmentCopy;
	
	var xmlString = "<root>" + xmlcontent + "</root>";


	if (window.ActiveXObject) // Code for IE
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(xmlString); // Load a String
	  	
		stylesheet = new ActiveXObject("Microsoft.XMLDOM");
	  	stylesheet.async = false;
	  	stylesheet.load("courselist.xsl");
	  	
		var previouscontent = document.getElementById('CourseList').innerHTML;
		
		fragment = xmlDoc.transformNode(stylesheet);
		fragmentCopy = xmlDoc.transformNode(stylesheet); 
	}
	else if (document.implementation && document.implementation.createDocument) // Code for Mozilla, Firefox, Opera, etc.
	{	
		
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(xmlString,"text/xml");
    		
		var xsltProcessor = new XSLTProcessor();
		stylesheet=document.implementation.createDocument("","",null);
    		stylesheet.async = false;
	  	stylesheet.load("courselist.xsl");
	  
		xsltProcessor.importStylesheet(stylesheet);

	  	fragment = xsltProcessor.transformToFragment(xmlDoc,document);
		fragmentCopy = xsltProcessor.transformToFragment(xmlDoc,document); 
	}
	else
	{
		alert('Your browser cannot handle this script');
		return false;
	}
		
	var myDOM = fragment;	

	document.getElementById('tempholder').innerHTML = "";

	if (window.ActiveXObject) // Code for IE
	{
		document.getElementById('tempholder').innerHTML = myDOM;
	}
	else // Firefox
	{
		document.getElementById('tempholder').appendChild(myDOM);
	}
	

	var ctitle = document.getElementById('tempholder').getElementsByTagName('span')[0].innerHTML;
	var carray = ctitle.split(' ');

	if(document.getElementById(carray[0]+carray[1]) == null)
	{
		if(numberOfCourses() >= 8)
		{
			alert("You can only have 8 courses in your course list. Please remove a course if you would like to add the another.");
			return false;
		}
		
		var secDOM = fragmentCopy;

		if (window.ActiveXObject) // Code for IE
		{
			document.getElementById('CourseList').innerHTML = document.getElementById('CourseList').innerHTML + secDOM;
		}
		else // Firefox
		{
			document.getElementById('CourseList').appendChild(secDOM);
		}

		var holdarray = document.getElementById('CourseList').getElementsByTagName('form');
		var radiolist = holdarray[holdarray.length-1].getElementsByTagName('input');

		for(var i=0;i<radiolist.length;i++)
		{
			if(radiolist[i].parentNode.getElementsByTagName('span')!=null && radiolist[i].parentNode.getElementsByTagName('span')[0].innerHTML==digitnum.toString())
			{
				radiolist[i].checked=true;
			}
			else
			{
				radiolist[i].checked=false;
			}
		}
		
		var list = document.getElementById('CourseList').getElementsByTagName('li');
		list[list.length-1].parentNode.parentNode.parentNode.parentNode.id=carray[0]+carray[1];
	}
	else
	{
		radiolist = document.getElementById(carray[0]+carray[1]).getElementsByTagName('input');
	
		for(i=0;i<radiolist.length;i++)
		{
			if(radiolist[i].parentNode.getElementsByTagName('span')!=null && radiolist[i].parentNode.getElementsByTagName('span')[0].innerHTML==digitnum.toString())
			{
				radiolist[i].checked=true;
			}
			else
			{
				radiolist[i].checked=false;
			}
		}
	}
	
	var listID = document.getElementById(carray[0]+carray[1])
	showContent(listID);


	var courseDOM = document.getElementById('CourseList');
	var numCourses = courseDOM.childNodes.length;
	var courseNum = 0;

	
	for(var j = 0; j < numCourses; j++)
	{
		if(courseDOM.childNodes[j].nodeType == 1 && courseDOM.childNodes[j].id != "")
		{
			courseDOM.childNodes[j].getElementsByTagName('td')[0].innerHTML = "<img src='images/color_" + courseNum + ".png' />";
			courseNum++;
		}
	}
	
	UpdateScheduler();
}

function showContent(e)
{
	hideContent('CourseList','div')
	e.getElementsByTagName('div')[1].style.display="block";
	e.getElementsByTagName('table')[0].style.backgroundPosition="-300px center";
}
		
function deleteContent(e)
{
	var topDiv = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var childDiv = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	topDiv.removeChild(childDiv);
	
	var remainingChildren = topDiv.childNodes.length;
	if(remainingChildren > 3)
	{
		showContent(topDiv.getElementsByTagName('div')[0].parentNode);
	}

	var courseDOM = document.getElementById('CourseList');
	var numCourses = courseDOM.childNodes.length;
	var courseNum = 0;

	
	for(var j = 0; j < numCourses; j++)
	{
		if(courseDOM.childNodes[j].nodeType == 1 && courseDOM.childNodes[j].id != "")
		{
			courseDOM.childNodes[j].getElementsByTagName('td')[0].innerHTML = "<img src='images/color_" + courseNum + ".png' />";
			courseNum++;
		}
	}

	UpdateScheduler();
}
	
//This function is to hide Tags with tagname "tagname" in object with ID "ojb"
function hideContent(obj,tagname)
{
	var array =	document.getElementById(obj).getElementsByTagName(tagname);
	for(var i=0;i<array.length;i++)
	{
		if(array[i].className == "drawer-content")
		{
			array[i].style.display="none";
			array[i].parentNode.getElementsByTagName('table')[0].style.backgroundPosition="0px center";
		}
	}
}


function UpdateScheduler()
{
	selectedXML = getSelectedCoursesXML();
	// alert(selectedXML);

	var detectXML = conflictDetect(selectedXML);

	initScheduler(detectXML);
}

function getSelectedCoursesXML()
{

	var courseDOM = document.getElementById('CourseList');
	var numCourses = courseDOM.childNodes.length;
	var colors = new Array("#FFF600", "#FFAE00", "#30FF00", "#00F6FF", "#1E00FF", "#FF00FC", "#FF00C6", "#DDA0DD");
	var colorsLight = new Array("#FEF856", "#FFC446", "#6FFF4E", "#3EF7FE", "#87CEFA", "#FFB6C1", "#DEB887", "#DDA0DD");
	
	var colorIndex = 0;
	
	var frag = "";
	frag = frag + "<?xml version=\"1.0\" ?>\n";
	frag = frag + "<items>\n";

	var bgcolor = "#FFFFFF";

	for(var x = 0; x < numCourses; x++)
	{
		if(courseDOM.childNodes[x].nodeType == 1 && courseDOM.childNodes[x].id != "")
		{
			var course = courseDOM.childNodes[x];
			
			var tempstring = course.getElementsByTagName('span')[0].innerHTML;

			var temparray = tempstring.split(' ');
			var coursename = temparray[0] + " " + temparray[1];
			
			if(colorIndex < colors.length)
				bgcolor = colorsLight[colorIndex];
			else
				bgcolor = "#FFFFFF";

			colorIndex++;
			var courseDiv = "";
			for(var j = 0; j < course.childNodes.length; j++)
			{
				if(course.childNodes[j].nodeName == "DIV")
				{
					courseDiv = course.childNodes[j];
				}
			}
			if(courseDiv != "")
			{
				
				var courseOL = courseDiv.childNodes[0];
				var courseFORM = courseOL.childNodes[0];
				var radiolist = courseFORM.getElementsByTagName('input');
				
				for(var i = 0; i < radiolist.length; i++)
				{
					if(radiolist[i].checked)
					{	
						var parNode = radiolist[i].parentNode;
						var spanNum = parNode.getElementsByTagName('span').length;
						for(var m = 2; m < spanNum; m++)
						{
						var infoString = parNode.getElementsByTagName('span')[m].innerHTML;
						var splitNum = infoString.indexOf(",")-4;
						var splitNum = infoString.indexOf(" ", splitNum+1);
						var splitString = infoString.substr(splitNum,infoString.length - infoString.indexOf(" "));
						var dayString = infoString.substr(splitNum+1, infoString.lastIndexOf(",")-splitNum-1);
						var classDays = dayString.split(',');
						var timeString = infoString.substr(infoString.lastIndexOf(",")+1, infoString.length - infoString.lastIndexOf(",")-1);
						var times = timeString.split('-');
						var startTimeSplit = times[0].split(':');
						var startTime = startTimeSplit[0] + ":" + startTimeSplit[1];
						var endTimeSplit = times[1].split(':');
						var endTime = endTimeSplit[0] + ":" + endTimeSplit[1];
						
						

						for(var k = 0; k < classDays.length; k++)
						{
							var dayName = "Mon";
							var dayNum = 13;
							
							var msStart1 = new Date (2006, 1, 13, startTimeSplit[0], startTimeSplit[1]);
							var msEnd1 = new Date (2006, 1, 13, endTimeSplit[0], endTimeSplit[1]);
							
							if(classDays[k] == "T")
							{
								dayName = "Tue";
								dayNum = 14;
								msStart1 = new Date (2006, 1, 14, startTimeSplit[0], startTimeSplit[1]);
								msEnd1 = new Date (2006, 1, 14, endTimeSplit[0], endTimeSplit[1]);
							}
							else if(classDays[k] == "W")
							{
								dayName = "Wed";
								dayNum = 15;
								msStart1 = new Date (2006, 1, 15, startTimeSplit[0], startTimeSplit[1]);
								msEnd1 = new Date (2006, 1, 15, endTimeSplit[0], endTimeSplit[1]);
							}
							else if(classDays[k] == "Th")
							{
								dayName = "Thu";
								dayNum = 16;
								msStart1 = new Date (2006, 1, 16, startTimeSplit[0], startTimeSplit[1]);
								msEnd1 = new Date (2006, 1, 16, endTimeSplit[0], endTimeSplit[1]);
							}
							else if(classDays[k] == "F")
							{
								dayName = "Fri";
								dayNum = 17;
								msStart1 = new Date (2006, 1, 17, startTimeSplit[0], startTimeSplit[1]);
								msEnd1 = new Date (2006, 1, 17, endTimeSplit[0], endTimeSplit[1]);
							}
							else if(classDays[k] == "Sa")
							{
								dayName = "Sat";
								dayNum = 18;
								msStart1 = new Date (2006, 1, 18, startTimeSplit[0], startTimeSplit[1]);
								msEnd1 = new Date (2006, 1, 18, endTimeSplit[0], endTimeSplit[1]);
							}
							
							
							frag = frag + "<item>\n";
							frag = frag + "<id>" + coursename + "_" + m + k + "</id>\n";
							frag = frag + "<description>" + coursename + "</description>\n";
							frag = frag + "<eventStartDate>" + dayName + ", " + dayNum + " Feb 2006 " + startTime + " CST</eventStartDate>\n";
							frag = frag + "<eventEndDate>" + dayName + ", " + dayNum + " Feb 2006 " + endTime + " CST</eventEndDate>\n";
							frag = frag + "<bgColorCode>" + bgcolor + "</bgColorCode>\n";
							
							frag = frag + "<startTime>" + msStart1 + "</startTime>\n";
							frag = frag + "<endTime>" + msEnd1 + "</endTime>\n";
							
							frag = frag + "</item>\n";
						}
						}
					}
				}
			}
		}
	}
	frag = frag + "</items>\n";
	return frag;	
}


function numberOfCourses()
{
	var courseDOM = document.getElementById('CourseList');
	var numCourses = courseDOM.childNodes.length;
	var courses = 0;

	for(var x = 0; x < numCourses; x++)
	{
		if(courseDOM.childNodes[x].nodeType == 1 && courseDOM.childNodes[x].id != "")
		{
			courses++;
		}
	}
	return courses;
}

function showConfilcts()
{
	var courseDOM = document.getElementById('CourseList');
	var numCourses = courseDOM.childNodes.length;
	var courses = 0;
	var timeArray = new Array();

	for(var x = 0; x < numCourses; x++)
	{
		if(courseDOM.childNodes[x].nodeType == 1 && courseDOM.childNodes[x].id != "")
		{
			var classSections = courseDOM.childNodes[x].childNodes[1].getElementsByTagName('li');
			var numSections = classSections.length;
			for(var i = 0; i < numSections; i++)
			{
				if(classSections[i].getElementsByTagName('input')[0].checked)
				{
					var spanTags = classSections[i].getElementsByTagName('span');
					for(var j = 2; j < spanTags.length; j++)
					{
						var timeString = spanTags[j].innerHTML;
						if(timeString.lastIndexOf(",") != -1)
						{
							timeArray.push(timeString.substring(timeString.lastIndexOf(",")+1));
						}
					}
				}
			}
		}	
	}

	
	// alert(timeArray);
}

function dateParse(s) { 
//turns a properly formated date into miliseconds.
var d = new Date;
d.setTime(Date.parse(s));
return d.toUTCString();
}

function blockDetect(s1, e1, s2, e2)
{
	//will detect if there is a conflicting time block in four cases
	//returns true if there is a conflict or false if there isn't
	var start1 = dateParse(s1);
	var start2 = dateParse(s2);
	var end1 = dateParse(e1);
	var end2 = dateParse(e2);



	//second class is before first
	if (end2 < start1)
		return false;
	//second class is after first
	if (end1 < start2)
		return false;
	//second class starts within the first
	if (start2 > start1 && start2 < end1)
	{
		return true;
	}
	//second class ends within the first
	if (end2 > start1 && end2 < end1)
	{
		return true;
	}

}

function conflictDetect(XMLtext)
{
	// code for IE
	if (window.ActiveXObject)
  	{
  		var doc=new ActiveXObject("Microsoft.XMLDOM");
  		doc.async="false";
  		doc.loadXML(XMLtext);
  	}
	// code for Mozilla, Firefox, Opera, etc.
	else
  	{
  		var parser=new DOMParser();
  		var doc=parser.parseFromString(XMLtext,"text/xml");
  	}
  	//alert("before DOM");
	//alert(doc.text);
  	var courseDOM = doc.documentElement.getElementsByTagName('item');
	//alert("after DOM");
	//alert(courseDOM);
  	var numCourses = courseDOM.length;
	//alert(numCourses);
	
	var colorDOM = doc.documentElement.getElementsByTagName('bgColorCode');
	var startDOM = doc.documentElement.getElementsByTagName('startTime');
	var endDOM = doc.documentElement.getElementsByTagName('endTime');
	var classDOM = doc.documentElement.getElementsByTagName('description');

	var conflictColor = '#FF0000';

	for (var x = 0; x < numCourses; x++){
		var	start1 = startDOM[x].childNodes[0].nodeValue;
		var	end1 = endDOM[x].childNodes[0].nodeValue;
		
		for(var y = x; y < numCourses; y++){
			var	start2 = startDOM[y].childNodes[0].nodeValue;
			var	end2 = endDOM[y].childNodes[0].nodeValue;
			
			if(blockDetect(start1, end1, start2, end2)){
				var class1 = classDOM[x].childNodes[0].nodeValue;
				var class2 = classDOM[y].childNodes[0].nodeValue;
				alert("Time conflict between " + class1 + " and " + class2 + "!");
				colorDOM[x].childNodes[0].replaceData(0,7,"#FF0000");
				colorDOM[y].childNodes[0].replaceData(0,7,"#FF0000");
				//alert(colorDOM[y].childNodes[0].nodeValue);
				//alert(colorDOM[x].childNodes[0].nodeValue);
				//alert(startDOM[x].childNodes[0].nodeValue);
				//alert(startDOM[y].childNodes[0].nodeValue);
				//alert(endDOM[x].childNodes[0].nodeValue);
				//alert(endDOM[y].childNodes[0].nodeValue);
			}
		}
	}
	
	


	if (window.ActiveXObject)
  	{
  		return doc.xml
  	}
	// code for Mozilla, Firefox, Opera, etc.
	else
  	{
  		var xmlSerializer = new XMLSerializer();
		var xmlString = xmlSerializer.serializeToString(doc);
		return xmlString;
  	}
}
