import { useState, useEffect, useRef } from "react"
import { ButtonMain, ButtonMainBlueIconLight } from "../../../components/buttons/ButtonMain"
import { Plus } from "../../../assets/Icons"
import "./Deployments.css"
import { AtriSummaryDeployment } from "../../../components/atri-summary/AtriSummary"
import LastDeployment from "./components/LastDeployment"
import DeploymentsTable from "./components/DeploymentsTable"
import { useParams, useNavigate } from "react-router-dom"

export default function Deployments() {
  const [isStuck, setIsStuck] = useState(false)
  const sentinelRef = useRef(null)
  const { siteId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsStuck(!entry.isIntersecting), { threshold: 0 })
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="content-wrap top-pad">
      <div ref={sentinelRef} style={{ height: "1px" }} />
      <div className={`menu-scroll sites-card-fade-up f-row h1-mar g14 ${isStuck ? "stuck" : "general"}`}>
        <h1>Deployments</h1>
        <ButtonMain>
          <span className="mob-no-text">Deployment Settings</span>
          <span className="mob-text">Settings</span>
        </ButtonMain>
        <ButtonMainBlueIconLight click={() => navigate("/new-site")}>
          <Plus />
          <span className="mob-no-text">New Deployment</span>
        </ButtonMainBlueIconLight>
      </div>
      <div className="f-row general-padding mob-pad g20 a-s f-wrap">
        <LastDeployment />
        <AtriSummaryDeployment siteId={siteId} />
        <DeploymentsTable />
      </div>
    </div>
  )
}
