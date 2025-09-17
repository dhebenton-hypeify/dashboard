import { GitBranch, GitHub } from "../../../assets/Icons"
import { CardCreate } from "../../../components/cards/Cards"
import BitBucket from "../../../assets/BitBucket.svg"
import GitLab from "../../../assets/GitLab.svg"
import ShortLink from "../../../components/buttons/ShortLink"
import GoButton from "../../../components/buttons/GoButton"
import { useState, useEffect } from "react"
import { Search } from "../../../components/global-components/search/Search"
import GitRepo from "./git-repo-card/GitRepoCard"
import { OrganisationDropdown } from "../../../components/global-components/form-dropdown/FormDropdown"
import { ButtonMainBlue } from "../../../components/buttons/ButtonMain"
import { useNavigate } from "react-router-dom"
import { Advanced, EnviormentalVariables } from "./accordations/Accordations"
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"

export default function NewSite() {
  const [pickedRepo, setPickedRepo] = useState(null)
  const [gitSignedIn, setGitSignedIn] = useState(false)
  const [repos, setRepos] = useState([])
  const [nameInputFocus, setNameInputFocus] = useState(false)
  const [siteName, setSiteName] = useState("")
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [siteRow, setSiteRow] = useState(null)

  const navigate = useNavigate()
  const supabase = useSupabaseClient()
  const { session } = useSessionContext()

  // GitHub OAuth
  const handleGitHubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173/new-site", // change in prod
        scopes: "repo",
      },
    })
    if (error) console.error("GitHub login error:", error)
    else console.log("GitHub OAuth started:", data)
  }

  // Fetch GitHub repos
  useEffect(() => {
    const fetchRepos = async () => {
      if (!session) return
      const token = session?.provider_token
      if (!token) return

      try {
        const res = await fetch("https://api.github.com/user/repos", {
          headers: { Authorization: `token ${token}` },
        })
        const data = await res.json()
        if (Array.isArray(data)) {
          setRepos(data)
          setGitSignedIn(true)
        } else {
          console.error("Unexpected repos response:", data)
        }
      } catch (err) {
        console.error("Error fetching repos:", err)
      }
    }
    fetchRepos()
  }, [session])

  // Fetch default organisation from profile or fallback
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return
      const { data: profile, error } = await supabase
        .schema("app")
        .from("profiles")
        .select("last_org_id")
        .eq("id", session.user.id)
        .single()

      if (error) {
        console.error("Error fetching profile:", error)
        return
      }

      if (profile?.last_org_id) {
        setSelectedOrg({ id: profile.last_org_id })
      } else {
        console.warn("No last_org_id in profile — defaulting to user org")
        setSelectedOrg({ id: session.user.id })
      }
    }
    fetchProfile()
  }, [session, supabase])

  // Pick repo + create site + call /prepare
  const handlePickRepo = async (repo) => {
    console.log("---- handlePickRepo START ----")
    console.log("Session:", session)
    console.log("SelectedOrg:", selectedOrg)
    console.log("Picked Repo:", repo)

    if (!session) {
      console.error("❌ No session — user not logged in")
      alert("You must be logged in to continue.")
      return
    }
    if (!selectedOrg) {
      console.error("❌ No organisation selected")
      alert("Please select an organisation before continuing.")
      return
    }

    try {
      // 1. Insert site row
      console.log("➡️ Inserting site row into Supabase…")
      const { data: site, error } = await supabase
        .schema("app")
        .from("sites")
        .insert([{
          name: repo.name || "unknown-name",
          repo_url: repo.clone_url || repo.ssh_url || "MISSING_URL",
          created_by: session.user.id,
          org_id: selectedOrg.id,
        }])
        .select()
        .maybeSingle()

      if (error) throw new Error("Supabase insert failed: " + error.message)
      if (!site) throw new Error("No site row returned from insert")
      console.log("✅ Site created in DB:", site)

      // 2. Call backend /prepare
      console.log("➡️ Calling backend /prepare…")
      const res = await fetch("https://dashboard.hypeify.io/api/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoUrl: repo.clone_url || repo.ssh_url,
          siteName: repo.name,
        }),
      })

      console.log("Prepare response status:", res.status)
      const prep = await res.json().catch(() => ({}))
      console.log("Prepare response JSON:", prep)

      if (!prep.success) {
        throw new Error("Prepare failed: " + (prep.error || "unknown error"))
      }

      // 3. Don’t update Supabase staging_url here — backend handles it

      // 4. Save to state
      setPickedRepo(repo)
      setSiteRow(site)
      setSiteName(repo.name)
      console.log("✅ Site created (waiting for backend to update staging_url):", site)
      console.log("---- handlePickRepo END ----")
    } catch (err) {
      console.error("❌ handlePickRepo error:", err)
      if (err?.stack) console.error(err.stack)
    }
  }

  // Deploy = call backend /publish (server will capture thumbnail + update DB)
  const handleDeploy = async () => {
    if (!siteRow) {
      console.error("❌ Missing siteRow")
      alert("No site prepared yet.")
      return
    }

    try {
      const res = await fetch("https://dashboard.hypeify.io/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteName: siteRow.name, siteId: siteRow.id }), // include siteId
      })
      const pub = await res.json()
      if (!pub.success) throw new Error(pub.error || "Publish failed")

      const { data: updated, error: updateError } = await supabase
        .schema("app")
        .from("sites")
        .update({ production_url: pub.url })
        .eq("id", siteRow.id)
        .select()
        .single()

      console.log("Supabase update result (publish):", { updated, updateError })
      if (updateError) throw updateError
      if (!updated) throw new Error("Supabase update returned null on publish")

      console.log("✅ Production ready (thumbnail handled by backend):", updated)
      navigate(`/org/${updated.org_id}/${updated.name}/upload-complete`)
    } catch (err) {
      console.error("❌ handleDeploy error:", err)
      if (err?.stack) console.error(err.stack)
    }
  }

  return (
    <div className="content-wrap top-pad upload-new-site cen">
      <div className={`wrap-small mob-pad ${pickedRepo ? "f-col cen g52" : "new-site-repo"}`}>
        {pickedRepo ? (
          <CardCreate style="new-site new-site-load-in-up create-organisation">
            <h3>New Site</h3>
            <div className="new-site-source-wrap">
              <p>Importing From GitHub</p>
              <GitHub style="git" />
              {pickedRepo.full_name}
              <GitBranch style="branch" />
              <span>main</span>
            </div>
            <p className="subheading">Choose where you want to create the project and give it a name</p>
            <div className="f-col g14">
              <p className="label">Organisation</p>
              <OrganisationDropdown onSelect={setSelectedOrg} />
            </div>
            <div className="f-col g14">
              <p className="label">Site Name</p>
              <div className={`input trans ${nameInputFocus ? "focus" : ""}`}>
                <input
                  id="site-name"
                  type="text"
                  className="no-scale-mob"
                  placeholder="eg. hypeify"
                  onFocus={() => setNameInputFocus(true)}
                  onBlur={() => setNameInputFocus(false)}
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
            </div>
            <Advanced />
            <EnviormentalVariables />
            <ButtonMainBlue click={handleDeploy}>
              Deploy {siteName || "Site"}
            </ButtonMainBlue>
          </CardCreate>
        ) : (
          <>
            <h1 className="new-site-load-in-up">Let’s Get Your Site Online</h1>
            <p className="subheading new-site-load-in-up">
              Drop in your files or connect a repo, we’ll handle the heavy lifting from here.
            </p>
            <CardCreate style="import-git-prov f-col g24 del new-site-load-in-up">
              <p className="label">Import Git Repository</p>
              {!gitSignedIn ? (
                <CardCreate style="f-col select-git-prov g8">
                  <p className="subheading-two">
                    Select a Git provider to import an existing project from a Git Repository.
                  </p>
                  <button
                    className="select-git-provider github cen g10"
                    onClick={handleGitHubLogin}
                  >
                    <GitHub />
                    Continue With Github
                  </button>
                  <button className="select-git-provider gitlab cen not-finished g10">
                    <img src={GitLab} className="trans" />
                    Continue With GitLab
                  </button>
                  <button className="select-git-provider cen bitbucket not-finished g10">
                    <img src={BitBucket} className="trans" />
                    Continue With BitBucket
                  </button>
                  <ShortLink label={"Manage Login Connections"} />
                </CardCreate>
              ) : (
                <div className="f-col git-repos-wrap g6">
                  <Search />
                  <div className="f-col git-repos-wrap-scroll g6" data-lenis-prevent>
                    {repos.map((repo) => (
                      <GitRepo
                        key={repo.id}
                        name={repo.name}
                        updatedAt={repo.updated_at}
                        avatarUrl={repo.owner?.avatar_url}
                        onClick={() => handlePickRepo(repo)}
                      />
                    ))}
                  </div>
                </div>
              )}
              <GoButton label={"Use Git Repository URL Instead"} />
            </CardCreate>
            <CardCreate style="del new-site-load-in-up f-col not-finished unavailable g24">
              <p className="label">Drop Your Site Folder <span>(Unavailable Right Now)</span></p>
              <div className="empty-sites"></div>
            </CardCreate>
          </>
        )}
      </div>
    </div>
  )
}
