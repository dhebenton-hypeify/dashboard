import { GitHub } from '../../../../assets/Icons'
import './GitRepoCard.css'

export default function GitRepo({}) {
    return (
        <button className="git-repo-card f-row g10">
            <div className='git-repo-thumbnail cen trans'>
                <GitHub />
            </div>
            hypeify-site
            <span className='trans'>6h ago</span>
        </button>
    )
}