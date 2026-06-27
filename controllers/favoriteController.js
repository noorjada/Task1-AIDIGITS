const FavoriteItem = require("../models/FavoriteItem");

// Public GET Route
const getImage = async (req, res) => {
    try {
        const text = req.query.text || "Public Vault";
        const image = {
            itemId: Date.now().toString(),
            title: text,
            imageUrl: `https://dummyimage.com/600x400/000/ffffff&text=${encodeURIComponent(text)}`
        };
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Save Favorite
const saveFavorite = async (req, res) => {
    try {
        const { itemId, title, imageUrl } = req.body;
        const favorite = await FavoriteItem.create({
            userId: req.userId,
            itemId,
            title,
            imageUrl
        });
        res.status(201).json(favorite);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Favorites
const getFavorites = async (req, res) => {
    try {
        const favorites = await FavoriteItem.find({ userId: req.userId });
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Single Favorite By ID  ← جديد
const getFavoriteById = async (req, res) => {
    try {
        const favorite = await FavoriteItem.findOne({
            _id: req.params.id,
            userId: req.userId
        });
        if (!favorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.json(favorite);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Favorite
const updateFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteItem.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );
        if (!favorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.json(favorite);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Favorite
const deleteFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteItem.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });
        if (!favorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.json({ message: "Favorite deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getImage,
    saveFavorite,
    getFavorites,
    getFavoriteById,  
    updateFavorite,
    deleteFavorite
};