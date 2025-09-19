import { useEffect, useRef, useState } from "react"
import { Card } from "../cards/Cards"
import AtriLabel from "./components/AtriLabel"
import './AtriSummary.css'
import { ArrowRight } from "../../assets/Icons"

export const AtriSummaryDeployment = () => {
    const containerRef = useRef(null)
    const [isChama, setIsChama] = useState(false)

    useEffect(() => {
        if (!containerRef.current) return

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const width = entry.contentRect.width
                setIsChama(width > 700) // only apply if width is greater than 500px
            }
        })

        observer.observe(containerRef.current)

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [])

    return (
        <Card style="can sites-card-fade-up atri-deployments f-col flex2 g12">
            <AtriLabel subheading={"Generated insights from your last deploy"} />
            <div
                ref={containerRef}
                className={`f-row f-wrap g12 atri-cards-wrap ${isChama ? "chama" : "no-chama"}`}
            >
                <Card style="atri-card trans">
                    <p className="card-sublabel">Deployments</p>
                    <ArrowRight />
                    <div className="atri-text-wrap" data-lines-prevent>
                        <p className="atri-insight">
                            Your last bear-essentials deploy went live in 1m 40s, smooth and error-free.
                            Thumbnail refreshed, site’s up at bear-essentials.hypeify.io.
                        </p>
                    </div>
                </Card>
                <Card style="atri-card trans">
                    <p className="card-sublabel">Deployments</p>
                    <ArrowRight />
                    <div className="atri-text-wrap" data-lines-prevent>
                        <p className="atri-insight">
                            Strong scores this run: 92 Performance, 88 Accessibility, 95 Best Practices, 90 SEO.
                            Vitals are quick — FCP 1.3s, LCP 1.9s, TBT 120ms.
                        </p>
                    </div>
                </Card>
                <Card style="atri-card trans">
                    <p className="card-sublabel">Deployments</p>
                    <ArrowRight />
                    <div className="atri-text-wrap" data-lines-prevent>
                        <p className="atri-insight">
                            This deploy finished in 1m 40s vs 2m 05s before, with no errors. Scores nudged up:
                            +3 Perf, +1 Best Practices, +2 SEO. LCP improved from 2.2s to 1.9s.
                        </p>
                    </div>
                </Card>
            </div>
        </Card>
    )
}
