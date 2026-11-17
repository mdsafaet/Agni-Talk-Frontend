import { useContext } from 'react'
import { LenisContext } from '../components/shared/SmoothScroll'

/** Returns the Lenis instance (or null while it is starting / when reduced motion is on). */
export const useLenis = () => useContext(LenisContext)
