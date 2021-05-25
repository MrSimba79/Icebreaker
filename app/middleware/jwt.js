const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.send("No token found");
    } else {
        jwt.verify(token, process.env.SECRETJWT, (err, decoded) => {
            if (err) {
                res.status(403).json({ auth: false, msg: 'Authentication failed' });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

module.exports = verifyJWT;