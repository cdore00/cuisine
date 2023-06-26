function addPanel(){
var pageZone = document.getElementById('testScroll');
var bodyobj = document.getElementsByTagName('body')[0];

//buildPanel();
console.log("Chat...");
bodyobj.appendChild(buildPanel());
   
}

function buildPanel(oPanel){

var Paneldiv = document.createElement("div");   
Paneldiv.setAttribute('id', 'panel-container');
Paneldiv.setAttribute('class', 'desktop-panel');
         var Uspa = document.createElement("span");   
         Uspa.setAttribute('id', 'chatUserInfo');
		 Uspa.setAttribute('onclick', 'show_chat();');
		 Uspa.innerHTML = "Chat";
         Paneldiv.appendChild(Uspa); 
		 
         var Odiv = document.createElement("div");
         Odiv.setAttribute('id', 'optMenuLayer');
         Odiv.setAttribute('class', 'msg-options-menu');   
            var ul1 = document.createElement("ul"); 
				ul1.setAttribute('id', 'optionsListButton');
  
         Odiv.appendChild(ul1);
      Paneldiv.appendChild(Odiv); 
		 
var Wdiv = document.createElement("div");   
Wdiv.setAttribute('id', 'head-wrapper');
Wdiv.setAttribute('style', 'background-color: rgb(57, 170, 0)');
   var Hdiv = document.createElement("header");
  
      var Adiv = document.createElement("div");   
      Adiv.setAttribute('id', 'action-row');

            var oBut = document.createElement("button");   
            oBut.setAttribute('id', 'options-btn');
            oBut.setAttribute('title', 'Connexion');
            oBut.setAttribute('class', 'btn hoverable-btn');
            oBut.setAttribute('tabindex', '1');
               var Uspa = document.createElement("span");   
               Uspa.setAttribute('class', 'focus-cont');
               Uspa.setAttribute('onclick', 'showConnect();');
                  var svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');   
                  svg1.setAttribute('viewBox', '0 0 24 24');
                  svg1.setAttribute('width', '24');
                  svg1.setAttribute('height', '24');
                     var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                     path1.setAttribute('d', 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z');
                  svg1.appendChild(path1);
               Uspa.appendChild(svg1);
            oBut.appendChild(Uspa);
         Adiv.appendChild(oBut);
            var oBut2 = document.createElement("button");   
            oBut2.setAttribute('title', 'Fermer');   
            oBut2.setAttribute('tabindex', '31');   
            oBut2.setAttribute('class', 'btn hoverable-btn');
            oBut2.setAttribute('onclick', 'minimise();');
               var Uspa = document.createElement("span");   
               Uspa.setAttribute('tabindex', '-1');
               Uspa.setAttribute('class', 'focus-cont');
                  var svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                  //svg1.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                  svg1.setAttribute('viewBox', '0 0 24 24');
                  svg1.setAttribute('width', '24');
                  svg1.setAttribute('height', '24');
                  svg1.setAttribute('svg-inline', '');
                  svg1.setAttribute('role', 'presentation');
                  svg1.setAttribute('focusable', 'false');
                     var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                     path1.setAttribute('d', 'M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42z');
                  svg1.appendChild(path1);                 
               Uspa.appendChild(svg1);
            oBut2.appendChild(Uspa);
         Adiv.appendChild(oBut2);
      Hdiv.appendChild(Adiv);
   Wdiv.appendChild(Hdiv);   
Paneldiv.appendChild(Wdiv);


var Odiv = document.createElement("div");   
Odiv.setAttribute('id', 'options-modal');
   var div1 = document.createElement("div");
      var ul1 = document.createElement("ul");   
         var li1 = document.createElement("li");
         li1.setAttribute('tabindex', '8');
            var hh3 = document.createElement("h3");
            hh3.innerHTML = 'Connexion';
         li1.appendChild(hh3);   
      ul1.appendChild(li1);
		//ul1.setAttribute('id', 'connect-ul');
		var li1 = document.createElement("li");
		   var Sdiv = document.createElement("div");
		   Sdiv.setAttribute('id', 'connectStatus');
		   Sdiv.innerHTML = 'Connect&eacute;';
		   li1.appendChild(Sdiv);
		ul1.appendChild(li1);  	  
	div1.appendChild(ul1); 
      var hr1 = document.createElement("hr");
      div1.appendChild(hr1);   
Odiv.appendChild(div1);   

   var Cform = document.createElement("form");
   Cform.setAttribute('action', '');
   Cform.setAttribute('id', 'connectForm');
   
Odiv.appendChild(Cform);
Paneldiv.appendChild(Odiv);

   var Hdiv = document.createElement("div");
   Hdiv.setAttribute('id', 'offLine');
   Hdiv.setAttribute('class', 'offline-status');
   Hdiv.innerHTML = 'Vous n\'&ecirc;tes pas connect&eacute;';
Paneldiv.appendChild(Hdiv);
               

var Vdiv = document.createElement("div");
Vdiv.setAttribute('id', 'view-wrapper');
   var Cdiv = document.createElement("div");
   Cdiv.setAttribute('class', 'chat-container');            
      var MLdiv = document.createElement("div");
      MLdiv.setAttribute('id', 'messListCont');
      MLdiv.setAttribute('tabindex', '1000');
      MLdiv.setAttribute('class', 'message-list-container smooth-scroll focus-el');   

// Old options pos  
      
         var MOdiv = document.createElement("div");
         MOdiv.setAttribute('id', 'chatModalDiv');
         MOdiv.setAttribute('onclick', 'closeAll();');   
      MLdiv.appendChild(MOdiv);
         var MLIdiv = document.createElement("div");
         MLIdiv.setAttribute('id', 'messagesList');
         //*******************  LISTE  **************************
      MLdiv.appendChild(MLIdiv);         
   Cdiv.appendChild(MLdiv);
      var Tdiv = document.createElement("div");
      Tdiv.setAttribute('class', 'typing');
         var TCdiv = document.createElement("div");
         TCdiv.setAttribute('id', 'typing-container');
            var Pdiv = document.createElement("div");
            Pdiv.setAttribute('id', 'presence-container');
               var PSdiv = document.createElement("div");
               PSdiv.setAttribute('class', 'presence-summary');
               //<!-- 1 personne sur cette page (de 1 sur ce site)// -->  
            Pdiv.appendChild(PSdiv);
         TCdiv.appendChild(Pdiv);

            var Rdiv = document.createElement("div");
            Rdiv.setAttribute('id', 'respond-container');
               var Cspa = document.createElement("span");   
               Cspa.setAttribute('class', 'btn-close');
               Cspa.setAttribute('onclick', 'closeRespond();');
			   Cspa.innerHTML = 'X';
			 Rdiv.appendChild(Cspa);
               var Uspa = document.createElement("span");   
               Uspa.setAttribute('id', 'messToRespond');
			   Uspa.setAttribute('class', 'reponseMess');
			 Rdiv.appendChild(Uspa);
//<div id="respond-container" style="display: block;" onclick="closeRespond();"><span class="btn-close">x</span><span id="respondToMess">Réponse à Charles<br>message 6</span></div>
			
         TCdiv.appendChild(Rdiv);
		 
      Tdiv.appendChild(TCdiv);
   Cdiv.appendChild(Tdiv);
   
	  var COdiv = document.createElement("div");
	  COdiv.setAttribute('class', 'compose-container');
	  COdiv.setAttribute('style', 'background-color: rgb(57, 170, 0)');
	  var Pdiv = document.createElement("div");
	  Pdiv.setAttribute('id', 'picker-container');
	  Pdiv.setAttribute('class', 'rc-picker-container');
	  COdiv.appendChild(Pdiv);
		 var Cform = document.createElement("form");
		 Cform.setAttribute('action', '');
		 Cform.setAttribute('id', 'chatForm');
			var Idiv = document.createElement("div");
			Idiv.setAttribute('class', 'input-container');
			   var PBdiv = document.createElement("div");
			   PBdiv.setAttribute('class', 'picker-btn-container');
				  var oBut = document.createElement("button");   
				  oBut.setAttribute('title', 'Emoticon');
				  oBut.setAttribute('class', 'btn hoverable-btn');
				  //oBut.setAttribute('onclick', 'buildEmoList(); return false;');
				  oBut.setAttribute('onclick', 'showEmojObj(); return false;');
				  oBut.setAttribute('tabindex', '1001');
					 var Uspa = document.createElement("span");   
					 Uspa.setAttribute('class', 'focus-cont');
						var svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');   
						svg1.setAttribute('viewBox', '0 0 24 24');
						svg1.setAttribute('svg-inline', '""');
						svg1.setAttribute('role', 'presentation');
						svg1.setAttribute('focusable', 'false');
						svg1.setAttribute('style', 'width: 24px; height: 24px;');
						   var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
						   path1.setAttribute('d', 'M12 17.5c2.33 0 4.3-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5M8.5 11A1.5 1.5 0 0010 9.5 1.5 1.5 0 008.5 8 1.5 1.5 0 007 9.5 1.5 1.5 0 008.5 11m7 0A1.5 1.5 0 0017 9.5 1.5 1.5 0 0015.5 8 1.5 1.5 0 0014 9.5a1.5 1.5 0 001.5 1.5M12 20a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8m0-18C6.47 2 2 6.5 2 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z');
						svg1.appendChild(path1);
					 Uspa.appendChild(svg1);
				  oBut.appendChild(Uspa);               
			   PBdiv.appendChild(oBut);   
			Idiv.appendChild(PBdiv);   
	/*
			   var PBdiv2 = document.createElement("div");
			   PBdiv2.setAttribute('class', 'picker-btn-container');
			Idiv.appendChild(PBdiv2);
	*/            
			   var IAdiv = document.createElement("div");
			   IAdiv.setAttribute('class', 'input-area-container');
				  var TAdiv = document.createElement("textarea");
				  TAdiv.setAttribute('id', 'textContent');
				  TAdiv.setAttribute('tabindex', '1003');
				  TAdiv.setAttribute('keydown', 'process(event, this.form)');
				  TAdiv.setAttribute('rows', '1');
				  TAdiv.setAttribute('placeholder', 'Saisir un message');
				  TAdiv.setAttribute('class', 'input-area focus-cont');
				  TAdiv.setAttribute('style', 'color: rgb(255, 255, 255); background-color: rgb(57, 170, 0); caret-color: rgb(255, 255, 255);');
			   IAdiv.appendChild(TAdiv);   
			Idiv.appendChild(IAdiv);

			   var PBdiv = document.createElement("div");
			   PBdiv.setAttribute('class', 'post-btn-container');
					var oCnt = document.createElement("div");
					oCnt.setAttribute('id', 'textCount');
					oCnt.setAttribute('class', 'chars-counter');
					PBdiv.appendChild(oCnt);
				  var oBut = document.createElement("button");   
				  oBut.setAttribute('title', 'Publier');
				  oBut.setAttribute('class', 'btn post-btn hoverable-btn');
				  oBut.setAttribute('tabindex', '1004');
				  oBut.setAttribute('onclick', 'sendMess(this.form); return false;');
					 var Uspa = document.createElement("span");   
					 Uspa.setAttribute('class', 'focus-cont');
						var svg1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');   
						svg1.setAttribute('viewBox', '0 0 24 24');
						svg1.setAttribute('svg-inline', '""');
						svg1.setAttribute('role', 'presentation');
						svg1.setAttribute('focusable', 'false');
						svg1.setAttribute('style', 'width: 24px; height: 24px;');
						   var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
						   path1.setAttribute('d', 'M2,21L23,12L2,3V10L17,12L2,14V21Z');
						svg1.appendChild(path1);
					 Uspa.appendChild(svg1);
				  oBut.appendChild(Uspa);               
			   PBdiv.appendChild(oBut);   
			Idiv.appendChild(PBdiv);
		 
		 Cform.appendChild(Idiv);
	  COdiv.appendChild(Cform);   
	Cdiv.appendChild(COdiv);    
   
   
Vdiv.appendChild(Cdiv); 
Paneldiv.appendChild(Vdiv);  



var oChat = document.createElement("div");   
oChat.setAttribute('id', 'chatObject');  
oChat.appendChild(Paneldiv)          

return oChat;
}

function buildOptLstBut(butArr){
var lbut = document.getElementById('optionsListButton');
var tit, onc, inn;
remChilds(lbut);
for(var i in butArr){
	opt = butArr[i];
	switch (opt)
		{
		   case "R":
				tit = "Répondre à ce message";
				onc = "resMessItem(this, opt);"; 
				inn = "R&eacute;pondre";
			   break;
		   case "D":
				tit = "Supprimer ce message";
				onc = "modMessItem(this, opt);"; 
				inn = "Supprimer";
			   break;
		   case "A":
				tit = "Réafficher ce message";
				onc = "modMessItem(this, opt);"; 
				inn = "R&eacute;afficher";
			   break;
/*
		   default:
			   alert('Default case');
			   break;
*/
		}
	
	   var li1 = document.createElement("li");
	   li1.setAttribute('tabindex', '13');
		  var Cbut = document.createElement("button");
		  Cbut.setAttribute('title', tit);   
		  Cbut.setAttribute('class', 'focus-cont');
		  Cbut.setAttribute('onclick', onc);
			 var spa = document.createElement("span");   
			 spa.innerHTML = inn;
			 Cbut.appendChild(spa);
		  li1.appendChild(Cbut);
	   lbut.appendChild(li1);
}	

}

function showEmojObj(){

if (!window.emojWidgetObj)
	new objEmojPicker("picker-container", chatForm.textContent);

window.emojWidgetObj.show();	
}


/*  Émoji functions */

/*
const emoSmilyList = [["&#x1F642", "Visage légèrement souriant"], ["&#x1F600", "Visage rieur"], ["&#x1F603", "Visage souriant avec de grands yeux"], ["&#x1F604", "Visage souriant, bouche ouverte et yeux souriants"], ["&#x1F601", "Visage rayonnant aux yeux souriants"], ["&#x1F605", "Visage souriant, bouche ouverte et transpiration"], ["&#x1F606", "Visage souriant, bouche ouverte et yeux fermés"], ["&#x1F923", "Visage roulant sur le sol en riant"], ["&#x1F602", "Visage avec larmes de joie"], ["&#x1F643", "Visage renversé"], ["&#x1F609", "Visage clin d'oeil"], ["&#x1F60A", "Visage souriant, yeux fermés"], ["&#x1F607", "Smiling face with halo"], ["&#x1F60E", "Visage souriant, lunette de soleil"], ["&#x1F913", "Visage de niais"], ["&#x1F9D0", "Visage avec monocle"], ["&#x1F973", "Visage avec corne et chapeau de fête"], ["&#x1F970", "Visage souriant avec des yeux souriants et trois coeurs"], ["&#x1F60D", "Visage souriant, yeux en coeur"], ["&#x1F929", "Visage avec des étoiles à la place des yeux"], ["&#x1F618", "Visage qui lance un bisou"], ["&#x1F617", "Visage faisant un bisou"], ["&#x1F61A", "Visage faisant un bisou et yeux fermés"], ["&#x1F619", "Visage faisant un bisou et yeux souriants"], ["&#x1F972", "Visage souriant avec une larme"], ["&#x1F60B", "Visage savourant de la bonne cuisine"], ["&#x1F61B", "Visage langue tirée"], ["&#x1F61C", "Visage langue tirée et clin d'oeil"], ["&#x1F92A", "Visage souriant avec un grand et un petit oeil"], ["&#x1F61D", "Visage langue tirée et yeux bien fermés"], ["&#x1F911", "Visage avec bouche d'argent"], ["&#x1F917", "Visage étreignant"], ["&#x1F92D", "Face with hand in mouth"], ["&#x1F92B", "Visage avec les doigts couvrant les lèvres fermées"], ["&#x1F914", "Visage pensant"], ["&#x1F610", "Visage neutre"], ["&#x1F910", "Visage avec bouche à glissière"], ["&#x1F928", "Visage avec un sourcil levé"], ["&#x1F611", "Visage inexpressif"], ["&#x1F636", "Visage sans bouche"], ["&#x1F60F", "Visage souriant d'un air satisfait"], ["&#x1F612", "Visage renfrogné"], ["&#x1F644", ">Visage avec les yeux qui roulent"], ["&#x1F62C", "Visage grimaçant"], ["&#x1F62E", "Visage bouche ouverte"], ["&#x1F925", "Visage avec un long nez"], ["&#x1F62A", "Visage somnolent"], ["&#x1F634", "Visage qui dort"], ["&#x1F60C", "Visage soulagé"], ["&#x1F614", "Visage pensif"], ["&#x1F924", "Visage bavant"], ["&#x1F637", "Visage avec masque médical"], ["&#x1F912", "Visage avec thermomètre"], ["&#x1F915", "Visage avec bandeau"], ["&#x1F922", "Visage nauséeux"], ["&#x1F92E", "Visage avec vomissement la bouche ouverte"], ["&#x1F927", "Visage éternuement"], ["&#x1F975", "Visage surchauffé"], ["&#x1F976", "Visage gelé"], ["&#x1F974", "Visage avec des yeux inégaux et la bouche ondulée"], ["&#x1F635", "Visage étourdi"], ["&#x1F92F", "Visage choqué avec la tête qui explose"], ["&#x1F615", "Visage confus"], ["&#x1F61F", "Visage inquiet"], ["&#x1F641", "Visage légèrement renfrogné"], ["&#x2639", "Visage blanc grimassant"], ["&#x1F62E", "Visage bouche ouverte"], ["&#x1F62F", "Visage feutré"], ["&#x1F632", "Visage étonné"], ["&#x1F633", "Visage rougissant"], ["&#x1F97A", "Visage avec les yeux suppliants"], ["&#x1F626", "Visage renfrogné avec la bouche ouverte"], ["&#x1F627", "Visage angoissé"], ["&#x1F628", "Visage craintif"], ["&#x1F630", "Visage bouche ouverte et goutte de sueur froide"], ["&#x1F625", "Visage déçu mais faisant face"], ["&#x1F622", "Visage pleurant"], ["&#x1F62D", "Visage pleurant à pleine larme"], ["&#x1F631", "Visage criant de peur"], ["&#x1F616", "Visage déconcerté"], ["&#x1F623", "Visage persévérant"], ["&#x1F61E", "Visage déçu"], ["&#x1F613", "Visage avec sueur froide"], ["&#x1F629", "Visage las"], ["&#x1F62B", "Visage fatigué"], ["&#x1F971", "Bâillement"], ["&#x1F624", "Visage avec la vapeur qui sort du nez"], ["&#x1F621", "Visage furieux"], ["&#x1F620", "Visage en colère"], ["&#x1F92C", "Visage qui dit des gros mots"], ["&#x1F608", "Visage souriant diabolique"], ["&#x1F47F", "Visage diabolique en colère"], ["&#x1F480", "Tête de mort"], ["&#x1F4A9", "Excrément"], ["&#x1F921", "Clown"], ["&#x1F479", "Masque de monstre"], ["&#x1F47A", "Tengu"], ["&#x1F47B", "Fantôme"], ["&#x1F47D", "Alien"], ["&#x1F47E", "Alien pixelisé"], ["&#x1F916", "Robot"]];

const  emoHandList = [["&#x1F44D", "Pouce levé"],  ["&#x1F44E", "Pouce baissé"], ["&#x1F44B", "Salut de la main"],  ["&#x1F91A", "Dos de la main levée"],  ["&#x1F590", "Main levée doigts écartés"],  ["&#x270B", "Main levée"],  ["&#x1F596", "Salut vulcain"],  ["&#x1F44C", "Ok"],  ["&#x1F90C", "Doigts pincés vers le haut"],  ["&#x1F90F", "Main qui pince"],  ["&#x270C", "Doigts en V"],  ["&#x1F91E", "Doigts croisés"],  ["&#x1F91F", "Main qui veut dire je t'aime"],  ["&#x1F918", "Cornes du diable"],  ["&#x1F919", "Appel téléphonique avec la main"],  ["&#x1F448", "Index pointant vers la gauche"],  ["&#x1F449", "Index pointant vers la droite"],  ["&#x1F446", "Index pointant vers le haut"],  ["&#x1F447", "Index pointant vers le bas"],  ["&#x1F595", "Doigt d'honneur"],  ["&#x261D", "Paume de la main avec index vers le haut"], ["&#x270A", "Poing levé"],  ["&#x1F44A", "Coup de poing"],  ["&#x1F91B", "Poing serré vers la gauche"],  ["&#x1F91C", "Poing serré vers la droite"],  ["&#x1F44F", "Applaudir"],  ["&#x1F64C", "Mains levées"],  ["&#x1F450", "Paumes ouvertes"],  ["&#x1F932", "Paumes de mains côte à côte"],  ["&#x1F91D", "Poignée de main"],  ["&#x1F64F", "Prière"],  ["&#x270D", "Main qui écrit"],  ["&#x1F485", "Vernis à ongle"],  ["&#x1F933", "Selfie"]];

const emoActiList = [["&#x1F383", "Citrouille"], ["&#x1F384", "Arbre de noël"], ["&#x1F386", "Feu d'artifice"], ["&#x1F387", "Cierge magique"], ["&#x1F9E8", "Pétard"], ["&#x2728", "Étincelles"], ["&#x1F388", "Balon de baudruche"], ["&#x1F389", "Cotillons"], ["&#x1F38A", "Confettis"], ["&#x1F38B", "Arbre à voeux"], ["&#x1F38D", "Bambou décoratif"], ["&#x1F38E", "Poupées japonaises"], ["&#x1F38F", "Koinibori"], ["&#x1F391", "Cérémonie de la lune"], ["&#x1F9E7", "Enveloppe rouge"], ["&#x1F380", "Ruban"], ["&#x1F381", "Cadeau"], ["&#x1F397", "Ruban de mémoire"], ["&#x1F39F", "Billet d'entrée"], ["&#x1F3AB", "Billet"], ["", ""], ["&#x1F396", "Médaille militaire"], ["&#x1F3C6", "Trophée"], ["&#x1F3C5", "Médaille sportive"], ["&#x1F947", "Médaille d'or - première place"], ["&#x1F948", "Médaille d'argent - seconde place"], ["&#x1F949", "Médaille de bronze - troisième place"], ["&#x26BD", "Ballon de football"], ["&#x26BE", "Baseball"], ["&#x1F94E", "Softball"], ["&#x1F3C0", "Basketball"], ["&#x1F3D0", "Volleyball"], ["&#x1F3C8", "Football américain"], ["&#x1F3C9", "Rugby"], ["&#x1F3BE", "Tennis"], ["&#x1F94F", "Disque volant"], ["&#x1F3B3", "Bowling"], ["&#x1F3CF", "Cricket"], ["&#x1F3D1", "Hockey sur gazon"], ["&#x1F3D2", "Hockey sur glace"], ["&#x1F94D", "Crosse"], ["&#x1F3D3", "Ping pong"], ["&#x1F3F8", "Badminton"], ["&#x1F94A", "Gant de boxe"], ["&#x1F94B", "Tenue d'Arts Martiaux"], ["&#x1F945", "Cage"], ["&#x26F3", "Drapeau de golf"], ["&#x26F8", "Patin à glace"], ["&#x1F3A3", "Câne à pêche"], ["&#x1F93F", "Masque de plongée"], ["&#x1F3BD", "Maillot de course"], ["&#x1F3BF", "Skis"], ["&#x1F6F7", "Luge"], ["&#x1F94C", "Pierre de curling"], ["&#x1F3AF", "Dans le mille"], ["&#x1FA80", "Yo-yo"], ["&#x1FA81", "Cerf-volant"], ["&#x1F3B1", "8Boule de billard"], ["&#x1F52E", "Boule de cristal"], ["&#x1FA84", "Baguette magique"], ["&#x1F9FF", "Mauvais oeil"], ["&#x1F3AE", "Jeu vidéo"], ["&#x1F579", "Joystick"], ["&#x1F3B0", "Machine à sous"], ["&#x1F3B2", "Dé"], ["&#x1F9E9", "Pièce de puzzle"], ["&#x1F9F8", "Ours en peluche"]];

const emoFoodList = [["&#x1F347", "Raisin"], ["&#x1F348", "Melon"], ["&#x1F349", "Pastèque"], ["&#x1F34A", "Mandarine"], ["&#x1F34B", "Citron"], ["&#x1F34C", "Banane"], ["&#x1F34D", "Ananas"], ["&#x1F96D", "Mangue"], ["&#x1F34E", "Pomme rouge"], ["&#x1F34F", "Pomme verte"], ["&#x1F350", "Poire"], ["&#x1F351", "Pêche"], ["&#x1F352", "Cerises"], ["&#x1F353", "Fraise"], ["&#x1FAD0", "Myrtilles"], ["&#x1F95D", "Kiwi"], ["&#x1F345", "Tomate"], ["&#x1FAD2", "Olive"], ["&#x1F965", "Noix de coco"], ["&#x1F951", "Avocat"], ["&#x1F346", "Aubergine"], ["&#x1F954", "Pomme de terre"], ["&#x1F955", "Carrote"], ["&#x1F33D", "Maïs"], ["&#x1F336", "Piment"], ["&#x1FAD1", "Poivron"], ["&#x1F952", "Concombre"], ["&#x1F96C", "Légume à feuilles vertes"], ["&#x1F966", "Broccoli"], ["&#x1F9C4", "Ail"], ["&#x1F9C5", "Oignon"], ["&#x1F344", "Champignon"], ["&#x1F95C", "Cacahuète"], ["&#x1FAD8", "Haricot"], ["&#x1F330", "Châtaigne"], ["&#x1F35E", "Pain"], ["&#x1F950", "Croissant"], ["&#x1F956", "Baguette"], ["&#x1FAD3", "Galette"], ["&#x1F968", "Bretzel"], ["&#x1F96F", "Bagel"], ["&#x1F95E", "Pancakes"], ["&#x1F9C7", "Gauffre"], ["&#x1F9C0", "Part de fromage"], ["&#x1F356", "Viande sur un os"], ["&#x1F357", "Cuisse de poulet"], ["&#x1F969", "Morceau de viande"], ["&#x1F953", "Lard"], ["&#x1F354", "Hamburger"], ["&#x1F35F", "Frites"], ["&#x1F355", "Pizza"], ["&#x1F32D", "Hot dog"], ["&#x1F96A", "Sandwich"], ["&#x1F32E", "Taco"], ["&#x1F32F", "Burrito"], ["&#x1F959", "Kebab"], ["&#x1F9C6", "Falafel"], ["&#x1F95A", "Oeuf"], ["&#x1F373", "Oeuf au plat"], ["&#x1F958", "Plat mitonné"], ["&#x1F372", "Marmite"], ["&#x1FAD5", "Fondue"], ["&#x1F963", "Bol avec cuillère"], ["&#x1F957", "Salade"], ["&#x1F37F", "Popcorn"], ["&#x1F9C8", "Beurre"], ["&#x1F9C2", "Sel"], ["&#x1F96B", "Aliments en conserve"], ["&#x1F371", "Boîte déjeuner"], ["&#x1F358", "Galette de riz"], ["&#x1F359", "Boulette de riz"], ["&#x1F35A", "Bol de riz"], ["&#x1F35B", "Riz au curry"], ["&#x1F35C", "Bol fumant"], ["&#x1F35D", "Spaghetti"], ["&#x1F360", "Patate douce"], ["&#x1F362", "Brochette de poisson"], ["&#x1F363", "Sushi"], ["&#x1F364", "Beignet de crevette"], ["&#x1F365", "Croquette de poisson"], ["&#x1F96E", "Gâteau de lune"], ["&#x1F361", "Brochette de bonbons"], ["&#x1F95F", "Boulette de pâte"], ["&#x1F960", "Biscuit chinois"], ["&#x1F961", "Boîte à emporter"], ["&#x1F980", "Crabe"], ["&#x1F99E", "Homard"], ["&#x1F990", "Crevette"], ["&#x1F991", "Calamar"], ["&#x1F9AA", "Huître"], ["&#x1F368", "Crème glacée"], ["&#x1F367", "Granité"], ["&#x1F366", "Glace italienne"], ["&#x1F369", "Doughnut"], ["&#x1F36A", "Cookie"], ["&#x1F382", "Gâteau d'anniversaire"], ["&#x1F370", "Gâteau sablé"], ["&#x1F9C1", "Cupcake"], ["&#x1F967", "Tarte"], ["&#x1F36B", "Chocolat"], ["&#x1F36C", "Bonbon"], ["&#x1F36D", "Sucette"], ["&#x1F36E", "Crème renversée"], ["&#x1F36F", "Pot de miel"], ["&#x1F37C", "Biberon"], ["&#x1F95B", "Verre de lait"], ["&#x2615", "Boisson chaude"], ["&#x1FAD6", "Théière"], ["&#x1F375", "Tasse"], ["&#x1F376", "Saké"], ["&#x1F37E", "Bouteille de champagne"], ["&#x1F377", "Verre de vin"], ["&#x1F378", "Cocktail"], ["&#x1F379", "Cocktail tropical"], ["&#x1F37A", "Chope"], ["&#x1F37B", "Chopes de bière"], ["&#x1F942", "Trinquer"], ["&#x1F943", "Verre trumbler"], ["&#x1F964", "Gobelet avec paille"], ["&#x1F9CB", "Thé aux perles"], ["&#x1F9C3", "Briquette de jus"], ["&#x1F9C9", "Maté"], ["&#x1F9CA", "Glaçon"], ["&#x1F962", "Baguettes"], ["&#x1F37D", "Fourchette et couteau avec assiette"], ["&#x1F374", "Fourchette et couteau"], ["&#x1F944", "Cuillère"], ["&#x1F52A", "Couteau de cuisine"], ["&#x1FAD9", "Jar"], ["&#x1F3FA", "Amphora"]];

const emoAnimList = [["&#x1F435", "Tête de singe"], ["&#x1F412", "Singe"], ["&#x1F98D", "Gorille"], ["&#x1F9A7", "Orangoutan"], ["&#x1F436", "Tête de chien"], ["&#x1F415", "Chien"], ["&#x1F9AE", "Chien guide"], ["&#x1F415", "Chien d'assistance"], ["&#x1F429", "Caniche"], ["&#x1F43A", "Loup"], ["&#x1F98A", "Renard"], ["&#x1F99D", "Raton laveur"], ["&#x1F431", "Tête de chat"], ["&#x1F408", "Chat"], ["&#x1F981", "Lion"], ["&#x1F42F", "Tête de tigre"], ["&#x1F405", "Tigre"], ["&#x1F406", "Léopard"], ["&#x1F434", "Tête de cheval"], ["&#x1F40E", "Cheval"], ["&#x1F984", "Licorne"], ["&#x1F993", "Zèbre"], ["&#x1F98C", "Cerf"], ["&#x1F9AC", "Bison"], ["&#x1F42E", "Tête de vache"], ["&#x1F404", "Vache"], ["&#x1F402", "Boeuf"], ["&#x1F437", "Buffle"], ["&#x1F437", "Tête de cochon"], ["&#x1F416", "Cochon"], ["&#x1F417", "Sanglier"], ["&#x1F43D", "Groin"], ["&#x1F40F", "Bélier"], ["&#x1F411", "Mouton"], ["&#x1F410", "Chèvre"], ["&#x1F42A", "Dromadaire"], ["&#x1F42B", "Chameau"], ["&#x1F999", "Lama"], ["&#x1F992", "Girafe"], ["&#x1F418", "Eléphant"], ["&#x1F9A3", "Mammouth"], ["&#x1F98F", "Rhinocéros"], ["&#x1F99B", "Hippopotame"], ["&#x1F42D", "Tête de souris"], ["&#x1F401", "Souris"], ["&#x1F400", "Rat"], ["&#x1F439", "Hamster"], ["&#x1F430", "Tête de lapin"], ["&#x1F407", "Lapin"], ["&#x1F43F", "Ecureuil"], ["&#x1F9AB", "Castor"], ["&#x1F994", "Hérisson"], ["&#x1F987", "Chauve-souris"], ["&#x1F43B", "Ours"], ["&#x1F428", "Koala"], ["&#x1F43C", "Panda"], ["&#x1F9A5", "Paresseux"], ["&#x1F9A6", "Loutre"], ["&#x1F9A8", "Moufette"], ["&#x1F998", "Kangourou"], ["&#x1F9A1", "Blaireau"], ["&#x1F43E", "Empreintes d'animaux"], ["&#x1F983", "Dindon"], ["&#x1F414", "Poule"], ["&#x1F413", "Coq"], ["&#x1F423", "Poussin qui éclôt"], ["&#x1F424", "Poussin"], ["&#x1F425", "Poussin de face"], ["&#x1F426", "Oiseau"], ["&#x1F427", "Pingouin"], ["&#x1F54A", "Colombe"], ["&#x1F985", "Aigle"], ["&#x1F986", "Canard"], ["&#x1F9A2", "Cygne"], ["&#x1F989", "Chouette"], ["&#x1FAB6", "Plume"], ["&#x1F9A9", "Flamant rose"], ["&#x1F99C", "Perroquet"], ["&#x1F438", "Grenouille"], ["&#x1F40A", "Crocodile"], ["&#x1F422", "Tortue"], ["&#x1F98E", "Lézard"], ["&#x1F40D", "Serpent"], ["&#x1F432", "Tête de dragon"], ["&#x1F409", "Dragon"], ["&#x1F995", "Sauropode"], ["&#x1F996", "Tyranosaure"], ["&#x1F433", "Baleine soufflant par son évent"], ["&#x1F40B", "Baleine"], ["&#x1F42C", "Dauphin"], ["&#x1F41F", "Poisson"], ["&#x1F420", "Poisson tropical"], ["&#x1F421", "Poisson-lune"], ["&#x1F988", "Requin"], ["&#x1F419", "Pieuvre"], ["&#x1F41A", "Coquille en spirale"], ["&#x1F98B", "Papillon"], ["&#x1F41B", "Chenille"], ["&#x1F41C", "Fourmille"], ["&#x1F41D", "Abeille"], ["&#x1FAB2", "Scarabée"], ["&#x1F41E", "Coccinelle"], ["&#x1F997", "Criquet"], ["&#x1FAB3", "Cafard"],["&#x1F40C", "Escargot"], ["&#x1F577", "Araignée"], ["&#x1F578", "Toile d'araignée"], ["&#x1F982", "Scorpion"], ["&#x1F99F", "Moustique"], ["&#x1FAB0", "Mouche"], ["&#x1FAB1", "Ver de terre"], ["&#x1F9A0", "Microbe"], ["&#x1F490", "Bouquet"], ["&#x1F338", "Fleur de cerisier"], ["&#x1F4AE", "Fleur blanche"], ["&#x1F3F5", "Rosette"], ["&#x1F339", "Rose"], ["&#x1F940", "Fleur fanée"], ["&#x1F33A", "Hibiscus"], ["&#x1F33B", "Tournesol"], ["&#x1F33C", "Bourgeon"], ["&#x1F337", "Tulipe"], ["&#x1F331", "Jeune pousse"], ["&#x1FAB4", "Plante en pot"], ["&#x1F332", "Conifère"], ["&#x1F333", "Arbre à feuilles caduques"], ["&#x1F334", "Palmier"], ["&#x1F335", "Cactus"], ["&#x1F33E", "Plant de riz"], ["&#x1F33F", "Feuille"], ["&#x2618", "Trèfle"], ["&#x1F340", "Trèfle à quatre feuilles"], ["&#x1F341", "Feuille d'érable"], ["&#x1F342", "Feuille morte"], ["&#x1F343", "Feuille virevoltante"], ["&#x1FAB9", "Plante en pot"], ["&#x1FABA", "Nid avec oeufs"]];

const emoLists = [ [emoSmilyList, "&#x1F642", "Smileys"], [emoHandList, "&#x1F44D", "Mains"], [emoActiList, "&#x1F3D2", "Activites"], [emoFoodList, "&#x1F352", "Nourriture et boissons"], [emoAnimList, "&#x1F434", "Animaux et nature"], [[], "&#x1F50D;","Recherche"]];

function trouv(exp){
  res = [];
  for(var j = 0; j < emoLists.length; j++) {
	  eli = emoLists[j][0];
	  for(var i in eli){
		if(eli[i][1].toUpperCase().indexOf(exp.toUpperCase()) > -1){
		  res.push(eli[i]);
		}
	  }
  }
  return res;
}

function searhEmoji(oFrm){
if (textSearhEmo.value.length > 2){
	emoLists[emoLists.length-1][0] = [];
	emoLists[emoLists.length-1][0] = trouv(textSearhEmo.value);
	buildEmoList(emoLists.length-1, emoLists[emoLists.length-1][0]);
}}

function closeSearchEmo (){
var sCont = document.getElementById("searchEmoContainer");
sCont.style.display = "none";
}

function showSearchEmo(oBut, emoCatId){
var sCont = document.getElementById("searchEmoContainer")
if (!sCont){
	var catCont = document.getElementById("emoCatContainer")
	sCont = document.createElement("div");	
	sCont.setAttribute('id', 'searchEmoContainer');
	   var Cspa = document.createElement("span");   
	   Cspa.setAttribute('class', 'btn-close');
	   Cspa.setAttribute('onclick', 'closeSearchEmo();');
	   Cspa.innerHTML = 'X';	
	sCont.appendChild(Cspa);	
	var tfm = document.createElement("form");	
	tfm.setAttribute('action', '');
	var tin = document.createElement("input");	
	tin.setAttribute('id', 'textSearhEmo' );
	tin.setAttribute('class', 'input-search' );
	tin.setAttribute('type', 'text' );
	tin.setAttribute('placeholder', 'Recherche?' );
	tin.setAttribute('onkeyup', 'searhEmoji()' );

	tfm.appendChild(tin);
	sCont.appendChild(tfm);

	catCont.appendChild(sCont);
}
sCont.style.display = "block";
selectEmoCat(oBut, emoCatId);
}

function addEmo(ve){

var tli = document.createElement("li");	
tli.setAttribute('class', 'emoLi');
tli.setAttribute('onclick', 'selectEmoj(this)');
tli.setAttribute('title', ve[1]);
tli.innerHTML = ve[0];
return tli;
}

function buildEmoList(emoCatId, iconList){
modLayer.style.display = "block";
if (emoCatId >= 0){
	remChilds(false, document.getElementById("emoList"));
	//iconList = ;
}else{
	if (document.getElementById("emoCatContainer")){
		if (oListEmo.style.display == "none")
			oListEmo.style.display = "block";
		else
			closeAll();
		return false;
	}else{
	iconList = emoLists[0][0];
	buildEmoCatList();
	}
}
var tul = document.createElement("ul");	
tul.setAttribute('id', 'emoList');

for(var i = 0; i < iconList.length; i++) {
	tul.appendChild(addEmo(iconList[i]));
}
oListEmo.appendChild(tul);
oListEmo.style.display = "block";
return false;
}

function selectEmoj(oLi){
modLayer.style.display = "none";
var emo = oLi.innerHTML;
var oTa = chatForm.textContent;
var pos = oTa.selectionStart;
if (pos){
	var	act = oTa.value;
	var aftAct = act.substring(pos);
	var befAct = act.substring(0,pos);
	oTa.value = befAct + emo + aftAct;
}else
	oTa.value = emo;

oTa.scrollTop = oTa.scrollHeight;
}

var lastEmoCat;
function selectEmoCat(oBut, emoCatId){

if (lastEmoCat)
	lastEmoCat.style.borderBottom = "3px solid rgb(255, 255, 255)";

oBut.style.borderBottom = "3px solid rgb(57, 170, 0)";
//oBut.classList.add('notSelected');
lastEmoCat = oBut;
if (emoCatId < emoLists.length-1)
	buildEmoList(emoCatId, emoLists[emoCatId][0]);
}


function buildEmoCatList(){

var cdiv = document.createElement("div");	
cdiv.setAttribute('id', 'emoCatContainer');
var tul = document.createElement("ul");	
tul.setAttribute('id', 'emoCatList');

for(var j = 0; j < emoLists.length - 1; j++) {
	var tli = document.createElement("li");	
	var tbut = document.createElement("button");	
	tbut.setAttribute('title', emoLists[j][2] );
	tbut.setAttribute('onclick', 'selectEmoCat(this,' + j + ' ); return false;');
	tbut.innerHTML = emoLists[j][1] ;
	lastEmoCat = tbut;
	tli.appendChild(tbut);
	tul.appendChild(tli);	
}
var tli = document.createElement("li");	
var tbut = document.createElement("button");	
tbut.setAttribute('title', emoLists[5][2] );
tbut.setAttribute('onclick', 'showSearchEmo(this,' + (emoLists.length-1) + ');');
tbut.innerHTML = emoLists[5][1] ;
tli.appendChild(tbut);
tul.appendChild(tli);

cdiv.appendChild(tul);
oListEmo.appendChild(cdiv);
}
*/
// FIN emoji functions



// Class emoji
class objEmojPicker {
	#lastEmoCat;
	#oTa;
	#sCont;
	#emoList;
	#catCont;
	#recentEmoj;
	#textSearhEmo;
  constructor(oListEmo, oTa) {
	  window.emojWidgetObj = this;
	if (typeof oListEmo == "object")
		this.oListEmo = oListEmo;
	else
		this.oListEmo = document.getElementById(oListEmo);
	this.#oTa = oTa;
	this.#sCont = null;
	this.#lastEmoCat = null;
	this.#textSearhEmo = null;
	this.#emoList = null;
	this.#catCont = null;
	this.#recentEmoj = [];
	
	var Remo = localStorage.getItem("recentEmoj");
	if (Remo)
		this.#recentEmoj = JSON.parse(Remo);
	
	const emoSmilyList = [["&#x1F642", "Visage légèrement souriant"], ["&#x1F600", "Visage rieur"], ["&#x1F603", "Visage souriant avec de grands yeux"], ["&#x1F604", "Visage souriant, bouche ouverte et yeux souriants"], ["&#x1F601", "Visage rayonnant aux yeux souriants"], ["&#x1F605", "Visage souriant, bouche ouverte et transpiration"], ["&#x1F606", "Visage souriant, bouche ouverte et yeux fermés"], ["&#x1F923", "Visage roulant sur le sol en riant"], ["&#x1F602", "Visage avec larmes de joie"], ["&#x1F643", "Visage renversé"], ["&#x1F609", "Visage clin d'oeil"], ["&#x1F60A", "Visage souriant, yeux fermés"], ["&#x1F607", "Smiling face with halo"], ["&#x1F60E", "Visage souriant, lunette de soleil"], ["&#x1F913", "Visage de niais"], ["&#x1F9D0", "Visage avec monocle"], ["&#x1F973", "Visage avec corne et chapeau de fête"], ["&#x1F970", "Visage souriant avec des yeux souriants et trois coeurs"], ["&#x1F60D", "Visage souriant, yeux en coeur"], ["&#x1F929", "Visage avec des étoiles à la place des yeux"], ["&#x1F618", "Visage qui lance un bisou"], ["&#x1F617", "Visage faisant un bisou"], ["&#x1F61A", "Visage faisant un bisou et yeux fermés"], ["&#x1F619", "Visage faisant un bisou et yeux souriants"], ["&#x1F972", "Visage souriant avec une larme"], ["&#x1F60B", "Visage savourant de la bonne cuisine"], ["&#x1F61B", "Visage langue tirée"], ["&#x1F61C", "Visage langue tirée et clin d'oeil"], ["&#x1F92A", "Visage souriant avec un grand et un petit oeil"], ["&#x1F61D", "Visage langue tirée et yeux bien fermés"], ["&#x1F911", "Visage avec bouche d'argent"], ["&#x1F917", "Visage étreignant"], ["&#x1F92D", "Face with hand in mouth"], ["&#x1F92B", "Visage avec les doigts couvrant les lèvres fermées"], ["&#x1F914", "Visage pensant"], ["&#x1F610", "Visage neutre"], ["&#x1F910", "Visage avec bouche à glissière"], ["&#x1F928", "Visage avec un sourcil levé"], ["&#x1F611", "Visage inexpressif"], ["&#x1F636", "Visage sans bouche"], ["&#x1F60F", "Visage souriant d'un air satisfait"], ["&#x1F612", "Visage renfrogné"], ["&#x1F644", ">Visage avec les yeux qui roulent"], ["&#x1F62C", "Visage grimaçant"], ["&#x1F62E", "Visage bouche ouverte"], ["&#x1F925", "Visage avec un long nez"], ["&#x1F62A", "Visage somnolent"], ["&#x1F634", "Visage qui dort"], ["&#x1F60C", "Visage soulagé"], ["&#x1F614", "Visage pensif"], ["&#x1F924", "Visage bavant"], ["&#x1F637", "Visage avec masque médical"], ["&#x1F912", "Visage avec thermomètre"], ["&#x1F915", "Visage avec bandeau"], ["&#x1F922", "Visage nauséeux"], ["&#x1F92E", "Visage avec vomissement la bouche ouverte"], ["&#x1F927", "Visage éternuement"], ["&#x1F975", "Visage surchauffé"], ["&#x1F976", "Visage gelé"], ["&#x1F974", "Visage avec des yeux inégaux et la bouche ondulée"], ["&#x1F635", "Visage étourdi"], ["&#x1F92F", "Visage choqué avec la tête qui explose"], ["&#x1F615", "Visage confus"], ["&#x1F61F", "Visage inquiet"], ["&#x1F641", "Visage légèrement renfrogné"], ["&#x2639", "Visage blanc grimassant"], ["&#x1F62E", "Visage bouche ouverte"], ["&#x1F62F", "Visage feutré"], ["&#x1F632", "Visage étonné"], ["&#x1F633", "Visage rougissant"], ["&#x1F97A", "Visage avec les yeux suppliants"], ["&#x1F626", "Visage renfrogné avec la bouche ouverte"], ["&#x1F627", "Visage angoissé"], ["&#x1F628", "Visage craintif"], ["&#x1F630", "Visage bouche ouverte et goutte de sueur froide"], ["&#x1F625", "Visage déçu mais faisant face"], ["&#x1F622", "Visage pleurant"], ["&#x1F62D", "Visage pleurant à pleine larme"], ["&#x1F631", "Visage criant de peur"], ["&#x1F616", "Visage déconcerté"], ["&#x1F623", "Visage persévérant"], ["&#x1F61E", "Visage déçu"], ["&#x1F613", "Visage avec sueur froide"], ["&#x1F629", "Visage las"], ["&#x1F62B", "Visage fatigué"], ["&#x1F971", "Bâillement"], ["&#x1F624", "Visage avec la vapeur qui sort du nez"], ["&#x1F621", "Visage furieux"], ["&#x1F620", "Visage en colère"], ["&#x1F92C", "Visage qui dit des gros mots"], ["&#x1F608", "Visage souriant diabolique"], ["&#x1F47F", "Visage diabolique en colère"], ["&#x1F480", "Tête de mort"], ["&#x1F4A9", "Excrément"], ["&#x1F921", "Clown"], ["&#x1F479", "Masque de monstre"], ["&#x1F47A", "Tengu"], ["&#x1F47B", "Fantôme"], ["&#x1F47D", "Alien"], ["&#x1F47E", "Alien pixelisé"], ["&#x1F916", "Robot"]];

	const  emoHandList = [["&#x1F44D", "Pouce levé"],  ["&#x1F44E", "Pouce baissé"], ["&#x1F44B", "Salut de la main"],  ["&#x1F91A", "Dos de la main levée"],  ["&#x1F590", "Main levée doigts écartés"],  ["&#x270B", "Main levée"],  ["&#x1F596", "Salut vulcain"],  ["&#x1F44C", "Ok"],  ["&#x1F90C", "Doigts pincés vers le haut"],  ["&#x1F90F", "Main qui pince"],  ["&#x270C", "Doigts en V"],  ["&#x1F91E", "Doigts croisés"],  ["&#x1F91F", "Main qui veut dire je t'aime"],  ["&#x1F918", "Cornes du diable"],  ["&#x1F919", "Appel téléphonique avec la main"],  ["&#x1F448", "Index pointant vers la gauche"],  ["&#x1F449", "Index pointant vers la droite"],  ["&#x1F446", "Index pointant vers le haut"],  ["&#x1F447", "Index pointant vers le bas"],  ["&#x1F595", "Doigt d'honneur"],  ["&#x261D", "Paume de la main avec index vers le haut"], ["&#x270A", "Poing levé"],  ["&#x1F44A", "Coup de poing"],  ["&#x1F91B", "Poing serré vers la gauche"],  ["&#x1F91C", "Poing serré vers la droite"],  ["&#x1F44F", "Applaudir"],  ["&#x1F64C", "Mains levées"],  ["&#x1F450", "Paumes ouvertes"],  ["&#x1F932", "Paumes de mains côte à côte"],  ["&#x1F91D", "Poignée de main"],  ["&#x1F64F", "Prière"],  ["&#x270D", "Main qui écrit"],  ["&#x1F485", "Vernis à ongle"],  ["&#x1F933", "Selfie"]];

	const emoActiList = [["&#x1F383", "Citrouille"], ["&#x1F384", "Arbre de noël"], ["&#x1F386", "Feu d'artifice"], ["&#x1F387", "Cierge magique"], ["&#x1F9E8", "Pétard"], ["&#x2728", "Étincelles"], ["&#x1F388", "Balon de baudruche"], ["&#x1F389", "Cotillons"], ["&#x1F38A", "Confettis"], ["&#x1F38B", "Arbre à voeux"], ["&#x1F38D", "Bambou décoratif"], ["&#x1F38E", "Poupées japonaises"], ["&#x1F38F", "Koinibori"], ["&#x1F391", "Cérémonie de la lune"], ["&#x1F9E7", "Enveloppe rouge"], ["&#x1F380", "Ruban"], ["&#x1F381", "Cadeau"], ["&#x1F397", "Ruban de mémoire"], ["&#x1F39F", "Billet d'entrée"], ["&#x1F3AB", "Billet"], ["", ""], ["&#x1F396", "Médaille militaire"], ["&#x1F3C6", "Trophée"], ["&#x1F3C5", "Médaille sportive"], ["&#x1F947", "Médaille d'or - première place"], ["&#x1F948", "Médaille d'argent - seconde place"], ["&#x1F949", "Médaille de bronze - troisième place"], ["&#x26BD", "Ballon de football"], ["&#x26BE", "Baseball"], ["&#x1F94E", "Softball"], ["&#x1F3C0", "Basketball"], ["&#x1F3D0", "Volleyball"], ["&#x1F3C8", "Football américain"], ["&#x1F3C9", "Rugby"], ["&#x1F3BE", "Tennis"], ["&#x1F94F", "Disque volant"], ["&#x1F3B3", "Bowling"], ["&#x1F3CF", "Cricket"], ["&#x1F3D1", "Hockey sur gazon"], ["&#x1F3D2", "Hockey sur glace"], ["&#x1F94D", "Crosse"], ["&#x1F3D3", "Ping pong"], ["&#x1F3F8", "Badminton"], ["&#x1F94A", "Gant de boxe"], ["&#x1F94B", "Tenue d'Arts Martiaux"], ["&#x1F945", "Cage"], ["&#x26F3", "Drapeau de golf"], ["&#x26F8", "Patin à glace"], ["&#x1F3A3", "Câne à pêche"], ["&#x1F93F", "Masque de plongée"], ["&#x1F3BD", "Maillot de course"], ["&#x1F3BF", "Skis"], ["&#x1F6F7", "Luge"], ["&#x1F94C", "Pierre de curling"], ["&#x1F3AF", "Dans le mille"], ["&#x1FA80", "Yo-yo"], ["&#x1FA81", "Cerf-volant"], ["&#x1F3B1", "8Boule de billard"], ["&#x1F52E", "Boule de cristal"], ["&#x1FA84", "Baguette magique"], ["&#x1F9FF", "Mauvais oeil"], ["&#x1F3AE", "Jeu vidéo"], ["&#x1F579", "Joystick"], ["&#x1F3B0", "Machine à sous"], ["&#x1F3B2", "Dé"], ["&#x1F9E9", "Pièce de puzzle"], ["&#x1F9F8", "Ours en peluche"]];

	const emoFoodList = [["&#x1F347", "Raisin"], ["&#x1F348", "Melon"], ["&#x1F349", "Pastèque"], ["&#x1F34A", "Mandarine"], ["&#x1F34B", "Citron"], ["&#x1F34C", "Banane"], ["&#x1F34D", "Ananas"], ["&#x1F96D", "Mangue"], ["&#x1F34E", "Pomme rouge"], ["&#x1F34F", "Pomme verte"], ["&#x1F350", "Poire"], ["&#x1F351", "Pêche"], ["&#x1F352", "Cerises"], ["&#x1F353", "Fraise"], ["&#x1FAD0", "Myrtilles"], ["&#x1F95D", "Kiwi"], ["&#x1F345", "Tomate"], ["&#x1FAD2", "Olive"], ["&#x1F965", "Noix de coco"], ["&#x1F951", "Avocat"], ["&#x1F346", "Aubergine"], ["&#x1F954", "Pomme de terre"], ["&#x1F955", "Carrote"], ["&#x1F33D", "Maïs"], ["&#x1F336", "Piment"], ["&#x1FAD1", "Poivron"], ["&#x1F952", "Concombre"], ["&#x1F96C", "Légume à feuilles vertes"], ["&#x1F966", "Broccoli"], ["&#x1F9C4", "Ail"], ["&#x1F9C5", "Oignon"], ["&#x1F344", "Champignon"], ["&#x1F95C", "Cacahuète"], ["&#x1FAD8", "Haricot"], ["&#x1F330", "Châtaigne"], ["&#x1F35E", "Pain"], ["&#x1F950", "Croissant"], ["&#x1F956", "Baguette"], ["&#x1FAD3", "Galette"], ["&#x1F968", "Bretzel"], ["&#x1F96F", "Bagel"], ["&#x1F95E", "Pancakes"], ["&#x1F9C7", "Gauffre"], ["&#x1F9C0", "Part de fromage"], ["&#x1F356", "Viande sur un os"], ["&#x1F357", "Cuisse de poulet"], ["&#x1F969", "Morceau de viande"], ["&#x1F953", "Lard"], ["&#x1F354", "Hamburger"], ["&#x1F35F", "Frites"], ["&#x1F355", "Pizza"], ["&#x1F32D", "Hot dog"], ["&#x1F96A", "Sandwich"], ["&#x1F32E", "Taco"], ["&#x1F32F", "Burrito"], ["&#x1F959", "Kebab"], ["&#x1F9C6", "Falafel"], ["&#x1F95A", "Oeuf"], ["&#x1F373", "Oeuf au plat"], ["&#x1F958", "Plat mitonné"], ["&#x1F372", "Marmite"], ["&#x1FAD5", "Fondue"], ["&#x1F963", "Bol avec cuillère"], ["&#x1F957", "Salade"], ["&#x1F37F", "Popcorn"], ["&#x1F9C8", "Beurre"], ["&#x1F9C2", "Sel"], ["&#x1F96B", "Aliments en conserve"], ["&#x1F371", "Boîte déjeuner"], ["&#x1F358", "Galette de riz"], ["&#x1F359", "Boulette de riz"], ["&#x1F35A", "Bol de riz"], ["&#x1F35B", "Riz au curry"], ["&#x1F35C", "Bol fumant"], ["&#x1F35D", "Spaghetti"], ["&#x1F360", "Patate douce"], ["&#x1F362", "Brochette de poisson"], ["&#x1F363", "Sushi"], ["&#x1F364", "Beignet de crevette"], ["&#x1F365", "Croquette de poisson"], ["&#x1F96E", "Gâteau de lune"], ["&#x1F361", "Brochette de bonbons"], ["&#x1F95F", "Boulette de pâte"], ["&#x1F960", "Biscuit chinois"], ["&#x1F961", "Boîte à emporter"], ["&#x1F980", "Crabe"], ["&#x1F99E", "Homard"], ["&#x1F990", "Crevette"], ["&#x1F991", "Calamar"], ["&#x1F9AA", "Huître"], ["&#x1F368", "Crème glacée"], ["&#x1F367", "Granité"], ["&#x1F366", "Glace italienne"], ["&#x1F369", "Doughnut"], ["&#x1F36A", "Cookie"], ["&#x1F382", "Gâteau d'anniversaire"], ["&#x1F370", "Gâteau sablé"], ["&#x1F9C1", "Cupcake"], ["&#x1F967", "Tarte"], ["&#x1F36B", "Chocolat"], ["&#x1F36C", "Bonbon"], ["&#x1F36D", "Sucette"], ["&#x1F36E", "Crème renversée"], ["&#x1F36F", "Pot de miel"], ["&#x1F37C", "Biberon"], ["&#x1F95B", "Verre de lait"], ["&#x2615", "Boisson chaude"], ["&#x1FAD6", "Théière"], ["&#x1F375", "Tasse"], ["&#x1F376", "Saké"], ["&#x1F37E", "Bouteille de champagne"], ["&#x1F377", "Verre de vin"], ["&#x1F378", "Cocktail"], ["&#x1F379", "Cocktail tropical"], ["&#x1F37A", "Chope"], ["&#x1F37B", "Chopes de bière"], ["&#x1F942", "Trinquer"], ["&#x1F943", "Verre trumbler"], ["&#x1F964", "Gobelet avec paille"], ["&#x1F9CB", "Thé aux perles"], ["&#x1F9C3", "Briquette de jus"], ["&#x1F9C9", "Maté"], ["&#x1F9CA", "Glaçon"], ["&#x1F962", "Baguettes"], ["&#x1F37D", "Fourchette et couteau avec assiette"], ["&#x1F374", "Fourchette et couteau"], ["&#x1F944", "Cuillère"], ["&#x1F52A", "Couteau de cuisine"], ["&#x1FAD9", "Jar"], ["&#x1F3FA", "Amphora"]];

	const emoAnimList = [["&#x1F435", "Tête de singe"], ["&#x1F412", "Singe"], ["&#x1F98D", "Gorille"], ["&#x1F9A7", "Orangoutan"], ["&#x1F436", "Tête de chien"], ["&#x1F415", "Chien"], ["&#x1F9AE", "Chien guide"], ["&#x1F415", "Chien d'assistance"], ["&#x1F429", "Caniche"], ["&#x1F43A", "Loup"], ["&#x1F98A", "Renard"], ["&#x1F99D", "Raton laveur"], ["&#x1F431", "Tête de chat"], ["&#x1F408", "Chat"], ["&#x1F981", "Lion"], ["&#x1F42F", "Tête de tigre"], ["&#x1F405", "Tigre"], ["&#x1F406", "Léopard"], ["&#x1F434", "Tête de cheval"], ["&#x1F40E", "Cheval"], ["&#x1F984", "Licorne"], ["&#x1F993", "Zèbre"], ["&#x1F98C", "Cerf"], ["&#x1F9AC", "Bison"], ["&#x1F42E", "Tête de vache"], ["&#x1F404", "Vache"], ["&#x1F402", "Boeuf"], ["&#x1F437", "Buffle"], ["&#x1F437", "Tête de cochon"], ["&#x1F416", "Cochon"], ["&#x1F417", "Sanglier"], ["&#x1F43D", "Groin"], ["&#x1F40F", "Bélier"], ["&#x1F411", "Mouton"], ["&#x1F410", "Chèvre"], ["&#x1F42A", "Dromadaire"], ["&#x1F42B", "Chameau"], ["&#x1F999", "Lama"], ["&#x1F992", "Girafe"], ["&#x1F418", "Eléphant"], ["&#x1F9A3", "Mammouth"], ["&#x1F98F", "Rhinocéros"], ["&#x1F99B", "Hippopotame"], ["&#x1F42D", "Tête de souris"], ["&#x1F401", "Souris"], ["&#x1F400", "Rat"], ["&#x1F439", "Hamster"], ["&#x1F430", "Tête de lapin"], ["&#x1F407", "Lapin"], ["&#x1F43F", "Ecureuil"], ["&#x1F9AB", "Castor"], ["&#x1F994", "Hérisson"], ["&#x1F987", "Chauve-souris"], ["&#x1F43B", "Ours"], ["&#x1F428", "Koala"], ["&#x1F43C", "Panda"], ["&#x1F9A5", "Paresseux"], ["&#x1F9A6", "Loutre"], ["&#x1F9A8", "Moufette"], ["&#x1F998", "Kangourou"], ["&#x1F9A1", "Blaireau"], ["&#x1F43E", "Empreintes d'animaux"], ["&#x1F983", "Dindon"], ["&#x1F414", "Poule"], ["&#x1F413", "Coq"], ["&#x1F423", "Poussin qui éclôt"], ["&#x1F424", "Poussin"], ["&#x1F425", "Poussin de face"], ["&#x1F426", "Oiseau"], ["&#x1F427", "Pingouin"], ["&#x1F54A", "Colombe"], ["&#x1F985", "Aigle"], ["&#x1F986", "Canard"], ["&#x1F9A2", "Cygne"], ["&#x1F989", "Chouette"], ["&#x1FAB6", "Plume"], ["&#x1F9A9", "Flamant rose"], ["&#x1F99C", "Perroquet"], ["&#x1F438", "Grenouille"], ["&#x1F40A", "Crocodile"], ["&#x1F422", "Tortue"], ["&#x1F98E", "Lézard"], ["&#x1F40D", "Serpent"], ["&#x1F432", "Tête de dragon"], ["&#x1F409", "Dragon"], ["&#x1F995", "Sauropode"], ["&#x1F996", "Tyranosaure"], ["&#x1F433", "Baleine soufflant par son évent"], ["&#x1F40B", "Baleine"], ["&#x1F42C", "Dauphin"], ["&#x1F41F", "Poisson"], ["&#x1F420", "Poisson tropical"], ["&#x1F421", "Poisson-lune"], ["&#x1F988", "Requin"], ["&#x1F419", "Pieuvre"], ["&#x1F41A", "Coquille en spirale"], ["&#x1F98B", "Papillon"], ["&#x1F41B", "Chenille"], ["&#x1F41C", "Fourmille"], ["&#x1F41D", "Abeille"], ["&#x1FAB2", "Scarabée"], ["&#x1F41E", "Coccinelle"], ["&#x1F997", "Criquet"], ["&#x1FAB3", "Cafard"],["&#x1F40C", "Escargot"], ["&#x1F577", "Araignée"], ["&#x1F578", "Toile d'araignée"], ["&#x1F982", "Scorpion"], ["&#x1F99F", "Moustique"], ["&#x1FAB0", "Mouche"], ["&#x1FAB1", "Ver de terre"], ["&#x1F9A0", "Microbe"], ["&#x1F490", "Bouquet"], ["&#x1F338", "Fleur de cerisier"], ["&#x1F4AE", "Fleur blanche"], ["&#x1F3F5", "Rosette"], ["&#x1F339", "Rose"], ["&#x1F940", "Fleur fanée"], ["&#x1F33A", "Hibiscus"], ["&#x1F33B", "Tournesol"], ["&#x1F33C", "Bourgeon"], ["&#x1F337", "Tulipe"], ["&#x1F331", "Jeune pousse"], ["&#x1FAB4", "Plante en pot"], ["&#x1F332", "Conifère"], ["&#x1F333", "Arbre à feuilles caduques"], ["&#x1F334", "Palmier"], ["&#x1F335", "Cactus"], ["&#x1F33E", "Plant de riz"], ["&#x1F33F", "Feuille"], ["&#x2618", "Trèfle"], ["&#x1F340", "Trèfle à quatre feuilles"], ["&#x1F341", "Feuille d'érable"], ["&#x1F342", "Feuille morte"], ["&#x1F343", "Feuille virevoltante"], ["&#x1FAB9", "Plante en pot"], ["&#x1FABA", "Nid avec oeufs"]];

	this.emoLists = [ [emoSmilyList, "&#x1F642", "Smileys"], [emoHandList, "&#x1F44D", "Mains"], [emoActiList, "&#x1F3D2", "Activites"], [emoFoodList, "&#x1F352", "Nourriture et boissons"], [emoAnimList, "&#x1F434", "Animaux et nature"], [[], "&#x1F50D;","Recherche"]];	
	
  }  // FIN constructor
  
	show(emoCatId, iconList){
		if (emoCatId >= 0){
			this.#remChilds(false, this.#emoList);
		}else{
			if (this.#catCont){
				if (this.oListEmo.style.display == "none"){
					this.closeSearchEmo();
					this.oListEmo.style.display = "block";
					//this.oListEmo.focus({ focusVisible: true }); 
				}else
					this.oListEmo.style.display = "none";
				return false;
			}else{
			iconList = this.emoLists[0][0];
			if (this.#buildEmoCatList())
				return;
			}
		}
		
		var tul = document.createElement("ul");	
		tul.setAttribute('id', 'emoList');

		for(var i = 0; i < iconList.length; i++) {
			tul.appendChild(this.#addEmo(iconList[i]));
		}
		this.oListEmo.appendChild(tul);
		this.#emoList = tul;
		this.oListEmo.style.display = "block";
		return false;
	}  
	
	#remChilds(eItem, eItemToRemove){
		if (eItem){
			while (eItem.childNodes.length > 0){
				eItem.removeChild(eItem.childNodes[0]);
			}
		}
		if (eItemToRemove){
			eItemToRemove.parentNode.removeChild(eItemToRemove);
		}
	}

	#buildEmoCatList(){
		var cdiv = document.createElement("div");	
		cdiv.setAttribute('id', 'emoCatContainer');
		var tul = document.createElement("ul");	
		tul.setAttribute('id', 'emoCatList');
		var but1;
		for(var j = 0; j < this.emoLists.length - 1; j++) {
			var tli = document.createElement("li");	
			var tbut = document.createElement("button");	
			tbut.setAttribute('title', this.emoLists[j][2] );
			tbut.setAttribute('onclick', 'window.emojWidgetObj.selectEmoCat(this,' + j + ' ); return false;');
			tbut.innerHTML = this.emoLists[j][1] ;
			//this.#lastEmoCat = tbut;
			tli.appendChild(tbut);
			tul.appendChild(tli);
			if (j == 0)
				but1 = tbut;
		}
		var tli = document.createElement("li");	
		var tbut = document.createElement("button");	
		tbut.setAttribute('title', this.emoLists[5][2] );
		tbut.setAttribute('onclick', 'window.emojWidgetObj.showSearchEmo(this,' + (this.emoLists.length-1) + ');');
		tbut.innerHTML = this.emoLists[5][1] ;
		tli.appendChild(tbut);
		tul.appendChild(tli);
		this.#catCont = cdiv;
		cdiv.appendChild(tul);
		this.oListEmo.appendChild(cdiv);
		this.oListEmo.addEventListener("mouseleave", function( event ) {   
			this.style.display = "none";
		}, false);
		if (this.#recentEmoj.length > 0){
			this.#showRecentEmo();
			this.oListEmo.style.display = "block";
			return true;
		}else{
			but1.style.filter = "brightness(85%)";
			but1.focus({ focusVisible: true }); 
			this.#lastEmoCat = but1;
			return false;
		}
	}

	#addEmo(ve){
		var tli = document.createElement("li");	
		tli.setAttribute('class', 'emoLi');
		tli.setAttribute('onclick', 'window.emojWidgetObj.selectEmoj(this)');
		tli.setAttribute('title', ve[1]);
		tli.innerHTML = ve[0];
		return tli;
	}

	selectEmoCat(oBut, emoCatId){
		if (this.#lastEmoCat)
			this.#lastEmoCat.style.filter = "brightness(100%)";

		oBut.style.filter = "brightness(85%)";
		this.#lastEmoCat = oBut;
		if (emoCatId < this.emoLists.length-1)
			this.show(emoCatId, this.emoLists[emoCatId][0]);
	}

	selectEmoj(oLi){
		var emo = oLi.innerHTML;
		var pos = this.#oTa.selectionStart;
		if (pos){
			var	act = this.#oTa.value;
			var aftAct = act.substring(pos);
			var befAct = act.substring(0,pos);
			this.#oTa.value = befAct + emo + aftAct;
		}else
			this.#oTa.value = emo;
		
		pos = this.#recentEmoj.indexOf(emo);
		if (pos != -1)
			this.#recentEmoj.splice(pos,2);
		if (this.#recentEmoj.length >= 14)
			this.#recentEmoj.splice(0,2);
		this.#recentEmoj.push(emo);
		this.#recentEmoj.push(oLi.title);
		localStorage.setItem("recentEmoj", JSON.stringify(this.#recentEmoj));
		this.#oTa.scrollTop = this.#oTa.scrollHeight;
	}

	#trouv(exp){
	  var res = [];
	  for(var j = 0; j < this.emoLists.length; j++) {
		  var eli = this.emoLists[j][0];
		  for(var i in eli){
			if(eli[i][1].toUpperCase().indexOf(exp.toUpperCase()) > -1){
			  res.push(eli[i]);
			}
		  }
	  }
	  return res;
	}
	

	searhEmoji(oFrm){
	if (this.#textSearhEmo.value.length > 2){
		this.emoLists[this.emoLists.length-1][0] = [];
		this.emoLists[this.emoLists.length-1][0] = this.#trouv(this.#textSearhEmo.value);
		this.show(this.emoLists.length-1, this.emoLists[this.emoLists.length-1][0]);
	}}

	closeSearchEmo(){
	if (this.#sCont)
		this.#sCont.style.display = "none";
	}

	showSearchEmo(oBut, emoCatId){

	if (!this.#sCont){
		var catCont = document.getElementById("emoCatContainer")
		var sCont = document.createElement("div");	
		sCont.setAttribute('id', 'searchEmoContainer');
		   var Cspa = document.createElement("span");   
		   Cspa.setAttribute('class', 'btn-close');
		   Cspa.setAttribute('onclick', 'window.emojWidgetObj.closeSearchEmo();');
		   Cspa.innerHTML = 'X';	
		sCont.appendChild(Cspa);	
		var tfm = document.createElement("form");	
		tfm.setAttribute('action', '');
		var tin = document.createElement("input");	
		tin.setAttribute('id', 'textSearhEmo' );
		tin.setAttribute('class', 'input-search' );
		tin.setAttribute('type', 'text' );
		tin.setAttribute('placeholder', 'Recherche?' );
		tin.setAttribute('onkeyup', 'window.emojWidgetObj.searhEmoji()' );
		this.#textSearhEmo = tin;
		tfm.appendChild(tin);
		sCont.appendChild(tfm);
		this.#sCont = sCont;
		catCont.appendChild(sCont);
	}
	this.#showRecentEmo();
	this.#sCont.style.display = "block";
	this.selectEmoCat(oBut, emoCatId);
	}
	
	#showRecentEmo(){
	if (this.#recentEmoj.length > 0){
		this.#remChilds(false, this.#emoList);
		var Rdiv = document.createElement("div");
			var prec = document.createElement("p");
			prec.innerHTML = "R&eacute;cents";
			Rdiv.appendChild(prec);
			var tul = document.createElement("ul");	
			tul.setAttribute('id', 'emoList');

			for(var i = this.#recentEmoj.length - 1; i > -1; i-= 2 ) {
				tul.appendChild(this.#addEmo([this.#recentEmoj[i-1], this.#recentEmoj[i]]));}
			Rdiv.appendChild(tul);
		
		this.oListEmo.appendChild(Rdiv);
		this.#emoList = Rdiv;
	}
	}

}	//FIN Class emoji


function showConnectOpt(){
var Cform = document.getElementById('connectForm');	
remChilds(Cform);    
	  var div1 = document.createElement("div");
         var ul1 = document.createElement("ul"); 
            var li1 = document.createElement("li");
               li1.setAttribute('tabindex', '11');
               var Cbut = document.createElement("button");
               Cbut.setAttribute('title', 'Connexion avec courriel');   
               Cbut.setAttribute('class', 'focus-cont');
               Cbut.setAttribute('onclick', 'showConnectTo(this.form); return false;');
               Cbut.innerHTML = 'Connecter avec courriel';
            li1.appendChild(Cbut);
		ul1.appendChild(li1); 
            var li3 = document.createElement("li");
               li3.setAttribute('tabindex', '11');
               var Cbut = document.createElement("button");
               Cbut.setAttribute('title', 'Connexion avec facebook');   
               Cbut.setAttribute('class', 'focus-cont');
               Cbut.setAttribute('onclick', 'showConnectTo(this.form, "FB"); return false;');
               Cbut.innerHTML = 'Connecter avec facebook';
            li3.appendChild(Cbut);
        ul1.appendChild(li3);   
      div1.appendChild(ul1);
   Cform.appendChild(div1);
}

function showConnectTo(Cform, conTo){
var Cform = document.getElementById('connectForm');	
remChilds(Cform);    
	  var div1 = document.createElement("div");
         var ul1 = document.createElement("ul"); 
		 
		    if (conTo == "FB"){
				var li2 = document.createElement("li");
				   li2.setAttribute('tabindex', '10');
				   var Ulab = document.createElement("label");
				   Ulab.setAttribute('for', 'chatUserMail');
				   Ulab.innerHTML = 'Courriel:';
				   li2.appendChild(Ulab);
				   var Uinp = document.createElement("input");
				   Uinp.setAttribute('id', 'chatUserMail');
				   Uinp.setAttribute('type', 'text'); 
				   Uinp.setAttribute('maxlength', '35'); 
				   li2.appendChild(Uinp);
				ul1.appendChild(li2);				
			}
            var li2 = document.createElement("li");
               li2.setAttribute('tabindex', '10');
               var Ulab = document.createElement("label");
               Ulab.setAttribute('for', 'chatUserName');
               Ulab.innerHTML = 'Nom:';
               li2.appendChild(Ulab);
               var Uinp = document.createElement("input");
               Uinp.setAttribute('id', 'chatUserName');
               Uinp.setAttribute('type', 'text');  
			   Uinp.setAttribute('maxlength', '20'); 
               li2.appendChild(Uinp);
            ul1.appendChild(li2);
               
            var li3 = document.createElement("li");
               li3.setAttribute('tabindex', '11');
               var Cbut = document.createElement("button");
               Cbut.setAttribute('title', 'Connecter');   
               Cbut.setAttribute('class', 'focus-cont');
               Cbut.setAttribute('onclick', 'connect(this.form); return false;');
               Cbut.innerHTML = 'Connecter';
            li3.appendChild(Cbut);
         ul1.appendChild(li3);   
      div1.appendChild(ul1);
   Cform.appendChild(div1);
}

function showDeconnectOpt(){
var Cform = document.getElementById('connectForm');	
remChilds(Cform);    
	  var div1 = document.createElement("div");
         var ul1 = document.createElement("ul"); 
               
            var li3 = document.createElement("li");
               li3.setAttribute('tabindex', '11');
               var Cbut = document.createElement("button");
               Cbut.setAttribute('id', 'butConnect');
               Cbut.setAttribute('title', 'Connexion');   
               Cbut.setAttribute('class', 'focus-cont');
               Cbut.setAttribute('onclick', 'deconnect(this.form); return false;');
               Cbut.innerHTML = 'Déconnecter';
            li3.appendChild(Cbut);
         ul1.appendChild(li3);   
      div1.appendChild(ul1);
   Cform.appendChild(div1);	
}


/*
setTimeout(() => {
  console.log("Retardée d'une seconde.");
}, 1000);

*/

