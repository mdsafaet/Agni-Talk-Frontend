import { Link } from 'react-router-dom'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { FiSmartphone } from 'react-icons/fi'
import { bn, display } from '../../utils/lang'

function TiltBarLink({ children, label, variant = 'primary' }) {
  const handlePointerMove = (event) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const wrapper = event.currentTarget
    const rect = wrapper.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const x = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width),
    )
    const y = Math.max(
      0,
      Math.min(1, (event.clientY - rect.top) / rect.height),
    )

    wrapper.style.setProperty('--button-x', `${(0.5 - y) * 14}deg`)
    wrapper.style.setProperty('--button-y', `${(x - 0.5) * 14}deg`)
    wrapper.style.setProperty('--button-lift', '-3px')
  }

  const resetTilt = (event) => {
    const wrapper = event.currentTarget
    wrapper.style.setProperty('--button-x', '0deg')
    wrapper.style.setProperty('--button-y', '0deg')
    wrapper.style.setProperty('--button-lift', '0px')
  }

  const variantStyles =
    variant === 'primary'
      ? 'border-white/15 bg-[#0052CC] text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)] hover:border-white/30 hover:bg-[#0061f2]'
      : 'border-white/20 bg-white text-[#003366] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.28)] hover:bg-[#F8FAFF]'

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      className="group relative [perspective:800px]"
    >
      <Link
        to="/download"
        aria-label={label}
        className={`
          relative inline-flex h-[50px] min-w-[162px]
          shrink-0 items-center rounded-2xl border px-4
          font-agni-body font-normal not-italic
          [transform-style:preserve-3d]
          transition-[transform,background-color,border-color,box-shadow]
          duration-200 ease-out
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[#FF5722]
          motion-safe:[transform:translateY(var(--button-lift,0px))_rotateX(var(--button-x,0deg))_rotateY(var(--button-y,0deg))]
          motion-safe:active:scale-[0.98]
          motion-reduce:transition-none
          ${variantStyles}
        `}
      >
        <span
          className="
            pointer-events-none flex w-full items-center gap-3
            motion-safe:[transform:translateZ(10px)]
          "
        >
          {children}
        </span>
      </Link>
    </div>
  )
}

export default function DownloadBar({ lang = 'en' }) {
  const isBangla = lang === 'bn'

  return (
    <section
      id="download-bar"
      lang={lang}
      aria-label={
        isBangla ? 'অগ্নিটক অ্যাপ ডাউনলোড বার' : 'Download AgniTalk App'
      }
      className="
        agnitalk-ui relative overflow-hidden
        border-y border-white/10
        bg-[#003366]
        bg-[radial-gradient(rgba(255,255,255,0.08)_0.85px,transparent_0.85px)]
        [background-size:20px_20px]
        py-7! sm:py-8!
      "
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
          {/* Left Copy & App Badge */}
          <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-agni-body text-[11px] font-normal not-italic uppercase tracking-wider text-blue-100 ${bn(lang)}`}
            >
              <FiSmartphone
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-[#FF5722]"
              />
              {isBangla ? 'ফ্রি অ্যাপ ইনস্টলেশন' : 'Free App Download'}
            </span>

            <p
              className={`text-base sm:text-lg font-normal not-italic text-white leading-snug ${bn(lang)}`}
              style={display(lang)}
            >
              {isBangla
                ? 'Android ও iOS-এ AgniTalk ডাউনলোড করুন — মিনিটেই শুরু করুন'
                : 'Download AgniTalk on Android & iOS — Start Calling in Minutes'}
            </p>
          </div>

          {/* Right Store Badges */}
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3.5">
            <TiltBarLink
              label="Get it on Google Play"
              variant="primary"
            >
              <FaGooglePlay
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-white"
              />

              <div className="font-agni-body font-normal not-italic text-left">
                <span className="block text-[9px] font-normal not-italic uppercase tracking-wider text-blue-100">
                  GET IT ON
                </span>

                <span className="agni-hero-button-label block text-[14px] font-normal not-italic leading-tight text-white">
                  Google Play
                </span>
              </div>
            </TiltBarLink>

            <TiltBarLink
              label="Download on the App Store"
              variant="light"
            >
              <FaApple
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-[#003366]"
              />

              <div className="font-agni-body font-normal not-italic text-left">
                <span className="block text-[9px] font-normal not-italic uppercase tracking-wider text-slate-500">
                  DOWNLOAD ON THE
                </span>

                <span className="agni-hero-button-label block text-[14px] font-normal not-italic leading-tight text-[#003366]">
                  App Store
                </span>
              </div>
            </TiltBarLink>
          </div>
        </div>
      </div>
    </section>
  )
}