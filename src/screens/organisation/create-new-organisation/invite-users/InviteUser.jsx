import { useState } from "react";
import { PaperPlane } from "../../../../assets/Icons";
import { ButtonMainBlue } from "../../../../components/buttons/ButtonMain";
import './InviteUser.css'


export default function InviteUser() {
    const [ inputFocus, setInputFocus ] = useState(false)

    return (
        <div className={`input not-finished f-row invite trans ${inputFocus ? 'focus' : ''}`} >
            <input onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} type="text" placeholder="Email, comma seperated" className="not-finished" id="new-user-email" />
            <ButtonMainBlue style="not-finished">
                <PaperPlane />
                Invite
            </ButtonMainBlue>
        </div>
    )
}