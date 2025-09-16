import Logo from '../../assets/logo.svg'
import ButtonMenu from '../button-menu/ButtonMenu'
import Account from './dropdowns/Account'
import Experimental from './dropdowns/Experimental'
import Feedback from './dropdowns/Feedback'
import OrgDropdownToggle from './dropdowns/OrgDropdownToggle'
import SearchBar from './searchbar/SearchBar'
import { useLocation } from 'react-router-dom'

export default function TopBar({ style = ""}) {
    const { pathname } = useLocation()

    const isOrg = pathname.startsWith('/org')

    return (
        <div className={`topbar ${style} f-row g18`}>
            <div className='f-row g18'>
                <img src={Logo} className='logo trans'/>
                {isOrg && <OrgDropdownToggle />}
            </div>
            <Feedback />
            <Experimental />
            <div className="seperator"></div>
            <SearchBar />
            <ButtonMenu />
            <Account />
        </div>
    )
}