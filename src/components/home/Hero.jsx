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
  },
  {
    src: '/app/free-calls.jpg',
    alt: 'AgniTalk free calls screen',
  },
  {
    src: '/app/low-rates.jpg',
    alt: 'AgniTalk calling rates screen',
  },
  {
    src: '/app/low-bandwidth.jpg',
    alt: 'AgniTalk low data usage screen',
  },
  {
    src: '/app/privacy.jpg',
    alt: 'AgniTalk privacy screen',
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

// Original decorative QR illustration.
// Replace with a working QR image before publishing.
function QRIllustration() {
  return (
    <div className="inline-block rounded-xl bg-white p-3 shadow-md">
      <svg
        width="100"
        height="100"
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
              rx="2"
              fill="#003366"
            />

            <rect
              x={x + 4}
              y={y + 4}
              width="20"
              height="20"
              rx="1"
              fill="white"
            />

            <rect
              x={x + 8}
              y={y + 8}
              width="12"
              height="12"
              rx="1"
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
            fill="#003366"
          />
        ))}

        <rect
          x="46"
          y="46"
          width="10"
          height="10"
          fill="#FF5722"
        />
      </svg>

      <p className="mt-1 text-center text-xs text-gray-500">
        Scan to Download
      </p>
    </div>
  )
}

function StoreButtons() {
  const buttonClass =
    'inline-flex h-[46px] w-[150px] items-center gap-3 rounded-[13px] border border-white/15 bg-[#1B2934] px-3.5 text-white transition-colors hover:bg-[#263846] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5722] motion-reduce:transition-none'

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2.5">
      <Link
        to="/download"
        aria-label="Download on the App Store"
        className={buttonClass}
      >
        <FaApple
          aria-hidden="true"
          className="h-6 w-6 shrink-0"
        />

        <div className="font-agni-body">
          <span className="block text-[7px] leading-[10px] text-[#9AA6AF]">
            DOWNLOAD ON THE
          </span>

          <span className="block text-[13px] leading-[16px]">
            App Store
          </span>
        </div>
      </Link>

      <Link
        to="/download"
        aria-label="Get it on Google Play"
        className={buttonClass}
      >
        <FaGooglePlay
          aria-hidden="true"
          className="h-6 w-6 shrink-0"
        />

        <div className="font-agni-body">
          <span className="block text-[7px] leading-[10px] text-[#9AA6AF]">
            GET IT ON
          </span>

          <span className="block text-[13px] leading-[16px]">
            Google Play
          </span>
        </div>
      </Link>
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
    }, 2500)

    return () => window.clearInterval(timer)
  }, [])

  const bodyFont = isBangla
    ? "font-['Nirmala_UI',Vrinda,sans-serif]"
    : 'font-agni-body'

  const headingFont = isBangla
    ? "font-['Nirmala_UI',Vrinda,sans-serif]"
    : 'font-agni-heading'

  const badgeClass =
    'absolute z-20 rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-xl motion-safe:animate-[agniHeroBadge_3s_ease-in-out_infinite]'

  return (
    <section
      lang={lang}
      aria-labelledby="hero-title"
      className={`${bodyFont} w-full overflow-hidden bg-[linear-gradient(135deg,#F8FAFF_0%,#EEF4FF_40%,#F8F9FA_100%)] py-20 font-normal text-[#1a202c] antialiased [font-synthesis:none]`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF5722]/20 bg-[#FF5722]/[0.08] px-4 py-2 text-sm text-[#0052CC]">
              <FiTrendingUp aria-hidden="true" />

              <span>
                {isBangla
                  ? 'বাংলাদেশের সেরা আইপি টেলিফোনি অ্যাপ'
                  : "Bangladesh's Leading IP Telephony App"}
              </span>
            </div>

            {/* Rolling heading */}
            <h1
              id="hero-title"
              className={`${headingFont} mb-4 text-[clamp(28px,5vw,52px)] font-normal leading-tight text-[#003366]`}
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
              className={`mb-8 text-lg leading-relaxed text-[#4a5568] ${
                isBangla ? '' : 'max-w-[540px]'
              }`}
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
                  <strong className="font-normal">
                    09606 virtual number
                  </strong>
                  . Enjoy free app-to-app HD voice &amp; video calls,
                  instant bKash top-ups, and up to{' '}
                  <strong className="font-normal">
                    70% lower data usage
                  </strong>{' '}
                  on any network across Bangladesh.
                </>
              )}
            </p>

            <StoreButtons />

            {/* Trust labels */}
{/* Trust badges */}
<ul className="flex flex-wrap items-center gap-3">
  <li>
    <Link
      to="/security"
      className="group inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-emerald-200/70 bg-emerald-50/80 px-3.5 py-2 text-emerald-900 transition-[transform,background-color,border-color,box-shadow] duration-300 hover:border-emerald-300 hover:bg-emerald-100 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/80 text-emerald-700">
        <FiLock
          aria-hidden="true"
          strokeWidth={2.5}
          className="h-5 w-5"
        />
      </span>

      <span className="text-sm">TLS Encrypted</span>
    </Link>
  </li>

  <li>
    <Link
      to="/about"
      className="group inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-sky-200/70 bg-sky-50/80 px-3.5 py-2 text-sky-900 transition-[transform,background-color,border-color,box-shadow] duration-300 hover:border-sky-300 hover:bg-sky-100 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/80 text-sky-700">
        <FiShield
          aria-hidden="true"
          strokeWidth={2.5}
          className="h-5 w-5"
        />
      </span>

      <span className="text-sm">BTRC Licensed</span>
    </Link>
  </li>

  <li>
    <Link
      to="/download"
      className="group inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-amber-200/70 bg-amber-50/80 px-3.5 py-2 text-amber-900 transition-[transform,background-color,border-color,box-shadow] duration-300 hover:border-amber-300 hover:bg-amber-100 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/80 text-amber-600">
        <FiStar
          aria-hidden="true"
          strokeWidth={2}
          fill="currentColor"
          className="h-5 w-5 transition-transform duration-300 motion-safe:group-hover:rotate-12 motion-reduce:transition-none"
        />
      </span>

      <span className="text-sm">4.5 on Play Store</span>
    </Link>
  </li>
</ul>
          </div>

          {/* Phone and floating badges */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative z-10 h-[480px] w-[240px] -rotate-3">
                <div className="h-full w-full motion-safe:animate-[agniHeroFloat_4s_ease-in-out_infinite]">
                  <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[#0a0a0a] shadow-[0_32px_80px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)]">
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
                        className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                          activeScreen === index
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Data saving badge */}
              <div
                className={`${badgeClass} -left-12 top-16 [animation-delay:0.5s]`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3F2FD] text-lg text-[#0052CC]">
                    <FiBarChart2 aria-hidden="true" />
                  </div>

                  <div>
                    <div className="font-agni-heading text-xs text-[#003366]">
                      70% Data Saved
                    </div>

                    <div className="text-xs text-[#718096]">
                      Byte Saver™
                    </div>
                  </div>
                </div>
              </div>

              {/* bKash badge */}
              <div
                className={`${badgeClass} -right-8 top-32 [animation-delay:1s]`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-12 shrink-0 items-center justify-center">
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

                    <div className="text-xs text-[#718096]">
                      Instant Top-up
                    </div>
                  </div>
                </div>
              </div>

              {/* Virtual number badge */}
              <div
                className={`${badgeClass} -left-8 bottom-24 [animation-delay:1.5s]`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3F2FD] text-[#0052CC]">
                    <FiPhone aria-hidden="true" />
                  </div>

                  <div>
                    <div className="font-agni-heading text-xs text-[#003366]">
                      09606 Number
                    </div>

                    <div className="text-xs text-[#718096]">
                      Virtual IPTSP
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop QR illustration */}
              <div className="absolute -right-4 bottom-12 z-20 hidden xl:block">
                <QRIllustration />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}