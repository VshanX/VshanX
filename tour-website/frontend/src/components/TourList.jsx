import { useState, useEffect } from 'react';
import { tourService } from '../services/api';
import './TourList.css';

const TourList = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            setLoading(true);
            const toursData = await tourService.getAllTours();
            setTours(toursData);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to fetch tours');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return <div className="loading">Loading tours...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="tour-list">
            <div className="tour-list-header">
                <h2>Available Tours</h2>
                <button onClick={fetchTours} className="refresh-btn">
                    Refresh
                </button>
            </div>

            {tours.length === 0 ? (
                <div className="no-tours">
                    <p>No tours available. Create your first tour!</p>
                </div>
            ) : (
                <div className="tours-grid">
                    {tours.map((tour) => (
                        <div key={tour._id} className="tour-card">
                            {tour.featured && <div className="featured-badge">Featured</div>}
                            
                            <div className="tour-header">
                                <h3>{tour.title}</h3>
                                <span className={`difficulty ${tour.difficulty}`}>
                                    {tour.difficulty}
                                </span>
                            </div>

                            <div className="tour-content">
                                <div className="tour-category">{tour.category}</div>
                                <p className="tour-description">{tour.description}</p>
                                
                                <div className="tour-details">
                                    <div className="detail-item">
                                        <strong>Duration:</strong> {tour.duration}
                                    </div>
                                    <div className="detail-item">
                                        <strong>Price:</strong> {formatPrice(tour.price)}
                                    </div>
                                    <div className="detail-item">
                                        <strong>Max Group Size:</strong> {tour.maxGroupSize} people
                                    </div>
                                </div>

                                <div className="destinations">
                                    <strong>Destinations:</strong>
                                    <div className="destination-tags">
                                        {tour.destinations.map((dest, index) => (
                                            <span key={index} className="destination-tag">
                                                {dest}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {tour.includedServices.length > 0 && (
                                    <div className="included-services">
                                        <strong>Included Services:</strong>
                                        <ul>
                                            {tour.includedServices.map((service, index) => (
                                                <li key={index}>{service}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {tour.guideInfo?.name && (
                                    <div className="guide-info">
                                        <strong>Guide:</strong> {tour.guideInfo.name}
                                        {tour.guideInfo.experience && (
                                            <span> ({tour.guideInfo.experience})</span>
                                        )}
                                    </div>
                                )}

                                {tour.availableDates.length > 0 && (
                                    <div className="available-dates">
                                        <strong>Available Dates:</strong>
                                        <div className="date-tags">
                                            {tour.availableDates.slice(0, 3).map((date, index) => (
                                                <span key={index} className="date-tag">
                                                    {formatDate(date)}
                                                </span>
                                            ))}
                                            {tour.availableDates.length > 3 && (
                                                <span className="more-dates">
                                                    +{tour.availableDates.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="tour-footer">
                                <small>Created: {formatDate(tour.createdAt)}</small>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TourList;