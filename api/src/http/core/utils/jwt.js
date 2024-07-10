const jwt = require("jsonwebtoken");

const { JWTSECRET } = process.env;

function createToken(payload) {
    return jwt.sign(payload, JWTSECRET, {
        algorithm: "HS512",
        expiresIn: 7 * 24 * 60 * 60 * 1000 //7 days
    });
}
function verifyToken(token) {
    return jwt.verify(token, JWTSECRET);
}

module.exports = {
    createToken,
    verifyToken
}