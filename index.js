const dotenv=require("dotenv")
dotenv.config();
const express = require("express");

const app = express();
const path = require("path");
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser")

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const {restrictToLoggedInUserOnly , checkAuth} = require("./middleware/auth")

const staticRoute = require("./routes/staticRouter");
const URLS = require("./models/url");

connectToMongoDB(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/",checkAuth, staticRoute);
app.use("/user", userRoute);

// Start server
app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`);
});
