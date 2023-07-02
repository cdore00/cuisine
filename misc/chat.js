var HOSTserv = "https://loupop.ddns.net/pyt/";
//"http://127.0.0.1:3000/";
//"https://loupop.ddns.net/pyt/";
var langSet = window.navigator.userLanguage || window.navigator.language;
const chat_color_background = '#1db2fd99', chat_color_text = '#FFF', chat_color_background_other = '#98dbfd99', chat_color_text_other = '#222';   // Bleu
//const chat_color_background = 'rgb(57, 170, 0)', chat_color_text = '#FFF', chat_color_background_other = 'rgb(220, 246, 220)', chat_color_text_other = '#222';   // Vert
var chatID = 2023;
var lastTime = new Date().getTime();
var firstTime = lastTime, histTime = null;
var xhrPoll, chatRun = false;
var userID="", lastUser, lastIP, pollTimeout, scrollChat, panelLayer, panelLayerMinWidth, modLayer, messUpdtItem, messList, optMenu, userOnPage;
var lastInputH = 0, lastKey = 0, longMax = 250;
var respondToMess = false;

const timeBarDelay = 600000; // 10 minutes ........ délai pour afficher la barre du moment dans le chat Ex.: "Lundi, 8 mai 2023 10:15"

var chatLangLbl = [];
chatLangLbl["S0005"] = "Supprim&eacute;";
chatLangLbl["S0010"] = "Veuillez entrer le code de confirmation envoyé à l'adresse: ";
chatLangLbl["S0011"] = "Le code de confirmation '%1' ne correspons pas à celui envoyé à l'adresse: ";
chatLangLbl["S0012"] = "Adresse confirmé!";

//include("instChat.js");
(function () { var chatP = document.createElement('script'); chatP.type = 'text/javascript'; chatP.async = true; chatP.src = 'https://loupop.ddns.net/misc/instChat.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(chatP, s); })();


function initChatWidget(){
var csslink = document.createElement('link');
csslink.setAttribute('rel', 'stylesheet');
csslink.setAttribute('href', 'https://loupop.ddns.net/misc/recChat.css');
document.head.appendChild(csslink);	

addChatPanel();
	
panelLayer = document.getElementById('panel-container');
modLayer = document.getElementById('chatModalDiv');
optMenu = document.getElementById('optMenuLayer');
messList = document.getElementById('messagesList');
userOnPage = document.getElementById('presence-container');
scrollChat = document.getElementById("messListCont");

new objChatAuth();
	
if (oChatAuth.checkconnect(GetCookie("userID"), GetCookie("userName")) != ""){
		setUserInfo(oChatAuth.getInfo().name);
		userID = oChatAuth.getInfo().id;
	}else{
		showConnectOpt();
	}

addtextContentListener();

fetchData(true);

scrollChat.addEventListener('scroll', checkScroll, this);
setTimeout(minimise, 1000);
}

function addtextContentListener(){
textContent.addEventListener("keydown", (event) => {
    var code = (event.keyCode ? event.keyCode : event.which);
	
	var oTa = chatForm.textContent;
	if (lastInputH < oTa.scrollHeight){
		lastInputH = oTa.scrollHeight;
		if (lastInputH < 130)
			oTa.style.height = lastInputH + "px";
		else{
			oTa.style.height = "130px";
			oTa.style.overflowY  = "auto";
		}
	}
	var txtLen = oTa.value.replaceAll("\n","").length;
	var oCnt = document.getElementById("textCount");
	if (txtLen > 50){
		oCnt.innerHTML = txtLen + " / " + longMax;
		if (txtLen > longMax){
			oCnt.classList.add('limit-reached');
		}else{
			if (oCnt.classList.contains('limit-reached'))
				oCnt.classList.remove('limit-reached');
		}
	}else{
		oCnt.innerHTML = "";
	}
	if (lastKey != 16 && code == 13) { //Enter keycode sans Shift précédent pour insérer une ligne
		event.preventDefault();
		if (txtLen > 0 && txtLen < longMax){
			sendMess(chatForm);
			oCnt.innerHTML = "";
			oCnt.classList.remove('limit-reached');
		}
	}
	if (code != 13)
		lastKey = code;
});	
}

var formatDateTime = {
	 toTitleCase : function(str) {
		return str.replace(
			/\w\S*/g,
			function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		)
	},
	getDateTime : function(milliTime){
			if (milliTime)
				return new Date(milliTime);
			else
				return new Date();
	},
	time : function(milliTime, notShowSecond) {
		var dt = this.getDateTime(milliTime);
		return dt.getHours() + ":" + (dt.getMinutes()+"").padStart(2, '0') + ( (notShowSecond) ? "":(":" + (dt.getSeconds()+"").padStart(2, '0')) );
	},
	date : function(milliTime) {
		var dt = this.getDateTime(milliTime);
		return dt.getFullYear() + "-" + ((dt.getMonth()+1)+"").padStart(2, '0') + "-" + (dt.getDate()+"").padStart(2, '0');
	},
	datetime : function(milliTime) {
		return this.date(milliTime) + " " + this.time(milliTime, true);
	},
	datetimecar : function(milliTime, heure) {
	var options = {year: 'numeric', month: 'long', day: 'numeric' };
	var opt_weekday = { weekday: 'long' };
	var today  = new Date(milliTime);
	var weekday = this.toTitleCase(today.toLocaleDateString(langSet, opt_weekday));
	var the_date = weekday + ", " + today.toLocaleDateString(langSet, options);
	if (heure)
		the_date = the_date + " " + this.time(milliTime, true);
	return the_date;
	},
	chattime : function(milliTime) {
	//var options = {year: 'numeric', month: 'long', day: 'numeric' };
	var opt_weekday = { weekday: 'long' };
	var today  = new Date(milliTime);
	var weekday = this.toTitleCase(today.toLocaleDateString(langSet, opt_weekday));
	//var the_date = weekday.substring(0,3) + ", " + today.toLocaleDateString("fr-FR", options);
	return weekday.substring(0,3) + ", " + this.time(milliTime, true) ;
	},	
	datetimeToMilli : function(datetime) {
		var res = false;
		
		if (datetime.length == 16)
			var regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/g;
		else
			var regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/g;
		
		if (regex)
			res = datetime.match(regex);
		if (res){
			res = new Date(res[0])
			res = res.valueOf()
		}
		return res;
	}
}

function remChilds(eItem, eItemToRemove){
if (eItem){
	while (eItem.childNodes.length > 0){
		eItem.removeChild(eItem.childNodes[0]);
	}
}
if (eItemToRemove){
	eItemToRemove.parentNode.removeChild(eItemToRemove);
}
}

function GetCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getData(param, callback){

  xhr = new XMLHttpRequest();
  xhr.open('GET', HOSTserv + 'fetchHisto?lastTime=' + firstTime + '&cID=' + chatID, true);
  //xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      // process the response
      var messages = JSON.parse(xhr.responseText);
      callback(messages);
    }
  };
  
  xhr.onerror = function() {
    // handle errors
    console.error('Error occurred while long-polling: ', xhr.statusText);
  };
  
  xhr.send();
  //console.log("Fetching : " + formatDateTime.time(new Date().getTime())); 
}

function postdata(param, callback){
var fd = new FormData();
const dat = {
    "cID": chatID,
    "user": oChatAuth.getInfo().name,
	"uID": oChatAuth.getInfo().id ,
    "data": (param.data) ? param.data:"",
	"mID" : (param.id) ? param.id:"",
	"stat": (param.stat) ? param.stat:"M",
	"messR": (param.messR) ? param.messR:""
};
fd.append('info', JSON.stringify(dat));

postReq('updChat', fd, callback);

}

function postMailCode(email){
var fd = new FormData();
const dat = {
    "email": email
};
fd.append('info', JSON.stringify(dat));

postReq('confirmMail', fd, getMailCode);

}

function getMailCode(res){
	if (res.res == 0){
		let code = prompt(chatLangLbl[res.message] + res.email);
		if (code){
			var fd = new FormData();
			const dat = {
				"email": res.email,
				"code" : code
			};
			fd.append('info', JSON.stringify(dat));
			postReq('confirmCode', fd, confMailCode);
		}
	}
}

function confMailCode(res){
	if (res.res == 0){
		userID = oChatAuth.comfirmMail();
		setUserInfo(oChatAuth.getInfo().name);
		longPolling(true);
	}else{
		var mess = chatLangLbl[res.message].replace("%1", res.code) + res.email;
		alert(mess);
	}
}

function postReq(funct, dat, callback){
var xhr=new XMLHttpRequest();
	xhr.onloadend = function() {
	var text = xhr.responseText;
	if (text == "")
		affNoRep();
	var data=JSON.parse(text);

	if (callback)
		callback(data, true);
	//if (!chatRun)
	//	longPolling();
	};
	
xhr.open("POST", HOSTserv + funct,true);
xhr.send(dat);	
}


function longPolling(resNow) {
	chatRun = true;
	coID = oChatAuth.getInfo().name;
	resNow = (resNow) ? 1:0;
  xhrPoll = new XMLHttpRequest();
  xhrPoll.open('GET', HOSTserv + 'chat?lastTime=' + lastTime + '&cID=' + chatID + '&uID=' + userID + '&coID=' + coID + '&rN=' + resNow, true);
  //xhrPoll.setRequestHeader('Content-Type', 'application/json');
  
  xhrPoll.onload = function() {
    if (xhrPoll.status === 200) {
      // process the response
      var res = xhrPoll.responseText;
	  if (res)
		poolRes(JSON.parse(res));
	  else
		  x=res;
	  
    }
    
    // initiate a new long-polling request
	if (chatRun)
		longPolling();
  };
  
  xhrPoll.onerror = function() {
    // handle errors
    console.error('Error while long-polling: ' + formatDateTime.datetime() , xhrPoll.statusText);
    
    // retry after a delay
	if (chatRun)
		setTimeout(longPolling, 5000);
  };
  
  xhrPoll.send();
  if ( HOSTserv == "http://127.0.0.1:3000/")
	console.log("Polling : " + userID + "  " + formatDateTime.time(new Date().getTime())); 
}

function poolRes(res){
	userID = res.uID;
	userOnPage.innerHTML = res.cNbr + " visiteur connect&eacute; / " + res.uNbr + " sur la page";
	addMessList(res.mess);
}


function poolMess(oF){
if (oF.message)
	var cont = oF.message.value;

if (chatRun){
	chatRun = false;
	if (xhrPoll)
		xhrPoll.abort();
	oF.message.value = "Stop polling";
}else{
	longPolling();
	oF.message.value = "Start polling";
}


}

function sendMess(oF){

if (oChatAuth.getInfo().name == ""){
	showConnect();
	return false;
	}else{
		var cont = chatForm.textContent.value;
		if (cont !== "" && cont.length < longMax){
			chatRun = false;
			if (xhrPoll)
				xhrPoll.abort();
			if (respondToMess){
				resToMess(cont);
				return false;
			}			
			var data = { "data" : cont};
			chatForm.textContent.value = "";
			res = postdata(data, addMess);
			lastInputH = 0;
			chatForm.textContent.style.height = "";
		}		
	}
	oF.textContent.focus();
}

function addTimeBar(ml, t, isBefore){
	var pElem = document.createElement("p");
	pElem.setAttribute('class', 'timeBar');
	if (Date.now() - t > 518400000) // Supérieur à 6 jours
		pElem.innerHTML = formatDateTime.datetimecar(t, true);
	else
		pElem.innerHTML = formatDateTime.chattime(t, true);
	
	if (isBefore)
		ml.insertBefore(pElem, isBefore);
	else
		ml.append(pElem);
}

	
function addMess(oMessItem, isRight){
var oMess = popMess(oMessItem, isRight);

if (lastUser == oMessItem.uID)
	remChilds(false,messList.lastChild.childNodes[1]);
if (oMessItem.time > lastTime + timeBarDelay)
	addTimeBar(messList, oMessItem.time);

checkAddRespo(oMess, oMessItem , isRight);

messList.append(oMess);
messList.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
lastTime = oMessItem.time;
lastUser = oMessItem.uID;
lastIP = oMessItem.IP;
}

function addMessList(oMessList){
oMessList.forEach(addMess);
}

function checkAddRespo(oMess, oMessItem , isRight){
var oRMess = null;
if (oMessItem.status != 'D' && oMessItem.messR != undefined && oMessItem.messR != ""){
	oRMess = createRowRespond(messUpdtItem, oMessItem.messR, isRight);
	oMess.insertBefore(oRMess, oMess.firstChild);
	el = oRMess.childNodes[1];
	el.scrollBy(0,el.scrollHeight);
}
return oRMess;
}

function addHistoMess(oMessItem){
var messList = document.getElementById('messagesList');
var isRight = (oChatAuth.getInfo().id == oMessItem.uID) ;

var oMess = popMess(oMessItem, isRight);
var oR = checkAddRespo(oMess, oMessItem , isRight);

if (histTime && oMessItem.time + timeBarDelay < histTime ){
	addTimeBar(messList, histTime, messList.firstChild);
}
	
if (messList.childNodes.length > 0 ){
	messList.insertBefore(oMess, messList.firstChild);
}else{
	messList.append(oMess);
	lastTime = oMessItem.time;
}
if (oR){
	el = oR.childNodes[1];
	el.scrollBy(0,el.scrollHeight);
}

histTime  = oMessItem.time;
firstTime = oMessItem.time;
}

function addHisto(oMessList){
var messList = document.getElementById('messagesList');
fObj = messList.firstChild;
oMessList.forEach(addHistoMess);
if (fObj)
	fObj.scrollIntoView(false);
else
	messList.scrollIntoView(false);
chatForm.scrollIntoView(false);
}

function popMess(oMess, isRight){
var dtime = formatDateTime.chattime(oMess.time, true)
var messtatus = (oMess.status) ?  oMess.status:"M";

if (isRight){
	var row1Class = "message-list-item-row-1 right-message-list-item-row-1";
	var row2Class = "message-list-item-row-2 right-message-list-item-row-2";
	var senderClass = "message-sender-profile-img-container right-message-sender-profile-img-container";
	var messageOptionsClass = "message-options message-options-left";
	var divStyle = "background-color: " + chat_color_background + "; color: " + chat_color_text;
}else{
	var row1Class = "message-list-item-row-1 left-message-list-item-row-1";
	var row2Class = "message-list-item-row-2 left-message-list-item-row-2";
	var senderClass = "message-sender-profile-img-container left-message-sender-profile-img-container";
	var messageOptionsClass = "message-options message-options-right";
	var divStyle = "background-color: " + chat_color_background_other + "; color: " + chat_color_text_other;
}

var divM = document.createElement("div");
if (messtatus == "D")
	divM.setAttribute('class', 'message-list-item message-list-item-sup');
else
	divM.setAttribute('class', 'message-list-item');

var div1 = document.createElement("div");
div1.setAttribute('class', row1Class);
div1.setAttribute('id', messtatus + oMess.time);	//ID à remplacer
div1.setAttribute('data-user', oMess.user);
div1.setAttribute('onmouseover', 'showOptions(this)');
div1.setAttribute('onmouseout', 'hideOptions(this)');
	var div11 = document.createElement("div");
	div11.setAttribute('class', senderClass);
		var img1 = document.createElement("img");
		img1.setAttribute('src', '');	//ID à remplacer  https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10160462211232367&amp;height=50&amp;width=50&amp;ext=1685242424&amp;hash=AeQXn821ckt8n1sdzIk
		img1.setAttribute('class', 'message-sender-profile-img message-sender-profile-img-right');
		img1.setAttribute('title', 'Connecté');
	//div11.appendChild(img1);
		//  <img>  class="message-sender-profile-img message-sender-profile-img-right"
	var div12 = document.createElement("div");
	div12.setAttribute('class', 'message-bubble right-message-bubble');
	div12.setAttribute('style', divStyle);
		var divC = document.createElement("div");
		divC.setAttribute('id', oMess.time);	//ID à remplacer
		divC.setAttribute('class', 'message-bubble-content');
		if (oMess.status && oMess.status == "D")
			divC.innerHTML = chatLangLbl["S0005"] + "</br>" + formatDateTime.datetime(oMess.Mtime, true);
		else
			divC.innerHTML = oMess.data;
		div12.appendChild(divC);
	var div13 = document.createElement("div");
	div13.setAttribute('class', messageOptionsClass);
	div13.setAttribute('onclick', "menuItemOpt(this)");
		var but = document.createElement("button");
		but.setAttribute('class', 'btn hoverable-btn');
			var spa1 = document.createElement("span");
			spa1.setAttribute('class', 'focus-cont');
			spa1.setAttribute('tabindex', '-1');
			//spa1.innerHTML = '┆';


                  var svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');   
                  svg1.setAttribute('viewBox', '0 0 24 24');
                  svg1.setAttribute('width', '24');
                  svg1.setAttribute('height', '24');
                     var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                     path1.setAttribute('d', 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z');
                  svg1.appendChild(path1);

			spa1.appendChild(svg1);	

		but.appendChild(spa1);
	div13.appendChild(but);

div1.appendChild(div11);
div1.appendChild(div12);
div1.appendChild(div13);
divM.appendChild(div1);

if (!isRight){
var div2 = document.createElement("div");
div2.setAttribute('class', row2Class);
	var spa1 = document.createElement("span");
	spa1.setAttribute('class', 'message-sender-name');
	spa1.innerHTML = oMess.user;
	var spa2 = document.createElement("span");
	spa2.innerHTML = "&nbsp;&nbsp;";
	var spa3 = document.createElement("span");
	spa3.innerHTML = dtime;	
	div2.appendChild(spa1);
	div2.appendChild(spa2);
	div2.appendChild(spa3);
divM.appendChild(div2);
}
return divM;
}

function createRowRespond(id, txt, isRight){
if (isRight){
	var row1Class = "message-list-item-row-1 right-message-list-item-row-1";
	var senderClass = "message-sender-profile-img-container right-message-sender-profile-img-container";
	var messageOptionsClass = "message-options message-options-left";
	var divStyle = "background-color: " + chat_color_background + "; color: " + chat_color_text;
}else{
	var row1Class = "message-list-item-row-1 left-message-list-item-row-1";
	var senderClass = "message-sender-profile-img-container left-message-sender-profile-img-container";
	var messageOptionsClass = "message-options message-options-right";
	var divStyle = "background-color: " + chat_color_background_other + "; color: " + chat_color_text_other;
}
var div1 = document.createElement("div");
div1.setAttribute('class', row1Class);
div1.setAttribute('id', 'RES' + id);	//ID à remplacer
div1.setAttribute('onmouseover', 'showOptions(this)');
div1.setAttribute('onmouseout', 'hideOptions(this)');
	var div11 = document.createElement("div");
	div11.setAttribute('class', senderClass);
		//  <img>  class="message-sender-profile-img message-sender-profile-img-right"
	var div12 = document.createElement("div");
	div12.setAttribute('class', 'message-bubble right-message-bubble reponseMess');
	div12.setAttribute('style', divStyle);
		var divC = document.createElement("div");
		//divC.setAttribute('id', oMess.time);	//ID à remplacer
		divC.setAttribute('class', 'message-bubble-content');
		divC.innerHTML = txt;
		div12.appendChild(divC);
	var div13 = document.createElement("div");
	div13.setAttribute('class', messageOptionsClass);
		var but = document.createElement("button");
		but.setAttribute('class', 'btn hoverable-btn');
			var spa1 = document.createElement("span");
			spa1.setAttribute('class', 'focus-cont');
			spa1.setAttribute('tabindex', '-1');
		but.appendChild(spa1);
	div13.appendChild(but);

div1.appendChild(div11);
div1.appendChild(div12);
div1.appendChild(div13);
return div1;	
}


// Set up function to fetch data
function fetchData(resNow) {
	chatRun = false;
	clearTimeout(pollTimeout);
	if (xhrPoll)
		xhrPoll.abort();
	getData('fetchHisto?lastTime=' + firstTime + '&cID=' + chatID, addHisto);
	pollTimeout = setTimeout(longPolling(resNow), 5000);
}

// Set up function to check if user has reached the bottom of the page
function checkScroll() {
/*  
  const scrollableHeight = this.scrollHeight - this.clientHeight;
  const scrolledDistance = this.scrollTop;

	//console.log(scrollableHeight - scrolledDistance + " Tot height:" + this.scrollHeight + " See height:" + this.clientHeight + " Scroll height:" + scrollableHeight);
*/
  if (this.scrollTop <= 1) {
    fetchData();
  }
}


function showConnect(){
var optConnect = document.getElementById('options-modal');
var offLine = document.getElementById('offLine');  
if (optConnect.style.display == "none" || optConnect.style.display == ""){
	if (offLine.style.display == "none")
		showDeconnectOpt();
	else
		showConnectOpt();
	
	modLayer.style.display = "block";
	optConnect.style.display = "block";
}else{
	modLayer.style.display = "none";
	optConnect.style.display = "none";
}
}


function chatConnect(fo, profil){

if (profil){
	oChatAuth.setProfile(fo.chatUserName.value);
	setUserInfo(oChatAuth.getInfo().name);
}else{
	postMailCode(fo.chatUserMail.value);
	oChatAuth.connectMail(fo.chatUserName.value, fo.chatUserMail.value);
}
closeAll();
}

function deconnect(){
var offLine = document.getElementById('offLine');     
var conStat = document.getElementById('connectStatus');
var userInfoLayer = document.getElementById('chatUserInfo');
	userID = oChatAuth.disconnect();
	userInfoLayer.innerHTML = "Chat";
	conStat.innerHTML = oChatAuth.getStatus();
	offLine.style.display = "block";
	closeAll();
}

function setUserInfo(nom){
var offLine = document.getElementById('offLine');     
var conStat = document.getElementById('connectStatus');
var userInfoLayer = document.getElementById('chatUserInfo');

if (nom == ""){
	alert("Nom vide");
	return false;
}else{
	conStat.innerHTML = oChatAuth.getStatus();
	userInfoLayer.innerHTML = oChatAuth.getInfo().name;
}
offLine.style.display = "none";
panelLayer.style.minWidth = (userInfoLayer.offsetWidth + 20) + "px";
return true;
}

function closeAll(){
document.getElementById('options-modal').style.display = "none";
	modLayer.style.display = "none";
	optMenu.style.display = "none";
	//textContent.focus();
}

function showOptions(oM){
closeAll();
oM.lastChild.style.display = "block";
}

function hideOptions(oM){
x=oM;
oM.lastChild.style.display = "none";
}

function menuItemOpt(obj){
var lCont = document.getElementById('messListCont');
  //const scrollableHeight = scrollChat.scrollHeight - scrollChat.clientHeight;
  const scrolledDistance = scrollChat.scrollTop;
var Yadj = 30;
if (window.matchMedia("(max-width: 767px)").matches)
	Yadj = 0;

document.getElementById("respond-container").style.display = "none";
var Mstatus = "M";
var arrOpt = [];
var fc = obj.parentElement.id.substring(0,1);
if (isNaN(fc)){
	Mstatus = fc;
	messUpdtItem = obj.parentElement.id.substring(1);
}else{
	messUpdtItem = obj.parentElement.id;
}
if (obj.classList.contains("message-options-left"))
	switch (Mstatus)
		{
		   case "R":
		   case "A":
		   case "M":
				arrOpt = [ "R", "D"];
			   break;
		   case "D":
				arrOpt = ["A"];
			   break;

		}
else
	arrOpt = [ "R"];

buildOptLstBut(arrOpt);

var topDist = obj.offsetTop
if (topDist == 0)
    topDist = obj.parentNode.offsetTop;
if (topDist == 0 && obj.parentNode.parentNode)
	topDist = obj.parentNode.parentNode.offsetTop;


  // + obj.offsetHeight
optMenu.style.top = (topDist - scrolledDistance + Yadj) + "px";
modLayer.style.display = "block";
optMenu.style.display = "block";
optMenu.style.left = (obj.offsetLeft - optMenu.offsetWidth /2 + obj.offsetWidth / 2) + "px";

}

function minimise(){
closeAll();
panelLayer.style.width = "60px";
panelLayer.style.height = "40px";
document.getElementById('action-row').style.visibility = "hidden";
chatForm.textContent.blur();
}

function show_chat(){

if (window.matchMedia("(max-width: 767px)").matches){
	panelLayer.style.height = (window.innerHeight -20)+ "px"
	panelLayer.style.width =  (window.innerWidth - 20) + "px" 
}else{
	panelLayer.style.width = "";
	panelLayer.style.height = "";
}
messList.scrollIntoView(false);
document.getElementById('action-row').style.visibility = "visible";
//setTimeout(chatForm.textContent.focus(), 1000);
chatForm.scrollIntoView(false);
}

function modMessItem(oOpt, sta){

var data = { "id": parseInt(messUpdtItem) ,"stat" : sta};

chatRun = false;
if (xhrPoll)
	xhrPoll.abort();
res = postdata(data, modMess);
}

function getHistMess(messObj){
var histResp = "", ob = "";
ch = messObj.parentNode.parentNode.parentNode.children;
for(var i in ch){
	if (typeof ch[i] == 'object' && ch[i].id.indexOf("RES") == 0){
	   ob = ch[i];
	   break;
	}
} // Si il y a déjà eu réponse au message
if (typeof ob == 'object')
    histResp = ob.childNodes[1].firstChild.innerHTML;

return {"histResp": histResp, "histObj": ob};
}


function resMessItem(obj){

chatRun = false;
if (xhrPoll)
    xhrPoll.abort();

var rc = document.getElementById("respond-container");
var catCont = document.getElementById(messUpdtItem);
var att= catCont.parentElement.parentElement.attributes;
us = att["data-user"].value;

const histResp = getHistMess(catCont).histResp;

document.getElementById("messToRespond").innerHTML = histResp + "<h4>R&eacute;ponse &agrave; " + us + ": </h4><h5>" + formatDateTime.datetime(parseInt(messUpdtItem)) + "</h5>" + catCont.innerHTML;
rc.scrollBy(0,rc.scrollHeight); 
rc.style.display = "block";

respondToMess = true;
closeAll();
}

function modMess(res){
if (res.ok){
	var catCont = document.getElementById(messUpdtItem)
	if (res.status == 'D'){
		catCont.classList.add("message-list-item-sup");
		catCont.parentNode.parentNode.id = "D" + messUpdtItem;
		catCont.innerHTML = chatLangLbl["S0005"] + "</br>" + formatDateTime.datetime(Date.now(), true);
		var obR = getHistMess(catCont).histObj;
		if (typeof obR == 'object')
			obR.style.display = "none";
	}
	if (res.status == 'A'){
		var oMess = popMess(res, true);
		messList.insertBefore(oMess, catCont.parentNode.parentNode.parentNode);
		remChilds(catCont.parentNode.parentNode.parentNode);
		//if (res.messR != "")
		//	addRespond(oMess, res.messR , true);	
		checkAddRespo(oMess, res , true);
		//oMess.scrollIntoView(false);
	}
	
	closeAll();
}else{
	alert("Échec de la mofification");
}
}

function resToMess(respTxt){
var rc = document.getElementById("respond-container");
rc.style.display = "none";
respondToMess = false;

var data = { "data" : respTxt, "stat" : "R", "messR": document.getElementById("messToRespond").innerHTML};
postdata(data, addMess);
}

function closeRespond(){
var resCont = document.getElementById("respond-container");
resCont.style.display = "none";
respondToMess = false;
}



setTimeout(initChatWidget, 1000);

