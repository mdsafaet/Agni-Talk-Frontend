import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Elements that fade/slide in as they scroll into view.
const REVEAL = '.card, .rate-card, .faq-item, section h2, section h2 + p, .store-badge, .screenshot-slide'

/**
 * Wraps every page: scopes the AgniTalk styles (.agnitalk-ui), applies the page language,
 * fades the page in and reveals cards/headings with GSAP ScrollTrigger.
 */
export default function Page({ lang = 'en', children }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { opacity: 0, duration: 0.35, ease: 'power1.out', clearProps: 'opacity' })

      ScrollTrigger.batch(REVEAL, {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: true, clearProps: 'transform,opacity' },
          ),
      })
      gsap.set(REVEAL, { opacity: 0 })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Images change section heights once they arrive, so re-measure after the page has loaded.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') return undefined
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  // Text length changes with the language, so re-measure scroll positions.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [lang])

  return (
    <div ref={ref} lang={lang} className="agnitalk-ui w-full">
      {children}
    </div>
  )
}
