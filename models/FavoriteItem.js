const mongoose = require("mongoose");

const favoriteItemSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    itemId: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    note: {
        type: String,
        default: ""
    },

    rating: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("FavoriteItem", favoriteItemSchema);