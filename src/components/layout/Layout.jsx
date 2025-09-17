import { Outlet } from 'react-router-dom'
import TopBar from '../topbar/TopBar'
import { MenuOrg, MenuSiteSettings } from '../menu/Menu'
import { useEffect, useRef, useState } from "react"
import Lenis from "@studio-freight/lenis"
import { useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()
    const contentRef = useRef(null)

    const isNewSite = pathname.startsWith('/new-site')
    const isOrg = pathname.startsWith('/org')
    const isSite = pathname.startsWith('/org/sites')
    const isSiteSettings = pathname.startsWith('/org/site/settings')


    useEffect(() => {
        if (!contentRef.current) return

        const lenis = new Lenis({
            wrapper: contentRef.current,
            content: contentRef.current.firstElementChild,
            duration: 1,
            easing: (t) => 1 - Math.pow(2, -10 * t), 
            smoothWheel: true,
            smoothTouch: false,
            
    })

    window.lenis = lenis

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    return () => {
      if (lenis.destroy) lenis.destroy()
    }
    }, [])

    const [ showMobileNavigation, setShowMobileNavigation ] = useState(false)
    

    return (
        <>  
            { isOrg && <MenuOrg setShowMobileNavigation={setShowMobileNavigation} showMobileNavigation={showMobileNavigation} />}
            { isSiteSettings && <MenuSiteSettings />  }
            <div className='flex content' ref={contentRef}>
                <TopBar style={`${isNewSite ? 'general' : 'wrap-medium'}`} setShowMobileNavigation={setShowMobileNavigation} showMobileNavigation={showMobileNavigation} />
                <Outlet />
            </div>
        </>
    )
}