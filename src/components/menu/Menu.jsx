import { ArrowRight, Ship } from "../../assets/Icons"
import Organisation from "./dropdowns/Organisation"
import { OrgTabs, SiteSettingsTabs, SiteTabs } from "./Tabs"
import './Menu.css'
import { ButtonTrans } from "../buttons/TransButton"
import MenuControls from "./menu-controls-dropdown/MenuControls"
import { useState } from "react"
import { useLocation, useMatch  } from "react-router-dom"


export const MenuOrg = ({setShowMobileNavigation, showMobileNavigation}) => {
    const [ navigationState, setNavigationState ] = useState('expand')
    const [ navigationHover, setNavigationHover ] = useState(false)

    const [ mobileShow, setMobileShow ] = useState(true) 

    const { pathname } = useLocation()

    const siteMatch = useMatch("/org/:orgId/site/*");
    const isSite = Boolean(siteMatch);


    function handleNavigationHover() {
        setNavigationHover(true)
        setTimeout(() => setNavigationHover(false), 200)
    }

    return (
        <div className={`menu-wrap ${navigationState} ${showMobileNavigation ? 'show' : "hide"}`} onClick={() => setShowMobileNavigation(false)}>
            <div onMouseEnter={() => handleNavigationHover()} className={`menu org dropdown-wrap ${navigationState} ${navigationHover ? 'hover' : ''} f-col g8`}>
                <Organisation />
                <div className="f-col g8 menu-tabs-wrap">{isSite ? <SiteTabs/> : <OrgTabs />}</div>
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