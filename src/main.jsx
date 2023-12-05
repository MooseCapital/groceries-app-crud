import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HashRouter} from "react-router-dom"
import {AppContextProvider} from "./components/AppContextProvider.jsx";
//redux store & provider wrapping app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter >
        <AppContextProvider>
        <App/>
        </AppContextProvider>
    </HashRouter>
  </React.StrictMode>
)
