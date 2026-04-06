import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IndexPage from './IndexPage'
import Dashboard from './components/Dashboard'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode by adding/removing 'dark' class on HTML root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <div className="min-h-screen bg-pink-50 text-slate-800 dark:bg-slate-900 dark:text-pink-50 transition-colors duration-300">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
