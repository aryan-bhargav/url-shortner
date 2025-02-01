const { getUser } = require("../service/auth")

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uuid;
    console.log("Cookie UUID after login:", userUid);  // Debugging line
    if (!userUid) {
        return res.redirect("/login");
    }
    const user = getUser(userUid);
    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    next();
}



// async function checkAuth(req, res, next) {

//     const userUid = req.cookies?.uid;  // this line not works

//     const user = getUser(userUid);
//     req.user = user;
//     next();
// }

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uuid;
    const user = getUser(userUid);
    console.log("User from checkAuth middleware:", user);  // Debugging line
    req.user = user;
    next();
}


module.exports = {
    restrictToLoggedInUserOnly, checkAuth,
}