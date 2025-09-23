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

const Deployments = lazy(() =>
  import("./screens/site/deployments/Deployments.jsx")
)
const AtriChat = lazy(() =>
  import("./screens/site/atri/AtriChat.jsx")
)

const Dashboard = lazy(() => import('./screens/site/dashboard/Dashboard.jsx'))

export default function App() {
  const supabase = useSupabaseClient()
  const { session, isLoading } = useSessionContext()
  const [orgRedirect, setOrgRedirect] = useState(null)

  useEffect(() => {
    if (!session) return

    const fetchOrgsAndProfile = async () => {
      try {
        const { data: memberships, error: membershipsError } = await supabase
          .schema("app")
          .from("organisation_members")
          .select("org_id")
          .eq("user_id", session.user.id)

        if (membershipsError) throw membershipsError

        const { data: profile, error: profileError } = await supabase
          .schema("app")
          .from("profiles")
          .select("last_org_id")
          .eq("id", session.user.id)
          .single()

        if (profileError) throw profileError

        if (!memberships || memberships.length === 0) {
          setOrgRedirect("/create-organisation")
          return
        }

        const matched = memberships.find(m => m.org_id === profile?.last_org_id)

        if (matched) {
          setOrgRedirect(`/org/${matched.org_id}/sites`)
        } else {
          setOrgRedirect(`/org/${memberships[0].org_id}/sites`)
        }
      } catch (err) {
        console.error("Error fetching organisations/profile:", err)
        setOrgRedirect("/create-organisation")
      }
    }

    fetchOrgsAndProfile()
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
          <Route
            path="/org/:orgId/site/:siteId/:siteName/upload-complete"
            element={<UploadComplete />}
          />
          <Route path="/org/:orgId/site/:siteId/:siteName/dashboard" element={<Dashboard />} />
          <Route path="/org/:orgId/site/:siteId/:siteName/deployments" element={<Deployments />} />
          <Route path="/org/:orgId/site/:siteId/:siteName/atri" element={<AtriChat />} />
          <Route path="/org/:orgId/site/:siteId/:siteName/settings/domain-settings" element={<DomainSettings />} />
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
