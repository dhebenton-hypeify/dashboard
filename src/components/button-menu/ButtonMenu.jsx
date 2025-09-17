import { Atri, Bell, Book } from "../../assets/Icons";
import './ButtonMenu.css'

export default function ButtonMenu() {
    return (
        <div className="button-menu-wrap top-bar-load-in-right-mob anim-delay  f-row top-bar-load-in-right">
            <button className="button-menu not-finished cen">
                <Bell style="trans"/>
            </button>
            <button className="button-menu not-finished cen">
                <Book style="trans"/>
            </button>
            <button className="button-menu not-finished cen atri">
                <Atri style="trans"/>
            </button>
            {/* TODO: ADD BUTTON MENU FUNCTION*/}
        </div>
    )
}