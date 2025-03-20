const Contact = require("../models/Contact");

// ContactController.js
const createContact =  async (req, res) => {
    // Your logic here
    try {
        const { Email, Message, Subject } = req.body;
        if (!Email || !Message || !Subject) {
            return res.status(401).json("all field are required");
        }
        //create post object
        const contactObj = {

            Email,
            Message,
            Subject
        }

        const newContact = new Contact(contactObj);
        const saveContact = await newContact.save();
        res.status(201).json({ message: "Contact created successfully", data: saveContact });
    } catch (error) {
        res.status(500).json(error.message);

    }
};

const fetchAllContact = (req, res) => {
    // Your logic here
    res.status(200).json({ message: "Fetched all contacts" });
};

module.exports = { createContact, fetchAllContact };

