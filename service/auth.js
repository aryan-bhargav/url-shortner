const dotenv=require("dotenv")
dotenv.config();
const jwt = require("jsonwebtoken")

const secretKey = process.env.JWT_SECRET;
function setUser( user) {
    return jwt.sign({
        _id: user.id,
        email: user.email,
        password: user.password,
    },secretKey);
}

function getUser(token) {
    if(!token) return null;
    return jwt.verify(token,secretKey);
}
module.exports = {
    setUser, getUser,
}