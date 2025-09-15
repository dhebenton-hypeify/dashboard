import { useState } from "react"
import { SearchGlass } from "../../../assets/Icons"
import './Search.css'

export const Search = ({ style = "" }) => {
    const [inputFocus, setInputFocus ] = useState(false)

    return (
        <div className={`search-wrap trans not-finished f-row ${inputFocus ? 'focus' : ''}`}>
            <div className="search-icon-wrap trans">
                <SearchGlass />
            </div>
            <input
                type="text"
                placeholder="Search for site"
                className="not-finished"
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
            />
        </div>
    )
}