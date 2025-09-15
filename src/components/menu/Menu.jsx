import { ArrowRight, CollapseControls, Ship } from "../../assets/Icons"
import Organisation from "./dropdowns/Organisation"
import { OrgTabs, SiteSettingsTabs } from "./Tabs"
import './Menu.css'
import { ButtonTrans } from "../buttons/TransButton"

export const MenuOrg = ({}) => {
    return (
        <div className={`menu org f-col g8`}>
            <Organisation />
            <OrgTabs />
            <div className="f-row j-s-b">
                <ButtonTrans style="not-finished">
                    <Ship />
                </ButtonTrans>
                <ButtonTrans style="not-finished">
                    <CollapseControls />
                </ButtonTrans>
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