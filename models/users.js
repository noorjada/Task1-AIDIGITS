const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001 
        },
       
        Admin: {
            type: Number,
            default: 5150 
        }
    },
    refreshToken: {
        type: String,
        default: ''
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);