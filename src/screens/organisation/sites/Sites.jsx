import { useState, useEffect, useRef } from "react";
import { ArrowDown, CheckCircle, GridView, ListView, Plus } from "../../../assets/Icons";
import { ButtonMainBlueIconLight } from "../../../components/buttons/ButtonMain";
import FilterButton from "../../../components/buttons/FilterButton";
import { Search } from "../../../components/global-components/search/Search";
import { UsageCircle } from "../../../components/charts/usage-circle/UsageCircle";
import { Card } from "../../../components/cards/Cards";
import SiteCard from "./site-cards/SiteCard";
import { useNavigate } from 'react-router-dom';


export default function Sites() {
    const [ gridView, setGridView ] = useState(true)
    const [ sites, setSites ] = useState(false)
    const [ usageColapse, setUsageColapse ] = useState(true)

    const [isStuck, setIsStuck] = useState(false);
    const sentinelRef = useRef(null);
    
    const navigate = useNavigate();


    useEffect(() => {
    const observer = new IntersectionObserver(
            ([entry]) => setIsStuck(!entry.isIntersecting),
            { threshold: 0 }
        );

        if (sentinelRef.current) observer.observe(sentinelRef.current);
            return () => observer.disconnect();
    }, []);

    return (
        <div className="content-wrap">
            <div ref={sentinelRef} style={{ height: "1px" }} />
            <div className={`menu-scroll f-row j-s-b ${isStuck ? "stuck" : "wrap-medium"}`} >
                <h1>Your Sites</h1>
                <ButtonMainBlueIconLight click={() => navigate("/new-site")}>
                    <Plus />
                    Add New Site
                </ButtonMainBlueIconLight>
            </div>
            <div className="wrap-medium">
                <div className="f-col g32">
                    <div className="f-row sites-filter-bar g12">
                        <Search />
                        <FilterButton />
                        <div className={`view-type-toggle f-row not-finished ${gridView ? '' : 'list'}`}>
                            <button className="cen not-finished" onClick={() => setGridView(true)}>
                                <GridView />
                            </button>
                            <button className="cen not-finished" onClick={() => setGridView(false)}>
                                <ListView />
                            </button>
                        </div>
                    </div>
                    { sites ?
                        (<div className="empty-sites f-col cen g12">
                            <h4>Your organisation hasn’t uploaded a site</h4>
                            <p className="subheading">Get started by uploading a new site.</p>
                            <ButtonMainBlueIconLight style="not-finished">
                                <Plus />
                                Upload Your First Site
                            </ButtonMainBlueIconLight>
                        </div>)
                        :
                        (
                        <div className="sites-wrap">
                            <Card style="one f-col g20">
                                <p className="label">Usage <span className="usage-span">(Last 30 Days)</span></p>
                                <div className={`usage-block-wrap f-col ${usageColapse ? 'colapse' : ''}`}>
                                    <button className="usage-block not-finished f-row g10">
                                        <UsageCircle progress={80} stroke={2.9} size={19} />
                                        Total Sites
                                        <span>4 / 5</span>
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
                                <button onClick={() => setUsageColapse(prev => !prev)} className={`cen card-height-toggle ${usageColapse ? '' : 'open'}`}>
                                    <ArrowDown />
                                </button>
                            </Card>
                            <div className="f-col g20">
                                <p className="label">Needs Attention</p>
                                <Card style="f-row g10">
                                    <CheckCircle />
                                    <p className="site-list-status">All sites are running smoothly.</p>
                                </Card>
                            </div>
                            <div className="sites-card-wrap g20">
                                <SiteCard />
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}