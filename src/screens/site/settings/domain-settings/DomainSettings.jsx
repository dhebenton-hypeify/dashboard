import { useState, useEffect, useRef } from "react";
import { ButtonMain, ButtonMainBlue, ButtonMainBlueIconLight } from "../../../../components/buttons/ButtonMain";
import "../Settings.css";
import "./DomainSettings.css";
import { Search } from "../../../../components/global-components/search/Search";
import { Card, CardSettings, CardSettingsBlock } from "../../../../components/cards/Cards";
import { ArrowRight, CheckCircle, GitBranch, Plus } from "../../../../assets/Icons";
import ShortLink from "../../../../components/buttons/ShortLink";
import { Toggle } from "../../../../components/toggle/Toggle";
import { DropdownToggle } from "../../../../components/buttons/DropdownToggle";

export default function DomainSettings() {
  const [isStuck, setIsStuck] = useState(false);
  const [stagingFormFocus, setStagingFormFocus] = useState(false);
  const [stagingPrivate, setStagingPrivate] = useState(false);
  const [forceHTTPS, setForceHTTPS] = useState(true);
  const [redirectWWW, setReidrectWWW] = useState(true);
  const [activeTab, setActiveTab] = useState("primary");

  const sentinelRef = useRef(null);
  const scrollRef = useRef(null);

  const sections = {
    primary: useRef(null),
    staging: useRef(null),
    redirects: useRef(null),
    ssl: useRef(null),
    domains: useRef(null),
    dns: useRef(null),
  };

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsStuck(!entry.isIntersecting),
    { threshold: 0 }
  );

  if (sentinelRef.current) observer.observe(sentinelRef.current);
  return () => observer.disconnect();
}, []);


  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      let best = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
      });

      if (best) {
        const key = best.target.getAttribute("data-section");
        setActiveTab(key);
      }
    },
    {
      root: null,
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: `-20% 0px -80% 0px`,
    }
  );

  Object.values(sections).forEach((ref) => {
    if (ref.current) observer.observe(ref.current);
  });

  return () => observer.disconnect();
}, []);

const handleScrollTo = (key) => {
  const section = sections[key];
  if (section?.current && window.lenis) {
    window.lenis.scrollTo(section.current, {
      offset: -(window.innerHeight * 0.2),
      duration: 0.6,
    });

    section.current.classList.add("flash");
    setTimeout(() => {
      section.current.classList.remove("flash");
    }, 800);

    setActiveTab(key);
  }
};
  return (
    <>
      <div className="content-wrap" ref={scrollRef}>
        <div ref={sentinelRef} style={{ height: "1px" }} />
        <div
          className={`menu-scroll heading-margin-right f-row g12 ${
            isStuck ? "stuck" : "wrap-medium"
          }`}
        >
          <h1>Your Sites</h1>
          <ButtonMainBlue>Purchase A Domain</ButtonMainBlue>
          <ButtonMain>Save</ButtonMain>
        </div>

        <div className="settings-grid wrap-medium g52">
          {/* Navigation */}
          <div className="f-col g4 settings-navigation">
            <Search />
            <p className="settings-navigation-label">Site Domains</p>
            <button
              className={`settings-tab ${activeTab === "primary" ? "active" : ""}`}
              onClick={() => handleScrollTo("primary")}
            >
              Primary Domain
            </button>
            <button
              className={`settings-tab ${activeTab === "staging" ? "active" : ""}`}
              onClick={() => handleScrollTo("staging")}
            >
              Staging Domains
            </button>
            <button
              className={`settings-tab ${activeTab === "redirects" ? "active" : ""}`}
              onClick={() => handleScrollTo("redirects")}
            >
              Redirects & Rewrites
            </button>
            <button
              className={`settings-tab ${activeTab === "ssl" ? "active" : ""}`}
              onClick={() => handleScrollTo("ssl")}
            >
              SSL/TLS Certificates
            </button>
            <p className="settings-navigation-label pad-top">Your Domains</p>
            <button
              className={`settings-tab ${activeTab === "domains" ? "active" : ""}`}
              onClick={() => handleScrollTo("domains")}
            >
              Domain Management
            </button>
            <button
              className={`settings-tab ${activeTab === "dns" ? "active" : ""}`}
              onClick={() => handleScrollTo("dns")}
            >
              DNS Configurations
            </button>
          </div>

          {/* Site Domains */}
          <CardSettings style="f-col g16">
            <h2>Site Domains</h2>
            <CardSettingsBlock ref={sections.primary} dataSection="primary">
              <div className="settings-label-block">
                <p className="label">Primary Domain</p>
                <p className="subheading">The main domain where your site is hosted</p>
                <ButtonMainBlueIconLight>
                  <Plus />
                  Connect a new domain
                </ButtonMainBlueIconLight>
              </div>
              <ShortLink style="settings-card-padding" label="Learn how to set up a custom domain" />
            </CardSettingsBlock>

            <CardSettingsBlock ref={sections.staging} dataSection="staging">
              <div className="settings-label-block">
                <p className="label">Staging Domain</p>
                <p className="subheading">Configure a temporary environment to preview changes before going live</p>
              </div>
              <div className="f-row staging-domain-block g32">
                <div className={`settings-staging-domain-wrap ${stagingFormFocus ? "focus" : ""}`}>
                  <input
                    type="text"
                    className="settings-input"
                    onFocus={() => setStagingFormFocus(true)}
                    onBlur={() => setStagingFormFocus(false)}
                  />
                  <p>hypeify.io</p>
                </div>
                <p className="subheading-two">Must be alphanumeric (A-Z, 0-9) with dashes between words</p>
              </div>
              <div className="settings-label-block seperator top">
                <p className="label">Make Staging Domain Private</p>
                <p className="subheading">Restrict staging access to team members and invited users only</p>
                <Toggle isOn={stagingPrivate} setIsOn={setStagingPrivate} />
              </div>
            </CardSettingsBlock>

            <CardSettingsBlock ref={sections.redirects} dataSection="redirects">
              <div className="settings-label-block seperator">
                <p className="label">Redirects & Rewrites</p>
                <p className="subheading">Define rules for forwarding or rewriting incoming requests</p>
                <ButtonMainBlueIconLight>
                  <Plus />
                  Add a new redirect
                </ButtonMainBlueIconLight>
              </div>
              <div className="settings-label-block seperator light">
                <p className="label">Force HTTPS</p>
                <p className="subheading">Automatically redirect all traffic from HTTP to HTTPS for secure browsing</p>
                <Toggle isOn={forceHTTPS} setIsOn={setForceHTTPS} />
              </div>
              <div className="settings-label-block">
                <p className="label">Redirect www</p>
                <p className="subheading">Choose whether to redirect between www and non-www versions of your domain</p>
                <Toggle isOn={redirectWWW} setIsOn={setReidrectWWW} />
              </div>
            </CardSettingsBlock>

            <CardSettingsBlock ref={sections.ssl} dataSection="ssl">
              <div className="settings-label-block seperator">
                <p className="label">SSL/TLS Certificates</p>
                <p className="subheading">Manage encryption certificates that secure data between your site and visitors</p>
              </div>
              <div className="settings-label-block seperator light">
                <p className="label">SSL</p>
                <div className="f-row settings-status-wrap g8">
                  <CheckCircle />
                  <p>Active - Expiry: 2025-12-31</p>
                </div>
                <ButtonMain>Renew</ButtonMain>
              </div>
              <div className="settings-label-block">
                <p className="label">Custom Certificate</p>
                <p className="subheading">Not Uploaded</p>
                <ButtonMain>Upload Record</ButtonMain>
              </div>
            </CardSettingsBlock>
          </CardSettings>

          {/* Your Domains */}
          <CardSettings style="f-col g16">
            <h2>Your Domains</h2>
            <CardSettingsBlock ref={sections.domains} dataSection="domains">
              <div className="settings-label-block seperator">
                <p className="label">Domain Management</p>
                <p className="subheading">Purchase, connect, or remove domains linked to your account</p>
              </div>
              <div className="settings-label-block domain seperator light trans">
                <p className="label">goldlineacquisitions.com</p>
                <div className="f-row settings-status-wrap g8">
                  <CheckCircle />
                  <p>Active - Expiry: 2025-12-31</p>
                </div>
                <ButtonMain style="one">Refresh</ButtonMain>
                <ButtonMain style="two">Edit</ButtonMain>
                <div className="connection-branch f-row g20">
                  <ShortLink label="Connected to goldline-acquisiitons" />
                  <GitBranch style="branch" />
                  <span>Production</span>
                </div>
              </div>
              <div className="settings-label-block domain trans">
                <p className="label">bear-essentials.com</p>
                <div className="f-row settings-status-wrap g8">
                  <CheckCircle />
                  <p>Active - Expiry: 2025-12-31</p>
                </div>
                <ButtonMain style="one">Refresh</ButtonMain>
                <ButtonMain style="two">Edit</ButtonMain>
                <div className="connection-branch not-connected f-row g20">
                  <p>Not connected to any sites hosted through hypeify</p>
                </div>
              </div>
            </CardSettingsBlock>

            <CardSettingsBlock ref={sections.dns} dataSection="dns">
              <div className="settings-label-block">
                <p className="label">DNS Configurations</p>
                <p className="subheading">View, add, and edit DNS records to control how your domain connects to services</p>
                <div className="domain-dns-dropdown trans f-row g10">
                  <span>goldlineacquisitions.com</span>
                  <DropdownToggle />
                </div>
              </div>
              <div className="f-row seperator j-s-b settings-card-padding">
                <ButtonMain>Reset all records</ButtonMain>
                <ButtonMainBlueIconLight>
                  <Plus />
                  Add new record
                </ButtonMainBlueIconLight>
              </div>
              <div className="domain-dns-record trans settings-card-padding-full">
                <p className="label record-name">A</p>
                <div className="f-col g8">
                  <p className="dns-record">hypeify.io</p>
                  <p className="dns-record">46.62.144.87</p>
                </div>
                <ArrowRight />
              </div>
            </CardSettingsBlock>
          </CardSettings>
        </div>
      </div>
    </>
  );
}
