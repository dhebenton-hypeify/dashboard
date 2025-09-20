import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useParams } from "react-router-dom"
import { ArrowRight } from "../../../../assets/Icons"
import { Card } from "../../../../components/cards/Cards"
import { UsageCircleStat } from "../../../../components/charts/usage-circle/UsageCircle"

export default function DeploymentsTable() {
  const { siteId } = useParams()
  const supabase = useSupabaseClient()
  const [deployments, setDeployments] = useState([])

  useEffect(() => {
    if (!siteId) return

    const fetchDeployments = async () => {
      const { data, error } = await supabase
        .schema("app")
        .from("site_deployments")
        .select(`
          id,
          deployment_number,
          commit_message,
          status,
          build_duration,
          deployed_at,
          lighthouse_score,
          created_by,
          profiles:created_by (
            username
          )
        `)
        .eq("site_id", siteId)
        .order("deployed_at", { ascending: false })

      if (error) {
        console.error("Error fetching deployments:", error)
        return
      }

      setDeployments(data || [])
    }

    fetchDeployments()
  }, [siteId, supabase])

  const formatDate = (ts) => {
    if (!ts) return "—"
    return new Date(ts).toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <Card style="flex last-deploy-table sites-card-fade-up f-col g24">
      <p className="label trans">Deployments</p>
      <table className="deployments-table">
        <tbody>
          <tr className="thead">
            <th>Deploy ID</th>
            <th>Status</th>
            <th>Duration</th>
            <th className="usage-circle-td">Committer</th>
            <th className="usage-circle-td">Timestamp</th>
            <th className="usage-circle-td">Lighthouse</th>
            <th className="table-arrow"></th>
          </tr>

          {deployments.map((dep) => (
            <tr key={dep.id} className="deployment trans">
              <td className="f-col g12">
                <p className="table-deploy-id trans">#{dep.deployment_number}</p>
                <p className="label trans">{dep.commit_message || "—"}</p>
              </td>
              <td>
                <div className="f-col a-f-s">
                  <p className="last-deployments-table-status trans">
                    {dep.status || "—"}
                  </p>
                </div>
              </td>
              <td>
                <p className="label trans">{dep.build_duration || "—"}</p>
              </td>
              <td className="usage-circle-td">
                <p className="label trans">{dep.profiles?.username || "—"}</p>
              </td>
              <td className="usage-circle-td">
                <p className="label trans">{formatDate(dep.deployed_at)}</p>
              </td>
              <td className="usage-circle-td">
                <div className="f-col a-f-s">
                  <UsageCircleStat
                    size={38}
                    stroke={3.6}
                    progress={dep.lighthouse_score || 0}
                    style="deployments-table-stat"
                  />
                </div>
              </td>
              <td className="table-arrow">
                <div className="f-col a-f-e">
                  <ArrowRight style="trans" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
