import { useState } from "react"
import './Toggle.css'

export const Toggle = ({ isOn, setIsOn }) => {
    const [textFade, setTextFade] = useState(false)
    const [displayValue, setDisplayValue] = useState(isOn)

    function handleToggle() {
        setIsOn(prev => !prev)

        setTextFade(true)

        setTimeout(() => {
            setDisplayValue(prev => !prev)
            setTextFade(false)
        }, 180)
    }

    return (
        <div className="f-row toggle-whole-wrap g12">
            <p className={`trans toggle-text ${ displayValue ? `on` : ''} ${textFade ? 'fade' : ''}`}>
                {displayValue  ? 'On' : 'Off'}
            </p>
            <div className={`toggle-wrap trans ${isOn ? 'on' : 'off'}`}><button className={`toggle ${isOn ? 'on' : ''}`} onClick={handleToggle} /></div>
        </div>
    )
}
