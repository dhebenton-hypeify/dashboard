import { useState } from "react"
import { Atri, Cloud, Analytics, Performance, Up, Chevron, Plus } from "../../../assets/Icons"
import { ButtonMainBlueIconLight } from '../../../components/buttons/ButtonMain'
import { ButtonTrans } from '../../../components/buttons/TransButton'
import './AtriChat.css'

export default function AtriChat({}) {

    const [ inputFocus, setInputFocus ] = useState(false)

    const [ chatActivated, setChatActivated ] = useState(false)
    const [ chatHeadingRender, setChatHeadingRender ] = useState(true)

    function handleChatActivation() {
        setChatActivated(true)
        setTimeout(() => setChatHeadingRender(false), 420)
    }
    

    return (
        <div className="content-wrap-top-pad atri">
            <div className="atr-wrap f-col mob-pad g36">
                <div className="atri-heading-wrap f-col g16">
                    <div className="atri-chat-icon-wrap cen">
                        <Atri />
                    </div>
                    <h1>How can i assist you today david</h1>
                </div>
                
                <div className="atri-input-canvas-wrap g12">
                    <div className="f-col prompt-suggestions-wrap g8">
                        <button className="prompt-suggestion f-row g10">
                            <Cloud/>
                            Show me top analytics insights from the past 30 days.
                        </button>
                        <button className="prompt-suggestion f-row g10">
                            <Analytics/>
                            Compare the last two deployments and highlight improvements or regressions
                        </button>
                        <button className="prompt-suggestion f-row g10">
                            <Performance/>
                            Give me a Lighthouse breakdown for performance, accessibility, SEO, and best practices
                        </button>
                    </div>
                    <ButtonTrans style='not-finished'
                    >
                        <Plus />
                    </ButtonTrans>
                    <button className="f-row not-finished g8 atri-theme-dropdown">
                        <Atri style='atri'/>
                        General
                        <Chevron style='chevron' />
                    </button>
                    <div className={`atri-input trans ${inputFocus ? 'focus' : ''}`}>
                        <input type="text" onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} className='' placeholder='Ask your question'/>
                        <ButtonMainBlueIconLight click={handleChatActivation}>
                            <Up />
                        </ButtonMainBlueIconLight>
                    </div>
                </div>
            </div>
        </div>
    )
}