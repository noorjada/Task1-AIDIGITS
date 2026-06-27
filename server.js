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
const authRouter = require('./routes/auth');

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.use('/api/auth', authRouter);
app.use('/auth', authRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/favorites', favoriteRouter);

// 404 - Route not found
app.use((req, res) => {
    res.status(404).json({ error: { message: `Route ${req.originalUrl} not found.` } });
});

// Custom Error Handler - must be last
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});