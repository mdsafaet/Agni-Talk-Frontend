import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../../hooks/useLenis'

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
        else target.scrollIntoView({ behavior: 'auto' })
        return
      }
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, key, lenis])

  return null
}