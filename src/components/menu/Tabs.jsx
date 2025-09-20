import { Analytics, Atri, Backups, Beaker, Bell, Cloud, Gear, Home, Integrations, Logs, Performance, Rocket, SEO, Shield, Users } from "../../assets/Icons";


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

import { useLocation, useNavigate, useParams } from "react-router-dom"
import React from "react";

export const SiteTabs = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orgId, siteId, siteName } = useParams()

  const tabs = [
    { label: "Home", icon: <Home />, path: "dashboard", group: "WORKSPACE" },
    { label: "Atri", icon: <Atri />, path: "atri", group: "WORKSPACE" },
    { label: "Analytics", icon: <Analytics />, path: "analytics", group: "WORKSPACE" },
    { label: "Performance", icon: <Performance />, path: "performance", group: "WORKSPACE" },
    { label: "SEO", icon: <SEO />, path: "seo", group: "WORKSPACE" },

    { label: "Split Testing", icon: <Beaker />, path: "split-testing", group: "TOOLS" },
    { label: "Notifications", icon: <Bell />, path: "notifications", group: "TOOLS" },
    { label: "Integrations Hub", icon: <Integrations />, path: "integrations", group: "TOOLS" },

    { label: "Deployments", icon: <Cloud />, path: "deployments", group: "MANAGEMENT" },
    { label: "Security", icon: <Shield />, path: "security", group: "MANAGEMENT" },
    { label: "Backups & Restore", icon: <Backups />, path: "backups", group: "MANAGEMENT" },
    { label: "Plans & Billing", icon: <Rocket />, path: "billing", group: "MANAGEMENT" },
    { label: "Users & Access", icon: <Users />, path: "users", group: "MANAGEMENT" },
    { label: "Logs & Reports", icon: <Logs />, path: "logs", group: "MANAGEMENT" },
    { label: "Site Settings", icon: <Gear />, path: "settings", group: "MANAGEMENT" },
  ]

  const groups = ["WORKSPACE", "TOOLS", "MANAGEMENT"]

  return (
    <>
      {groups.map((group, i) => (
        <React.Fragment key={group}>
          <p className={`menu-tab-label ${i === 0 ? "first" : ""}`}>
            {group}
          </p>
          {tabs
            .filter((tab) => tab.group === group)
            .map((tab) => {
              const fullPath = `/org/${orgId}/site/${siteId}/${siteName}/${tab.path}`
              const isActive = location.pathname.includes(`/${tab.path}`)
              return (
                <button
                  key={tab.path}
                  className={`tab menu-load-in ${isActive ? "active" : "not-finished"}`}
                  onClick={() => navigate(fullPath)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              )
            })}
        </React.Fragment>
      ))}

    </>
  )
}
