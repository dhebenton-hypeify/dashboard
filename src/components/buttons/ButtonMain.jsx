import './ButtonMain.css'

export const ButtonMain = ({ children, style='', click }) => {
return (
        <button className={`button cen ${style}`} onClick={click}>
            {children}
        </button>
    )
}

export const ButtonMainBlue = ({ children, style='', click }) => {
    return (
        <button className={`button cen blue ${style}`} onClick={click}>
            {children}
        </button>
    )
}

export const ButtonMainBlueIconLight = ({ children, style='', click }) => {
    return (
        <button className={`button cen blue icon-light ${style}`} onClick={click}>
            {children}
        </button>
    )
}