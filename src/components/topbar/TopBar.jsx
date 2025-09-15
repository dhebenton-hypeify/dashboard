import Logo from '../../assets/logo.svg'
import ButtonMenu from '../button-menu/ButtonMenu'
import Account from './dropdowns/Account'
import Experimental from './dropdowns/Experimental'
import Feedback from './dropdowns/Feedback'
import OrgDropdownToggle from './dropdowns/OrgDropdownToggle'
import SearchBar from './searchbar/SearchBar'

export default function TopBar({ style = ""}) {
    return (
        <div className={`topbar ${style} f-row g18`}>
            <img src={Logo} className='logo trans'/>
            {/*TODO: Add Logo Animation, Change Logo TO SVG Icon */}
            <Feedback />
            <Experimental />
            <div className="seperator"></div>
            <OrgDropdownToggle />
            <SearchBar />
            <ButtonMenu />
            <Account />
        </div>
    )
}