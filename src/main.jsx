import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UIStateProvider } from './UIStateContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIStateProvider>
      <App />
    </UIStateProvider>
  </StrictMode>,
)
