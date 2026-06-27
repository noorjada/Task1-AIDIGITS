const express = require("express");

const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");

const {

    getImage,

    saveFavorite,

    getFavorites,

    updateFavorite,

    deleteFavorite

} = require("../controllers/favoriteController");


// Public Route
router.get("/image", getImage);


// Protected Routes
router.use(verifyJWT);

router.post("/", saveFavorite);

router.get("/", getFavorites);

router.put("/:id", updateFavorite);

router.delete("/:id", deleteFavorite);

module.exports = router;