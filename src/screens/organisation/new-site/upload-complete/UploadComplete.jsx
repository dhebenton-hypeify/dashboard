import { CardCreate } from "../../../../components/cards/Cards";
import './UploadComplete.css'
import SiteTemplatePhoto from '../../../../assets/site-photo-template.png'
import { ButtonMainBlue } from "../../../../components/buttons/ButtonMain";
import { ArrowRight, Chain } from "../../../../assets/Icons";
import { useNavigate } from 'react-router-dom';

export default function UploadComplete({ }) {
    const navigate = useNavigate();

    return (
        <div className="content-wrap top-pad upload-new-site cen">
            <div className="wrap-small cen">
                <CardCreate style=" site-complete f-col g40 create-organisation">
                    <h1>Let’s Get Your Site Online</h1>
                    <p className="subheading">Drop in your files or connect a repo, we’ll handle the heavy lifting from here.</p>
                    <div className="site-card-thumbnail" style={{ backgroundImage: `url(${SiteTemplatePhoto})` }}></div>
                    <div className="f-col g16">
                        <p className="label">Next Steps</p>
                        <button className="next-step-button f-row g12">
                            <div className="icon-wrap cen trans">
                                <Chain style="trans"/>
                            </div>
                            <span>Add a domain</span>
                            <ArrowRight style="arrow trans"/>
                        </button>
                    </div>
                    <ButtonMainBlue click={() => navigate("/org")}>
                        Continue to dashboard
                    </ButtonMainBlue>
                </CardCreate>
            </div>
        </div>
    )
}