import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { supabase } from "./lib/supabaseClient"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SessionContextProvider>
  </StrictMode>,
)
