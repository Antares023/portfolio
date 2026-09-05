import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App.jsx'

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
