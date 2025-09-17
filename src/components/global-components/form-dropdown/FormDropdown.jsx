import { Chevron } from "../../../assets/Icons";
import './FormDropdown.css'
import { useEffect, useRef, useState } from "react"

export const PlanDropdown = () => {
    return (
        <button className="input not-finished plan form-dropdown not-ready f-row g16">
            <p className="label trans">Free Plan</p>
            <p className="create-placeholder trans">Free (0 websites included)</p>
            <Chevron style="trans" />
        </button>
    )
}

import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { Skeleton } from "../../skeleton/Skeleton";

export const OrganisationDropdown = () => {
  const [currentOrg, setCurrentOrg] = useState(null)
  const [organisations, setOrganisations] = useState([])
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownAnimation, setDropdownAnimation] = useState(true)

  const wrapRef = useRef(null)
  const supabase = useSupabaseClient()
  const { session } = useSessionContext()

  // Fetch orgs + profile
  useEffect(() => {
    if (!session) return
    const fetchData = async () => {
      setLoading(true)

      const { data: orgs, error: orgError } = await supabase
        .schema("app")
        .from("organisations")
        .select("id, name, icon_url, organisation_members!inner(user_id)")
        .eq("organisation_members.user_id", session.user.id)

      if (orgError) {
        console.error("Error fetching organisations:", orgError)
        setLoading(false)
        return
      }

      const { data: profile, error: profileError } = await supabase
        .schema("app")
        .from("profiles")
        .select("last_org_id")
        .eq("id", session.user.id)
        .single()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
      }

      setOrganisations(orgs || [])
      const matched = orgs?.find((org) => org.id === profile?.last_org_id)
      setCurrentOrg(matched || orgs?.[0] || null)
      setLoading(false)
    }

    fetchData()
  }, [session, supabase])

  // Dropdown open/close
  const openDropdown = () => {
    setDropdownOpen(true)
    setTimeout(() => setDropdownAnimation(false), 1)
  }

  const closeDropdown = () => {
    setDropdownAnimation(true)
    setTimeout(() => setDropdownOpen(false), 320)
  }

  const toggleDropdown = () => {
    dropdownOpen ? closeDropdown() : openDropdown()
  }

  // Close when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return
    const handleOutside = (e) => {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target)) closeDropdown()
    }
    window.addEventListener("pointerdown", handleOutside, true)
    return () => window.removeEventListener("pointerdown", handleOutside, true)
  }, [dropdownOpen])

  return (
    <div className={`form-dropdown-wrap ${dropdownAnimation ? '' : 'open'}`} ref={wrapRef}>
      <button
        className={`input plan form-dropdown f-row g12 ${dropdownAnimation ? '' : 'focus'}`}
        onClick={toggleDropdown}
      >
        { loading ? 
            <Skeleton style="form-org-dropdown-skel"/>
            :
            <>
                <img
                    src={currentOrg?.icon_url}
                    alt="Org icon"
                    className="organisation-icon trans post-skel-fade-in menu-org-load-in"
                    />
                <p className="label post-skel-fade-in trans">
                    {currentOrg?.name}
                </p>
            </>
        }
        <Chevron style="trans" />
      </button>

      {dropdownOpen && (
        <div
          className={`dropdown-form f-col g4 ${dropdownAnimation ? "" : "open"}`}
        >
          {organisations.map((org) => (
            <button
              key={org.id}
              className="dropdown-item f-row g8"
              onClick={() => (setCurrentOrg(org), toggleDropdown())}
            >
                <img
                    src={org.icon_url}
                    alt="Org icon"
                    className="organisation-icon trans"
                />   
              {org.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}