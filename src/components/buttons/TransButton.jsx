import './TransButton.css'

export const ButtonTrans = ({ children, style='', click}) => {
    return (
        <button className={`transbutton cen ${style}`} onClick={click}>
            {children}
        </button>
    )
}