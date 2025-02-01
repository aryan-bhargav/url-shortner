const express = require("express");
const router = express.Router();
const URLDATABASE = require("../models/url");

// Route to fetch and render all URLs
router.get("/", async (req, res) => {
    try {
        if (!req.user) { return res.redirect("/login") }
        const allUrlsQuery = await URLDATABASE.find({ createdBy: req.user_id });
        console.log("heyyy")
        return res.render("home", {
            urlQuery: allUrlsQuery,
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});
module.exports = router;
