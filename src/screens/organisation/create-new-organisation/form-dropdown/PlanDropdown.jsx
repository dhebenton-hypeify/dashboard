import { Chevron } from "../../../assets/Icons";
import './PlanDropdown.css'

export default function PlanDropdown() {
    return (
        <button className="input not-finished plan form-dropdown not-ready f-row g16">
            <p className="label trans">Free Plan</p>
            <p className="create-placeholder trans">Free (0 websites included)</p>
            <Chevron style="trans" />
        </button>
    )
}