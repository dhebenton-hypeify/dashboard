import { useEffect, useState } from "react"
import { Card } from "../../../../components/cards/Cards"
import { ToggleNoLabel } from "../../../../components/toggle/Toggle"
import { UsageCircleStat } from "../../../../components/charts/usage-circle/UsageCircle"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useParams } from "react-router-dom"
import { Skeleton } from "../../../../components/skeleton/Skeleton"

export default function LastDeployment() {
  const { siteId } = useParams()
  const supabase = useSupabaseClient()

  const [deployment, setDeployment] = useState(null)
  const [site, setSite] = useState(null)
  const [autoDeploys, setAutoDeploys] = useState(true)
  const [autoOptimise, setAutoOptimise] = useState(false)
  const [loading, setLoading] = useState(true)

  const formatDomain = (url) => {
    if (!url) return "—"
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`)
      return u.hostname
    } catch {
      return url
    }
  }

  const formatDate = (ts) => {
    if (!ts) return "—"
    const d = new Date(ts)
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    if (!siteId) return
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data: siteData } = await supabase
          .schema("app")
          .from("sites")
          .select("name, production_url, staging_url, thumbnail")
          .eq("id", siteId)
          .single()
        setSite(siteData || null)

        const { data: deploymentData } = await supabase
          .schema("app")
          .from("site_deployments")
          .select("*")
          .eq("site_id", siteId)
          .order("deployed_at", { ascending: false })
          .limit(1)
          .single()
        setDeployment(deploymentData || null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [siteId, supabase])

  if (loading) {
    return (
      <Card style="last-deployment-card sites-card-fade-up f-col g24 flex9 can">
        <p className="label">Last Deployment</p>
        <Skeleton style="site-thumbnail-skeleton-complete" />
      </Card>
    )
  }

  const domainUrl = site?.production_url || site?.staging_url || null
  const domainText = formatDomain(domainUrl)

  return (
    <Card style="last-deployment-card sites-card-fade-up f-col g24 flex9 can">
      <p className="label">Last Deployment</p>
      <div className="f-row flex g14">
        {domainUrl ? (
          <img
  src={site?.thumbnail || ""}
  alt=""
  className="site-card-thumbnail trans deployments-card"
  onClick={() => {
    if (domainUrl) {
      const href = domainUrl.startsWith("http") ? domainUrl : `https://${domainUrl}`
      window.open(href, "_blank", "noopener,noreferrer")
    }
  }}
  style={{ cursor: domainUrl ? "pointer" : "default" }}
/>
        ) : (
          <img
            src={site?.thumbnail || ""}
            alt=""
            className="site-card-thumbnail trans deployments-card"
          />
        )}
        <div className="f-col flex g14">
          <Card style="f-col g24">
            <div className="f-row f-wrap g32">
              <ToggleNoLabel label="Auto Deploy" isOn={autoDeploys} setIsOn={setAutoDeploys} />
              <ToggleNoLabel label="Auto Optimise" isOn={autoOptimise} setIsOn={setAutoOptimise} />
            </div>
            <div className="f-row f-wrap g20">
              <div className="f-col g12 flex">
                <p className="card-sublabel">Site</p>
                <p className="label">{site?.name}</p>
              </div>
              <div className="f-col g12 flex">
                <p className="card-sublabel">Domain</p>
                {domainUrl ? (
                  <a
                    href={domainUrl.startsWith("http") ? domainUrl : `https://${domainUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label"
                  >
                    {domainText}
                  </a>
                ) : (
                  <p className="label">—</p>
                )}
              </div>
            </div>
            <div className="f-row f-wrap g20">
              <div className="f-col g12 flex">
                <p className="card-sublabel">Branch</p>
                <p className="label">main</p>
              </div>
              <div className="f-col g12 flex">
                <p className="card-sublabel">Deployed At</p>
                <p className="label">{formatDate(deployment?.deployed_at)}</p>
              </div>
            </div>
            <div className="f-row f-wrap g20">
              <div className="f-col g12 flex">
                <p className="card-sublabel">Commit</p>
                <p className="label">{deployment?.commit_message || "—"}</p>
              </div>
              <div className="f-col g12 flex">
                <p className="card-sublabel">Build Duration</p>
                <p className="label">{deployment?.build_duration || "—"}</p>
              </div>
            </div>
          </Card>

          <Card style="f-col g32">
            <p className="label">Performance Scores</p>
            <div className="f-row last-deployment-last-stat-wrap j-s-b g20">
              <div className="f-row last-deployment-last-stat flex j-s-b g20">
                <div className="f-col flex a-f-s g14">
                  <p className="card-sublabel">Lighthouse Score</p>
                  <UsageCircleStat
                    size={78}
                    stroke={7}
                    progress={deployment?.lighthouse_score || 0}
                    style="deploy-card-stat"
                  />
                </div>
                <div className="f-col flex a-f-s g14">
                  <p className="card-sublabel">PSI Performance</p>
                  <UsageCircleStat
                    size={78}
                    stroke={7}
                    progress={deployment?.psi_performance || 0}
                    style="deploy-card-stat"
                  />
                </div>
              </div>
              <div className="f-row flex last-deployment-last-stat j-s-b g20">
                <div className="f-col flex a-f-s g14">
                  <p className="card-sublabel">PSI SEO</p>
                  <UsageCircleStat
                    size={78}
                    stroke={7}
                    progress={deployment?.psi_seo || 0}
                    style="deploy-card-stat"
                  />
                </div>
                <div className="f-col flex a-f-s g14">
                  <p className="card-sublabel">PSI Accessibility</p>
                  <UsageCircleStat
                    size={78}
                    stroke={7}
                    progress={deployment?.psi_accessibility || 0}
                    style="deploy-card-stat"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  )
}
