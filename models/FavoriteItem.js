const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteItemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    itemId: {
        type: String, 
        required: true
    },
    title: {
        type: String, 
    },
    notes: {
        type: String, 
        default: ''
    }
}, {
    timestamps: true
});


favoriteItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model('FavoriteItem', favoriteItemSchema);