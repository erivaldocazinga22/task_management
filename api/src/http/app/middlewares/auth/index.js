const { verifyToken } = require("../../../core/utils/jwt");

function validateToken(request, response, next) {
    const headersAuth = request.headers['authorization'];
    if (!headersAuth) {
        return response.status(401).json({ auth: false, message: 'No token provided.' });
    }

    const token = headersAuth.split(" ")[1];

    if (!token) {
        return response.status(401).json({ auth: false, message: 'No token provided.' });
    }
    
    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return response.status(401).json({ auth: false, message: 'Token invalido.' });
        }
        request.user = decoded;
        request.token = token;
        next();
    } catch (error) {
        return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    } 
}

module.exports = {
    authToken: validateToken
}