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
        const setID = "655445b5632d4d0b841a6e22";

        // find set by id
        Set.findById(setID)
        .exec()
        .then((set) => {
            res.status(200).json({ set });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "An error occurred." });
        });
    });


}