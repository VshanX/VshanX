const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxGroupSize: {
        type: Number,
        required: true
    },
    destinations: [{
        type: String,
        required: true
    }],
    includedServices: [{
        type: String
    }],
    images: [{
        type: String
    }],
    availableDates: [{
        type: Date
    }],
    guideInfo: {
        name: String,
        experience: String,
        languages: [String]
    },
    difficulty: {
        type: String,
        enum: ['easy', 'moderate', 'challenging'],
        default: 'moderate'
    },
    category: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tour', tourSchema);