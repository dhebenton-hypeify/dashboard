import { DropdownToggle } from "../../buttons/DropdownToggle";
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Chevron, SearchGlass, Check, Plus } from "../../../assets/Icons";
import { Skeleton } from "../../skeleton/Skeleton";

export default function OrgDropdownToggle ({}) {
    const supabase = useSupabaseClient()
    const { session } = useSessionContext()
    const navigate = useNavigate()

    const [organisations, setOrganisations] = useState([])
    const [currentOrg, setCurrentOrg] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [dropdownAnimation, setDropdownAnimation] = useState(true)
    const [ searchFocus, setSearchFocus ] = useState(false)
    const wrapRef = useRef(null)

    useEffect(() => {
    if (!session?.user) return

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

    const handleOrgSelect = (org) => {
        setCurrentOrg(org)
        navigate(`/org/${org.id}/sites`)
    }

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
        <div className={`dropdown-wrap  ${dropdownAnimation ? '' : ''}`}>
            <button className="organisation-toggle g8 org trans top-bar-load-in-left-mob anim-delay" onClick={toggleDropdown}>
                { !loading ?
                    <img
                        src={currentOrg?.icon_url}
                        alt="Org icon"
                        className="organisation-icon menu-org-load-in"
                    /> : 
                    <Skeleton style="top-bar-skeleton" />
                }
                <Chevron />
            </button>
            {dropdownOpen && (
                <>
                    <div className={`background-blur mobile trans ${dropdownAnimation ? 'fade-out' : ''}`} onClick={toggleDropdown}></div>
                    <div
                        className={`dropdown f-col g6 ${
                        dropdownAnimation ? "" : "open"
                        } organisation`}
                    >
                        <div className={`dropdown-search-wrap f-row ${searchFocus ? 'focus' : ''}`}>
                            <div className="dropdown-search-icon-wrap cen">
                                <SearchGlass />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for organisation"
                                onFocus={() => searchFocus(true)}
                                onBlur={() => setSearchFocus(false)}
                            />
                        </div>
                        {organisations.map((org) => (
                        <button
                            key={org.id}
                            className={`dropdown-tab org f-row g8 ${
                            currentOrg?.id === org.id ? "active" : ""
                            }`}
                            onClick={() => (handleOrgSelect(org), toggleDropdown())}
                        >
                            <img
                            src={org.icon_url}
                            alt="Org icon"
                            className="organisation-icon trans"
                            />
                            {org.name}
                            {currentOrg?.id === org.id && <Check style="check" />}
                        </button>
                        ))}
                        <div className="dropdown-bottom-block">
                        <button
                            className="dropdown-tab f-row g10 create-new"
                            onClick={() => navigate("/create-organisation")}
                        >
                            <Plus />
                            Create New Organisation
                        </button>
                        </div>
                    </div>
                </>
            )}
        </div>
        
    )
}