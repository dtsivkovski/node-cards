const Set = require("../models/set");

module.exports = function(app){

    // app.get('/set/create', function(req, res){
    //     // set creation page
    //     res.render('setcreation');
    // });

    // routes for set creation
    app.post('/set/create', function(req, res){
        try {
            // get info for new set
            console.log(req.body);
            const name = req.body.name;
            const description = req.body.description;

            // create new set with info
            const newSet = new Set({name: name, description: description});
            newSet.save();
        
            // Return success 
            res.status(201).json({ message: "Notecard set created successfully." });
          }
          catch(error) {
              // error code and failure message
              console.error(error);
              res.status(500).json({ message: "Failed to create new notecard set." });
          }
    });

    app.get('/set/getTester', function(req, res){
        // retrieve by setID
        const setID = "6554167a8f9b1c2d4dd69378";

        // find set by id
        const set = Set.findById(setID);
        console.log(set);

        // return set
        res.status(200).json(set);
    });


}