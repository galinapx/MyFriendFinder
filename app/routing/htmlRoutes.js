var path = require("path");

module.exports = function(app) {
    //the code below handles when users visit a certain page. 
    app.get("/survey", function(req, res){
        res.sendFile(path.join(__dirname, "/../public/survey.html"))
    })
    app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"))  
    }) 
}


