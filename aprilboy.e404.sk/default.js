
//global var for setSizes()
var pause = false; // IE blicking prevention
function setSizes()
{
	if (typeof(document.body.style.maxHeight) != "undefined" && !pause) {
		if (navigator.appName.indexOf("Internet Explorer")== -1) {
			setSizesExecute();
		 } else {
			setTimeout(function(){setSizesExecute(); pause = false;}, 500);
			pause = true;
		}
	 } else {
		setTimeout(function(){window.location.reload();}, 500);
		pause = true;
	}
}

function setSizesExecute()
{
	//sets styles depending on window size (all in pixels)
	var height = (window.innerHeight) ? window.innerHeight : (document.documentElement.clientHeight)?document.documentElement.clientHeight:document.body.clientHeight;
	var menuHeight = 354;
	if (height < (menuHeight+140)) {
		var top = 0;
		var marginTop = 40;
//		var OperaParameter = 17; //distance between bottom in Opera 9 and bottom of visible screen
	 } else {
		var menuHeight = .7*height;
		var top = "50%";
		var marginTop = -menuHeight/2;
//		var OperaParameter = 6;
	}
	if (typeof document.body.style.maxHeight != "undefined") {
		document.getElementById("menu").style.height = menuHeight + "px";
	 } else {
		document.getElementById("menu").style.height = (menuHeight+9) + "px";
	}
	document.getElementById("menu").style.top = top;
	document.getElementById("menu").style.marginTop = marginTop + "px";
	document.getElementById("heading").style.top = top;
	document.getElementById("footer").getElementsByTagName("a")[0].style.top = top;
	document.getElementById("heading").style.marginTop = (marginTop-40) + "px";
	document.getElementById("footer").getElementsByTagName("a")[0].style.marginTop = (marginTop+menuHeight+15) + "px";
	
	if (navigator.appName.indexOf("Internet Explorer")!=-1) {
		document.styleSheets["defstyle"].addRule("ul#menu li div ul", "height: "+ (menuHeight-4) +"px;");
	 } else {
		document.getElementById("defstyle").sheet.insertRule("ul#menu li div ul {height:"+ (menuHeight-4) +"px;}", document.getElementById("defstyle").sheet.cssRules.length);
	}
	
	IE7parameter = 0;
}

function initPage()
{
	if (typeof document.body.style.maxHeight == "undefined") {
		document.getElementById("heading").src = "images/heading.gif";
		document.getElementById("menu").onmouseover = hover;
		document.getElementById("menu").onmouseout = hover;
	}
	document.getElementById("menu").onclick = showList;	
	//global variables
	previous = document.getElementById("home");
	previousH2 = previous.getElementsByTagName("h2")[0];
	previousDiv = previous.getElementsByTagName("div")[0];
	//adds src to images
	document.getElementById("logo2").src = "images/logo2.jpg";
	document.getElementById("logo3").src = "images/logo3.jpg";
	document.getElementById("logo").src = "images/logo.jpg";
	var id = null;
	for (i=0; i<srcArray.length; i++) {
		id = "img" + i;
		document.getElementById(id).src = srcArray[i];
	}
	animateLogo();
}

function animateLogo () {
	setTimeout( function() {document.getElementById("logo").style.visibility = "hidden";}, 50);
	setTimeout( function() {document.getElementById("logo3").style.visibility = "hidden";}, 100);
	setTimeout( function() {document.getElementById("logo2").style.visibility = "hidden";}, 150);
	setTimeout( function() {document.getElementById("logo1").style.visibility = "hidden";}, 200);
	setTimeout( function() {document.getElementById("logo1").style.visibility = "visible";}, 250);
	setTimeout( function() {document.getElementById("logo2").style.visibility = "visible";}, 300);
	setTimeout( function() {document.getElementById("logo3").style.visibility = "visible";}, 350);
	setTimeout( function() {document.getElementById("logo").style.visibility = "visible";}, 400);
}

function showList (evt)
{
	var evt = (evt) ? evt : ((window.event) ? event : null);
	var h2 = (evt.srcElement) ? evt.srcElement : ((evt.target) ? evt.target : null);
	var li = (evt.srcElement) ? evt.srcElement.parentElement : ((evt.target) ? evt.target.parentNode : null);
	var div = (li) ? li.getElementsByTagName("div")[0] : null;
	if (h2 && h2.tagName == "H2") {
		if (li.id == "home") {
			animateLogo();
		}
		previousDiv.style.visibility = "hidden";
		previousH2.className = "";
		div.style.visibility = "visible";
		h2.className = "active";
		previousDiv = div;
		previousH2 = h2;
	}
}

function openImg (aKey, file, name)
{	
	document.getElementById(aKey).className = "visited";
	document.getElementById(aKey).blur();	
	var NewWin = window.open("", "image", "toolbar=no,directories=no,menubar=no");
	with (NewWin.document) {
		write("<html>\n<head><title>"+name+"</title>\n");
		write("<meta name='author' content='Peter Hozak' />\n");
		write("<meta name='copyright' content='&copy; 2007 Peter aprilBoy Hozak' />\n");
		write("<meta http-equiv='imagetoolbar' conntent='no' />\n");
		write("<link rel='stylesheet' href='default.css' />");
		write("</head>\n");
		write("<body class='image'>\n");
		write("<table summary=''>\n");
		write("<tr><td>\n");
		write("<a href='javascript:close();' title=''><img src='"+file+"' alt='"+name+"' title='' oncontextmenu='return(false);' /></a>\n");
		write("</td></tr>\n</table>\n</body>\n</html>");
		close();
	}
	NewWin.focus();
}

function hover ()	//only for IE less than 7
{
	var evt = window.event;
	var obj = evt.srcElement;
	if (obj.tagName == "h2" && obj.className != "active") {
		if (evt.type == "mouseover") {
			obj.className = "hover";
		 }
		 else {
			obj.className = "";
		}
	}
	if (obj.tagName == "IMG") {
		if (evt.type == "mouseover") {
			obj.parentElement.parentElement.className = "hover";
		 }
		 else {
			obj.parentElement.parentElement.className = "";
		}
	}
}