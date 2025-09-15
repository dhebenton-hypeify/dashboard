import './Cards.css'
import { forwardRef } from 'react';

export const Card = ({ children ,style = ""}) => {
    return (
        <div className={`card ${style}`}>
            {children}
        </div>
    )
};

export const CardCreate = ({ children ,style = ""}) => {
    return (
        <div className={`card ${style}`}>
            {children}
        </div>
    )
};

export const CardSettings = ({ children ,style = ""}) => {
    return (
        <div className={`card settings-card ${style}`}>
            {children}
        </div>
    )
};

export const CardSettingsBlock = forwardRef(({ dataSection, children, style = "" }, ref)  => {
    return (
        <div ref={ref} data-section={dataSection} className={`card settings-card ${style}`}>
            {children}
        </div>
    )
});