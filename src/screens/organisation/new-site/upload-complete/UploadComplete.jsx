import { useEffect, useState } from "react";
import { CardCreate } from "../../../../components/cards/Cards";
import "./UploadComplete.css";
import { ButtonMainBlue } from "../../../../components/buttons/ButtonMain";
import { ArrowRight, Chain } from "../../../../assets/Icons";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import confetti from "canvas-confetti";

export default function UploadComplete({ siteId }) {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [thumbnail, setThumbnail] = useState(null);

  // Fetch thumbnail from Supabase
  useEffect(() => {
    console.log("Fetching thumbnail for siteId:", siteId);
    const fetchThumbnail = async () => {
      const { data, error } = await supabase
  .from("app.sites")
  .select("thumbnail")
  .eq("id", siteId)
  .single();

      if (!error && data?.thumbnail) {
        setThumbnail(data.thumbnail);
      }
    };

    fetchThumbnail();
  }, [siteId, supabase]);

  // Confetti effect once on load
  useEffect(() => {
    confetti({
      particleCount: 120, // reduced by ~20%
      spread: 120, // wide spread
      origin: { y: 0, x: 0.5 }, // top-center
      startVelocity: 30, // softer launch
      ticks: 200, // longer life
    });
  }, []);

  return (
    <div className="content-wrap top-pad upload-new-site cen">
      <div className="wrap-small mob-pad cen">
        <CardCreate style="new-site-load-in-up site-complete f-col g32 create-organisation">
          <h2>Congratulations</h2>
          <p className="subheading">Deployment wrapped. Your site’s out there.</p>

          <div
            className="site-card-thumbnail"
            style={{
              backgroundImage: `url(${thumbnail || ""})`,
            }}
          ></div>

          <div className="f-col g16">
            <p className="label">Next Steps</p>
            <button className="next-step-button f-row g12">
              <div className="icon-wrap cen trans">
                <Chain style="trans" />
              </div>
              <span>Add a domain</span>
              <ArrowRight style="arrow trans" />
            </button>
          </div>

          <ButtonMainBlue click={() => navigate("/org")}>
            Continue to dashboard
          </ButtonMainBlue>
        </CardCreate>
      </div>
    </div>
  );
}
