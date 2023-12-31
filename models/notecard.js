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
    // array of other notecard ids that this notecard is linked to
    relatedCards: [{
        type: String,
        required: false
    }]
});

// export notecard model
module.exports = mongoose.model("Notecard", notecardSchema);