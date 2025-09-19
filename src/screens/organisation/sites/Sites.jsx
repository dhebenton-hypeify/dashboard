import { useState, useEffect, useRef } from "react";
import { ArrowDown, CheckCircle, GridView, ListView, Plus } from "../../../assets/Icons";
import { ButtonMainBlueIconLight } from "../../../components/buttons/ButtonMain";
import FilterButton from "../../../components/buttons/FilterButton";
import { Search } from "../../../components/global-components/search/Search";
import { UsageCircle } from "../../../components/charts/usage-circle/UsageCircle";
import { Card } from "../../../components/cards/Cards";
import SiteCard from "./site-cards/SiteCard";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../../../components/skeleton/Skeleton";
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";

export default function Sites() {
  const [gridView, setGridView] = useState(true);
  const [sites, setSites] = useState(null); // null = loading, [] = empty
  const [usageColapse, setUsageColapse] = useState(true);

  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef(null);

  const supabase = useSupabaseClient();
  const { session } = useSessionContext();
  const navigate = useNavigate();

  // Sticky observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  // Fetch sites from org memberships
  useEffect(() => {
    if (!session) return;

    const fetchSites = async () => {
      try {
        // 1. Get org memberships
        const { data: memberships, error: memberError } = await supabase
          .schema("app")
          .from("organisation_members")
          .select("org_id")
          .eq("user_id", session.user.id);

        if (memberError) {
          console.error("Error fetching memberships:", memberError);
          setSites([]);
          return;
        }

        const orgIds = memberships.map((m) => m.org_id);
        if (orgIds.length === 0) {
          setSites([]);
          return;
        }

        // 2. Fetch sites for orgs
        const { data: sitesData, error: sitesError } = await supabase
          .schema("app")
          .from("sites")
          .select("id, name, production_url, staging_url, repo_url, thumbnail, created_at, org_id")
          .in("org_id", orgIds)
          .order("created_at", { ascending: false });

        if (sitesError) {
          console.error("Error fetching sites:", sitesError);
          setSites([]);
          return;
        }

        setSites(sitesData || []);
      } catch (err) {
        console.error("Unexpected error fetching sites:", err);
        setSites([]);
      }
    };

    fetchSites();
  }, [session, supabase]);

  return (
    <div className="content-wrap">
      <div ref={sentinelRef} style={{ height: "1px" }} />
      <div className={`menu-scroll sites-load-in f-row j-s-b ${isStuck ? "stuck" : "wrap-medium"}`}>
        <h1>Your Sites</h1>
        <ButtonMainBlueIconLight click={() => navigate("/new-site")}>
          <Plus />
          Add New Site
        </ButtonMainBlueIconLight>
      </div>

      <div className="wrap-medium mob-pad">
        <div className="f-col g32">
          <div className="f-row sites-filter-bar sites-load-in del g12">
            <Search />
            <FilterButton />
            <div className={`view-type-toggle f-row not-finished ${gridView ? "" : "list"}`}>
              <button className="cen not-finished" onClick={() => setGridView(true)}>
                <GridView />
              </button>
              <button className="cen not-finished" onClick={() => setGridView(false)}>
                <ListView />
              </button>
            </div>
          </div>

          {/* --- Loading --- */}
          {sites === null ? (
            <Skeleton style="new-site-git-repos" />

          ) : /* --- Empty state --- */ sites.length === 0 ? (
            <div className="empty-sites sites-load-in del-two f-col cen g12">
              <h4>Your organisation hasn’t uploaded a site</h4>
              <p className="subheading">Get started by uploading a new site.</p>
              <ButtonMainBlueIconLight style="not-finished">
                <Plus />
                Upload Your First Site
              </ButtonMainBlueIconLight>
            </div>

          ) : (
            /* --- Sites list --- */
            <div className="sites-wrap sites-load-in del-two sites-fade-in">
              <Card style="one f-col g20">
                <p className="label">
                  Usage <span className="usage-span">(Last 30 Days)</span>
                </p>
                <div className={`usage-block-wrap f-col ${usageColapse ? "colapse" : ""}`}>
                  <button className="usage-block not-finished f-row g10">
                    <UsageCircle progress={80} stroke={2.9} size={19} />
                    Total Sites
                    <span>{sites.length} / 5</span>
                  </button>
                  <button className="usage-block not-finished f-row g10">
                    <UsageCircle progress={62} stroke={2.9} size={19} />
                    Storage
                    <span>62GB / 100GB</span>
                  </button>
                  <button className="usage-block not-finished f-row g10">
                    <UsageCircle progress={76} stroke={2.9} size={19} />
                    Bandwidth
                    <span>380GB / 500GB</span>
                  </button>
                  <button className="usage-block not-finished f-row g10">
                    <UsageCircle progress={78} stroke={2.9} size={19} />
                    Traffic
                    <span>47,200 / 60,000 visits</span>
                  </button>
                  <button className="usage-block not-finished f-row g10">
                    <UsageCircle progress={70} stroke={2.9} size={19} />
                    Users/Seats
                    <span>7 / 10</span>
                  </button>
                  <button className="usage-block not-finished f-row g10">
                    <UsageCircle progress={66} stroke={2.9} size={19} />
                    Backups
                    <span>8 / 12</span>
                  </button>
                  <button className="usage-block not-finished f-row g10">
                    <UsageCircle progress={50} stroke={2.9} size={19} />
                    Integrations
                    <span>3 / 6</span>
                  </button>
                  <button className="usage-block not-finished f-row g10">
                    <UsageCircle progress={62} stroke={2.9} size={19} />
                    Submissions
                    <span>1,240 / 2,000</span>
                  </button>
                </div>
                <button
                  onClick={() => setUsageColapse((prev) => !prev)}
                  className={`cen card-height-toggle ${usageColapse ? "" : "open"}`}
                >
                  <ArrowDown />
                </button>
              </Card>

              <div className="f-col g20">
                <p className="label">Needs Attention</p>
                <Card style="f-row site-list-status g10">
                  <CheckCircle />
                  <p className="site-list-status">All sites are running smoothly.</p>
                </Card>
              </div>

              <div className="sites-card-wrap g20">
                {sites.map((site) => (
                  <SiteCard
                    key={site.id}
                    name={site.name}
                    productionUrl={site.production_url || site.staging_url}
                    repoUrl={site.repo_url}
                    createdAt={site.created_at}
                    thumbnail={site.thumbnail}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
