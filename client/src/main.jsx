import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter  as Router} from "react-router-dom";
import { AuthProvider } from './context/authProvider.jsx';
import { CartContextProvider } from './context/CartContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
        <AuthProvider>
          <CartContextProvider>   
            <App/>
          </CartContextProvider>
        </AuthProvider>
      </Router>
  </React.StrictMode>
)
