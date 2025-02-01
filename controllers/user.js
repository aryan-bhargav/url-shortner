const UserData = require("../models/user-data");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth")


async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await UserData.create({
        name,
        email,
        password,
    });
    console.log("user creating.....")

    return res.redirect("/login");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    console.log("Received email:", email, "Received password:", password);  // Debugging line

    const user = await UserData.findOne({ email, password });

    if (!user) {
        console.log("No user found");  // Log to see if the user exists
        return res.render("login", {
            error: "invalid username or password",
        });
    }

    console.log("User found:", user);  // Debugging line
    const token = setUser(user);
    res.cookie("uuid", token);
    console.log("Redirecting to home after login");  // Debugging line
    return res.redirect("/");

}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};