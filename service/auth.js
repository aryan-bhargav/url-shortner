const jwt = require("jsonwebtoken")
const secretKey = "fhrdh8e4yg8r4d4gdrg4awrfq@$vhg5y";
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