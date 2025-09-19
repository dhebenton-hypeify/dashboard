import { Card } from "../../../../components/cards/Cards"
import { ToggleNoLabel } from "../../../../components/toggle/Toggle"
import { useState } from "react"
import { UsageCircleStat } from "../../../../components/charts/usage-circle/UsageCircle"

export default function LastDeployment({}) {

    const [ autoDeploys, setAutoDeploys ] = useState(true)
    const [ autoOptimise, setAutoOptimise ] = useState(false)

    return (
        <Card style="last-deployment-card sites-card-fade-up f-col g24 flex9 can ">
            <p className="label">Last Deployment</p>
            <div className="f-row flex g14">
                <img src={"https://ommbbnhzostnosfvgfjy.supabase.co/storage/v1/object/public/site-thumbnails/thumbnails/f4fe3d67-1128-4126-9796-cb4871afc53a.png"} alt="" className="site-card-thumbnail deployments-card" />
                <div className="f-col flex g14">
                    <Card style="f-col g24">
                        <div className="f-row f-wrap g32">
                            <ToggleNoLabel label={"Auto Deploy"} isOn={autoDeploys} setIsOn={setAutoDeploys} />
                            <ToggleNoLabel label={"Auto Optimise"} isOn={autoOptimise} setIsOn={setAutoOptimise} />
                        </div>
                        <div className="f-row f-wrap g20">
                            <div className="f-col g12 flex">
                                <p className="card-sublabel">Site</p>
                                <p className="label">hypeify-prelaunch</p>
                            </div>
                            <div className="f-col g12 flex">
                                <p className="card-sublabel">Domain</p>
                                <p className="label">www.hypeify.io</p>
                            </div>
                        </div>
                        <div className="f-row f-wrap g20">
                            <div className="f-col g12 flex">
                                <p className="card-sublabel">Branch</p>
                                <p className="label">main</p>
                            </div>
                            <div className="f-col g12 flex">
                                <p className="card-sublabel">Deployed At</p>
                                <p className="label">3 Hours Ago</p>
                            </div>
                        </div>
                        <div className="f-row f-wrap g20">
                            <div className="f-col g12 flex">
                                <p className="card-sublabel">Commit</p>
                                <p className="label">a1b2c3d</p>
                            </div>
                            <div className="f-col g12 flex">
                                <p className="card-sublabel">Build Duration</p>
                                <p className="label">43s</p>
                            </div>
                        </div>
                    </Card>
                    <Card style="f-col g32">
                        <p className="label">Performance Scores</p>
                        <div className="f-row j-s-b f-wrap g20">
                            <div className="f-col flex a-f-s g14">
                                <p className="card-sublabel">Light House Score</p>
                                <UsageCircleStat size={78} stroke={7} progress={80} style="deploy-card-stat"/>
                            </div>
                            <div className="f-col flex a-f-s g14">
                                <p className="card-sublabel">PSI Performance</p>
                                <UsageCircleStat size={78} stroke={7} progress={77} style="deploy-card-stat"/>
                            </div>
                            <div className="f-col flex a-f-s g14">
                                <p className="card-sublabel">PSI SEO</p>
                                <UsageCircleStat size={78} stroke={7} progress={97} style="deploy-card-stat"/>
                            </div>
                            <div className="f-col flex a-f-s g14">
                                <p className="card-sublabel">PSI Accessibility</p>
                                <UsageCircleStat size={78} stroke={7} progress={70} style="deploy-card-stat"/>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Card>
    )
} 