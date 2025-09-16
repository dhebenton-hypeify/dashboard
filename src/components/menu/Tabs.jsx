import { Backups, Bell, Gear, Rocket, Users } from "../../assets/Icons";


export const OrgTabs = () => {
    return (
        <>
            <button className="tab menu-load-in active">
                <Backups />
                <span>Sites</span>
            </button>
            <button className="tab menu-load-in not-finished">
                <Bell />
                <span>Notifications</span>
            </button>
            <button className="tab menu-load-in not-finished">
                <Users />
                <span>Organisation Members</span>
            </button>
            <button className="tab menu-load-in not-finished">
                <Rocket />
                <span>Plans & Billing</span>
            </button>
            <button className="tab menu-load-in not-finished">
                <Gear />
                <span>
                    Organisation Settings
                </span>
            </button>
        </>
    )
}


export const SiteSettingsTabs = () => {
    return (
        <>
            <button className="tab settings not-finished">
                General
            </button>
            <button className="tab settings not-finished">
                Build & Deployments
            </button>
            <button className="tab settings active">
                Domain Settings
            </button>
        </>
    )
}