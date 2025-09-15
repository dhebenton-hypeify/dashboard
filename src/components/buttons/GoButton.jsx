import { ArrowRight } from "../../assets/Icons";
import './GoButton.css'

export default function GoButton({ style = "", label }) {
    return (
        <button className="go-button cen">
            {label}
            <ArrowRight />
        </button>
    )
} 