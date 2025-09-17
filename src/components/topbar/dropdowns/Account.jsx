import ProfilePicture from '../../../assets/profilepicture.png'
import './Dropdown.css'

export default function Account() {
    return (
        <img src={ProfilePicture} className='top-bar-load-in-top top-bar-load-in-right-mob not-finished trans profile-picture top-bar-load-in-right'/>
    )
}