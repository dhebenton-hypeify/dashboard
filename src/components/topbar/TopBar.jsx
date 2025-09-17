import { Hamburger } from "../../assets/Icons"
import Logo from "../../assets/logo.svg"
import ButtonMenu from "../button-menu/ButtonMenu"
import ButtonSec from "../buttons/ButtonSec"
import Account from "./dropdowns/Account"
import Experimental from "./dropdowns/Experimental"
import Feedback from "./dropdowns/Feedback"
import OrgDropdownToggle from "./dropdowns/OrgDropdownToggle"
import SearchBar from "./searchbar/SearchBar"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"

export default function TopBar({ style = "", setShowMobileNavigation, showMobileNavigation }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const supabase = useSupabaseClient()
  const { session } = useSessionContext()

  const [lastOrgId, setLastOrgId] = useState(null)

  const isOrg = pathname.startsWith("/org")

  useEffect(() => {
    if (!session?.user) return

    const fetchLastOrg = async () => {
      const { data, error } = await supabase
        .schema("app")
        .from("profiles")
        .select("last_org_id")
        .eq("id", session.user.id)
        .single()

      if (!error && data?.last_org_id) {
        setLastOrgId(data.last_org_id)
      }
    }

    fetchLastOrg()
  }, [session, supabase])

  const handleLogoClick = () => {
    if (lastOrgId) {
      navigate(`/org/${lastOrgId}/sites`)
    }
  }

  return (
    <div className={`topbar ${style} f-row g18`}>
      <div className="f-row g18 top-bar-load-in-top">
        <img
          src={Logo}
          className={`logo trans top-bar-load-in-left ${lastOrgId ? "clickable" : "disabled"}`}
          onClick={handleLogoClick}
          alt="Logo"
        />
        {isOrg && <OrgDropdownToggle />}
      </div>
      <Feedback />
      {isOrg ? (
        <ButtonSec style="icon top-bar-load-in-left delay top-bar-load-in-right-mob" click={() => setShowMobileNavigation(prev => !prev)}>
          <Hamburger />
        </ButtonSec>
      ) : (
        <Experimental />
      )}
      <div className="seperator"></div>
      <SearchBar />
      <ButtonMenu />
      <Account />
    </div>
  )
}
