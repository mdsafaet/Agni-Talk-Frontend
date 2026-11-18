import { Link } from 'react-router-dom'
import ReactCountryFlag from 'react-country-flag'
import {
  FiArrowRight,
  FiCheck,
  FiGlobe,
  FiPhoneCall,
  FiSmartphone,
} from 'react-icons/fi'
import { bn, display } from '../../utils/lang'

const FEATURED_RATES = [
  {
    id: 'app',
    prefix: '09606',
    countries: [],
    isFree: true,
    en: {
      badge: 'Zero Cost',
      title: 'App to App Calls & IM',
      subtitle: 'AgniTalk to AgniTalk Worldwide',
      rate: 'FREE',
      unit: 'forever',
      highlights: [
        'Unlimited HD voice & 6-person video',
        'End-to-end TLS encrypted messaging',
        '70% lower data with Byte Saver™',
      ],
    },
    bn: {
      badge: 'সম্পূর্ণ ফ্রি',
      title: 'অ্যাপ-টু-অ্যাপ কল ও আইএম',
      subtitle: 'বিশ্বজুড়ে AgniTalk থেকে AgniTalk',
      rate: 'FREE',
      unit: 'সবসময়',
      highlights: [
        'আনলিমিটেড এইচডি ভয়েস ও ভিডিও কল',
        'সম্পূর্ণ TLS এনক্রিপ্টেড মেসেজিং',
        'Byte Saver™ প্রযুক্তিতে ৭০% কম ডাটা',
      ],
    },
  },
  {
    id: 'mobile',
    prefix: '+880',
    countries: ['BD'],
    isFree: false,
    en: {
      badge: 'Most Popular',
      title: 'BD Mobile & Landlines',
      subtitle: 'GP, Robi, Banglalink, Teletalk & BTCL',
      rate: '৳0.40',
      unit: '/ min',
      highlights: [
        'BTRC standard floor rate + 15% VAT',
        'True 1-second pulse billing',
        'No connection fee or hidden charges',
      ],
    },
    bn: {
      badge: 'সবচেয়ে জনপ্রিয়',
      title: 'বাংলাদেশ মোবাইল ও ল্যান্ডলাইন',
      subtitle: 'জিপি, রবি, বাংলালিংক, টেলিটক ও বিটিসিএল',
      rate: '৳০.৪০',
      unit: '/ মিনিট',
      highlights: [
        'BTRC স্ট্যান্ডার্ড ফ্লোর রেট + ১৫% ভ্যাট',
        'প্রকৃত ১-সেকেন্ড পালস বিলিং',
        'কোনো সংযোগ ফি বা লুকানো চার্জ নেই',
      ],
    },
  },
  {
    id: 'international',
    prefix: '+966 · +1 · +44',
    countries: ['SA', 'US', 'GB'],
    isFree: false,
    en: {
      badge: 'Global Routes',
      title: 'International Calling',
      subtitle: 'Saudi Arabia, UAE, Malaysia, USA & UK',
      rate: '৳0.70',
      unit: '/ min from',
      highlights: [
        'Saudi Arabia ৳0.80 & Malaysia ৳0.70/min',
        'USA & Canada ৳1.10 • UK ৳1.20/min',
        'Crystal-clear IPTSP international routes',
      ],
    },
    bn: {
      badge: 'আন্তর্জাতিক রুট',
      title: 'আন্তর্জাতিক কল রেট',
      subtitle: 'সৌদি আরব, আমিরাত, মালয়েশিয়া, USA ও UK',
      rate: '৳০.৭০',
      unit: '/ মিনিট থেকে',
      highlights: [
        'সৌদি আরব ৳০.৮০ ও মালয়েশিয়া ৳০.৭০/মিনিট',
        'USA ও কানাডা ৳১.১০ • UK ৳১.২০/মিনিট',
        'স্পষ্ট এইচডি আন্তর্জাতিক ভয়েস কোয়ালিটি',
      ],
    },
  },
]

const COUNTRY_NAMES = {
  BD: 'Bangladesh',
  SA: 'Saudi Arabia',
  US: 'United States',
  GB: 'United Kingdom',
}

function handleTilt(event) {
  if (
    event.pointerType !== 'mouse' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  const wrapper = event.currentTarget
  const rect = wrapper.getBoundingClientRect()
  if (!rect.width || !rect.height) return

  const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))

  wrapper.style.setProperty('--tilt-x', `${(0.5 - y) * 8}deg`)
  wrapper.style.setProperty('--tilt-y', `${(x - 0.5) * 8}deg`)
  wrapper.style.setProperty('--lift', '-10px')
  wrapper.style.setProperty('--shadow-shift-x', `${(0.5 - x) * 18}px`)
  wrapper.style.setProperty('--shadow-scale', '0.9')
}

function resetTilt(event) {
  const wrapper = event.currentTarget
  wrapper.style.setProperty('--tilt-x', '0deg')
  wrapper.style.setProperty('--tilt-y', '0deg')
  wrapper.style.setProperty('--lift', '0px')
  wrapper.style.setProperty('--shadow-shift-x', '0px')
  wrapper.style.setProperty('--shadow-scale', '1')
}

export default function RatesPreview({ lang = 'en', to = '/rates' }) {
  const isBangla = lang === 'bn'

  return (
    <section
      id="rates-preview"
      lang={lang}
      aria-labelledby="rates-preview-title"
      className="relative isolate overflow-hidden border-b border-slate-200/80 bg-[#EDF3FC] pt-12 pb-18 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-22"
    >
      {/* Creative Split-Stage Backdrop: Deep Brand Navy Top + Soft Light Bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62%] bg-[linear-gradient(135deg,#00244D_0%,#003366_48%,#0052CC_100%)]"
      >
        {/* Subtle Telecom Pulse Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Ambient Orange & Sky Glow Orbs */}
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-[#FF5722]/20 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header on Dark Navy Stage */}
        <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:mb-9 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div
              className={`
                mb-2.5 inline-flex items-center gap-2 rounded-full
                border border-white/20 bg-white/10 px-3.5 py-1
                text-xs font-bold [font-synthesis:weight]
                uppercase tracking-wider text-white backdrop-blur-xs
                ${bn(lang)}
              `}
            >
              <span className="h-2 w-2 rounded-full bg-[#FF5722]" />
              {isBangla ? 'স্বচ্ছ BTRC ট্যারিফ' : 'TRANSPARENT CALL RATES'}
            </div>

            <h2
              id="rates-preview-title"
              className={`text-[clamp(26px,4vw,40px)] font-bold [font-synthesis:weight] leading-tight text-white ${bn(lang)}`}
              style={display(lang)}
            >
              {isBangla
                ? 'সাশ্রয়ী কল রেট, কোনো লুকানো চার্জ নেই'
                : 'Simple, Transparent Calling Rates'}
            </h2>

            <p
              className={`mt-1.5 text-sm sm:text-base leading-relaxed text-sky-100/90 ${bn(lang)}`}
            >
              {isBangla
                ? 'কোনো সংযোগ ফি নেই • ১-সেকেন্ড পালস • ৭০% কম ডাটা খরচ'
                : 'No connection fees • True 1-Second Pulse • 70% Lower Data Usage'}
            </p>
          </div>

          <Link
            to={to}
            className={`
              group inline-flex shrink-0 items-center gap-2.5 rounded-2xl
              bg-[#FF5722] px-5 py-2.5 text-sm font-bold [font-synthesis:weight]
              text-white shadow-[0_14px_28px_-8px_rgba(255,87,34,0.55)]
              transition-[background-color,transform] duration-200
              hover:bg-[#e64a19]
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-white
              motion-safe:hover:-translate-y-0.5
              ${bn(lang)}
            `}
          >
            <span>
              {isBangla
                ? 'সব দেশের রেট ও ক্যালকুলেটর দেখুন'
                : 'View All Rates & Calculator'}
            </span>
            <FiArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* 3-Card Grid with Compact Height & Deep 3D Floor Shadows */}
        <div className="grid grid-cols-1 gap-8 sm:gap-9 lg:grid-cols-3 lg:gap-7">
          {FEATURED_RATES.map((item) => {
            const t = isBangla ? item.bn : item.en

            return (
              <div
                key={item.id}
                onPointerMove={handleTilt}
                onPointerLeave={resetTilt}
                onPointerCancel={resetTilt}
                className="group relative h-full [perspective:1100px]"
              >
                {/* Layer 1: Wide Ambient Floor Shadow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute -bottom-7 inset-x-2 h-11
                    rounded-[100%] blur-2xl opacity-90
                    transition-[transform,opacity] duration-200 ease-out
                    group-hover:opacity-100
                    motion-safe:[transform:translateX(var(--shadow-shift-x,0px))_scaleX(var(--shadow-scale,1))]
                  "
                  style={{
                    background: item.isFree
                      ? 'radial-gradient(ellipse at center, rgba(255,87,34,0.42) 0%, rgba(0,26,61,0.34) 55%, transparent 82%)'
                      : 'radial-gradient(ellipse at center, rgba(0,82,204,0.42) 0%, rgba(0,26,61,0.34) 55%, transparent 82%)',
                  }}
                />

                {/* Layer 2: Mid-Range Dark Grounded Shadow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute -bottom-4 inset-x-6 h-6
                    rounded-[100%] bg-[#001A3D]/35 blur-lg
                    transition-transform duration-200 ease-out
                    motion-safe:[transform:translateX(var(--shadow-shift-x,0px))_scaleX(var(--shadow-scale,1))]
                  "
                />

                {/* Layer 3: Tight Contact Shadow Directly Under Bottom Edge */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute -bottom-1.5 inset-x-10 h-3
                    rounded-[100%] bg-[#001430]/40 blur-xs
                    transition-transform duration-200 ease-out
                    motion-safe:[transform:translateX(var(--shadow-shift-x,0px))_scaleX(var(--shadow-scale,1))]
                  "
                />

                <Link
                  to={to}
                  className={`
                    relative flex h-full flex-col overflow-hidden
                    rounded-[22px] border bg-white p-5 sm:p-5.5
                    shadow-[0_4px_10px_-2px_rgba(0,26,61,0.12),0_16px_28px_-10px_rgba(0,26,61,0.22),0_32px_56px_-18px_rgba(0,33,71,0.32)]
                    [transform-style:preserve-3d]
                    transition-[transform,box-shadow,border-color,background-color]
                    duration-200 ease-out
                    focus-visible:outline-2 focus-visible:outline-offset-4
                    focus-visible:outline-[#0052CC]
                    motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
                    motion-reduce:transition-none
                    ${
                      item.isFree
                        ? 'border-[#FF5722]/40 hover:border-[#FF5722] hover:bg-[#FFF9F7] hover:shadow-[0_8px_16px_-4px_rgba(255,87,34,0.22),0_26px_44px_-12px_rgba(255,87,34,0.32),0_44px_72px_-20px_rgba(0,26,61,0.38)]'
                        : 'border-slate-200/95 hover:border-[#0052CC] hover:bg-[#F8FBFF] hover:shadow-[0_8px_16px_-4px_rgba(0,82,204,0.22),0_26px_44px_-12px_rgba(0,82,204,0.32),0_44px_72px_-20px_rgba(0,26,61,0.38)]'
                    }
                  `}
                >
                  {/* Top Accent Bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1.5 ${
                      item.isFree ? 'bg-[#FF5722]' : 'bg-[#0052CC]'
                    }`}
                  />

                  {/* Top Pill + Prefix */}
                  <div className="mb-3 flex items-center justify-between gap-2 pt-0.5">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 rounded-full
                        px-2.5 py-0.5 text-[11px] font-bold [font-synthesis:weight]
                        ${
                          item.isFree
                            ? 'bg-[#FFF7F4] text-[#FF5722]'
                            : 'bg-[#F4F8FF] text-[#0052CC]'
                        }
                        ${bn(lang)}
                      `}
                    >
                      {item.id === 'app' && <FiSmartphone className="h-3 w-3" />}
                      {item.id === 'mobile' && <FiPhoneCall className="h-3 w-3" />}
                      {item.id === 'international' && <FiGlobe className="h-3 w-3" />}
                      {t.badge}
                    </span>

                    <span className="rounded-lg border border-slate-200/90 bg-[#F8FAFC] px-2 py-0.5 font-agni-body text-[11px] font-medium text-slate-600">
                      {item.prefix}
                    </span>
                  </div>

                  {/* Title & Flags Row */}
                  <div className="mb-3.5 flex items-start justify-between gap-2.5">
                    <div className="min-w-0">
                      <h3
                        className={`mb-0.5 text-base sm:text-lg font-bold [font-synthesis:weight] leading-snug text-[#003366] ${bn(lang)}`}
                        style={display(lang)}
                      >
                        {t.title}
                      </h3>
                      <p
                        className={`text-xs text-slate-500 ${bn(lang)}`}
                      >
                        {t.subtitle}
                      </p>
                    </div>

                    {item.countries.length > 0 && (
                      <div className="flex shrink-0 items-center gap-1">
                        {item.countries.map((code) => (
                          <span
                            key={code}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/90 bg-[#F8FAFC] shadow-2xs"
                          >
                            <ReactCountryFlag
                              countryCode={code}
                              svg
                              title={COUNTRY_NAMES[code]}
                              aria-label={COUNTRY_NAMES[code]}
                              style={{
                                width: '18px',
                                height: '13px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                              }}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rate Display */}
                  <div className="mb-3.5 rounded-xl border border-slate-200/75 bg-[#F8FAFC] px-3.5 py-2.5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`
                          font-agni-heading text-[32px] sm:text-[36px]
                          font-bold [font-synthesis:weight] leading-none tracking-tight
                          ${item.isFree ? 'text-[#FF5722]' : 'text-[#003366]'}
                        `}
                      >
                        {t.rate}
                      </span>

                      {t.unit && (
                        <span
                          className={`text-xs sm:text-sm font-medium text-slate-500 ${bn(lang)}`}
                        >
                          {t.unit}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="mb-4 flex flex-col gap-1.5">
                    {t.highlights.map((point, index) => (
                      <li
                        key={index}
                        className={`flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 ${bn(lang)}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`
                            mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full
                            ${
                              item.isFree
                                ? 'bg-[#FFF7F4] text-[#FF5722]'
                                : 'bg-[#F4F8FF] text-[#0052CC]'
                            }
                          `}
                        >
                          <FiCheck className="h-2.5 w-2.5" />
                        </span>
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Footer Action */}
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                    <span
                      className={`
                        text-xs font-bold [font-synthesis:weight]
                        ${item.isFree ? 'text-[#FF5722]' : 'text-[#0052CC]'}
                        ${bn(lang)}
                      `}
                    >
                      {isBangla
                        ? 'রেট বিস্তারিত ও ক্যালকুলেটর'
                        : 'See full tariff & calculator'}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`
                        flex h-7 w-7 items-center justify-center rounded-full
                        transition-transform duration-200 motion-safe:group-hover:translate-x-1
                        ${
                          item.isFree
                            ? 'bg-[#FFF7F4] text-[#FF5722]'
                            : 'bg-[#F4F8FF] text-[#0052CC]'
                        }
                      `}
                    >
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}