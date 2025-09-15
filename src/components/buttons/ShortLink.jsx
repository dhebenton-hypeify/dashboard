import './ShortLink.css'
import { Link, Chain } from "../../assets/Icons"

export default function ShortLink({ style="", label, click, icon=""}) {
    return (
        <a className={`short-link f-row g8 ${style}`} onClick={click}>
            {label}
            {icon === "Chain" ? <Chain /> : <Link />}
        </a>
    )
}