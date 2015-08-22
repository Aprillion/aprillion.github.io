function initPage()
{	
	//global variables
	var cas = new Date();
	zaciatok = cas.getTime();
	spravnych = 0;
	poslednyDobryCas = "NaN";
	zakZnamienko = null;
	poslednySelect = "zakCislo";
	n1 = 0;
	n2 = 0;
	c1 = 0;
	c2 = 0;
	c3 = 0;
	c4 = 0;

	//non-standard attributes and event handlers
	document.getElementById("zakladne").setAttribute("autocomplete","off");
	document.getElementById("zakladne").onsubmit=skuskaZakladne;
	document.getElementById("zakIny").onclick=setZakladne;
	document.getElementById("zakCislo").onclick=function(){this.select(); poslednySelect="zakCislo"};
	
	document.getElementById("rovnica").setAttribute("autocomplete","off");
	document.getElementById("rovnica").onsubmit=skuskaRovnice;
	document.getElementById("rovIny").onclick=setRovnica;
	document.getElementById("rovCislo").onclick=function(){this.select(); poslednySelect="rovCislo"};
	
	document.getElementById("resetCas").onclick=resetovat;
	
	//page setup
	setRovnica();
	setZakladne();
	setStopky();
}

function setZakladne()
{
	var narocnost = (document.getElementById("zakNarL").checked) ? document.getElementById("zakNarL").value : (document.getElementById("zakNarS").checked) ? document.getElementById("zakNarS").value : document.getElementById("zakNarT").value;
	var operacia = (document.getElementById("zakOperacia").options[document.getElementById("zakOperacia").selectedIndex].value);
	zakZnamienko = (operacia=="s")?" + ":(operacia=="o")?" - ":(operacia=="n")?" * ":" / ";
	n1 = Math.floor(Math.random()*narocnost)+1; //aby prve cislo nebolo 0 - cisto z estetickych dovovov
	if (operacia=="s"){
		n2 = Math.floor(Math.random()*narocnost);
	} else if (operacia=="o"){
		n2 = Math.floor(Math.random()*(n1+1));
	} else {
		n2 = Math.floor(Math.random()*10)+1;
		if (narocnost>100) {
			n1 = (n1>100)?Math.floor(n1/10):n1;
			n2 = n2 + 10;
		}
		if (operacia=="d"){
			n1 = n1 * n2;
		}
	}
	
	var lavaStrana = n1 + zakZnamienko + n2;
	var pravaStrana = "&nbsp;= ";
	document.getElementById("zakLStrZad").innerHTML = lavaStrana;
	document.getElementById("zakPStrZad").innerHTML = pravaStrana;
	if (document.getElementById("zakPStrVys").innerHTML.indexOf("=") != -1) {
		document.getElementById("zakLStrVys").innerHTML = "";
		document.getElementById("zakPStrVys").innerHTML = "<br />";
	}
	document.getElementById("zakCislo").value = "?";
	document.getElementById("zakCislo").select();
}

function skuskaZakladne()
{
	var lavaStrana = eval(n1 + zakZnamienko + n2);
	var pravaStrana = parseInt(document.getElementById("zakCislo").value);
	if (lavaStrana == pravaStrana) {
		var cas = new Date();
		poslednyDobryCas = cas.getTime();
		spravnych++;
		pravaStrana += "<strong> &nbsp; OK</strong>";
		document.getElementById("zakCislo").value = "?";
		document.getElementById("zakIny").focus();
	} else {
		alertSkore();
		pravaStrana += "<strong> ...to sa teda nerovn·!</strong>";
	}
	document.getElementById("zakLStrVys").innerHTML = lavaStrana;
	document.getElementById("zakPStrVys").innerHTML = "&nbsp;= " + pravaStrana;
	poslednySelect="zakCislo";
	
	return(false);
}

function setRovnica() {
	var narocnost = (document.getElementById("rovNarL").checked) ? document.getElementById("rovNarL").value : (document.getElementById("rovNarS").checked) ? document.getElementById("rovNarS").value : document.getElementById("rovNarT").value;
	c1 = Math.floor(Math.random()*narocnost)+1;
	c2 = Math.floor(Math.random()*narocnost);
	c3 = Math.floor(Math.random()*narocnost);
	c4 = Math.floor(Math.random()*(c1+c2+c3-1))+1;
	
	var lavaStrana = c1 + " + " + c2 + " + " + c3
	var pravaStrana = "&nbsp;= " + c4 + " + " + " ";
	document.getElementById("rovLStrZad").innerHTML = lavaStrana;
	document.getElementById("rovPStrZad").innerHTML = pravaStrana;
	if (document.getElementById("rovPStrVys").innerHTML.indexOf("=") != -1) {
		document.getElementById("rovLStrVys").innerHTML = "";
		document.getElementById("rovPStrVys").innerHTML = "<br />";
	}
	document.getElementById("rovCislo").value = "?";
	document.getElementById("rovCislo").select();
}

function skuskaRovnice()
{
	var lavaStrana = c1 + c2 + c3;
	var pravaStrana = c4 + parseInt(document.getElementById("rovCislo").value);
	if (lavaStrana == pravaStrana) {
		var cas = new Date();
		poslednyDobryCas = cas.getTime();
		spravnych++;
		pravaStrana += "<strong> &nbsp; OK</strong>";
		document.getElementById("rovCislo").value = "?";
		document.getElementById("rovIny").focus();
	} else {
		alertSkore();
		pravaStrana += "<strong> ...to sa teda nerovn·!</strong>";
	}
	document.getElementById("rovLStrVys").innerHTML = lavaStrana;
	document.getElementById("rovPStrVys").innerHTML = "&nbsp;= " + pravaStrana;
	poslednySelect="rovCislo";
	return(false);
}

function alertSkore()
{
		var trvanie = Math.round((poslednyDobryCas - zaciatok) / 100)/10;
		var priemer = Math.round(trvanie/spravnych*100)/100;
		var spr = "Bohuûiaæ nespr·vny v˝sledok, Vaöe aktu·lne skÛre je:\n\n"+spravnych+" spr·vnych prÌkladov";
		var trv = (isNaN(trvanie) || trvanie < 0)?"":(" za\n"+trvanie+" sek˙nd");
		var prie = (isNaN(priemer) || priemer < 0)?"":(", Ëo je\n"+priemer+" sek˙nd na prÌklad v priemere.");
		var tip = (isNaN(priemer) || priemer < 0) || priemer > 5?"\n\nTip: pre vynulovanie Ëasu po preËÌtanÌ tejto spr·vy stlaËte Enter alebo kliknite na 'Resetovaù', po napÌsanÌ v˝sledku stlaËte Enter alebo kliknite na 'Je to spr·vne?' a po potvrdenÌ spr·vnosti v˝sledku stlaËte Enter alebo kliknite na 'Nov˝ prÌklad' - pri pouûitÌ kl·vesy Enter namiesto klikania mÙûete v˝razne skr·tiù V·ö priemern˝ Ëas.":(priemer < 3)?"\n\nV˝borne!":"\n\nPoËÌtaù, poËÌtaù, poËÌtaù!";
		var message = spr + trv + prie + tip;
		alert(message);
		var cas = new Date();
		spravnych = 0;
		zaciatok = cas.getTime();
		document.getElementById("resetCas").focus();	
}

function setStopky()
{
	var cas = new Date();
	document.getElementById("cas").innerHTML = Math.round((cas.getTime() - zaciatok) / 1000) + " sek˙nd ";
	document.getElementById("spravne").innerHTML = spravnych;
	setTimeout("setStopky()","200");
}

function resetovat()
{
	var cas=new Date();
	zaciatok=cas.getTime();
	spravnych=0;
	setZakladne();
	setRovnica();
	document.getElementById(poslednySelect).select();
}