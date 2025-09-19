import { Atri } from "../../../assets/Icons"

export default function AtriLabel({ subheading }) {
    return (
        <div className="atri-label-wrap">
            <div className="cen">
                <Atri />
            </div>
            <p className="label">Atri Insights</p>
            <p className="atri-sublabel">{subheading}</p>
        </div>
    )
}