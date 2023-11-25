const { set } = require("mongoose");
const Set = require("../models/set");

module.exports = function(app){

    // app.get('/set/create', function(req, res){
    //     // set creation page
    //     res.render('setcreation');
    // });

    app.get('/set/get', function(req, res) {
        // retrieve by setID
        const setID = req.query.id;

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

    app.get('/set/getTester', function(res){
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

    app.get('/set/:setID/gallery', function(req, res){
        // retrieve by setID
        const setID = req.params.setID;

        // find set by id
        Set.findById(setID)
        .exec()
        .then((set) => {
            res.render('gallery', {set});
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "An error has occurred. " });
        });
    });

    app.get('/set/new', function(req, res){
        // set creation page
        res.render('pages/newset.ejs');
    });

    app.get('/set/:setID/edit', function(req, res){
        res.render('pages/editset.ejs');
    });

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
            res.status(201).json({ message: "Notecard set created successfully." , setID: newSet._id});
          }
          catch(error) {
              // error code and failure message
              console.error(error);
              res.status(500).json({ message: "Failed to create new notecard set." });
          }
    });

    app.post('set/:setID/addCard', function(req, res){
        // get setID
        const setID = req.params.setID;

        // get card info
        const term = req.body.term;
        const definition = req.body.definition;

        // create new notecard
        const newNotecard = new Notecard({term: term, definition: definition});
        newNotecard.save();

        // add new notecard to set
        Set.findById(setID)
        .exec()
        .then((set) => {
            set.notecards.push(newNotecard);
            set.save();
            res.status(200).json({ message: "Notecard added successfully. " });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "An error has occurred. " });
        });
    });

    app.post('set/:setID/deleteCard', function(req, res){
        // get setID
        const setID = req.params.setID;

        // get card info
        const term = req.body.term;
        const definition = req.body.definition;

        // find notecard
        Notecard.findOne({term: term, definition: definition})
        .exec()
        .then((notecard) => {
            // delete notecard
            notecard.delete();
            res.status(200).json({ message: "Notecard deleted successfully. " });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "An error has occurred. " });
        });
    });

    app.post('set/:setID/addRelation', function(req, res){
        // get setID
        const setID = req.params.setID;

        // get card info
        const term1 = req.body.term1;
        const term2 = req.body.term2;

        // find notecards within set
        set.findById(setID)
        .exec()
        .then((set) => {
            // find notecards
            const notecard1 = set.notecards.find(notecard => notecard.term == term1);
            const notecard2 = set.notecards.find(notecard => notecard.term == term2);

            // add relation
            notecard1.relatedCards.push(notecard2.term);
            notecard2.relatedCards.push(notecard1.term);

            // save notecards
            notecard1.save();
            notecard2.save();

            // return success
            res.status(200).json({ message: "Notecard relation added successfully. " });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "An error has occurred. " });
        });

    });

    app.post('/set/:setID/changeName', function(req, res){
        // get setID
        const setID = req.params.setID;

        // get new title
        const newName = req.body.name;

        // find set
        Set.findById(setID)
        .exec()
        .then((set) => {
            // change title
            set.name = newName;
            set.save();

            // return success
            res.status(200).json({ message: "Title changed successfully. " });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "An error has occurred. " });
        });
    });

    app.post('/set/:setID/changeDescription', function(req, res){
        // get setID
        const setID = req.params.setID;

        // get new description
        const newDescription = req.body.description;

        // find set
        Set.findById(setID)
        .exec()
        .then((set) => {
            // change description
            set.description = newDescription;
            set.save();

            // return success
            res.status(200).json({ message: "Description changed successfully. " });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "An error has occurred. " });
        });
    });


}