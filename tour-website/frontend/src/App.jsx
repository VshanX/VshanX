import { useState } from 'react'
import AddTourForm from './components/AddTourForm'
import TourList from './components/TourList'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('tours')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tour Management System</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'tours' ? 'nav-tab active' : 'nav-tab'}
            onClick={() => setActiveTab('tours')}
          >
            View Tours
          </button>
          <button 
            className={activeTab === 'add' ? 'nav-tab active' : 'nav-tab'}
            onClick={() => setActiveTab('add')}
          >
            Add Tour
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'tours' && <TourList />}
        {activeTab === 'add' && <AddTourForm />}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Tour Management System. Built with React + Vite & Node.js + MongoDB</p>
      </footer>
    </div>
  )
}

export default App
