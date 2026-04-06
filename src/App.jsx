import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IndexPage from './IndexPage'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'

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
    <div className="min-h-screen bg-[#fcfcfd] text-[#4e4d73] dark:bg-[#0f111a] dark:text-slate-200 transition-colors duration-300 font-sans">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
