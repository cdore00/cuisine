<!--

var HOSTserv = "http://127.0.0.1:3000/";		//Portable Windows 10 Local host Node JS v6.10.0
// "http://127.0.0.1:3000/";		//Portable Windows 10 Local host Node JS v6.10.0
//	"http://127.0.0.1:8080/";		//Portable Windows 10 Local host Python v3.6.4
// "http://192.168.2.195:3000/";    //Ubuntu workstation 16.04
// "http://192.168.2.195:8080/";    //Ubuntu workstation 16.04 docker 1.12.6 Node JS v4.2.3  MongoDB server v3.4.9
// "http://192.168.2.190:8080/";    //Fedora workstation 26 Mongo 3.2.16 docker 1.13.1 Node JS v4.2.3 MongoDB server v3.4.6
// "https://loupop.ddns.net/simp/";
// "https://nodejs-mongo-persistent-cd-serv.1d35.starter-us-east-1.openshiftapps.com/";  // Openshift default docker Node Js -v 6.11.3
// "https://golf-serv-cd-serv.1d35.starter-us-east-1.openshiftapps.com/";  // Openshift mon docker Node Js -v 4.2.3 et MongoDB server v3.4.9
// "https://cdore.ddns.net/node/";  // VULTR Ubuntu Server 16.04 docker 1.12.6

var progressBar, rightnav, divmenu, menuCart;
var transitionsSupported = ('transition' in document.documentElement.style) || ('WebkitTransition' in document.documentElement.style);

function is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

var isTouchDevice = is_touch_device();

function getInfo(path, callback){
	
var dat = new FormData();
dat.append('info', path);

var xhr=new XMLHttpRequest();
  xhr.onloadend = function() {
    var text = xhr.responseText;
	if (text == "")
		affNoRep();
	else{
	var data=JSON.parse(text);
	if (callback)
		callback(data);
	}
  };
	xhr.onerror = function() {
		x=5;
  };
xhr.open("POST", HOSTserv + path ,true);
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//xhr.withCredentials = true;
xhr.send(dat);

	function affNoRep(){
		var eBod = document.getElementsByTagName('body')[0];
		var divErr = document.createElement("div");
		divErr.innerHTML = "Pas de réponse: " + HOSTserv;
		eBod.insertBefore(divErr, eBod.firstChild);
	}
}

function getURLdata(){
var urlInfo = document.location.href;
if (urlInfo.indexOf("data=") == -1)
	return "";
else
	return decodeURI(urlInfo.substring(urlInfo.indexOf("data=") + 5));
}

//var dt =  new Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "numeric", hour: "2-digit", minute: "2-digit"});
function getDateTime(dateTime){
	var intlDateTime ;
	if (dateTime)
		intlDateTime = new Date(dateTime);  //dateTime = Date.now() type
	else
		intlDateTime = new Date();
	
	intlDateTime.setUTCHours(intlDateTime.getUTCHours());
	//intlDateTime = dt.format(intlDateTime);
	intlDateTime = intlDateTime.toLocaleString();
	intlDateTime = intlDateTime.substring(0, 10);
	return intlDateTime;
}

function DelCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



function scrollRightNav(){
var topValue;
if (document.documentElement.scrollTop)
	topValue = document.documentElement.scrollTop;
else
	topValue = document.body.scrollTop;

	//rightnav.style.top = topValue + 7 + 'px';
if (!isMobile){
	if (divmenu)
		divmenu.style.top = topValue + 'px';
	if (topmenu)
		topmenu.style.top = topValue + 'px';
	}
if (menuCart)
	menuCart.style.top = topValue + 'px';
}

var isMobile = false;
 if("matchMedia" in window) // Détection
   if(window.matchMedia("(max-width: 540px)").matches) 
		isMobile = true;

/*var isMobile = { 
Android: function() { return navigator.userAgent.match(/Android/i); }, 
BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, 
iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
Opera: function() { return navigator.userAgent.match(/Opera Mini/i); }, 
Windows: function() { return navigator.userAgent.match(/IEMobile/i); }, 
any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
*/
	
var sreenOrientation = -1;
window.onorientationchange = function(){
	//alert(window.orientation);
	//setFontSize();
    validOrientation();
}

function validOrientation(){
var showPhoto = document.getElementById('showPhoto');
var objImg = document.getElementById('objImg');

if (showPhoto.style.visibility == "visible"){
	objImg.style.maxWidth  = (getWindowWidth() - 30) + 'px';
	objImg.scrollIntoView (true);
	}
//alert(window.orientation);
}

function setFontS(sizeAD, oIncDec){
var fs = document.body.style.fontSize;
var oCtls = document.getElementsByClassName('divFont');

for (i = 0; i < oCtls.length; i++) {
	oCtls[i].style.color = "#efe";
}
if (sizeAD && typeof sizeAD == "number"){
	fs = eval(fs.replace("em", "")) + sizeAD; 
	if (sizeAD > 0){
		if (fs >= 2){
			fs = 2;
			if (oIncDec)
				oIncDec.style.color = "#555";
		}
	}
	if (sizeAD < 0){
		if (fs <= 0.8){
			fs = 0.8;
			if (oIncDec)
				oIncDec.style.color = "#555";
		}
	}
	document.body.style.fontSize = fs + "em";
	SetCook( "_fontSize", fs + "em");
}else{
	if (!sizeAD){
		//setLanguage();
		fs = GetCookie( "_fontSize");
		if (!fs || fs == "" || fs == "NaNem"){
			fs = document.body.style.fontSize;
			if (fs == "")
				fs = "1em";
		}
	}else{
		fs = sizeAD;
	}
	document.body.style.fontSize = fs;
	var pageZone = document.getElementById('pageZone');
	if (pageZone)
		pageZone.style.visibility = "visible";
}
}

function initPage(callBackFunct){
topmenu = document.getElementById('topmenu');
divmenu = document.getElementById('divmenu');
rightnav = document.getElementById('fontAdjust');
//menuCart = document.getElementById('menu-cart');
//var x = callBackFunct;
setFontS();
//if (s_nav)
	if("matchMedia" in window) { // Détection
		if(!window.matchMedia("(max-width: 540px)").matches)
			window.onscroll = scrollRightNav;}
	else	
	window.onscroll = scrollRightNav;
if (callBackFunct)
	callBackFunct();

}

function getCookieVal(offset){
var endstr = document.cookie.indexOf(";", offset)
var tostr = ""+document.cookie.indexOf(";", offset)
if (tostr != ""){
if (endstr == -1)
	endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr))
}
}

function GetCookie(name){
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen){
	var j = i + alen;
	if (document.cookie.substring(i, j) == arg){
		return getCookieVal (j);
		}
	i = document.cookie.indexOf(" ", i) + 1;
	if (i == 0) break;
	}
	return null;
}

function SetCook(cname, cvalue){
    var d = new Date();
    d.setTime(d.getTime() + (720*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
	var newcookie = cname + "=" + cvalue + ";" + expires ;
    document.cookie = newcookie;
	//alert(document.cookie);
}


function adjustScreen(hauteurUtil){
	var divMap, dispH, pxRatio
	
	pxRatio = 1;
	if( window.devicePixelRatio )
		pxRatio = window.devicePixelRatio;
		
	dispH = document.getElementsByTagName('body')[0].clientHeight - (hauteurUtil * pxRatio);
	divMap = document.getElementById("map_canvas");
	divMap.style.height = dispH + "px";
	//alert(pxRatio);

}

function getWindowWidth() {
	var windowWidth = 0;
	if (typeof(window.innerWidth) == 'number') {
		windowWidth = window.innerWidth;
	}
	else {
		if (document.documentElement && document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		}
		else {
			if (document.body && document.body.clientWidth) {
				windowWidth = document.body.clientWidth;
			}
		}
	}
	return windowWidth;
}

function getWindowHeight() {
	var windowHeight = 0;
	if (typeof(window.innerHeight) == 'number') {
		windowHeight = window.innerHeight;
	}
	else {
		if (document.documentElement && document.documentElement.clientHeight) {
			windowHeight = document.documentElement.clientHeight;
		}
		else {
			if (document.body && document.body.clientHeight) {
				windowHeight = document.body.clientHeight;
			}
		}
	}
	return windowHeight;
}

function GetCoordY(obj) {                       
var p = posObj(obj);             
//alert("X:" + p.x + " Y:" + p.y); 
return p.y;
}

function GetCoordX(obj) {                       
var p = posObj(obj);             
//alert("X:" + p.x + " Y:" + p.y); 
return p.x;
}

function posObj(htmlelement){

var e = htmlelement; 
var offset = {x:0,y:0}; 
while (e) 
{ 
    offset.x += e.offsetLeft; 
    offset.y += e.offsetTop; 
    e = e.offsetParent; 
} 
return (offset);
}

function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) )
    {
        _x += el.offsetLeft - el.scrollLeft + el.clientLeft;
        _y += el.offsetTop - el.scrollTop + el.clientTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}


function findIndex(el){
for ( var index = 0; index < el.parentNode.childNodes.length; index++ ) { 
if ( el == el.parentNode.childNodes[ index ] ) { 
	return index; } } 
return -1;
}

function getXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}


// -->
