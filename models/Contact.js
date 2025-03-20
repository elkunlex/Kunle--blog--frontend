const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    Email : {
        type:String,
        required:true
    },
    Subject: {
        type:String,
        required:true
    },
    Message: {
        type:String,
        required:true
    },
})

module.exports = mongoose.model("Contact", ContactSchema);