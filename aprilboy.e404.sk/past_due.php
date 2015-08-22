<?php
if (!$_SERVER["HTTP_ACCEPT"] || stripos($_SERVER["HTTP_ACCEPT"],"application/xhtml+xml") !== false) {
	header( "Content-type: application/xhtml+xml; charset=windows-1250" );
 } else {
	header( "Content-type: text/html; charset=windows-1250" );
}
echo("<?xml version=\"1.0\" encoding=\"windows-1250\"?>\n");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<title>PAST DUE</title>
<meta name="author" content="Peter Hozak" />
<meta name="copyright" content="&copy; 2009 e404, s.r.o." />
<meta name="description" content="Notification for client's customers..." />
<meta name="keywords" content="" />
<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=windows-1250" />
<meta http-equiv="Content-Language" content="sk" />
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<style type="text/css">
<![CDATA[
html, body {
	margin: 0;
	padding: 0;
}
iframe {
	display: block;
	position: absolute;
	top: 20%;
	height: 80%;
	width: 100%;
	border: 0;
	background: red;
}
div#top {
	position: absolute;
	top: 0;
	width: 100%;
	height: 20%;
	background: #ff0011;
	color: #ffee00;
	font: 18pt Tahoma, Verdana, sans-serif;
	text-align: center;
}
a {
	color: #ffffaa;
}
a:hover {
	color: #ffffff;
}
]]>
</style>
</head>

<body>
<div id="top">
<strong>Upozornenie:</strong> Majiteľ <a href=<?php echo '"'.$_GET["url"].'"'?>><?php echo $_GET["url"]?></a>
 neuhradil faktúru prevádzkovateľovi - spoločnosti <a href="http://e404.sk/">E404, s.r.o.</a>,
 viac info na <a href="mailto:faktury@e404.eu">faktury@e404.eu</a>.
</div>
<div><iframe src=<?php echo '"'.$_GET["url"].'"'?> /></div>
</body>
</html>
