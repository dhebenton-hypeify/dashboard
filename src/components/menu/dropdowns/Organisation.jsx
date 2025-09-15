import { Chevron } from "../../../assets/Icons"
import './Organisation.css'

export default function Organisation() {
    return (
        <button className="organisation-toggle not-finished trans">
            <div className="organisation-icon trans"></div>
            <p className="org-label trans">Goldline Acquisitions</p>
            <p className="org-plan trans">Free Plan</p>
            <Chevron style="" />
        </button>
    )
}