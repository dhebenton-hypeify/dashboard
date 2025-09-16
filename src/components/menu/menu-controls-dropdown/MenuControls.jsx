import { useState, useRef, useEffect } from "react"
import { ButtonTrans } from "../../buttons/TransButton"
import { CollapseControls } from "../../../assets/Icons"

export default function MenuControls({ navigationState, setNavigationState}) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [dropdownAnimation, setDropdownAnimation] = useState(true)
    const wrapRef = useRef(null)

    const openDropdown = () => {
        setDropdownOpen(true)
        setTimeout(() => setDropdownAnimation(false), 1)
    }

    const closeDropdown = () => {
        setDropdownAnimation(true)
        setTimeout(() => setDropdownOpen(false), 320)
    }

    const toggleDropdown = () => {
        dropdownOpen ? closeDropdown() : openDropdown()
    }

    useEffect(() => {
        if (!dropdownOpen) return;

        const handleOutside = (e) => {
        if (!wrapRef.current) return;
        if (!wrapRef.current.contains(e.target)) closeDropdown();
        };

        window.addEventListener('pointerdown', handleOutside, true);
        return () => window.removeEventListener('pointerdown', handleOutside, true);
    }, [dropdownOpen]);

    return (
        <div className={`dropdown-wrap menu-controls ${dropdownAnimation ? '' : 'open'}`} ref={wrapRef}>
            <ButtonTrans click={toggleDropdown}>
                <CollapseControls />
            </ButtonTrans>
            {dropdownOpen &&  
                <div className={`dropdown menu-controls ${dropdownAnimation ? '' : 'open'} f-col g4 `}>
                    <button
                        className={`dropdown-tab ${navigationState === 'expanded' ? 'active' : ''}`}
                        onClick={() => {
                            setNavigationState('expanded')
                            closeDropdown()
                        }}
                    >
                        Expanded
                    </button>

                    <button
                        className={`dropdown-tab ${navigationState === 'collapsed' ? 'active' : ''}`}
                        onClick={() => {
                            setNavigationState('collapsed')
                            closeDropdown()
                        }}
                    >
                        Collapsed
                    </button>

                    <button
                        className={`dropdown-tab ${navigationState === 'on-hover' ? 'active' : ''}`}
                        onClick={() => {
                            setNavigationState('on-hover')
                            closeDropdown()
                        }}
                    >
                        Expand On Hover
                    </button>
                </div>
            }
        </div>
    )
}