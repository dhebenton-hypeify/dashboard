import { ArrowRight, Ship } from "../../assets/Icons"
import Organisation from "./dropdowns/Organisation"
import { OrgTabs, SiteSettingsTabs } from "./Tabs"
import './Menu.css'
import { ButtonTrans } from "../buttons/TransButton"
import MenuControls from "./menu-controls-dropdown/MenuControls"
import { useState } from "react"

export const MenuOrg = ({setShowMobileNavigation, showMobileNavigation}) => {
    const [ navigationState, setNavigationState ] = useState('expanded')
    const [ navigationHover, setNavigationHover ] = useState(false)

    const [ mobileShow, setMobileShow ] = useState(true) 

    function handleNavigationHover() {
        setNavigationHover(true)
        setTimeout(() => setNavigationHover(false), 200)
    }

    return (
        <div className={`menu-wrap ${navigationState} ${showMobileNavigation ? 'show' : "hide"}`} onClick={() => setShowMobileNavigation(false)}>
            <div onMouseEnter={() => handleNavigationHover()} className={`menu org dropdown-wrap ${navigationState} ${navigationHover ? 'hover' : ''} f-col g8`}>
                <Organisation />
                <OrgTabs />
                <div className="f-row j-s-b menu-load-in">
                    <div className="change-log">
                        <ButtonTrans style="not-finished ">
                            <Ship />
                        </ButtonTrans>
                    </div>
                    <MenuControls
                        navigationState={navigationState}
                        setNavigationState={setNavigationState}
                    />
                </div>
            </div>
        </div>
    )
}

export const MenuSiteSettings = ({}) => {
    return (
        <div className={`menu settings f-col g8`}>
            <button className="f-row g10">
                <ArrowRight style="trans"/>
                Go Back
            </button>
            <SiteSettingsTabs />
        </div>
    )
}