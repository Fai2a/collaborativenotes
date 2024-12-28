const jwt = require('jsonwebtoken');

// Generate Token Function
const generateToken = (payload) => {
    const secretKey = 'yourSecretKey'; // Use a secure key
    const options = {
        expiresIn: '1h', // Token expiration time (1 hour)
    };
    const token = jwt.sign(payload, secretKey, options);
    console.log(token); // Optional: log the token for debugging

    return token;
};

// Validate Token Function
const validateToken = (req, res, next) => {
    const authHeader = req.headers.token; // Look for the token in the request header
    if (authHeader) {
        jwt.verify(authHeader, 'yourSecretKey', (err, payload) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            } else {
                req.user = payload; // Attach the payload to the request object
                next(); // Call the next middleware function
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Token is not provided',
        });
    }
};

module.exports = {
    generateToken,
    validateToken
};
