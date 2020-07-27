<!--
"use strict";

function callAuthUser(){  // Start image capture object initialisation and/or show camera window
	if (!window.oAuthUser)
		window.oAuthUser = new Obj_AuthUser();

	window.oAuthUser.show();
	
}

function identified(){
if (!userId)
	var userId = null;
	userId = GetCookie("userID");
	if (userId){
		var obj_AuthUser = document.getElementById('obj_AuthUser');
		var objModal = document.getElementById('objModal');
		objModal.style.visibility="hidden";
		obj_AuthUser.style.display="none";;
	}
}

//Class Obj_AuthUser(){
class Obj_AuthUser {
    constructor() {

//Langage
var lang = window.navigator.userLanguage || window.navigator.language;
var oAuth_langLbl = [];
	switch (lang) {
	  case "fr":
		oAuth_langLbl["aiden"] = "Authentification";
		oAuth_langLbl["email"] = "Courriel";
		oAuth_langLbl["_canc"] = "Annuler";
		oAuth_langLbl["passw"] = "Mot de passe";
		break;
	  case "es":
		oAuth_langLbl["aiden"] = "Autenticaci&oacute;n";
		oAuth_langLbl["email"] = "Correo electr&oacute;nico";
		oAuth_langLbl["_canc"] = "Cancelar";
		oAuth_langLbl["passw"] = "Contraseña";
		break;
	  default:
		oAuth_langLbl["aiden"] = "Authentication";
		oAuth_langLbl["email"] = "e-mail";
		oAuth_langLbl["_canc"] = "Cancel";
		oAuth_langLbl["passw"] = "Password";
	}
	//Public var
	var CIimgData = null;
	
	
//Functions



// HTML Objects
var bodyobj = document.getElementsByTagName('body')[0];

// objModal (Modal window)
var objModal = document.getElementById('objModal');

if (objModal == null){
	objModal = document.createElement("div");
	objModal.setAttribute('id', 'objModal');
	bodyobj.appendChild(objModal);
}


//obj_AuthUser (Auth form)
var obj_AuthUser = document.createElement("div");
obj_AuthUser.setAttribute('id', 'obj_AuthUser'); 

var titleAuth = document.createElement("div");
titleAuth.setAttribute('id', 'obj_AuthUser_title');
titleAuth.innerHTML = oAuth_langLbl["aiden"];
obj_AuthUser.appendChild(titleAuth);

var formAuth = document.createElement("form");
formAuth.setAttribute('id', 'formAuth');

var identOptions = document.createElement("div");
identOptions.setAttribute('id', 'obj_AuthUser_identOptions');

// Courriel
var prefList = document.createElement("div");
prefList.setAttribute('class', 'obj_AuthUser_prefList');
var prefLabel = document.createElement("label");
prefLabel.setAttribute('class', 'obj_AuthUser_identLbl');
prefLabel.setAttribute('for', 'nameUser');
prefLabel.innerHTML = oAuth_langLbl["email"];
prefList.appendChild(prefLabel);
var prefVal = document.createElement("div");
prefVal.setAttribute('class', 'obj_AuthUser_prefVal');
prefVal.innerHTML = '<input id="nameUser" class="inputtext" type="email" size="15" maxlength="50">';
prefList.appendChild(prefVal);
identOptions.appendChild(prefList);

// Password
var prefList = document.createElement("div");
prefList.setAttribute('class', 'obj_AuthUser_prefList');
var prefLabel = document.createElement("label");
prefLabel.setAttribute('class', 'obj_AuthUser_identLbl');
prefLabel.setAttribute('for', 'passwordUser');
prefLabel.innerHTML = oAuth_langLbl["passw"];
prefList.appendChild(prefLabel);
var prefVal = document.createElement("div");
prefVal.setAttribute('class', 'obj_AuthUser_prefVal');
prefVal.innerHTML = '<input id="passwordUser" class="inputtext" type="password" size="15" maxlength="50">';
prefList.appendChild(prefVal);
identOptions.appendChild(prefList);

formAuth.appendChild(identOptions);

var butZone = document.createElement("div");
var okPref = document.createElement("input");
okPref.setAttribute('id', 'okPref');
okPref.setAttribute('class', 'bouton');
okPref.setAttribute('type', 'submit');
okPref.setAttribute('value', 'Ok');
butZone.appendChild(okPref);
var butCancel = document.createElement("input");
butCancel.setAttribute('id', 'annulePref');
butCancel.setAttribute('class', 'bouton');
butCancel.setAttribute('type', 'submit');
butCancel.setAttribute('value', oAuth_langLbl["_canc"]);
butZone.appendChild(butCancel);

formAuth.appendChild(butZone);

obj_AuthUser.appendChild(formAuth);

bodyobj.appendChild(obj_AuthUser);

  okPref.addEventListener('click', function(ev){
	authentif();
	ev.preventDefault();
  }, false);
  
  butCancel.addEventListener('click', function(ev){
	quit();
	ev.preventDefault();
  }, false);
  
function save(){
	alert("saved");
}

function quit(){
	objModal.style.visibility="hidden";
	obj_AuthUser.style.display="none";
}

 this.objModal     = objModal;
 this.obj_AuthUser = obj_AuthUser;
 this.butCancel    = butCancel;
 
 /*
   this.butOk.addEventListener('click', function(ev){


    ev.preventDefault();
  }, false)
*/

// show() method
 this.show = function() {

var objModal     =  this.objModal,
	obj_AuthUser =  this.obj_AuthUser,
	butCancel    = this.butCancel;

	objModal.style.visibility="visible";
	obj_AuthUser.style.display="inherit";



}  // End show method


} //END Constructor
 
}
// END Class Obj_AuthUser

	
// -->
