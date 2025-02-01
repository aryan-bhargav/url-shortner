const express = require("express");
const {handleGenerateNewShortURL,handleRedirectURL,handleGetAnalytics}  = require("../controllers/url")
const router = express.Router();


router.post('/',handleGenerateNewShortURL);
router.get('/:shortId',handleRedirectURL)
router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router;