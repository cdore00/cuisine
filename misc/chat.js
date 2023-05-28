
var chatID = 2001;
var lastTime = new Date().getTime();
var firstTime = lastTime, histTime = null;
var chatRun = false;
var chatName="", userID="", lastName, lastIP, pollTimeout, wTimeout, scrollChat, panelLayer, panelLayerMinWidth, modLayer, messUpdtItem, messList, optMenu, userOnPage;
var lastInputH = 0, lastKey = 0, longMax = 250;
var respondToMess = false;
var xhrPoll;
const delay = 600000; // 10 minutes ........10 second
const supMessage = "Supprim&eacute;";

//include("instChat.js");
(function () { var chatP = document.createElement('script'); chatP.type = 'text/javascript'; chatP.async = true; chatP.src = 'misc/instChat.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(chatP, s); })();

//include("util.js");
//(function () { var chat1 = document.createElement('script'); chat1.type = 'text/javascript'; chat1.async = true; chat1.src = 'util.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(chat1, s); })();



function initPage(){
var csslink = document.createElement('link');
csslink.setAttribute('rel', 'stylesheet');
csslink.setAttribute('href', 'misc/recChat.css');
document.head.appendChild(csslink);	

addPanel();
	
panelLayer = document.getElementById('panel-container');
modLayer = document.getElementById('chatModalDiv');
optMenu = document.getElementById('optMenuLayer');
messList = document.getElementById('messagesList');
userOnPage = document.getElementById('presence-container');
scrollChat = document.getElementById("messListCont");

chatName = localStorage.getItem("chatUser");
if (chatName && chatName != "")
	setUserInfo(chatName);
	else{
		showConnectOpt();
		chatName = "";
	}

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

fetchData(true);

scrollChat.addEventListener('scroll', checkScroll, this);
wTimeout = setTimeout(minimise, 5000);
}

/*
function process(e, obj) {
    var code = (e.keyCode ? e.keyCode : e.which);
	if (lastInputH < chatForm.textContent.scrollHeight){
		lastInputH = chatForm.textContent.scrollHeight;
		if (lastInputH < 130)
			chatForm.textContent.style.height = lastInputH + "px";
		else
			chatForm.textContent.style.overflowY  = "auto";
	}    
	if (code == 13) { //Enter keycode
		e.preventDefault();
		sendMess(obj);
		var oCnt = document.getElementById("textCount");
		
    }
}
*/


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
  //tt = new Date().getTime();
  //console.log("Fetching : " + formatDateTime.time(tt)); 

}

function postdata(param, callback){
var fd = new FormData();
const dat = {
    "cID": chatID,
    "user": chatName,
    "data": (param.data) ? param.data:"",
	"mID" : (param.id) ? param.id:"",
	"stat": (param.stat) ? param.stat:"M",
	"messR": (param.messR) ? param.messR:""
};
fd.append('info', JSON.stringify(dat));
var xhr=new XMLHttpRequest();
	xhr.onloadend = function() {
	var text = xhr.responseText;
	if (text == "")
		affNoRep();
	var data=JSON.parse(text);
	//setTimeout(longPolling, 1000);
	if (callback)
		callback(data, true);
	longPolling();
	};
	
xhr.open("POST", HOSTserv + 'updChat',true);
//xhr.setRequestHeader('Content-Type', 'application/json');
//xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
if ("POST" == "POST" && HOSTserv != "http://127.0.0.1:5000/"){
	//xhr.withCredentials = true;
}
xhr.send(fd);

}

function longPolling(resNow) {
	//return false;
	chatRun = true;
	coID = chatName;
	resNow = (resNow) ? 1:0;
  xhrPoll = new XMLHttpRequest();
  xhrPoll.open('GET', HOSTserv + 'chat?lastTime=' + lastTime + '&cID=' + chatID + '&uID=' + userID + '&coID=' + coID + '&rN=' + resNow, true);
  //xhrPoll.setRequestHeader('Content-Type', 'application/json');
  
  xhrPoll.onload = function() {
    if (xhrPoll.status === 200) {
      // process the response
      var res = JSON.parse(xhrPoll.responseText);
	  poolRes(res);
    }
    
    // initiate a new long-polling request
	if (chatRun)
		longPolling();
  };
  
  xhrPoll.onerror = function() {
    // handle errors
    console.error('Error occurred while long-polling: ', xhrPoll.statusText);
    
    // retry after a delay
	if (chatRun)
		setTimeout(longPolling, 5000);
  };
  
  xhrPoll.send();
  tt = new Date().getTime();
  if ( HOSTserv == "http://127.0.0.1:5000/")
	console.log("Polling : " + formatDateTime.time(tt)); 
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
	//chatRun = true;
	longPolling();
	oF.message.value = "Start polling";
}


}

function sendMess(oF){

if (!chatName || chatName == ""){
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

if (lastName == oMessItem.user)
	remChilds(false,messList.lastChild.childNodes[1]);
if (oMessItem.time > lastTime + delay)
	addTimeBar(messList, oMessItem.time);

checkAddRespo(oMess, oMessItem , isRight);

messList.append(oMess);
messList.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
lastTime = oMessItem.time;
lastName = oMessItem.user;
lastIP = oMessItem.IP;
//if (oMessItem.stat == 'R')
	//addRespond(oMess, oMessItem.messR , isRight)
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
var isRight = (chatName == oMessItem.user);

var oMess = popMess(oMessItem, isRight);
var oR = checkAddRespo(oMess, oMessItem , isRight);

if (histTime && oMessItem.time + delay < histTime ){
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
	var divStyle = "background-color: rgb(57, 170, 0); color: rgb(255, 255, 255)";
}else{
	var row1Class = "message-list-item-row-1 left-message-list-item-row-1";
	var row2Class = "message-list-item-row-2 left-message-list-item-row-2";
	var senderClass = "message-sender-profile-img-container left-message-sender-profile-img-container";
	var messageOptionsClass = "message-options message-options-right";
	var divStyle = "background-color: rgb(239, 246, 238); color: rgb(52, 73, 94);"
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
			divC.innerHTML = supMessage + "</br>" + formatDateTime.datetime(oMess.Mtime, true);
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
	var divStyle = "background-color: rgb(57, 170, 0); color: rgb(255, 255, 255)";
}else{
	var row1Class = "message-list-item-row-1 left-message-list-item-row-1";
	var senderClass = "message-sender-profile-img-container left-message-sender-profile-img-container";
	var messageOptionsClass = "message-options message-options-right";
	var divStyle = "background-color: rgb(239, 246, 238); color: rgb(52, 73, 94);"
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
	//div13.setAttribute('onclick', "menuItemOpt(this)");
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
  
  const scrollableHeight = this.scrollHeight - this.clientHeight;
  const scrolledDistance = this.scrollTop;

	//console.log(scrollableHeight - scrolledDistance + " Tot height:" + this.scrollHeight + " See height:" + this.clientHeight + " Scroll height:" + scrollableHeight);

  if (scrolledDistance <= 1) {
    fetchData();
  }
}



// Add event listener for scroll event
//window.addEventListener('scroll', checkScroll);
//FIN  SCROLL

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

function connect(fo){

chatRun = false;
if (xhrPoll)
	xhrPoll.abort();

var nom = fo.chatUserName.value;
localStorage.setItem("chatUser", nom);
if (setUserInfo(nom)){
	closeAll();
	longPolling(true);
}
}

function deconnect(){
var offLine = document.getElementById('offLine');     
var conStat = document.getElementById('connectStatus');
var userInfoLayer = document.getElementById('chatUserInfo');
	chatName = "", nom = "";
	userInfoLayer.innerHTML = "Chat";
	conStat.innerHTML = "D&eacute;connect&eacute;";
	localStorage.setItem("chatUser", "");
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
	chatName = nom;
	conStat.innerHTML = "Connect&eacute;: " + nom;
	userInfoLayer.innerHTML = nom;
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
		catCont.innerHTML = supMessage + "</br>" + formatDateTime.datetime(Date.now(), true);
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
/*
function addRespond(oMess, messR, isRight){
oRMess = createRowRespond(messUpdtItem, messR, isRight);
oMess.insertBefore(oRMess, oMess.firstChild);
}
*/


setTimeout(initPage, 1000);

/*
initPage();

setTimeout(() => {
 initPage();
}, 5000)
*/