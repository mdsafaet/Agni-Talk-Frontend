import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import {
  FiBarChart2,
  FiLock,
  FiPhone,
  FiShield,
  FiStar,
  FiTrendingUp,
} from 'react-icons/fi'

import CountText from '../shared/CountText'

const phoneScreens = [
  {
    src: '/app/agni-number.jpg',
    alt: 'AgniTalk virtual number screen',
    label: '09606 ID',
  },
  {
    src: '/app/free-calls.jpg',
    alt: 'AgniTalk free calls screen',
    label: 'Free Calls',
  },
  {
    src: '/app/low-rates.jpg',
    alt: 'AgniTalk calling rates screen',
    label: 'Low Rates',
  },
  {
    src: '/app/low-bandwidth.jpg',
    alt: 'AgniTalk low data usage screen',
    label: 'Data Saver',
  },
  {
    src: '/app/privacy.jpg',
    alt: 'AgniTalk privacy screen',
    label: 'Privacy',
  },
]

const QR_CELLS = [40, 46, 52, 58, 64, 70, 76]

const QR_SOLID = [
  [40, 40], [52, 40], [64, 40], [76, 40],
  [40, 52], [64, 52], [76, 52],
  [40, 64], [52, 64], [70, 64],
  [40, 76], [58, 76], [76, 76],
  [5, 40], [11, 40], [17, 40], [23, 40],
  [5, 52], [17, 58], [29, 46], [29, 58],
  [40, 5], [52, 5], [58, 11], [40, 17],
  [52, 23], [64, 17], [64, 5],
]

const QR_NOISE = QR_CELLS.flatMap((x, i) =>
  QR_CELLS.flatMap((y, j) =>
    (i * 7 + j * 3) % 5 < 2 ? [[x, y]] : [],
  ),
)

// Decorative illustration, not a working QR code.
function QRIllustration() {
  return (
    <div className="rounded-[20px] border border-slate-200/90 bg-white/95 p-3 shadow-[0_14px_32px_-8px_rgba(0,51,102,0.16)] backdrop-blur-xs">
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-1.5">
        <svg
          width="88"
          height="88"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <rect width="100" height="100" fill="white" />

          {[
            [5, 5],
            [67, 5],
            [5, 67],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect
                x={x}
                y={y}
                width="28"
                height="28"
                rx="4"
                fill="#003366"
              />
              <rect
                x={x + 4}
                y={y + 4}
                width="20"
                height="20"
                rx="2"
                fill="white"
              />
              <rect
                x={x + 8}
                y={y + 8}
                width="12"
                height="12"
                rx="2"
                fill="#003366"
              />
            </g>
          ))}

          {QR_NOISE.map(([x, y]) => (
            <rect
              key={`noise-${x}-${y}`}
              x={x}
              y={y}
              width="4"
              height="4"
              rx="1"
              fill="#003366"
            />
          ))}

          {QR_SOLID.map(([x, y]) => (
            <rect
              key={`solid-${x}-${y}`}
              x={x}
              y={y}
              width="4"
              height="4"
              rx="1"
              fill="#003366"
            />
          ))}

          <rect
            x="45"
            y="45"
            width="12"
            height="12"
            rx="3"
            fill="#FF5722"
          />
        </svg>
      </div>

      <p className="mt-2 text-center text-[11px] tracking-wide text-[#003366]">
        Scan to Install
      </p>
    </div>
  )
}

function TiltStoreLink({ children, label, variant = 'dark' }) {
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
    variant === 'dark'
      ? 'border-[#003366] bg-[#003366] text-white shadow-[0_12px_24px_-8px_rgba(0,51,102,0.45)] hover:border-[#0052CC] hover:bg-[#0052CC] hover:shadow-[0_16px_30px_-8px_rgba(0,82,204,0.45)]'
      : 'border-slate-200/90 bg-white text-[#003366] shadow-[0_10px_24px_-10px_rgba(15,23,42,0.14)] hover:border-[#0052CC]/30 hover:bg-[#F8FAFF] hover:shadow-[0_14px_28px_-8px_rgba(0,82,204,0.18)]'

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
          relative inline-flex h-[52px] min-w-[164px]
          items-center rounded-2xl border px-4
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

function StoreButtons() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-3.5">
      <TiltStoreLink label="Get it on Google Play" variant="dark">
        <FaGooglePlay
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-white"
        />

        <span className="font-agni-body text-left">
          <span className="block text-[9px] uppercase tracking-wider text-blue-200">
            GET IT ON
          </span>
          <span className="agni-hero-button-label block text-[14px] leading-tight text-white">
            Google Play
          </span>
        </span>
      </TiltStoreLink>

      <TiltStoreLink label="Download on the App Store" variant="light">
        <FaApple
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-[#003366] transition-colors group-hover:text-[#0052CC]"
        />

        <span className="font-agni-body text-left">
          <span className="block text-[9px] uppercase tracking-wider text-slate-500">
            Download on the
          </span>
          <span className="agni-hero-button-label block text-[14px] leading-tight text-[#003366]">
            App Store
          </span>
        </span>
      </TiltStoreLink>
    </div>
  )
}

export default function Hero({ lang = 'en' }) {
  const [activeScreen, setActiveScreen] = useState(0)
  const isBangla = lang === 'bn'

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveScreen(
        (current) => (current + 1) % phoneScreens.length,
      )
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  const bodyFont = isBangla
    ? "font-['Nirmala_UI',Vrinda,sans-serif]"
    : 'font-agni-body'

  const headingFont = isBangla
    ? "font-['Nirmala_UI',Vrinda,sans-serif]"
    : 'font-agni-heading'

  const badgeClass =
    'absolute z-20 rounded-[20px] border border-slate-200/90 bg-white/95 px-3.5 py-2.5 shadow-[0_14px_30px_-8px_rgba(0,51,102,0.16)] backdrop-blur-xs motion-safe:animate-[agniHeroBadge_3.6s_ease-in-out_infinite]'

  return (
    <section
      lang={lang}
      aria-labelledby="hero-title"
      className={`
        agni-hero ${bodyFont}
        relative w-full overflow-hidden
        bg-[#F8FAFF]
        bg-[radial-gradient(#CBD5E1_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
        py-16 sm:py-20 lg:py-24
        font-normal text-[#1a202c]
        antialiased [font-synthesis:none]
      `}
    >
      {/* Subtle top-to-bottom surface fade for clean contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,255,0.45)_0%,rgba(255,255,255,0.92)_100%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7">
            <div
              className="
                mb-5 inline-flex items-center gap-2.5
                rounded-full border border-[#0052CC]/15
                bg-white px-3.5 py-1.5
                text-xs sm:text-sm text-[#003366]
                shadow-[0_4px_14px_-4px_rgba(0,82,204,0.12)]
              "
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5722]/10 text-[#FF5722]">
                <FiTrendingUp
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0"
                />
              </span>

              <span>
                {isBangla
                  ? 'বাংলাদেশের সেরা আইপি টেলিফোনি অ্যাপ'
                  : "Bangladesh's Leading IP Telephony App"}
              </span>
            </div>

            <h1
              id="hero-title"
              className={`
                agni-hero-title ${headingFont}
                mb-5 text-[clamp(30px,4.6vw,54px)]
                leading-[1.14] tracking-tight text-[#003366]
              `}
            >
              {isBangla ? (
                <CountText
                  key="bn"
                  text="অগ্নিটক — যেকোনো নাম্বারে কথা বলুন সবচেয়ে কম খরচে"
                  highlight="সবচেয়ে কম খরচে"
                  hold={2.5}
                />
              ) : (
                <CountText
                  key="en"
                  text="HD IP Telephony & Free Messaging at Unbeatable Rates"
                  highlight="Unbeatable Rates"
                  hold={2.5}
                />
              )}
            </h1>

            <p
              className={`
                mb-8 text-base sm:text-lg leading-relaxed text-slate-600
                ${isBangla ? 'max-w-xl' : 'max-w-[540px]'}
              `}
            >
              {isBangla ? (
                <>
                  এইচডি ভয়েস কল, ০৯৬০৬ ভার্চুয়াল নাম্বার,
                  বিকাশ/নগদ রিচার্জ এবং ৭০% ডাটা সেভিং টেকনোলজি —
                  সবই এক অ্যাপে।
                </>
              ) : (
                <>
                  Get your dedicated{' '}
                  <strong className="font-normal text-[#003366]">
                    09606 virtual number
                  </strong>
                  . Enjoy free app-to-app HD voice &amp; video calls,
                  instant bKash top-ups, and up to{' '}
                  <strong className="font-normal text-[#003366]">
                    70% lower data usage
                  </strong>{' '}
                  on any network across Bangladesh.
                </>
              )}
            </p>

            <StoreButtons />

            {/* Compact Trust Pills */}
            <ul className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <li>
                <Link
                  to="/security"
                  className="
                    group inline-flex min-h-11 items-center gap-2
                    rounded-2xl border border-slate-200/90
                    bg-white px-3.5 py-2 text-xs sm:text-sm text-[#003366]
                    shadow-2xs
                    transition-[transform,border-color,box-shadow]
                    duration-200
                    hover:border-emerald-300 hover:shadow-sm
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-emerald-600
                    motion-safe:hover:-translate-y-0.5
                    motion-reduce:transition-none
                  "
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FiLock
                      aria-hidden="true"
                      strokeWidth={2.2}
                      className="h-4 w-4"
                    />
                  </span>
                  <span>TLS Encrypted</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="
                    group inline-flex min-h-11 items-center gap-2
                    rounded-2xl border border-slate-200/90
                    bg-white px-3.5 py-2 text-xs sm:text-sm text-[#003366]
                    shadow-2xs
                    transition-[transform,border-color,box-shadow]
                    duration-200
                    hover:border-sky-300 hover:shadow-sm
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-sky-600
                    motion-safe:hover:-translate-y-0.5
                    motion-reduce:transition-none
                  "
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0052CC]">
                    <FiShield
                      aria-hidden="true"
                      strokeWidth={2.2}
                      className="h-4 w-4"
                    />
                  </span>
                  <span>BTRC Licensed</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/download"
                  className="
                    group inline-flex min-h-11 items-center gap-2
                    rounded-2xl border border-slate-200/90
                    bg-white px-3.5 py-2 text-xs sm:text-sm text-[#003366]
                    shadow-2xs
                    transition-[transform,border-color,box-shadow]
                    duration-200
                    hover:border-amber-300 hover:shadow-sm
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-amber-600
                    motion-safe:hover:-translate-y-0.5
                    motion-reduce:transition-none
                  "
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    <FiStar
                      aria-hidden="true"
                      strokeWidth={2}
                      fill="currentColor"
                      className="
                        h-4 w-4 transition-transform duration-300
                        motion-safe:group-hover:rotate-12
                        motion-reduce:transition-none
                      "
                    />
                  </span>
                  <span>4.5 on Play Store</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Modern Phone Stage & Floating Cards */}
          <div className="relative flex flex-col items-center lg:col-span-5 lg:items-end">
            <div className="relative mx-auto lg:mr-6">
              {/* Soft Ambient Frame behind Device */}
              <div
                aria-hidden="true"
                className="
                  absolute -inset-6 rounded-[44px]
                  border border-[#0052CC]/10
                  bg-white/70
                "
              />

              {/* Phone Device */}
              <div className="relative z-10 h-[490px] w-[246px]">
                <div
                  className="
                    h-full w-full
                    motion-safe:animate-[agniHeroFloat_4.5s_ease-in-out_infinite]
                  "
                >
                  <div
                    className="
                      relative h-full w-full overflow-hidden
                      rounded-[38px] border-[6px] border-[#0F172A]
                      bg-[#0F172A]
                      shadow-[0_28px_60px_-14px_rgba(0,51,102,0.34)]
                    "
                  >
                    {/* Top Dynamic Speaker Notch */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-2 z-20 flex justify-center"
                    >
                      <div className="h-3.5 w-20 rounded-full bg-[#0F172A]" />
                    </div>

                    {phoneScreens.map((screen, index) => (
                      <img
                        key={screen.src}
                        src={screen.src}
                        alt={screen.alt}
                        aria-hidden={activeScreen !== index}
                        width={600}
                        height={1194}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        loading="eager"
                        draggable={false}
                        className={`
                          absolute inset-0 h-full w-full
                          rounded-[30px] object-cover object-top
                          transition-opacity duration-500 ease-out
                          motion-reduce:transition-none
                          ${
                            activeScreen === index
                              ? 'opacity-100'
                              : 'opacity-0'
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Data saving badge */}
              <div
                className={`${badgeClass} -left-10 sm:-left-16 top-12 [animation-delay:0.4s]`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#0052CC]">
                    <FiBarChart2 aria-hidden="true" className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="font-agni-heading text-xs text-[#003366]">
                      70% Data Saved
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Byte Saver™
                    </div>
                  </div>
                </div>
              </div>

              {/* bKash badge */}
              <div
                className={`${badgeClass} -right-6 sm:-right-12 top-32 [animation-delay:0.9s]`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50/80 p-1">
                    <img
                      src="/images/bkash.png"
                      alt="bKash"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <div className="font-agni-heading text-xs text-[#003366]">
                      bKash Ready
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Instant Top-up
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual number badge */}
              <div
                className={`${badgeClass} -left-8 sm:-left-14 bottom-20 [animation-delay:1.4s]`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF3EE] text-[#FF5722]">
                    <FiPhone aria-hidden="true" className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="font-agni-heading text-xs text-[#003366]">
                      09606 Number
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Virtual IPTSP
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative QR card */}
              <div className="absolute -right-10 bottom-8 z-20 hidden xl:block">
                <QRIllustration />
              </div>
            </div>

            {/* Interactive Screen Switcher Dots */}
            <div
              role="tablist"
              aria-label="App screen preview selector"
              className="mt-8 flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3 py-1.5 shadow-2xs lg:mr-14"
            >
              {phoneScreens.map((screen, index) => {
                const isActive = activeScreen === index
                return (
                  <button
                    key={screen.src}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show ${screen.label} screen`}
                    onClick={() => setActiveScreen(index)}
                    className={`
                      h-2 rounded-full transition-all duration-300 cursor-pointer
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]
                      ${
                        isActive
                          ? 'w-6 bg-[#0052CC]'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }
                    `}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}