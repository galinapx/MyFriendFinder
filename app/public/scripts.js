function createQuestions() {
	let q1 = "I enjoy getting to know new people.";
	let q2 = "I like to cook.";
	let q3 = "I am dependable and self-disciplined.";
	let q4 = "I like to read.";
	let q5 = "I enjoy experiencing new things.";
	let q6 = "I can often sympathize with others.";
	let q7 = "I try to respond to my emails as soon as possible.";
	let q8 = "I like being creative.";
	let q9 = "I'm European.";
	let q10 = "I love my family.";
	let questionArray = [ q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 ];
	return questionArray;
}

var questions = createQuestions();

$( "#questionDiv" ).append( '<div class="row"><div class="col-lg-12">' );
for ( var i = 0; i < questions.length; i++ ) {
	$( "#questionDiv" ).append( '<h3>Question ' + ( i + 1 ) + '</h3>' + '<p>' + questions[ i ] + '</p>' + '<select class="chosen-select dropList" id="q' + i + '">' + '<option value=""></option>' + '<option value="1">1 (Strongly Disagree)</option>' + '<option value="2">2</option>' + '<option value="3">3</option>' + '<option value="4">4</option>' + '<option value="5">5 (Strongly Agree)</option>' + '</select>' );
}
$( "#questionDiv" ).append( '<button type="submit" class="btn btn-primary" id="submitButton">Submit</button>' + '</div></div>' );
// Chosen Dropdown Setup
var config = {
	".chosen-select": {},
	".chosen-select-deselect": {
		allow_single_deselect: true
	},
	".chosen-select-no-single": {
		disable_search_threshold: 10
	},
	".chosen-select-no-results": {
		no_results_text: "Oops, nothing found!"
	},
	".chosen-select-width": {
		width: "95%"
	}
};


for ( var selector in config ) {
	$( selector ).chosen( config[ selector ] );
}
$( "#submitButton" ).on( "click", function( event ) {
	// Don't reload the page
	event.preventDefault();
	// Make sure all form elements were selected
	function userValidation() {
		// Start with correct validation
		let valid = true;
		if ( $( "#name" ).val() === "" ) {
			valid = false;
		}
		if ( $( "#image" ).val() === "" ) {
			valid = false;
		}
		// Check if yourImg begins with "http://" or "https://"
		if ( $( "#image" ).val().charAt( 4 ) !== ":" && $( "#image" ).val().charAt( 5 ) !== ":" ) {
			// If yourImg isn't "http://" or "https://", validation is incorrect
			valid = false;
		}
		// Check dropdown boxes for empty values (top values are always empty)
		$( ".chosen-select" ).each( function() {
			if ( $( this ).val() === "" ) {
				// If a valid option has not been selected, validation is incorrect
				valid = false;
			}
		} );
		// This function will return true if validation is correct, false if not
		return valid;
    }
    if ( userValidation() ) {
		// Store the user's answers
		var formAnswers = {
			"name": $( "#name" ).val().trim(),
			"photo": $( "#image" ).val().trim(),
			"answers": [
				parseInt( $( "#q0" ).val() ),
				parseInt( $( "#q1" ).val() ),
				parseInt( $( "#q2" ).val() ),
				parseInt( $( "#q3" ).val() ),
				parseInt( $( "#q4" ).val() ),
				parseInt( $( "#q5" ).val() ),
				parseInt( $( "#q6" ).val() ),
				parseInt( $( "#q7" ).val() ),
				parseInt( $( "#q8" ).val() ),
				parseInt( $( "#q9" ).val() )
			]
		};
		// POST to api/friends.
		$.post( "/api/friends", formAnswers, function( data ) {
			// Update the match modal with the correct name & image
			$( "#friendNameDiv" ).html( "<h2>" + data.name + "</h2>" );
			$( "#friendImg" ).attr( "src", data.photo );
			// Show the match modal
			$( "#myModal" ).modal( "toggle" );
		} );
	}
	// If the user validation failed
	else {
		alert( "Oops! Looks like you missed a question" );
	}
});
