const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.query?.accessToken) {
        token = req.query.accessToken;
    } else if (req.body?.accessToken) {
        token = req.body.accessToken;
    }

    if (!token) {
        return res.status(401).json({ message: 'Missing access token. Use Authorization: Bearer <token> or accessToken in body/query.' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired access token.' });
        if (!decoded?.UserInfo) return res.status(403).json({ message: 'Invalid token payload.' });

        req.user = decoded.UserInfo.username;
        req.userId = decoded.UserInfo.userId;
        req.roles = decoded.UserInfo.roles;

        next();
    });
};

module.exports = verifyJWT;