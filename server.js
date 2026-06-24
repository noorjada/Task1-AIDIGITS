const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/DB");
dotenv.config();
connectDB();
const app = express();
app.use(express.json()); 
app.use(cors()); 

app.get("/", (req, res) => {
    res.send("Server Running");
});
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});