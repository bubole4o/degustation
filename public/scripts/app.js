/* 

{
	_id: "xx",
	name: "id na vino",
	mark: [
		{
			personId: 'xx',
			mark: '100'
		}
	]
}

*/



var digustatorTemplate = `
	<div class="digustator" id="_ID_">
		<input class="name" type="text" value="_NAME_"></input>
		<button class="savePerson">Save</button>
		<button class="deletePerson">Delete</button>
	</div>
`;


var wineTemplate = `
	<div class="wine" id="_ID_">
		<input class="name" type="text" value="_NAME_"></input>
		<div class="marks">
		
		</div>
	</div>
`;



function savePerson(e) {
	var container =  $(e.target).parent();
	var nameElement = container.children('.name')[0];
	var $nameElement = $(nameElement);
	
	$.ajax({
		type: "PATCH",
		url: "/digustator/" + container.attr('id'),
		data: {
			name: $nameElement.val()
		},
		success: function(data) {
			alert('Done');		
		}
	});
};

function addPerson(data) {
	console.log('SERVER DATA', data);
	var elDigustator = digustatorTemplate.replace('_ID_', data._id).replace('_NAME_', data.name);
	$('#people').append($(elDigustator));
	refreshButtons();
};

function refreshButtons() {
	$('.savePerson').unbind('click').click(savePerson);
	$('.deletePerson').unbind('click').click(deletePerson);
}


/*** API CALLS ***/

function deletePerson(e) {
	var container =  $(e.target).parent();
	var nameElement = container.children('.name')[0];
	var $nameElement = $(nameElement);
	
	$.ajax({
		type: "DELETE",
		url: "/digustator/" + container.attr('id'),
		success: function(data) {
			getPeople();		
		}
	});
}

function addDigustator() {

	$.ajax({
		type: "POST",
		url: "/digustator",
		data: {
			name: "Digustator"
		},
		success: function(data) {
			addPerson(data);			
		}
	});
	
}

function getPeople() {
	$('#people').empty();
	$.ajax({
		type: "GET",
		url: "/digustator?$limit=50",
		success: function(response) {
			response.data.forEach(function(person) {
				addPerson(person);
			});			
			
			// now get the wine
			getWines();
		}
	});
}	


/*** WINE ***/

function addWineElement(data) {
	var elWine = wineTemplate.replace('_ID_', data._id).replace('_NAME_', data.name);
	$('#wine').append($(elWine));
}

function renderMarks() {
	$('.wine').each(function() {
		var wineId = $(this).attr('id');
		var $marks = $($(this).children('.marks')[0]);
		$marks.empty();
		$('.digustator').each(function() {
			$marks.append('<input type="text" class="sigle-mark" data-person="' + $(this).attr('id') + '"></input>');
		});
	});
	
	$('.sigle-mark').blur(updateWine);
}

function addWine() {
	$.ajax({
		type: "POST",
		url: "/wine",
		data: {
			name: "Enter name..."
		},
		success: function(data) {
			addWineElement(data);	
			renderMarks();
		}
	});
}


function getWines() {
	$('#wine').empty();
	$.ajax({
		type: "GET",
		url: "/wine?$limit=50",
		success: function(response) {
			response.data.forEach(function(person) {
				addWineElement(person);
			});			
			
			// render marks
			renderMarks();
		}
	});
}	


function updateWine() {
	
	var $this = $(this);
	var $marks =  $this.parent();
	var $wine = $marks.parent();
	var wineId = $wine.attr('id');
	
	var marks = [];
	$marks.children().each(function() {
		marks.push({
			personId: $(this).data('person'),
			mark: $(this).val()
		})
	});
	
	$.ajax({
		type: "PATCH",
		url: "/wine/" + wineId,
		data: {
			marks: marks
		},
		success: function(data) {
			console.log('wine saved');		
		}
	});
}


$(document).ready(function() {
	console.debug('loaded application file');
	
	$('#clickMe1').click(function() {
		addDigustator();
	});
	
	$('#clickMe3').click(addWine);
	
	getPeople();
	
});