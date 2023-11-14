const mongoose = require("mongoose");

// create notecard schema
const notecardSchema = new mongoose.Schema({
    // term/front side of notecard
    term: {
        type: String,
        required: true
    },
    // definition / back side of notecard
    definition: {
        type: String,
        required: true
    },
    // array of other notecard objects to reference to
    references: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notecard",
        required: false
    }]
});