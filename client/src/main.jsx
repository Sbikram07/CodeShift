
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { AuthProvider } from './context/AuthContext.jsx';
import { PopupProvider } from './context/PopupContext.jsx';
import { ConverterProvider } from "./context/ConverterContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      
     <PopupProvider>
       <ConverterProvider>
      <App />
      </ConverterProvider>
    </PopupProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
