const mongoose = require("mongoose");

// create set schema
const setSchema = new mongoose.Schema({
    // name of set
    name: {
        type: String,
        required: true
    },
    // description of set
    description: {
        type: String,
        required: true
    },
    // date set was created
    created: {
        type: Date,
        default: Date.now
    },
    // array of notecard ids that this set is linked to
    notecards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notecard"
    }]
});

// export set model
module.exports = mongoose.model("Set", setSchema);