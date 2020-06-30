<!--
"use strict";

function callCamImgCapture(oImgId, saveCallback, winWidth){  // Start image capture object initialisation and/or show camera window
	if (!window.oCamImg)
		window.oCamImg = new Obj_CamImgCapture(oImgId, saveCallback, winWidth);

	window.oCamImg.show(oImgId);
	
}

//Class Obj_CamImgCapture(oImgId, camWindowWidth){
class Obj_CamImgCapture {
    constructor(oImgId, saveCallback, camWindowWidth) {

	var oImg = document.getElementById(oImgId);
	var CIimgData = null,
	  allowCamera = true,
	  txtTP = "Cliquer pour photo",
      txtRP = "< Rogner&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;Pivoter >";
	  
	if (!camWindowWidth)
		camWindowWidth = 300;

	function showProgress(init){
		if (init)
			progressBar.value = init;
		else
			progressBar.value += 0.005;

		if (progressBar.style.display == "none" || progressBar.style.display == "")
			progressBar.style.display="block";

		if (progressBar.value < 1){
			setTimeout("window.oCamImg.showProgress()", 20);
			}
		if (progressBar.value >= 1){
				progressBar.style.display = "none";
			}
	}

	function readImage() {
		var actImg = new Image();
		actImg.src = CIimgData;

		canvas2 = document.getElementById('canvas2');
		canvas2.width = trimDiv.offsetWidth;
		canvas2.height = trimDiv.offsetHeight;
		var ctx = canvas2.getContext("2d");

		var x = trimDiv.offsetLeft ;
		var y = trimDiv.offsetTop ;
		var w = trimDiv.offsetWidth ;
		var h = trimDiv.offsetHeight ;
		ctx.drawImage(actImg,x,y,w,h,0,0,w,h);

		setimgData(canvas2.toDataURL('image/png'));
	}

	function setimgData(data, save) {
		//alert("CIimgData" + save);
		CIimgData = data;
		var imgObj = document.getElementById(oImgId);
		if (data == null)
			imgObj.style.visibility="hidden";
		else
			imgObj.style.visibility="visible";
		//alert(CIimgData);
		if (save)
			saveToServer(data);
		else
			imgObj.src = data;
	}
	
	function saveToServer(file) {
		//alert("saveToServer1");
		//if (file.indexOf('https://') != -1 || file == "data:,")
			//return;
		//alert("saveToServer2");
		  document.body.style.cursor = 'progress';
		  const fd = new FormData();
		  fd.append('upfile', file);
		  fd.append('type', "image");

		  const xhr = new XMLHttpRequest();
		  xhr.open('POST', HOSTserv + 'addFile?', true);
		  xhr.onload = () => {
			if (xhr.status === 200) {
			  // this is callback data: url
			  var res = JSON.parse(xhr.responseText);

			  if (res.ok == 1){
				  setimgData(res.url);
				  if (saveCallback)
					  saveCallback();
			  }else
				 alert("Error");

			 buttonZone.style.display = "block";
			 butCancel.click();
			 document.body.style.cursor = 'default';
			}
		  };
xhr.onprogress = (event) => {
    // event.total is only available if server sends `Content-Length` header
   // console.log(`Downloaded ${event.loaded} of ${event.total} bytes`);
	showProgress( (event.loaded/event.total) - 0.01);
}

		  xhr.send(fd);
		}

	function takepicture() {
		var video = document.getElementById('video');
		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		var data = canvas.toDataURL('image/png');
		toolDiv.style.display="inherit";
		tipDiv.style.display="inherit";
		tipTxt.innerHTML = txtRP;
		tipTxt.title = txtRP;
		return(data);
	}
	
	function cropImg(){
		var actImg = new Image();
		actImg.onload = function() {
			ctx.drawImage(actImg,x,y,w,h,0,0,w,h);
			setimgData(canvas2.toDataURL('image/png'), true);
		}
		actImg.src = canvas.toDataURL('image/png');

		canvas2 = document.getElementById('canvas2');
		canvas2.width = trimDiv.offsetWidth;
		canvas2.height = trimDiv.offsetHeight;
		var ctx = canvas2.getContext("2d");
		var x = trimDiv.offsetLeft ;
		var y = trimDiv.offsetTop ;
		var w = trimDiv.offsetWidth ;
		var h = trimDiv.offsetHeight ;
	}
	
	function loadImage() {
		if ( this.files && this.files[0] ) {
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0,0,canvas.width, canvas.height);
			var FR= new FileReader();
			FR.onload = function(e) {
			   var img = new Image();
			   img.src = e.target.result;
			   img.onload = function() {
				var height = camWindowWidth * img.height / img.width;
				canvas.height = height;
				divVideo.style.height = height + "px";
				objClip.style.height = height + "px";
				ctx.drawImage(img, 0, 0, camWindowWidth, height);
				toolDiv.style.display="inherit";
				tipDiv.style.display="inherit";
				tipTxt.innerHTML = txtRP;
				tipTxt.title = txtRP;
			   };
			};       
			FR.readAsDataURL( this.files[0] );
		}
	}


// HTML Objects
var bodyobj = document.getElementsByTagName('body')[0];

// objModal (Modal window)
var objModal = document.createElement("div");
objModal.setAttribute('id', 'objModal');
var canvas2 = document.createElement("canvas");
canvas2.setAttribute('id', 'canvas2');
objModal.appendChild(canvas2);

bodyobj.appendChild(objModal);

//objClip (Camera window)
var objClip = document.createElement("div");
objClip.setAttribute('id', 'objClip'); 

var divVideo = document.createElement("div");
divVideo.setAttribute('id', 'divVideo');
var video = document.createElement("video");
video.setAttribute('id', 'video');
divVideo.appendChild(video);
var resPhoto = document.createElement("div");
resPhoto.setAttribute('id', 'resPhoto');
resPhoto.setAttribute('ondrop', 'CIdrop(event)');
resPhoto.setAttribute('ondragover', 'CIallowDrop(event)');
var canvas = document.createElement("canvas");
canvas.setAttribute('id', 'canvas');
resPhoto.appendChild(canvas);
var trimDiv = document.createElement("div");
trimDiv.setAttribute('id', 'trimDiv');
trimDiv.setAttribute('draggable', true);
trimDiv.setAttribute('ondragstart', 'CIdrag(event)');
resPhoto.appendChild(trimDiv);
var redim = document.createElement("div");
redim.setAttribute('id', 'redim');
redim.setAttribute('draggable', true);
redim.setAttribute('ondragstart', 'CIdrag(event)');
resPhoto.appendChild(redim);
divVideo.appendChild(resPhoto);
var tipDiv = document.createElement("div");
tipDiv.setAttribute('id', 'tipDiv');
var tipTxt = document.createElement("span");
tipTxt.setAttribute('id', 'tipTxt');
tipTxt.setAttribute('title', 'Cliquer pour photo');
tipTxt.innerHTML = 'Cliquer pour photo';
tipDiv.appendChild(tipTxt);
var toolDiv = document.createElement("div");
toolDiv.setAttribute('id', 'toolDiv');
var trimImg = document.createElement("div");
trimImg.setAttribute('id', 'trimImg');
trimImg.setAttribute('onclick', 'window.oCamImg.showTrimTool()');
toolDiv.appendChild(trimImg);
var rotateImg = document.createElement("div");
rotateImg.setAttribute('id', 'rotateImg');
rotateImg.setAttribute('onclick', 'window.oCamImg.rotateImg()');
toolDiv.appendChild(rotateImg);
tipDiv.appendChild(toolDiv);
var oProgress = document.createElement("progress");
oProgress.setAttribute('id', 'CI_progress');
tipDiv.appendChild(oProgress);
divVideo.appendChild(tipDiv);

objClip.appendChild(divVideo);

var buttonZone = document.createElement("div");
buttonZone.setAttribute('id', 'buttonZone');

var butElem = document.createElement("div");
butElem.setAttribute('class', 'butContent');
var butRetry = document.createElement("button");
butRetry.setAttribute('id', 'butRetry');
butRetry.setAttribute('onclick', 'retryCapture()');
butRetry.innerHTML = 'Reprendre';
butElem.appendChild(butRetry);
buttonZone.appendChild(butElem);

var butElem = document.createElement("div");
butElem.setAttribute('class', 'butContent');
var butCallFile = document.createElement("button");
butCallFile.setAttribute('id', 'butCallFile');
butCallFile.setAttribute('onclick', 'butFile.click()');
butCallFile.innerHTML = 'Photo';
butElem.appendChild(butCallFile);
buttonZone.appendChild(butElem);

var butElem = document.createElement("div");
butElem.setAttribute('class', 'butContent');
var butOk = document.createElement("button");
butOk.setAttribute('id', 'butOk');
butOk.innerHTML = langLbl["_okok"];
butElem.appendChild(butOk);
buttonZone.appendChild(butElem);

var butElem = document.createElement("div");
butElem.setAttribute('class', 'butContent');
var butCancel = document.createElement("button");
butCancel.setAttribute('id', 'butCancel');
butCancel.innerHTML = langLbl["_canc"];
butElem.appendChild(butCancel);
buttonZone.appendChild(butElem);

var butFile = document.createElement("input");
butFile.setAttribute('id', 'butFile');
butFile.setAttribute('type', 'file');
butFile.setAttribute('accept', 'image/*;capture=camera');
buttonZone.appendChild(butFile);

objClip.appendChild(buttonZone);

bodyobj.appendChild(objClip);

var progressBar = oProgress;

 this.tipTxt	   = tipTxt;
 this.objModal     = objModal;
 this.objClip      = objClip;
 this.toolDiv      = toolDiv;
 this.divVideo     = divVideo;
 this.video        = video;
 this.canvas       = canvas;
 this.resPhoto     = resPhoto;
 this.trimDiv      = trimDiv;
 this.butRetry     = butRetry;
 this.butOk        = butOk;
 this.butCancel    = butCancel;
 this.butFile      = butFile;
 this.butCallFile  = butCallFile;
 
 this.showProgress = showProgress;

   this.butRetry.addEventListener('click', function(ev){
	var tipDiv = document.getElementById('tipDiv');
	toolDiv.style.display="none";
	tipDiv.style.display="inherit";
	resPhoto.style.display="none";
	tipTxt.innerHTML = txtTP;
	tipTxt.title = txtTP;
  }, false)
  
   this.butOk.addEventListener('click', function(ev){
	   tipDiv.style.display = "block";
	   buttonZone.style.display = "none";
	   showProgress(0.01);
	if (trimDiv.style.visibility == "visible")
		cropImg();
	else{
		if (allowCamera && CIimgData == null ){   //allowCamera
			var data = takepicture();
			setimgData(data, true);
			//saveToServer(CIimgData);
		}else
		setimgData(canvas.toDataURL('image/png'), true);
	}
	//	saveToServer(CIimgData);
	//butCancel.click();
    ev.preventDefault();
  }, false)

// show() method
 this.show = function(oImg) {
  CIimgData = null;
  var streaming = false,
      tipTxt     =  this.tipTxt,
      objModal     =  this.objModal,
	  objClip      =  this.objClip,
	  toolDiv      =  this.toolDiv,
	  divVideo     =  this.divVideo,
	  video        =  this.video,
      canvas       =  this.canvas,
      resPhoto     =  this.resPhoto,
	  trimDiv      =  this.trimDiv,
	  butRetry     =  this.butRetry ,
	  butOk        =  this.butOk,
	  butCancel    =  this.butCancel,
	  butFile      =  this.butFile,
	  butCallFile  =  this.butCallFile,
      width = camWindowWidth,
      height = 0,
	  data = null,
	  txtTP = "Cliquer pour photo",
      txtRP = "< Rogner&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;&#8239;Pivoter >";
	  
// Stream video
navigator.getMedia = (navigator.getUserMedia ||
					 navigator.webkitGetUserMedia ||
					 navigator.mozGetUserMedia ||
					 navigator.msGetUserMedia);

if (navigator.getMedia){
//alert(navigator.getMedia);
  navigator.getMedia(
		{ video: true, audio: false },
		function(stream) {
		  video.srcObject = stream;
		  video.play();
		  video.style.visibility = "visible";
		  objModal.style.visibility="visible";
			butCancel.addEventListener('click', function(ev){
				stopStream(stream);
				quitPhoto();
				ev.preventDefault();
			}, false);
		},
		function(err) {   // Video not available
		//alert("Erreur getMedia");
			allowCamera = false;
			setNoVideo();
			console.log("An error occured! " + err);
			  butCancel.addEventListener('click', function(ev){
				quitPhoto();
				ev.preventDefault();
			  }, false);
		}
	  )
}else{ //No media available
		setNoVideo();
		  butCancel.addEventListener('click', function(ev){
			  quitPhoto();
			ev.preventDefault();
		  }, false)
}
// End stream video

	
	video.addEventListener('click', function(ev){
	resPhoto.style.display="inherit";
	takepicture();
	ev.preventDefault();
	}, false)
  
    video.addEventListener('canplay', function(ev){
    if (!streaming) {
//alert("videoHeight=" + video.videoHeight + " videoWidth=" + video.videoWidth + " camWindowWidth=" + camWindowWidth);
      height = video.videoHeight / (video.videoWidth/width);
	  divVideo.setAttribute('height', height);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
	  resPhoto.style.display="none";
	  objClip.style.display="inherit";
	  butCallFile.style.display="none";
	  toolDiv.style.display="none";
	  tipTxt.innerHTML = txtTP;
	  tipTxt.title = txtTP;
      streaming = true;
    }
  }, false)
  
 	canvas.width = width;
	divVideo.style.width = width + "px";
	objClip.style.width = width + "px";
	objClip.style.left = (((objModal.offsetWidth - width) / 2) - 5) + "px";
	
	
	function quitPhoto(){
		video.style.visibility = "hidden";
		redim.style.visibility = "hidden";
		trimDiv.style.visibility="hidden";
		objModal.style.visibility="hidden";
		objClip.style.display="none";
	}
	
	function setNoVideo(){
		resPhoto.style.display="inherit";
		butRetry.style.display="none";
		butCallFile.style.display="inline";
		butFile.onchange = loadImage;
		var ctx = canvas.getContext("2d");
		objModal.style.visibility="visible";
		objClip.style.display="inherit";
	  tipTxt.innerHTML = "";
	  tipTxt.title = "";
	  toolDiv.style.display="none";
	}


	function stopStream(stream) {
		if (stream){
			stream.getVideoTracks().forEach(function (track) {
				track.stop();
			});
		}
	}
  
}  // End show method


// rotateImg() method
this.rotateImg = function() {

	var canvas2 = document.getElementById('canvas2');

	canvas2.width = canvas.width;
	canvas2.height = canvas.height;
	var ctx = canvas2.getContext("2d");
	ctx.clearRect(0,0,canvas2.width, canvas2.height);
	ctx.save();
	//http://jsfiddle.net/m1erickson/EQx8V/

	ctx.translate(canvas.width/2,canvas.height/2);
	ctx.rotate(Math.PI/2);
	ctx.drawImage(canvas,-canvas.width/2,-canvas.height/2);
	ctx.rotate(-Math.PI/2);
	ctx.translate(-canvas.width/2,-canvas.height/2);

	var context = canvas.getContext("2d");
	context.clearRect(0,0,canvas.width, canvas.height);
	context.drawImage(canvas2, 0, 0, canvas2.width, canvas2.height);
	CIimgData = canvas2.toDataURL('image/png');
}  // END rotateImg() method

// showTrimTool() method
this.showTrimTool = function(){
	var resPhoto = document.getElementById('resPhoto');
	var trimDiv = document.getElementById('trimDiv');
	var redim = document.getElementById('redim');
	var tipDiv = document.getElementById('tipDiv');
	trimDiv.style.width = (resPhoto.offsetHeight / 2) + "px"; 
	trimDiv.style.height = (trimDiv.offsetWidth) + "px";
	if (trimDiv.offsetHeight > resPhoto.offsetHeight * .9){
		trimDiv.style.height = (resPhoto.offsetHeight * .9) + "px"; 
		trimDiv.style.width = (resPhoto.offsetHeight * .9) + "px"; 
		}
	trimDiv.style.left = (((objClip.offsetWidth - trimDiv.offsetWidth) / 2) ) + "px";
	trimDiv.style.top = (((objClip.offsetHeight - trimDiv.offsetHeight) / 3) ) + "px";
	redim.style.left = (trimDiv.offsetLeft - 9) + "px";
	redim.style.top = (trimDiv.offsetTop - 9) + "px";
	trimDiv.addEventListener('touchstart', CIstartTouch, false);  // Drag and drop for mobil
	redim.addEventListener('touchstart', CIstartTouch, false);  // Drag and drop for mobil
	tipDiv.style.display="none";
	trimDiv.style.visibility = "visible";
	redim.style.visibility = "visible";
} // END showTrimTool() method

	 } //END Constructor
 
}
// END Class Obj_CamImgCapture


var CI_objDrag_elem;

function CIallowDrop(ev) {
    ev.preventDefault();

		return false
}

function CIdrag(ev) {
	CI_objDrag_elem = ev.target;
    ev.dataTransfer.setData("id", ev.target.id);
	CIoffSetX = ev.clientX - CI_objDrag_elem.offsetLeft;
	CIoffSetY = ev.clientY - CI_objDrag_elem.offsetTop;
}

function CIdrop(ev) {
	ev.preventDefault();
	if (CI_objDrag_elem.id == "redim"){
		redimTrimObj(ev.clientX, ev.clientY);
	}
	CI_objDrag_elem.style.left = ev.clientX - CIoffSetX + "px";
	CI_objDrag_elem.style.top =  ev.clientY - CIoffSetY + "px";	
	CIvalidPos();
}

function CIposObjs(){
var trimDiv = document.getElementById('trimDiv');
var redim = document.getElementById('redim');
	if (CI_objDrag_elem.id == "trimDiv"){
		redim.style.left = (trimDiv.offsetLeft - 9) + "px";
		redim.style.top = (trimDiv.offsetTop - 9) + "px";
	}else{
		trimDiv.style.left = (redim.offsetLeft + 9) + "px";
		trimDiv.style.top = (redim.offsetTop + 9) + "px";		
	}
}

function redimTrimObj(evX, evY){
	var infoTXT = document.getElementById('infoTXT');
	var trimDiv = document.getElementById('trimDiv')
	var objClip = document.getElementById('objClip');
	var cX = evX - objClip.offsetLeft;
	var cY = evY - objClip.offsetTop;
	//infoTXT.value = (evX + " redim Y = " + evY + "  cX= " + cX + " cY=" + cY);	
	if (trimDiv.offsetTop > evY)
		var oHeight = trimDiv.offsetHeight + (trimDiv.offsetTop - cY);
	else
		var oHeight = trimDiv.offsetHeight - (cY - trimDiv.offsetTop);
	if (trimDiv.offsetLeft > cX)
		var oWidth = trimDiv.offsetWidth + (trimDiv.offsetLeft - cX);
	else
		var oWidth = trimDiv.offsetWidth - (cX - trimDiv.offsetLeft);
	trimDiv.style.width = (oWidth ) + "px";
	trimDiv.style.height = (oHeight) + "px";	
}

// Drag & drop with touch event for mobil

var CIoffSetX = 0;
var CIoffSetY = 0;
function CIstartTouch(event) {
	CI_objDrag_elem = event.target;
	var touch = event.targetTouches[0];
	CIoffSetX = touch.pageX-CI_objDrag_elem.offsetLeft;
	CIoffSetY = touch.pageY-CI_objDrag_elem.offsetTop;
	 this.addEventListener('touchmove', CImoveTouch, false);
	 this.addEventListener('touchend', CIendTouch, false);
}

function CIendTouch(event) {   //Drop DIV
var objClip = document.getElementById('objClip');
var trimDiv = document.getElementById('trimDiv');
 this.removeEventListener('touchmove', CImoveTouch, false);
 this.removeEventListener('touchend', CIendTouch, false);
	if (event.target.id == "redim"){
		redimTrimObj(event.target.offsetLeft+objClip.offsetLeft+9, event.target.offsetTop+objClip.offsetTop+9);
		trimDiv.style.left = (event.target.offsetLeft + 9) + "px";
		trimDiv.style.top = (event.target.offsetTop + 9) + "px";	
	}
CIvalidPos();
}

function CIvalidPos(){
var objClip = document.getElementById('objClip');
var trimDiv = document.getElementById('trimDiv');
if (trimDiv.offsetLeft + trimDiv.offsetWidth < 0 || 
	trimDiv.offsetLeft > objClip.offsetWidth || 
    trimDiv.offsetTop > objClip.offsetHeight || 
	trimDiv.offsetTop + trimDiv.offsetHeight < objClip.offsetTop )
window.oCamImg.showTrimTool();
if (trimDiv.offsetLeft < 0)
	trimDiv.style.left = "0px";
if (trimDiv.offsetLeft + trimDiv.offsetWidth > objClip.offsetWidth)
	trimDiv.style.left = (objClip.offsetWidth - trimDiv.offsetWidth - 1) + "px";
if (trimDiv.offsetTop < 0)
	trimDiv.style.top = "0px";
if (trimDiv.offsetTop + trimDiv.offsetHeight > objClip.offsetHeight)
	trimDiv.style.top = (trimDiv.offsetHeight - 30) + "px";
CIposObjs();	
}

function CImoveTouch(event) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
	var obj = event.target;

    obj.style.left = touch.pageX-CIoffSetX + 'px';
    obj.style.top = touch.pageY-CIoffSetY + 'px';
	if (obj.id != "redim"){
		CIposObjs();
		//redimTrimObj(touch.pageX, touch.pageY);
	}
    event.preventDefault();
}

function test(){
alert("Test");
}
	
// -->
