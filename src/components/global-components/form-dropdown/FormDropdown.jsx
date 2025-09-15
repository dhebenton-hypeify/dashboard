import { Chevron } from "../../../assets/Icons";
import './FormDropdown.css'

export const PlanDropdown = () => {
    return (
        <button className="input not-finished plan form-dropdown not-ready f-row g16">
            <p className="label trans">Free Plan</p>
            <p className="create-placeholder trans">Free (0 websites included)</p>
            <Chevron style="trans" />
        </button>
    )
}

export const OrganisationDropdown = () => {
    return (
        <button className="input not-finished plan form-dropdown not-ready f-row g12">
            <div className="organisation-icon trans"></div>
            <p className="label trans">Goldline Acquisitions</p>
            <Chevron style="trans" />
        </button>
    )
}