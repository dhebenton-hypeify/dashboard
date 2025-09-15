import './ButtonSec.css'

export default function ButtonSec({ children, style='', click }) {
    return (
        <button className={`button-sec ${style}`} onClick={click}>
            {children}
        </button>
    )
}