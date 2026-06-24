const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleNewUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const duplicate = await User.findOne({ username }).exec();
        if (duplicate) return res.status(409).json({ message: 'Username already exists.' }); 

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username: username,
            password: hashedPassword
        });

        res.status(201).json({ success: `User ${username} successfully registered!` });
    } catch (err) {
        next(err);
    }
};


const handleLogin = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const foundUser = await User.findOne({ username }).exec();
        if (!foundUser) return res.sendStatus(401); 

        const match = await bcrypt.compare(password, foundUser.password);
        
        if (match) {
            const roles = Object.values(foundUser.roles).filter(Boolean);

            const accessToken = jwt.sign(
                { "UserInfo": { "username": foundUser.username, "roles": roles } },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            const refreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            );

            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            res.cookie('jwt', refreshToken, { 
                httpOnly: true, 
                sameSite: 'None', 
                secure: true,   
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });

            res.json({ accessToken });
        } else {
            res.status(401).json({ message: 'Invalid password.' });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { 
    handleNewUser, 
    handleLogin 
};