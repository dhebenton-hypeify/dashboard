import { Chevron } from "../../assets/Icons"
import './DropdownToggle.css'

export const DropdownToggle = ({ style = "" }) => {
    return (
        <button className="dropdown-toggle cen">
            <Chevron />
        </button>
    )
}