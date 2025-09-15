import { ArrowRight } from "../../../../assets/Icons"
import './Accordation.css'

export const Advanced = () => {
    return (
        <div className="form-accordation not-finished">
            <span>Advanced</span>
            <ArrowRight />
        </div>
    )
}

export const EnviormentalVariables = () => {
    return (
        <div className="form-accordation bottom not-finished">
            <span>Environmental Variables</span>
            <ArrowRight />
        </div>
    )
}