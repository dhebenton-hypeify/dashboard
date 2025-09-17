import { useState } from "react"
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { useNavigate } from "react-router-dom"

import { ButtonMainBlue } from "../../../components/buttons/ButtonMain"
import ShortLink from "../../../components/buttons/ShortLink"
import { CardCreate } from "../../../components/cards/Cards"
import InviteUser from "./invite-users/InviteUser"
import { PlanDropdown } from "../../../components/global-components/form-dropdown/FormDropdown"

export default function CreateNewOrganisation() {
  const supabase = useSupabaseClient()
  const { session } = useSessionContext()
  const navigate = useNavigate()

  const [orgName, setOrgName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCreate = async () => {
    if (!orgName.trim()) return
    setLoading(true)
    setError(null)

    try {
      const defaults = [
        "gradient_1.svg",
        "gradient_2.svg",
        "gradient_3.svg",
        "gradient_4.svg",
        "gradient_5.svg",
        "gradient_6.svg",
        "gradient_7.svg",
        "gradient_8.svg",
        "gradient_9.svg",
        "gradient_10.svg",
        "gradient_11.svg",
        "gradient_12.svg",
      ]

      const choice = defaults[Math.floor(Math.random() * defaults.length)]

      const { data: org, error: orgError } = await supabase
        .schema("app")
        .from("organisations")
        .insert([
          {
            name: orgName,
            icon_url: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/org-icon/defaults/${choice}`,
          },
        ])
        .select("id, icon_url")
        .single()

      if (orgError) throw orgError

      const { error: memberError } = await supabase
        .schema("app")
        .from("organisation_members")
        .insert([
          {
            org_id: org.id,
            user_id: session.user.id,
            role: "owner",
          },
        ])

      if (memberError) throw memberError

      // update profile with last_org_id
      const { error: profileError } = await supabase
        .schema("app")
        .from("profiles")
        .update({ last_org_id: org.id })
        .eq("id", session.user.id)

      if (profileError) throw profileError

      navigate(`/org/${org.id}/sites`)
    } catch (err) {
      console.error("CreateNewOrganisation failed:", err)
      setError("Failed to create organisation")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cen mob-pad new-org wrap menu-load-in">
      <CardCreate style="f-col g52 new create-organisation">
        <h3>New Organisation</h3>
        <p className="subheading">
          Bring your sites together under one roof, neatly grouped, easy to
          manage, and ready to grow.
        </p>

        <div className="create-block">
          <label className="label" htmlFor="organisation-name">
            Name
          </label>
          <input
            id="organisation-name"
            type="text"
            className="input"
            placeholder="Organisation Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="create-block">
          <p className="label">Plan</p>
          <ShortLink style="not-finished" label="Pricing" />
          <PlanDropdown />
        </div>

        <div className="create-block">
          <label className="label" htmlFor="new-user-email">
            Invite Users
          </label>
          <ShortLink style="not-finished" label="Copy Link" icon="Chain" />
          <InviteUser />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="f-row">
          <ButtonMainBlue click={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Organisation"}
          </ButtonMainBlue>
        </div>
      </CardCreate>
    </div>
  )
}
