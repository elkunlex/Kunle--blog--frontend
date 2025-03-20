const express = require("express");
const { createContact, fetchAllContact } = require("../controllers/ContactController");

const router = express.Router();

router.post("/api/createContact", createContact);
router.get("/api/fetch-all", fetchAllContact);

module.exports = router;













module.exports = router;