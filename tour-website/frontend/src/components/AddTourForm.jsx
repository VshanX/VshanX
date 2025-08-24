import { useState } from 'react';
import { tourService } from '../services/api';
import './AddTourForm.css';

const AddTourForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        price: '',
        maxGroupSize: '',
        destinations: '',
        includedServices: '',
        images: '',
        availableDates: '',
        guideInfo: {
            name: '',
            experience: '',
            languages: ''
        },
        difficulty: 'moderate',
        category: '',
        featured: false
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith('guideInfo.')) {
            const fieldName = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                guideInfo: {
                    ...prev.guideInfo,
                    [fieldName]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Process form data
            const processedData = {
                ...formData,
                price: parseFloat(formData.price),
                maxGroupSize: parseInt(formData.maxGroupSize),
                destinations: formData.destinations.split(',').map(dest => dest.trim()).filter(dest => dest),
                includedServices: formData.includedServices.split(',').map(service => service.trim()).filter(service => service),
                images: formData.images.split(',').map(img => img.trim()).filter(img => img),
                availableDates: formData.availableDates.split(',').map(date => new Date(date.trim())).filter(date => !isNaN(date)),
                guideInfo: {
                    ...formData.guideInfo,
                    languages: formData.guideInfo.languages.split(',').map(lang => lang.trim()).filter(lang => lang)
                }
            };

            const response = await tourService.createTour(processedData);
            setMessage(response.message || 'Tour created successfully!');
            setMessageType('success');
            
            // Reset form
            setFormData({
                title: '',
                description: '',
                duration: '',
                price: '',
                maxGroupSize: '',
                destinations: '',
                includedServices: '',
                images: '',
                availableDates: '',
                guideInfo: {
                    name: '',
                    experience: '',
                    languages: ''
                },
                difficulty: 'moderate',
                category: '',
                featured: false
            });

        } catch (error) {
            setMessage(error.message || 'Failed to create tour');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-tour-form">
            <h2>Add New Tour</h2>
            
            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="title">Tour Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="adventure">Adventure</option>
                            <option value="cultural">Cultural</option>
                            <option value="wildlife">Wildlife</option>
                            <option value="beach">Beach</option>
                            <option value="historical">Historical</option>
                            <option value="eco">Eco Tourism</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="duration">Duration *</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="e.g., 3 days 2 nights"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="price">Price (USD) *</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="maxGroupSize">Max Group Size *</label>
                        <input
                            type="number"
                            id="maxGroupSize"
                            name="maxGroupSize"
                            value={formData.maxGroupSize}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="destinations">Destinations * (comma-separated)</label>
                    <input
                        type="text"
                        id="destinations"
                        name="destinations"
                        value={formData.destinations}
                        onChange={handleChange}
                        placeholder="e.g., Kandy, Ella, Nuwara Eliya"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="includedServices">Included Services (comma-separated)</label>
                    <input
                        type="text"
                        id="includedServices"
                        name="includedServices"
                        value={formData.includedServices}
                        onChange={handleChange}
                        placeholder="e.g., Hotel accommodation, Meals, Transportation"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images">Image URLs (comma-separated)</label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        placeholder="e.g., https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="availableDates">Available Dates (comma-separated, YYYY-MM-DD format)</label>
                    <input
                        type="text"
                        id="availableDates"
                        name="availableDates"
                        value={formData.availableDates}
                        onChange={handleChange}
                        placeholder="e.g., 2024-01-15, 2024-02-20, 2024-03-10"
                    />
                </div>

                <div className="form-section">
                    <h3>Tour Guide Information</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="guideInfo.name">Guide Name</label>
                            <input
                                type="text"
                                id="guideInfo.name"
                                name="guideInfo.name"
                                value={formData.guideInfo.name}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="guideInfo.experience">Experience</label>
                            <input
                                type="text"
                                id="guideInfo.experience"
                                name="guideInfo.experience"
                                value={formData.guideInfo.experience}
                                onChange={handleChange}
                                placeholder="e.g., 5 years"
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="guideInfo.languages">Languages (comma-separated)</label>
                        <input
                            type="text"
                            id="guideInfo.languages"
                            name="guideInfo.languages"
                            value={formData.guideInfo.languages}
                            onChange={handleChange}
                            placeholder="e.g., English, Sinhala, Tamil"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="difficulty">Difficulty Level</label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                        >
                            <option value="easy">Easy</option>
                            <option value="moderate">Moderate</option>
                            <option value="challenging">Challenging</option>
                        </select>
                    </div>
                    
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                            />
                            Featured Tour
                        </label>
                    </div>
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Creating Tour...' : 'Create Tour'}
                </button>
            </form>
        </div>
    );
};

export default AddTourForm;