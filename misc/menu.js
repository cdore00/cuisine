<!--

var optHeight = 2.1;
var logomenuOpen = false;
var subMenus = [
	{
	"parent": "oMenu2",
	"options": [
					{
					"caption": "Repas de la semaine",
					"href": "./menu.html"
					},
					{
					"caption": "Nos mets",
					"href": "./mets.html"
					},
					{
					"caption": "Questions fr&eacute;quentes",
					"href": "./repas.html#foireQ"
					}
				]
	},
	{
	"parent": "oMenu3",
	"options": [
					{
					"caption": "Buffet froid",
					"href": "https://www.traiteursimpas.com/"
					},
					{
					"caption": "Bo&icirc;te &agrave; lunch",
					"href": "https://www.traiteursimpas.com/"
					},
					{
					"caption": "Cocktail d&icirc;natoire",
					"href": "https://www.traiteursimpas.com/"
					},
					{
					"caption": "Chef &agrave; domicile",
					"href": "https://www.traiteursimpas.com/"
					}
				]
	},

	{
	"parent": "logomenu",
	"options": [
					{
					"caption": "Accueil",
					"href": "index.html"
					},
					{
					"caption": "Nouvelles",
					"href": "news.html"
					},
					{
					"caption": "Repas pr&eacute;par&eacute;s",
					"href": "repas.html"
					},
					{
					"caption": "Traiteur",
					"href": "menu.html"
					},
					{
					"caption": "Certificat-cadeau",
					"href": "menu.html"
					},
					{
					"caption": "Blogue",
					"href": "menu.html"
					},
					{
					"caption": "À propos",
					"href": "a_propos.html"
					},
					{
					"caption": "Contact",
					"href": "joindre.html"
					}					
				]
	}
]

	
function initMenu(selID){
var optColl = document.getElementsByClassName("optMenu");
for (i = 0; i < optColl.length; i++) {
	if (optColl[i].id == selID){
		optColl[i].classList.add('selectedOpt');
		optColl[i].href = '#';
		}
}
}

function showSubMenu(oOpt){
var ht = 0;
var docBody = document.getElementsByTagName("BODY")[0];
var parent = oOpt.parentNode;
var subName = oOpt.id + "sub";
var subOptions = false;
var subElem = document.getElementById(subName);
// Close other sub menu
var othSub = document.getElementsByClassName("submenu");
if (subName != "logomenusub")
	for (i = 0; i < othSub.length; i++) {
		outSub(othSub[i])
	}
if (subElem){
	//alert(subElem.id + subElem.offsetHeight);
	if (logomenuOpen){
		outSub(subElem);
		return false;
	}else
	ht = subElem.childNodes.length;
}else{
	for (i = 0; i < subMenus.length; i++) {
		if (subMenus[i].parent == oOpt.id)
			subOptions = subMenus[i].options;
	}
	if (subOptions){
		var divElem = document.createElement("div");
		divElem.setAttribute('id', subName);
		divElem.setAttribute('class', 'submenu');		
		if (subName != "logomenusub")
			divElem.setAttribute('onmouseleave', 'outSub(this)');
		for (i = 0; i < subOptions.length; i++) {
			opt = addMenuOpt(subOptions[i]);
			ht += 1;
			divElem.appendChild(opt);
		}
		docBody.appendChild(divElem);
		subElem = divElem;
	}
}
if (subElem){
		subElem.style.top = parent.offsetHeight + "px" ;
		subElem.style.left = parent.offsetLeft + "px" ;
		subElem.style.height = (ht * (optHeight)) + "em";
		if (subElem.id == "logomenusub")
			logomenuOpen = true;
	}
}

function addMenuOpt(attrib){
var ancElem = document.createElement("a");
ancElem.setAttribute('class', 'inputButton');
if (attrib.href)
	ancElem.setAttribute('href', attrib.href);
if (attrib.target)
	ancElem.setAttribute('target', attrib.target);
if (attrib.caption)
	ancElem.innerHTML = attrib.caption;
return ancElem;
}

function outSub(oSub){
	oSub.style.height = "0em";
	logomenuOpen = false;
}


// -->
