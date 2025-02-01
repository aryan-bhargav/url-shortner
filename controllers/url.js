const shortid = require("shortid");
const URLDATABASE = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.URLDATABASE) {
        return res.status(400).json({ msg: "URL is required" });
    }

    try {
        const shortId = shortid.generate();
        await URLDATABASE.create({
            shortId: shortId,
            redirectUrl: body.URLDATABASE,
            visitHistory: [],
            createdBy: req.user._id,
        });

        // Fetch all URLs to pass to the template
        const allUrlsQuery = await URLDATABASE.find({});

        return res.render("home", {
            id: shortId,
            message: "Short URL successfully created!",
            urlQuery: allUrlsQuery, // Pass all URLs
        });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

async function handleRedirectURL(req, res) {
    const shortId = req.params.shortId;

    try {
        // Find and update the clicks the entry for the given short ID
        const entry = await URLDATABASE.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        );

        // Handle case where the short ID is not found
        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        // Redirect to the original URL
        return res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error during redirection:", error);
        return res.status(500).send("Internal Server Error");
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        // Find the analytics for the given short ID
        const results = await URLDATABASE.findOne({ shortId });

        // Handle case where the short ID is not found
        if (!results) {
            return res.status(404).send("Short URL not found");
        }

        // Return analytics data
        return res.json({
            clickedCount: results.visitHistory.length,
            analytics: results.visitHistory,
            redirectUrl: results.redirectUrl,
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectURL,
    handleGetAnalytics,
};
