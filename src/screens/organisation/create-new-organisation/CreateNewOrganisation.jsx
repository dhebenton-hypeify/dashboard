import { ButtonMainBlue } from "../../../components/buttons/ButtonMain";
import ShortLink from "../../../components/buttons/ShortLink";
import { CardCreate } from "../../../components/cards/Cards";
import InviteUser from "./invite-users/InviteUser";
import { PlanDropdown } from "../../../components/global-components/form-dropdown/FormDropdown";
import { useNavigate } from 'react-router-dom';

export default function CreateNewOrganisation() {
  const navigate = useNavigate();

  return (
    <div className="cen new-org wrap">
          <CardCreate style="f-col g52 new create-organisation">
              <h3>New Organisation</h3>
              <p className="subheading">Bring your sites together under one roof, neatly grouped, easy to manage, and ready to grow.</p>
              <div className="create-block">
                <label className="label" htmlFor="organisation-name">Name</label>
                <input placeholder="Organisation Name" type="text" id="organisation-name" className="input"/>
              </div>
              <div className="create-block">
                <p className="label">Plan</p>
                <ShortLink style="not-finished" label={"Copy Link"} icon="Chain"/>
                <PlanDropdown />
              </div>
              <div className="create-block">
                <label className="label" htmlFor="new-user-email">Invite Users</label>
                <ShortLink style="not-finished" label={"Pricing"}/>
                <InviteUser />
              </div>

              <div className="f-row">
                <ButtonMainBlue click={() => navigate("/org")}>
                  Create Organisation
                </ButtonMainBlue>
              </div>
          </CardCreate>
    </div>
  )
}


