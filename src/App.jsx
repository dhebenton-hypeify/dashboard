import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import Layout from './components/layout/Layout'

import './components/topbar/TopBar.css'
import './screens/organisation/new-site/NewSite.css'
import './App.css'
import './screens/organisation/sites/site-cards/SiteCard.css'
import './screens/organisation/sites/Sites.css'
import './screens/organisation/create-new-organisation/CreateNewOrganisation.css'

const CreateNewOrganisation = lazy(() => import('./screens/organisation/create-new-organisation/CreateNewOrganisation'))
const Sites = lazy(() => import('./screens/organisation/sites/Sites'))
const NewSite = lazy(() => import('./screens/organisation/new-site/NewSite'))
const UploadComplete = lazy(() => import('./screens/organisation/new-site/upload-complete/UploadComplete'))
const DomainSettings = lazy(() => import('./screens/site/settings/domain-settings/DomainSettings'))


export default function App() {
  const session = useSession()
  const supabase = useSupabaseClient()

  // Auto-login only in localhost dev
  useEffect(() => {
    const autoLogin = async () => {
      if (
        import.meta.env.DEV &&
        window.location.hostname === "localhost" &&
        !session
      ) {
        const { error } = await supabase.auth.signInWithPassword({
          email: import.meta.env.VITE_DEV_EMAIL,
          password: import.meta.env.VITE_DEV_PASSWORD,
        })
        if (error) console.error("Auto-login failed:", error.message)
      }
    }
    autoLogin()
  }, [session, supabase])

 { /* / Redirect only in production when no session
  useEffect(() => {
    if (
      !session &&
      !(import.meta.env.DEV && window.location.hostname === "localhost")
    ) {
      window.location.href = "https://auth.hypeify.io"
    }
  }, [session])

  if (!session) return null
*/}
  return (
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/create-organisation" element={<CreateNewOrganisation />} />
          <Route path="/org" element={<Sites />} />
          <Route path="/new-site" element={<NewSite />} />
          <Route path="/new-site/complete" element={<UploadComplete />} />
          <Route path="/org/site/settings/domain-settings" element={<DomainSettings />} />
          <Route path="/" element={<Navigate to="/create-organisation" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
