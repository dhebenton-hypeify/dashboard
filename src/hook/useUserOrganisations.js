import { useEffect, useState } from "react"
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"

export function useUserOrganisations() {
  const supabase = useSupabaseClient()
  const { session } = useSessionContext()
  const [organisations, setOrganisations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user) return

    const fetchOrgs = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .schema("app")
        .from("organisations")
        .select("id, name, icon_url, organisation_members!inner(user_id)")
        .eq("organisation_members.user_id", session.user.id)

      if (error) {
        console.error("Error fetching organisations:", error)
      } else {
        setOrganisations(data)
      }
      setLoading(false)
    }

    fetchOrgs()
  }, [session, supabase])

  return { organisations, loading }
}
