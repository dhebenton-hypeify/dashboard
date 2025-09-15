import { Filter } from "../../assets/Icons";
import './FilterButton.css'


export default function FilterButton() {
    return (
        <button className="filter-button not-finished cen g8">
            <Filter />
            Add Filter
        </button>
    )
}