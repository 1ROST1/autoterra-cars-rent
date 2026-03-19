import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const GA_MEASUREMENT_ID = 'G-8M8ZQFY0MK'

export default function AnalyticsTracker() {
    const location = useLocation()

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
            return undefined
        }

        // Delay dispatch until redirects settle and Helmet has updated the title.
        const timeoutId = window.setTimeout(() => {
            const pagePath = `${location.pathname}${location.search}${location.hash}`

            window.gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: pagePath,
                send_to: GA_MEASUREMENT_ID
            })
        }, 0)

        return () => window.clearTimeout(timeoutId)
    }, [location.pathname, location.search, location.hash])

    return null
}
