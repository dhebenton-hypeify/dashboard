import { ButtonTrans } from "../../../../components/buttons/TransButton"
import { ThreeDots, GitHub } from "../../../../assets/Icons"
import { UsageCircleStat } from "../../../../components/charts/usage-circle/UsageCircle"
import { Skeleton } from "../../../../components/skeleton/Skeleton"

function formatRelativeTime(dateString) {
  if (!dateString) return "Unknown"

  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHours = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMin < 1) return `${diffSec}s ago`
  if (diffHours < 1) return `${diffMin}m ago`
  if (diffDays < 1) return `${diffHours}h ago`

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
}

function formatRepoDisplay(repoUrl) {
  if (!repoUrl) return "No repo linked"

  // Strip .git if present
  const clean = repoUrl.replace(/\.git$/, "")
  // Extract owner/repo from URL
  const match = clean.match(/github\.com[:/](.+?)\/(.+)$/)
  if (match) {
    return `${match[1]}/${match[2]}`
  }
  return repoUrl
}

export default function SiteCard({
  name,
  productionUrl,
  repoUrl,
  createdAt,
  thumbnail,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="site-card trans f-col g12">
        <Skeleton style="site-card-thumbnail" />
        <div className="site-card-content-wrap f-col g18">
          <Skeleton style="site-card-heading" />
          <Skeleton style="site-card-link" />
          <Skeleton style="site-card-git-upload" />
          <div className="f-row g20">
            <Skeleton style="site-card-status" />
            <Skeleton style="site-card-status" />
            <Skeleton style="site-card-usage" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="site-card trans f-col g12">
      <div
        className="site-card-thumbnail"
        style={{ backgroundImage: `url(${thumbnail || ""})` }}
      ></div>

      <div className="site-card-content-wrap f-col g18">
        <div className="site-card-content-top-block">
          <p className="site-card-heading trans">{name}</p>
          <a
            href={productionUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="site-card-link trans"
          >
            {productionUrl || "No domain"}
          </a>
          <ButtonTrans>
            <ThreeDots />
          </ButtonTrans>
        </div>

        <div className="site-card-git-upload f-row g8 trans">
          <GitHub />
          {repoUrl ? (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-link trans"
            >
              {formatRepoDisplay(repoUrl)}
            </a>
          ) : (
            "No repo linked"
          )}
        </div>

        <div className="f-row g20">
          <div className="site-card-status-wrap trans f-col g10">
            <p className="site-card-status-label trans">Last Backup</p>
            <p>{formatRelativeTime(createdAt)}</p>
          </div>
          <div className="site-card-status-wrap trans f-col g10">
            <p className="site-card-status-label trans">Status</p>
            <p>{productionUrl ? "Live" : "Staging"}</p>
          </div>
          <UsageCircleStat progress={62} stroke={4.3} size={39} />
        </div>
      </div>
    </div>
  )
}
