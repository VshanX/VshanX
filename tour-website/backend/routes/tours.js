const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');

// GET all tours
router.get('/', async (req, res) => {
    try {
        const tours = await Tour.find().sort({ createdAt: -1 });
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single tour by ID
router.get('/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new tour
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            duration,
            price,
            maxGroupSize,
            destinations,
            includedServices,
            images,
            availableDates,
            guideInfo,
            difficulty,
            category,
            featured
        } = req.body;

        // Basic validation
        if (!title || !description || !duration || !price || !maxGroupSize || !destinations || !category) {
            return res.status(400).json({ 
                message: 'Please provide all required fields: title, description, duration, price, maxGroupSize, destinations, and category' 
            });
        }

        const newTour = new Tour({
            title,
            description,
            duration,
            price,
            maxGroupSize,
            destinations: Array.isArray(destinations) ? destinations : [destinations],
            includedServices: includedServices || [],
            images: images || [],
            availableDates: availableDates || [],
            guideInfo: guideInfo || {},
            difficulty: difficulty || 'moderate',
            category,
            featured: featured || false
        });

        const savedTour = await newTour.save();
        res.status(201).json({
            message: 'Tour created successfully!',
            tour: savedTour
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update tour
router.put('/:id', async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        
        res.json({
            message: 'Tour updated successfully!',
            tour: updatedTour
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE tour
router.delete('/:id', async (req, res) => {
    try {
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
        
        if (!deletedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        
        res.json({ message: 'Tour deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;