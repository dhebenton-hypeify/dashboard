import { Routes, Route, Navigate } from "react-router-dom"
import { Suspense, lazy, useEffect, useState } from "react"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import Layout from "./components/layout/Layout"

import "./components/topbar/TopBar.css"
import "./screens/organisation/new-site/NewSite.css"
import "./App.css"
import "./screens/organisation/sites/site-cards/SiteCard.css"
import './components/skeleton/LoadIn.css'
import './components/menu/dropdowns/Dropdown.css'
import "./screens/organisation/sites/Sites.css"
import "./screens/organisation/create-new-organisation/CreateNewOrganisation.css"

const CreateNewOrganisation = lazy(() =>
  import("./screens/organisation/create-new-organisation/CreateNewOrganisation")
)
const Sites = lazy(() => import("./screens/organisation/sites/Sites"))
const NewSite = lazy(() => import("./screens/organisation/new-site/NewSite"))
const UploadComplete = lazy(() =>
  import("./screens/organisation/new-site/upload-complete/UploadComplete")
)
const DomainSettings = lazy(() =>
  import("./screens/site/settings/domain-settings/DomainSettings")
)

export default function App() {
  const supabase = useSupabaseClient()
  const { session, isLoading } = useSessionContext()
  const [orgRedirect, setOrgRedirect] = useState(null)

  useEffect(() => {
    if (!session) return

    const fetchOrgs = async () => {
      const { data, error } = await supabase
        .schema("app")
        .from("organisation_members")
        .select("org_id")
        .eq("user_id", session.user.id)

      if (error) {
        console.error("Error fetching organisations:", error)
        setOrgRedirect("/create-organisation")
        return
      }

      if (!data || data.length === 0) {
        setOrgRedirect("/create-organisation")
      } else {
        const lastOrg = data[data.length - 1] // simple fallback: last org in list
        setOrgRedirect(`/org/${lastOrg.org_id}/sites`)
      }
    }

    fetchOrgs()
  }, [session, supabase])

  if (isLoading) {
    return <div>Loading...</div>
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
          <Route path="/org/:id/sites" element={<Sites />} />
          <Route path="/new-site" element={<NewSite />} />
          <Route path="/new-site/complete" element={<UploadComplete />} />
          <Route path="/org/:id/site/settings/domain-settings" element={<DomainSettings />} />
          <Route
            path="/"
            element={
              orgRedirect ? (
                <Navigate to={orgRedirect} replace />
              ) : (
                <div>Loading...</div>
              )
            }
          />
        </Route>
      </Routes>
    </Suspense>
  )
}
