window.onload = function() 	{
	var addPerson = document.getElementById("clickMe1");
		addPerson.onclick = runTheCode1;
	var removePerson = document.getElementById("clickMe2");
		removePerson.onclick = runTheCode2;
	var addNewWine = document.getElementById("clickMe3");
		addNewWine.onclick = runTheCode3;
	var removeLastWine = document.getElementById("clickMe4");
		removeLastWine.onclick = runTheCode4;
	var dne6naData = document.getElementById("textA");

	var showTheResult = document.getElementById("clickMe5");
		showTheResult.onclick = signal;

	var otklonenie = document.getElementById("otklonenie");
	otklonenie.onblur = runTheCalcul;

	function myFunction() {
	    var d = new Date();
	    var n = d.getDate();
	    var m = d.getMonth();
	    var y = d.getFullYear();
	    dne6naData.innerHTML = n + "." + (m + 1) + "." + y;
	}

myFunction();

}
///////////// Start up a function to calculate the averrage note.//////////////////

function runTheCode1()	{
	if((probaKod.length == 0) && (allNotes.length == 0)) 	{
		var degustator = document.createElement("TEXTAREA");
		degustator.setAttribute("class", "text");
		document.getElementById("imena").appendChild(degustator);
	} else {
		var degustator = document.createElement("TEXTAREA");
		degustator.setAttribute("class", "text");
		document.getElementById("imena").appendChild(degustator);


		for(i = 0; i < probaKod.length; i++)	{
		wineSample = document.createElement("INPUT");
		wineSample.setAttribute("type", "text");
		wineSample.setAttribute("class", "note");
		wineSample.setAttribute("maxlength", "2");
		wineSample.addEventListener("blur", runTheCalcul, false);
		wineSample.addEventListener("click", checkNameSample, false);
		
		var list = document.getElementById("otsenki");
		list.insertBefore(wineSample, list.childNodes[allDegust.length + i*(allDegust.length + 3) + i]);
		}
	}
}

var allDegust = document.getElementsByClassName("text");

function runTheCode2()	{
	if(allNotes.length == 0)	{
		var decision = prompt("Êtes-vous sûr de vouloir supprimer le dernier champ ajouté?", "Appuyez sur le bouton 'OK' pour supprimer le champ");
		if (decision) {
			var parent = document.getElementById("imena");
			parent.removeChild(allDegust[allDegust.length - 1]);
		}
	} else {
		var decision = prompt("Voulez-vous supprimer le degustator " + allDegust[allDegust.length - 1].value +  " ainsi que ses notes?", "Appuyez sur le bouton «OK» pour supprimer le dégustateur et ses notes");
		if (decision) {
			var parent = document.getElementById("imena");
			parent.removeChild(allDegust[allDegust.length - 1]);

			var list = document.getElementById("otsenki");
			for(i = 0; i < probaKod.length; i++)	{
			list.removeChild(list.childNodes[1+ allDegust.length + i*(allDegust.length+3) + i]);
			}
		}
	}
	runTheCalcul();
}		


function runTheCode3()	{

/////////// Add a field where to put the name of the sample //////////////////

	var newItemName = document.createElement("SPAN");
		newItemName.setAttribute("class", "span");
	var wineNumber = document.createElement("INPUT");
		wineNumber.setAttribute("class", "wineNumber");
		wineNumber.setAttribute("maxlength", "23");
		wineNumber.setAttribute("placeholder", "Echantillon, code");
	newItemName.appendChild(wineNumber);
	document.getElementById("otsenki").appendChild(newItemName);

/////////// Add fields for the note for every person //////////////////

	for (i = 0; i < allDegust.length; i++)	{	
		wineSample = document.createElement("INPUT");
		wineSample.setAttribute("type", "text");
		wineSample.setAttribute("class", "note");
		wineSample.setAttribute("maxlength", "2");
		wineSample.addEventListener("blur", runTheCalcul, false);
		wineSample.addEventListener("click", checkNameSample, false);
		wineSample.addEventListener("keypress", checkNameSample, false);
		// wineSample.setAttribute("onblur", "runTheCalcul()");
		document.getElementById("otsenki").appendChild(wineSample);
	}

/////////// Add averrage NOTE ///////////////////////////

	var averrageNote = document.createElement("SPAN");
		averrageNote.setAttribute("class", "averrNote");
		// averrageNote.setAttribute("maxlength", "5");
	document.getElementById("otsenki").appendChild(averrageNote);


/////////// Add area for classement NOTE ///////////////////////////

	var classement = document.createElement("SPAN");
		classement.setAttribute("class", "classementNote");
		// averrageNote.setAttribute("maxlength", "5");
	document.getElementById("otsenki").appendChild(classement);

///////////// Add a simple line and space between the samples ////////////////////////


	var newLine = document.createElement("P");
		newLine.setAttribute("class", "demosi");
	document.getElementById("otsenki").appendChild(newLine);
}

////////////// Calculs for the averrage NOTE /////////////////////////

var allNotes = document.getElementsByClassName("note");
var probaKod = document.getElementsByClassName("wineNumber");


function checkNameSample()	{
	var referentsia = Math.floor((Array.from(allNotes).indexOf(event.target))/allDegust.length);
	var checkProbaName = document.getElementsByClassName("wineNumber")[referentsia];
	
	if ((checkProbaName == "") || (checkProbaName.value == checkProbaName.defaultValue))	{
		alert("Veuillez entrer un nom ou un numéro d'échantillon avant de continuer.");
		return;
	} 
}

function runTheCalcul()	{
		for(z = 0; z < probaKod.length; z++) {
			var referentsia = z;
			var suma = 0;
			var realNote = 0;

						for (i = 0; i < allDegust.length; i++)	{
							if (Number(allNotes[(allDegust.length)*referentsia + i].value) > 0)	{
								suma += Number(allNotes[(allDegust.length)*referentsia + i].value);
								realNote += 1;	
								allNotes[(allDegust.length)*referentsia + i].style.background = "none";
								allNotes[(allDegust.length)*referentsia + i].style.color = "black";
							} else {
								allNotes[(allDegust.length)*referentsia + i].style.background = "white";
							}
						}
					
						srednaSuma = suma/realNote;
						 
						var finalNote = document.getElementsByClassName("averrNote")[referentsia];
						if (srednaSuma > 0)	{
							finalNote.innerHTML = (Math.round(srednaSuma*1000)/1000).toPrecision(4);
						} else {
							finalNote.innerHTML = "";	
						}
						

					///////////////// Verification for deviation NOTES ////////////////////////

					var pragNote = document.getElementById("otklonenie");
  if(Number(pragNote.value) > 0) {
					for (i = 0; i < allDegust.length; i++)	{
						if (Number(allNotes[(allDegust.length)*referentsia + i].value) > 0) {
							if ((Number(allNotes[(allDegust.length)*referentsia + i].value) < (srednaSuma - Number(pragNote.value))) || (Number(allNotes[(allDegust.length)*referentsia + i].value) > (srednaSuma + Number(pragNote.value))))	{
								suma -= Number(allNotes[(allDegust.length)*referentsia + i].value);
								realNote -= 1;	
								allNotes[(allDegust.length)*referentsia + i].style.background = "red";
							}
						}
					} 	
				}

					srednaSuma = suma/realNote;
					
					if (srednaSuma > 0)	{
						finalNote.innerHTML = (Math.round(srednaSuma*1000)/1000).toPrecision(4);
					} else {
						finalNote.innerHTML = "";	
					}

					var medal = document.getElementsByClassName("classementNote");
						if(finalNote.innerHTML >= 80) {
							medal[referentsia].style.padding = "4px";
							if(finalNote.innerHTML >= 90)	{ 
								medal[referentsia].innerHTML = "MÉDAILLE DE PLATINE <img src='Images/Platinum.jpg' >";
								medal[referentsia].style.padding = "4px"; 
							} else if(finalNote.innerHTML >= 85) {
								medal[referentsia].innerHTML = "MÉDAILLE D'OR <img src='Images/Gold.jpg' >";
							} else if(finalNote.innerHTML >= 82) { 
								medal[referentsia].innerHTML = "MÉDAILLE D'ARGENT <img src='Images/Silver.jpg' >";
							} else {
								medal[referentsia].innerHTML = "MÉDAILLE DE BRONZE <img src='Images/Bronze.png' >";
							} 
						} else {
								medal[referentsia].innerHTML = "";
								medal[referentsia].style.padding = "0px";
							}
					
					var allAverrNotes = document.getElementsByClassName("averrNote");

						
					var data = [];
					for(var i = 0; i < allAverrNotes.length ; i++)  { 
						if(allAverrNotes[i].innerHTML > 0)	{
					    data.push({label: probaKod[i].value, value: allAverrNotes[i].innerHTML, medal: medal[i].innerHTML});
						}
					}

					var sortiranaData = data.sort(function(a, b){return b.value-a.value});
					var spisak = "";

					for(i = 0; i < data.length; i++)	{
						spisak += ((i + 1) + ". " + sortiranaData[i].label + " --> " + sortiranaData[i].value + " " + sortiranaData[i].medal + "<br />");
					}

					var chuchua = document.getElementById("demo");
					chuchua.innerHTML = spisak;
			}
}	

///////////// Delete all the fields for 1 sample. Delete entire line.///////////////////////

function runTheCode4()	{
	var decision = prompt("Êtes-vous sûr de vouloir supprimer le dernier échantillon?", "Appuyez sur le bouton 'OK' pour retirer l'échantillon");
	if (decision) {
		for (i = 0; i < (allDegust.length + 4); i++) {
			var parent = document.getElementById("otsenki");
			parent.removeChild(parent.lastChild);
		}
	}
} 

function signal()	{
	var osnovnoSadarzanie = document.getElementById("mainContent");
	var resultati = document.getElementById("result");
	var showTheResult = document.getElementById("clickMe5");

	if(osnovnoSadarzanie.style.display == 'block')	{
		runTheCalcul();
		osnovnoSadarzanie.style.display = 'none';
		resultati.style.display = 'block';	
		showTheResult.setAttribute("value", "Retour aux notes");
		
	} else {
		osnovnoSadarzanie.style.display = 'block';
		resultati.style.display = 'none';
		showTheResult.setAttribute("value", "Montrer le classement des vins");
	}
}

function changeToBg()	{
	var pragNote = document.getElementById("otklonenie");
	if((allDegust.length !== 0) || (allNotes.length !== 0) || (probaKod.length !==0) || (pragNote.value > 0))	{
		var decision = prompt("Êtes-vous sûr de vouloir changer la langue? AVERTISSEMENT! Toutes les données seront supprimées.", "Appuyez sur le bouton 'OK' pour changer la langue");
		if(decision)	{
			window.location.href = "index.html";
		}
	} else {
		window.location.href = "index.html";
	}
}

function changeToEng()	{
	var pragNote = document.getElementById("otklonenie");
	if((allDegust.length !== 0) || (allNotes.length !== 0) || (probaKod.length !==0) || (pragNote.value > 0))	{
		var decision = prompt("Êtes-vous sûr de vouloir changer la langue? AVERTISSEMENT! Toutes les données seront supprimées.", "Appuyez sur le bouton 'OK' pour changer la langue");
		if(decision)	{
			window.location.href = "degustEng.html";
		}
	} else {
		window.location.href = "degustEng.html";
	}
}

