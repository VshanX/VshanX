# Tour Management System

A full-stack web application for managing tour packages, built with React + Vite frontend and Node.js + Express + MongoDB backend.

## 🌟 Features

- ✅ **Add New Tours**: Create tour packages with detailed information
- 📋 **View All Tours**: Display all available tours in an organized grid
- 🔍 **Tour Details**: Comprehensive tour information including destinations, pricing, and guide details
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, professional interface with smooth animations

## 🛠️ Technology Stack

### Frontend
- **React 18** - User interface framework
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with Flexbox and Grid

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
tour-website/
├── backend/                 # Backend API server
│   ├── models/             # Database models
│   │   └── Tour.js         # Tour schema
│   ├── routes/             # API routes
│   │   └── tours.js        # Tour CRUD operations
│   ├── middleware/         # Custom middleware (future use)
│   ├── server.js           # Express server setup
│   ├── .env               # Environment variables
│   └── package.json       # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── AddTourForm.jsx    # Tour creation form
│   │   │   ├── AddTourForm.css    # Form styling
│   │   │   ├── TourList.jsx       # Tour display component
│   │   │   └── TourList.css       # List styling
│   │   ├── services/       # API service functions
│   │   │   └── api.js      # API calls
│   │   ├── App.jsx         # Main application component
│   │   ├── App.css         # Global styling
│   │   └── main.jsx        # Entry point
│   └── package.json        # Frontend dependencies
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tour-website
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tour-website
   ```

4. **Set up Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will open at `http://localhost:5173`

## 📊 API Endpoints

### Tours
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get single tour by ID
- `POST /api/tours` - Create new tour
- `PUT /api/tours/:id` - Update tour
- `DELETE /api/tours/:id` - Delete tour

### Tour Data Structure
```javascript
{
  "title": "Sri Lankan Cultural Heritage Tour",
  "description": "Explore ancient temples and cultural sites",
  "duration": "5 days 4 nights",
  "price": 899.99,
  "maxGroupSize": 12,
  "destinations": ["Kandy", "Sigiriya", "Dambulla"],
  "includedServices": ["Hotel accommodation", "Meals", "Transportation"],
  "images": ["url1", "url2"],
  "availableDates": ["2024-01-15", "2024-02-20"],
  "guideInfo": {
    "name": "John Silva",
    "experience": "8 years",
    "languages": ["English", "Sinhala"]
  },
  "difficulty": "moderate",
  "category": "cultural",
  "featured": false
}
```

## 🎯 Usage Guide

### Adding a New Tour

1. Click the **"Add Tour"** tab in the navigation
2. Fill in all required fields:
   - **Tour Title**: Name of your tour package
   - **Category**: Select from available categories
   - **Description**: Detailed description of the tour
   - **Duration**: Length of the tour (e.g., "3 days 2 nights")
   - **Price**: Tour cost in USD
   - **Max Group Size**: Maximum number of participants
   - **Destinations**: Comma-separated list of locations
3. Optional fields:
   - **Included Services**: What's included in the package
   - **Image URLs**: Links to tour images
   - **Available Dates**: When the tour is available
   - **Guide Information**: Tour guide details
   - **Difficulty Level**: Easy, Moderate, or Challenging
   - **Featured Tour**: Mark as featured tour
4. Click **"Create Tour"** to save

### Viewing Tours

1. Click the **"View Tours"** tab to see all tours
2. Tours are displayed in a responsive grid layout
3. Each tour card shows:
   - Title and category
   - Description and pricing
   - Destinations and services
   - Guide information
   - Available dates
   - Difficulty level

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server with hot reload
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend (production ready as-is)
cd backend
npm start
```

## 🌐 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud MongoDB instance
2. Update `MONGODB_URI` in environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern tour booking websites
- Built with love for the travel industry
- Thanks to the open-source community for amazing tools

---

**Happy touring! 🎉**