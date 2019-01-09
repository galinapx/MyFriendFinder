// API Routes

var friends = require("../data/friends");

module.exports = function(app) {

	// Show all friends available
	app.get('/api/friends', function(req, res) {
	res.json(friends);		
	});

	app.post('/api/friends', function(req, res) {
		// closest match object.
		//var results = [];

		var bestMatch = {
			 name: "",
			 photo: "",
			 friendDifference: Infinity
		   };

		   //taking a result of user server
		   var userInfo = req.body; 
		   var userScores = userInfo.scores;
		   
		   //this variable will calculate the difference between the user scores and the scores in the database. 
		   var difference; 
		   // looping through all of the friends posibilites in the database. 

		   for (var i = 0; i < friends.length; i++){
			   var currentFriends = friends[i];
			   difference = 0;
			   console.log(currentFriends.name);

			   for (var j =0; j < currentFriends.scores.length; j++){
				   var currentFriendsScores = currentFriends.scores[j];
				   var currentUserScore = userScores[j];

				   //now we calculate the difference between the scores and add them to the total difference.
				
				difference+= Math.abs(parseInt(currentUserScore) - parseInt(currentFriendsScores));
				// if the some of the differences is less than a differences of current best match. 

				if (difference <= bestMatch.friendDifference){
					bestMatch.name = currentFriends.name;
					bestMatch.photo = currentFriends.photo; 
					bestMatch.friendDifference = difference; 
					}
			   }
		   }
				   //saving a users data in the database. 
			friends.push(userInfo);
			res.json(bestMatch);

});
}