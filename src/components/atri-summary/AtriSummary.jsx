import { useEffect, useRef, useState } from "react"
import { Card } from "../cards/Cards"
import AtriLabel from "./components/AtriLabel"
import "./AtriSummary.css"
import { ArrowRight } from "../../assets/Icons"

const LABELS = {
  deployment_summary: "Deployment",
  deployment_performance: "Performance",
  deployment_comparison: "Comparison",
}

export const AtriSummaryDeployment = ({ siteId }) => {
  const containerRef = useRef(null)
  const [isChama, setIsChama] = useState(false)
  const [insights, setInsights] = useState([])

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setIsChama(entry.contentRect.width > 700)
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchInsights() {
      const res = await fetch(`https://dashboard.hypeify.io/api/insights/${siteId}/latest`)
      const json = await res.json()
      if (json.insights) {
        // Filter out raw reports
        const filtered = json.insights.filter(i => i.summary_type !== "deployment_report")
        setInsights(filtered)
      }
    }
    if (siteId) fetchInsights()
  }, [siteId])

  return (
    <Card style="can sites-card-fade-up atri-deployments f-col flex3 g12">
      <AtriLabel subheading="Generated insights from your last deploy" />
      <div
        ref={containerRef}
        className={`f-row f-wrap g12 atri-cards-wrap ${isChama ? "chama" : "no-chama"}`}
      >
        {insights.map(insight => (
          <Card key={insight.id} style="atri-card trans">
            <p className="card-sublabel">{LABELS[insight.summary_type] || "Insight"}</p>
            <ArrowRight />
            <div className="atri-text-wrap" data-lines-prevent>
              <p className="atri-insight">{insight.content}</p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
