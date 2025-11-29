// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// CRITICAL: Import Bootstrap CSS here (not in index.css)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Optional: for modals, dropdowns, etc.

import './index.css' // your custom CSS (keep this AFTER Bootstrap)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)