import { SearchGlass } from "../../../assets/Icons";
import './Searchbar.css'

export default function SearchBar() {
    return (
        <div className="searchbar trans not-finished f-row">
            <SearchGlass 
                style="icon trans"
            />
            Search...
            {/*TODO: CREATE SEARCH FUNCTION */}
        </div>
    )
}