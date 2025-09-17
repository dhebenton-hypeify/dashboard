import ButtonSec from "../../buttons/ButtonSec";
import { Beaker } from "../../../assets/Icons";


export default function Experimental() {
    return (
        <ButtonSec
            style="icon not-finished top-bar-load-in-left delay top-bar-load-in-right-mob"
        >
            <Beaker 
                style="trans"
            />
            {/*TODO: ADD EXPERIMENTAL FUNCTION*/}
        </ButtonSec>
    )
}