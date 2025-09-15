import { Backups, Bell, Rocket, Users } from "../../assets/Icons";


export const OrgTabs = () => {
    return (
        <>
            <button className="tab active">
                <Backups />
                Sites
            </button>
            <button className="tab not-finished">
                <Bell />
                Notifications
            </button>
            <button className="tab not-finished">
                <Users />
                Organisation Members
            </button>
            <button className="tab not-finished">
                <Rocket />
                Plans & Billing
            </button>
            <button className="tab not-finished">
                <Backups />
                Organisation Settings
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