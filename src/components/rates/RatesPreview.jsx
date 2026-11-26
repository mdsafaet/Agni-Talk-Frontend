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

export default function RatesPreview({ lang = 'en', to = '/rates' }) {
  const isBangla = lang === 'bn'

  return (
    <section
      id="rates-preview"
      lang={lang}
      aria-labelledby="rates-preview-title"
      className="
        agnitalk-ui relative isolate overflow-hidden
        border-b border-slate-200/80
        bg-[#F3F7FA]
        py-8! sm:py-10! lg:py-12!
      "
    >
      {/* Restrained navy-to-blue backdrop, with a clean light lower surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62%] lg:h-[62%] bg-[linear-gradient(125deg,#123B60_0%,#194E77_60%,#24658D_100%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header on Dark Navy Stage */}
        <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:mb-9 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
<div className="mb-3 flex items-center gap-2.5 ">
              <span aria-hidden="true" className="flex h-1 gap-0.5">
                <span className="w-5 rounded-full bg-[#0088D0]" />
                <span className="w-2 rounded-full bg-[#E00010]" />
                <span className="w-2 rounded-full bg-[#F58220]" />
                <span className="w-2 rounded-full bg-[#F8E800]" />
              </span>
              <span className={`text-[13px] font-bold tracking-wide text-white ${bn(lang)}`}>
                {isBangla ? 'স্বচ্ছ BTRC ট্যারিফ' : 'Transparent Call Rates'}
              </span>
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
              className={`mt-1.5 text-sm sm:text-base leading-relaxed text-[#E2EDF6] ${bn(lang)}`}
            >
              {isBangla
                ? 'কোনো সংযোগ ফি নেই • ১-সেকেন্ড পালস • ৭০% কম ডাটা খরচ'
                : 'No connection fees • True 1-Second Pulse • 70% Lower Data Usage'}
            </p>
          </div>

          <Link
            to={to}
            className={`
              group inline-flex shrink-0 items-center gap-2.5 rounded-xl
              bg-white/10 border border-white/40 px-5 py-2.5 text-sm font-bold [font-synthesis:weight]
              text-white shadow-sm
              transition-[background-color,transform] duration-200
              hover:bg-white/20
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

        {/* 3-Card Grid: Standard Card Brightness + Rich Blue Hover + Questrial Text */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
          {FEATURED_RATES.map((item) => {
            const t = isBangla ? item.bn : item.en

            return (
              <div
                key={item.id}



                className="group relative h-full "
              >
                

                <Link
                  to={to}
                  className="
                    relative flex h-full flex-col overflow-hidden
                    rounded-xl border border-slate-200/90 bg-white p-4 sm:p-5
                    font-agni-body
                    shadow-[0_6px_18px_-4px_rgba(15,23,42,0.1)]
                    hover:border-[#006DA8]/60 hover:bg-[#F0F8FC]
                    hover:shadow-[0_16px_32px_-8px_rgba(0,109,168,0.12)]
                    
                    transition-[transform,box-shadow,border-color,background-color]
                    duration-200 ease-out
                    focus-visible:outline-2 focus-visible:outline-offset-4
                    focus-visible:outline-[#006DA8]
                    motion-safe:hover:-translate-y-1
                    motion-reduce:transition-none
                  "
                >
                  {/* Top Accent Bar */}
                  <span
                    aria-hidden="true"
                    className={`
                      absolute inset-x-0 top-0 h-[3px] transition-colors
                      ${
                        item.isFree ? 'bg-[#F58220]' : item.id === 'mobile' ? 'bg-[#0088D0]' : 'bg-[#E00010]'
                      }
                    `}
                  />

                  {/* Top Pill + Prefix */}
                  <div className="mb-3 flex items-center justify-between gap-2 pt-0.5">
                    <span
                      className={`
                        inline-flex items-center gap-1.5 rounded-full
                        border border-slate-200/80 bg-[#F8FAFC]
                        px-2.5 py-0.5 font-agni-body text-[13px] font-semibold [font-synthesis:weight]
                        text-slate-700 transition-colors
                        group-hover:border-[#006DA8]/30 group-hover:bg-white group-hover:text-[#006DA8]
                        ${bn(lang)}
                      `}
                    >
                      {item.id === 'app' && (
                        <FiSmartphone className="h-3 w-3 text-[#006DA8]" />
                      )}
                      {item.id === 'mobile' && (
                        <FiPhoneCall className="h-3 w-3 text-[#006DA8]" />
                      )}
                      {item.id === 'international' && (
                        <FiGlobe className="h-3 w-3 text-[#006DA8]" />
                      )}
                      {t.badge}
                    </span>

                    <span
                      className="
                        rounded-lg border border-slate-200/80 bg-[#F8FAFC] px-2 py-0.5
                        font-agni-body text-[13px] text-slate-700 transition-colors
                        group-hover:border-[#006DA8]/30 group-hover:bg-white group-hover:text-[#006DA8]
                      "
                    >
                      {item.prefix}
                    </span>
                  </div>

                  {/* Title & Flags Row (Questrial) */}
                  <div className="mb-3.5 flex items-start justify-between gap-2.5">
                    <div className="min-w-0">
                      <h3
                        className={`mb-0.5 font-agni-body text-[17px] sm:text-[18px] font-bold [font-synthesis:weight] leading-snug text-[#003366] transition-colors group-hover:text-[#005B8C] ${bn(lang)}`}
                      >
                        {t.title}
                      </h3>
                      <p
                        className={`font-agni-body text-[13px] text-slate-700 transition-colors group-hover:text-slate-700 ${bn(lang)}`}
                      >
                        {t.subtitle}
                      </p>
                    </div>

                    {item.countries.length > 0 && (
                      <div className="flex shrink-0 items-center gap-1">
                        {item.countries.map((code) => (
                          <span
                            key={code}
                            className="
                              flex h-8 w-8 items-center justify-center rounded-lg
                              border border-slate-200/80 bg-[#F8FAFC]
                              transition-colors group-hover:border-[#006DA8]/30 group-hover:bg-white
                            "
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

                  {/* Rate Display (Questrial) */}
                  <div
                    className="
                      mb-3.5 rounded-xl border border-slate-200/75 bg-[#F8FAFC] px-3.5 py-2.5
                      transition-colors group-hover:border-[#006DA8]/25 group-hover:bg-white/90
                    "
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`
                          font-agni-body text-[34px] sm:text-[40px]
                          font-bold [font-synthesis:weight] leading-none tracking-tight transition-colors
                          ${
                            item.isFree
                              ? 'text-[#98500C]'
                              : 'text-[#003366] group-hover:text-[#006DA8]'
                          }
                        `}
                      >
                        {t.rate}
                      </span>

                      {t.unit && (
                        <span
                          className={`font-agni-body text-[13px] sm:text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-700 ${bn(lang)}`}
                        >
                          {t.unit}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mb-4 flex flex-col gap-1.5">
                    {t.highlights.map((point, index) => (
                      <li
                        key={index}
                        className={`flex items-start gap-2 font-agni-body text-[13px] sm:text-[13px] text-slate-700 transition-colors group-hover:text-slate-700 ${bn(lang)}`}
                      >
                        <span
                          aria-hidden="true"
                          className="
                            mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full
                            bg-[#EDF7FC] text-[#006DA8] transition-colors
                            group-hover:bg-white
                          "
                        >
                          <FiCheck className="h-2.5 w-2.5" />
                        </span>
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Footer Action (Questrial) */}
                  <div
                    className="
                      mt-auto flex items-center justify-between gap-2
                      border-t border-slate-100 pt-3 transition-colors
                      group-hover:border-[#006DA8]/20
                    "
                  >
                    <span
                      className={`
                        font-agni-body text-[13px] font-bold [font-synthesis:weight]
                        text-[#003366] transition-colors group-hover:text-[#006DA8]
                        ${bn(lang)}
                      `}
                    >
                      {isBangla
                        ? 'রেট বিস্তারিত ও ক্যালকুলেটর'
                        : 'See full tariff & calculator'}
                    </span>

                    <span
                      aria-hidden="true"
                      className="
                        flex h-7 w-7 items-center justify-center rounded-full
                        bg-[#EDF7FC] text-[#006DA8] transition-all duration-200
                        group-hover:bg-[#006DA8] group-hover:text-white
                        motion-safe:group-hover:translate-x-1
                      "
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