import { FaApple, FaGooglePlay } from 'react-icons/fa'
import QRCode from './QRCode'
import { bn, display } from '../../utils/lang'

function TiltStoreAnchor({ href, label, children, variant = 'primary' }) {
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
      <a
        href={href}
        aria-label={label}
        className={`
          relative inline-flex h-[48px] min-w-[158px]
          shrink-0 items-center rounded-2xl border px-4
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
      </a>
    </div>
  )
}

export default function FinalCTA({
  lang = 'en',
  appStoreUrl = '#',
  googlePlayUrl = '#',
}) {
  const isBangla = lang === 'bn'

  return (
    <section
      id="download"
      lang={lang}
      aria-labelledby="final-cta-title"
      className="
        relative overflow-hidden
        border-t border-white/10
        bg-[#003366]
        bg-[radial-gradient(rgba(255,255,255,0.08)_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
        py-10 sm:py-12 lg:py-14
      "
    >
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Left Column */}
        <div className="text-center lg:col-span-7 lg:text-left">
          <span
            className={`
              mb-3 inline-flex items-center gap-2
              rounded-full border border-white/15
              bg-white/10 px-3 py-0.5
              text-[11px] font-bold [font-synthesis:weight] uppercase tracking-wider text-blue-100
              ${bn(lang)}
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            {isBangla ? 'এখনই শুরু করুন' : 'Start Calling Today'}
          </span>

          <h2
            id="final-cta-title"
            className={`mb-3 text-[clamp(26px,4.5vw,42px)] font-bold [font-synthesis:weight] leading-tight text-white ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'ফোন বিলে ছাড় পেতে প্রস্তুত?'
              : 'Ready to Cut Your Phone Bills?'}
          </h2>

          <p
            className={`mx-auto mb-6 max-w-xl text-base leading-relaxed text-blue-100/90 sm:text-lg lg:mx-0 ${bn(lang)}`}
          >
            {isBangla
              ? 'আজই AgniTalk ডাউনলোড করুন এবং আপনার নিজস্ব ০৯৬০৬ নম্বর সহ বিনামূল্যে HD কলিং উপভোগ করুন।'
              : "Download AgniTalk today and enjoy free HD calling with your own 09606 number. Bangladesh's smartest calling app."}
          </p>

          {/* Store buttons */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <TiltStoreAnchor
              href={googlePlayUrl}
              label="Get it on Google Play"
              variant="primary"
            >
              <FaGooglePlay
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-white"
              />

              <div className="text-left font-agni-body">
                <span className="block text-[9px] uppercase tracking-wider text-blue-100">
                  GET IT ON
                </span>

                <span className="agni-hero-button-label block text-[14px] leading-tight text-white">
                  Google Play
                </span>
              </div>
            </TiltStoreAnchor>

            <TiltStoreAnchor
              href={appStoreUrl}
              label="Download on the App Store"
              variant="light"
            >
              <FaApple
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-[#003366]"
              />

              <div className="text-left font-agni-body">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                  DOWNLOAD ON THE
                </span>

                <span className="agni-hero-button-label block text-[14px] leading-tight text-[#003366]">
                  App Store
                </span>
              </div>
            </TiltStoreAnchor>
          </div>

          {/* Compact QR Dock */}
          <div className="inline-flex flex-col items-center gap-3.5 rounded-[20px] border border-white/15 bg-white/10 p-3.5 backdrop-blur-xs sm:flex-row">
            <div className="shrink-0 overflow-hidden rounded-xl bg-white p-1.5 shadow-xs">
              <QRCode size={88} caption="" />
            </div>

            <p
              className={`max-w-[210px] text-center text-xs leading-relaxed text-blue-100/90 sm:text-left sm:text-sm ${bn(lang)}`}
            >
              {isBangla
                ? 'ফোনের ক্যামেরা দিয়ে স্ক্যান করে সরাসরি ডাউনলোড করুন'
                : 'Scan with your phone camera to download instantly'}
            </p>
          </div>
        </div>

        {/* Right Column: Campaign image */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative rounded-[24px] border border-white/15 bg-white/5 p-2 shadow-[0_24px_48px_-14px_rgba(0,0,0,0.4)]">
            <img
              src="/images/campaign.webp"
              alt="AgniTalk campaign poster: a hand holding a phone showing the Agni number screen, with a Download button"
              width="1000"
              height="1000"
              loading="lazy"
              draggable={false}
              className="h-auto w-full max-w-[380px] rounded-[18px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}