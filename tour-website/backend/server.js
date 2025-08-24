const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tour-website';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/api/tours', require('./routes/tours'));

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Tour Website API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});