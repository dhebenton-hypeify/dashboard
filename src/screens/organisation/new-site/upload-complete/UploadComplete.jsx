import { useEffect, useState } from "react"
import { CardCreate } from "../../../../components/cards/Cards"
import "./UploadComplete.css"
import { ButtonMainBlue } from "../../../../components/buttons/ButtonMain"
import { ArrowRight, Chain } from "../../../../assets/Icons"
import { useNavigate, useParams } from "react-router-dom"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import confetti from "canvas-confetti"

export default function UploadComplete() {
  const navigate = useNavigate()
  const { siteId } = useParams()
  const supabase = useSupabaseClient()
  const [thumbnail, setThumbnail] = useState(null)
  const [siteUrl, setSiteUrl] = useState(null)

  // Fetch thumbnail + site URL from Supabase
  useEffect(() => {
    if (!siteId) return
    console.log("Fetching site details for siteId:", siteId)

    const fetchSite = async () => {
      const { data, error } = await supabase
        .schema("app")
        .from("sites")
        .select("thumbnail, production_url, staging_url")
        .eq("id", siteId)
        .single()

      if (error) {
        console.error("Site fetch error:", error)
        return
      }

      if (data) {
        setThumbnail(data.thumbnail)
        setSiteUrl(data.production_url || data.staging_url || null)
      }
    }

    fetchSite()
  }, [siteId, supabase])

  // Confetti effect once on load
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0, x: 0.5 }, // top-center
      startVelocity: 30,
      ticks: 200,
    })
  }, [])

  return (
    <div className="content-wrap top-pad upload-new-site cen">
      <div className="wrap-small mob-pad cen">
        <CardCreate style="new-site-load-in-up site-complete f-col g32 create-organisation">
          <h2>Congratulations</h2>
          <p className="subheading">Deployment wrapped. Your site’s out there.</p>

          {thumbnail ? (
            <a
              href={siteUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="site-card-thumbnail"
              style={{ backgroundImage: `url(${thumbnail})` }}
            />
          ) : (
            <div className="site-card-thumbnail" />
          )}

          <div className="f-col g16">
            <p className="label">Next Steps</p>
            <button className="next-step-button f-row g12">
              <div className="icon-wrap cen trans">
                <Chain style="trans" />
              </div>
              <span>Add a domain</span>
              <ArrowRight style="arrow trans" />
            </button>
          </div>

          <ButtonMainBlue click={() => navigate("/org")}>
            Continue to dashboard
          </ButtonMainBlue>
        </CardCreate>
      </div>
    </div>
  )
}
