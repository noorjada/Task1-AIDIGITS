const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/DB");
dotenv.config();
connectDB();
const app = express();
app.use(express.json()); 
app.use(cors()); 

const favoriteRouter = require('./routes/favorite');

app.get("/", (req, res) => {
    res.send("Server Running");
});
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);
app.use('/auth', authRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/favorites', favoriteRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});