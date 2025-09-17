import { GitHub } from '../../../../assets/Icons'
import './GitRepoCard.css'

function timeAgo(dateString) {
  const now = new Date()
  const updated = new Date(dateString)
  const seconds = Math.floor((now - updated) / 1000)

  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function GitRepo({ name, updatedAt, avatarUrl, onClick }) {
  return (
    <button className="git-repo-card f-row g10" onClick={onClick}>
      <div className="git-repo-thumbnail cen trans">
        {avatarUrl ? (
          <img src={avatarUrl} alt={`${name} owner`} className="repo-avatar" />
        ) : (
          <GitHub />
        )}
      </div>
      {name}
      <span className="trans">{timeAgo(updatedAt)}</span>
    </button>
  )
}
