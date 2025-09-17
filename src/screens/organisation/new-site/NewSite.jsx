import {  GitBranch, GitHub } from '../../../assets/Icons'
import { CardCreate } from '../../../components/cards/Cards'
import BitBucket from '../../../assets/BitBucket.svg'
import GitLab from '../../../assets/GitLab.svg'
import ShortLink from '../../../components/buttons/ShortLink'
import GoButton from '../../../components/buttons/GoButton'
import { useState } from 'react'
import { Search } from '../../../components/global-components/search/Search'
import GitRepo from './git-repo-card/GitRepoCard'
import { OrganisationDropdown } from '../../../components/global-components/form-dropdown/FormDropdown'
import { ButtonMainBlue } from '../../../components/buttons/ButtonMain'
import { useNavigate } from 'react-router-dom';
import { Advanced, EnviormentalVariables } from './accordations/Accordations'

export default function NewSite() {
    const [ pickedRepo, setPickedRepo ] = useState(true)
    const [ gitSignedIn, setGitSignedIn ] = useState(true)

    const [nameInputFocus, setNameInputFocus ] = useState(false)

    const navigate = useNavigate();

    return (
        <div className="content-wrap top-pad upload-new-site cen ">
            <div className={`wrap-small mob-pad ${pickedRepo ? 'f-col cen g52' : 'new-site-repo'}`}>
                {pickedRepo ?
                    (
                        <>
                            <CardCreate style='new-site create-organisation'>
                                <h3>New Site</h3>
                                <div className="new-site-source-wrap">
                                    <p>Importing From GitHub</p>
                                    <GitHub style='git'/>
                                    dhebenton-hypeify/site-auth
                                    <GitBranch style='branch'/>
                                    <span>main</span>
                                </div>
                                <p className="subheading">Choose where you want to create the project and give it a name</p>
                                <div className="f-col g14">
                                    <p className="label">Organisation</p>
                                    <OrganisationDropdown />
                                </div>
                                <div className="f-col g14">
                                    <p className="label">Site Name</p>
                                    <div className={`input trans ${nameInputFocus ? 'focus' : ''}`}>
                                        <input
                                            id="site-name"
                                            type="text"
                                            className="no-scale-mob"
                                            placeholder="eg. hypeify"
                                            onFocus={() => setNameInputFocus(true)}
                                            onBlur={() => setNameInputFocus(false)}
                                        />
                                    </div>
                                </div>
                                <Advanced />
                                <EnviormentalVariables />
                                <ButtonMainBlue click={() => navigate("./complete")}>
                                    Deploy bear-essentials
                                </ButtonMainBlue>
                            </CardCreate>
                        </>
                    ):(
                    <>
                        <h1>Let’s Get Your Site Online</h1>
                        <p className="subheading">Drop in your files or connect a repo, we’ll handle the heavy lifting from here.</p>
                        <CardCreate style='import-git-prov f-col g24'>
                            <p className="label">Import Git Repository</p>
                            {!gitSignedIn ?
                                (
                                    <CardCreate style='f-col select-git-prov g8'>
                                        <p className="subheading-two">Select a Git provider to import an existing project from a Git Repository.</p>
                                        <button className="select-git-provider github cen g10">
                                            <GitHub />
                                            Continue With Github
                                        </button>
                                        <button className="select-git-provider gitlab cen not-finished g10">
                                            <img src={GitLab} className='trans'/>
                                            Continue With GitLab
                                        </button>
                                        <button className="select-git-provider cen bitbucket not-finished  g10">
                                            <img src={BitBucket} className='trans'/>
                                            Continue With BitBucket
                                        </button>
                                        <ShortLink label={"Manage Login Connections"} />
                                    </CardCreate>
                                ) : (
                                    <div className='f-col git-repos-wrap g6'>
                                        <Search />
                                        <GitRepo />
                                        <GitRepo />
                                        <GitRepo />
                                        <GitRepo />
                                    </div>
                                )
                            }
                            <GoButton label={"Use Git Repository URL Instead"}/>
                        </CardCreate>
                        <CardCreate style='f-col not-finished unavailable g24'>
                            <p className="label">Drop Your Site Folder <span>(Unavailable Right Now)</span></p>
                            <div className="empty-sites"></div>
                        </CardCreate>
                    </>
                    )
                }
            </div>
        </div>
    )
}