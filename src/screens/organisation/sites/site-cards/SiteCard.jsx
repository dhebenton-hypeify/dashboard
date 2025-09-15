import { ButtonTrans } from "../../../../components/buttons/TransButton"
import { ThreeDots, GitHub } from "../../../../assets/Icons"
import SiteTemplatePhoto from '../../../../assets/site-photo-template.png'
import { UsageCircleStat } from "../../../../components/charts/usage-circle/UsageCircle"


export default function SiteCard() {
    return (
        <div className="site-card trans f-col g12">
            <div className="site-card-thumbnail" style={{ backgroundImage: `url(${SiteTemplatePhoto})` }}></div>
            <div className="site-card-content-wrap f-col g18">
                <div className="site-card-content-top-block">
                    <p className="site-card-heading trans">bear-essentials</p>
                    <a href="" className="site-card-link trans">bear-essentials.vercel.app</a>
                    <ButtonTrans>
                        <ThreeDots />
                    </ButtonTrans>
                </div>
                <div className="site-card-git-upload f-row g8 trans">
                    <GitHub />
                    daniil-hypeify/bear-essentials
                </div>
                <div className="f-row g20">
                    <div className="site-card-status-wrap trans f-col g10">
                        <p className="site-card-status-label trans">Status</p>
                        <p>Live</p>
                    </div>
                    <div className="site-card-status-wrap trans f-col g10">
                        <p className="site-card-status-label trans">Last Backup</p>
                        <p>5 Days Ago</p>
                    </div>
                    <UsageCircleStat progress={62}  stroke={4.3} size={39}/>
                </div>
                
            </div>
        </div>
    )
}