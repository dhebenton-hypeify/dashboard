import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
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
  const supabase = useSupabaseClient()
  const { session, isLoading } = useSessionContext()

  if (isLoading) {
    return <div>Loading...</div> // temporary placeholder
  }

  if (!session) {
    window.location.href = "https://auth.hypeify.io"
    return null
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
