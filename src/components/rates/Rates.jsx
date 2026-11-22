import { useId, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { IconSearch } from '../icons/Icons'
import { bn } from '../../utils/lang'

const RATES = [
  {
    id: 'mobile',
    category: 'local',
    prefix: '+880',
    countries: ['BD'],
    label: {
      en: 'BD Mobile Operators',
      bn: 'বাংলাদেশ মোবাইল অপারেটর',
    },
    detail: {
      en: 'GP, Robi, Banglalink & Teletalk',
      bn: 'জিপি, রবি, বাংলালিংক ও টেলিটক',
    },
    rate: 0.4,
    note: {
      en: 'Standard BTRC floor rate + 15% VAT',
      bn: 'স্ট্যান্ডার্ড BTRC ফ্লোর রেট + ১৫% ভ্যাট',
    },
  },
  {
    id: 'landline',
    category: 'local',
    prefix: '09606 +880',
    countries: ['BD'],
    label: {
      en: 'BD Landlines & BTCL',
      bn: 'বাংলাদেশ ল্যান্ডলাইন ও বিটিসিএল',
    },
    detail: {
      en: '09606 to PSTN & landlines',
      bn: '০৯৬০৬ থেকে PSTN ও ল্যান্ডলাইন',
    },
    rate: 0.4,
    note: {
      en: 'Billed with a true 1-second pulse',
      bn: 'প্রকৃত ১-সেকেন্ড পালসে বিল',
    },
  },
  {
    id: 'app',
    category: 'local',
    prefix: '09606',
    countries: [],
    label: {
      en: 'App to App Calls & IM',
      bn: 'অ্যাপ-টু-অ্যাপ কল ও আইএম',
    },
    detail: {
      en: 'AgniTalk to AgniTalk',
      bn: 'AgniTalk থেকে AgniTalk',
    },
    rate: 0,
    note: {
      en: 'Unlimited HD voice, video & messaging',
      bn: 'আনলিমিটেড এইচডি ভয়েস, ভিডিও ও মেসেজিং',
    },
  },
  {
    id: 'usa',
    category: 'international',
    prefix: '+1',
    countries: ['US', 'CA'],
    label: {
      en: 'United States & Canada',
      bn: 'যুক্তরাষ্ট্র ও কানাডা',
    },
    detail: {
      en: 'International calling',
      bn: 'আন্তর্জাতিক কল',
    },
    rate: 1.1,
    note: {
      en: 'Low-cost HD international calling',
      bn: 'কম খরচে এইচডি আন্তর্জাতিক কল',
    },
  },
  {
    id: 'uk',
    category: 'international',
    prefix: '+44',
    countries: ['GB'],
    label: {
      en: 'United Kingdom',
      bn: 'যুক্তরাজ্য',
    },
    detail: {
      en: 'International calling',
      bn: 'আন্তর্জাতিক কল',
    },
    rate: 1.2,
    note: {
      en: 'Low-cost HD international calling',
      bn: 'কম খরচে এইচডি আন্তর্জাতিক কল',
    },
  },
  {
    id: 'saudi',
    category: 'international',
    prefix: '+966',
    countries: ['SA'],
    label: {
      en: 'Saudi Arabia',
      bn: 'সৌদি আরব',
    },
    detail: {
      en: 'International calling',
      bn: 'আন্তর্জাতিক কল',
    },
    rate: 0.8,
    note: {
      en: 'Popular route for Bangladeshi NRBs',
      bn: 'বাংলাদেশি প্রবাসীদের জনপ্রিয় রুট',
    },
  },
  {
    id: 'uae',
    category: 'international',
    prefix: '+971',
    countries: ['AE'],
    label: {
      en: 'United Arab Emirates',
      bn: 'সংযুক্ত আরব আমিরাত',
    },
    detail: {
      en: 'International calling',
      bn: 'আন্তর্জাতিক কল',
    },
    rate: 0.9,
    note: {
      en: 'Popular route for Bangladeshi NRBs',
      bn: 'বাংলাদেশি প্রবাসীদের জনপ্রিয় রুট',
    },
  },
  {
    id: 'malaysia',
    category: 'international',
    prefix: '+60',
    countries: ['MY'],
    label: {
      en: 'Malaysia',
      bn: 'মালয়েশিয়া',
    },
    detail: {
      en: 'International calling',
      bn: 'আন্তর্জাতিক কল',
    },
    rate: 0.7,
    note: {
      en: 'Low-cost HD international calling',
      bn: 'কম খরচে এইচডি আন্তর্জাতিক কল',
    },
  },
]

const COUNTRY_NAMES = {
  BD: 'Bangladesh',
  US: 'United States',
  CA: 'Canada',
  GB: 'United Kingdom',
  SA: 'Saudi Arabia',
  AE: 'United Arab Emirates',
  MY: 'Malaysia',
}

const FILTERS = [
  { id: 'all', en: 'All Rates', bn: 'সব রেট' },
  {
    id: 'local',
    en: 'Bangladesh Local',
    bn: 'বাংলাদেশ লোকাল',
  },
  {
    id: 'international',
    en: 'International Call',
    bn: 'আন্তর্জাতিক কল',
  },
]

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

  const x = Math.max(
    0,
    Math.min(1, (event.clientX - rect.left) / rect.width),
  )

  const y = Math.max(
    0,
    Math.min(1, (event.clientY - rect.top) / rect.height),
  )

  wrapper.style.setProperty('--tilt-x', `${(0.5 - y) * 6}deg`)
  wrapper.style.setProperty('--tilt-y', `${(x - 0.5) * 6}deg`)
  wrapper.style.setProperty('--lift', '-4px')
}

function resetTilt(event) {
  const wrapper = event.currentTarget

  wrapper.style.setProperty('--tilt-x', '0deg')
  wrapper.style.setProperty('--tilt-y', '0deg')
  wrapper.style.setProperty('--lift', '0px')
}

function normalizeSearch(value) {
  return value
    .replace(/[০-৯]/g, (digit) => '০১২৩৪৫৬৭৮৯'.indexOf(digit))
    .trim()
    .toLowerCase()
}

function CountryFlags({ countries }) {
  if (!countries.length) {
    return (
      <div
        aria-hidden="true"
        className="
          flex h-9 w-9 items-center justify-center
          rounded-xl border border-slate-200/80 bg-[#F8FAFC] text-[#FF5722]
          transition-colors group-hover:border-[#0052CC]/30 group-hover:bg-white group-hover:text-[#0052CC]
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="6" y="2" width="12" height="20" rx="3" />
          <path d="M10 5h4M11 18h2" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      </div>
    )
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      {countries.map((code) => (
        <span
          key={code}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-xl border border-slate-200/80 bg-[#F8FAFC]
            transition-colors group-hover:border-[#0052CC]/30 group-hover:bg-white
          "
        >
          <ReactCountryFlag
            countryCode={code}
            svg
            title={COUNTRY_NAMES[code]}
            aria-label={COUNTRY_NAMES[code]}
            style={{
              width: '22px',
              height: '16px',
              objectFit: 'cover',
              borderRadius: '2px',
            }}
          />
        </span>
      ))}
    </div>
  )
}

function RateCard({ rate, lang, onSelect }) {
  const language = lang === 'bn' ? 'bn' : 'en'
  const isFree = rate.rate === 0

  return (
    <div
      onPointerMove={handleTilt}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      className="group relative h-full min-w-0 [perspective:1000px]"
    >
      {/* Subtle Grounded Floor Shadow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-2.5 inset-x-6 h-4
          rounded-[100%] bg-slate-900/10 opacity-65 blur-md
          transition-[opacity,background-color] duration-200
          group-hover:bg-[#0052CC]/25 group-hover:opacity-100
        "
      />

      <button
        type="button"
        onClick={() => onSelect(rate)}
        className="
          relative flex h-full w-full flex-col overflow-hidden
          rounded-[20px] border border-slate-200/90 bg-white p-4 text-left sm:p-5
          font-agni-body
          shadow-[0_4px_14px_-4px_rgba(15,23,42,0.08)]
          hover:border-[#0052CC]/60 hover:bg-[#E2EEFF]
          hover:shadow-[0_16px_32px_-8px_rgba(0,82,204,0.24)]
          [transform-style:preserve-3d] cursor-pointer
          transition-[transform,box-shadow,border-color,background-color]
          duration-200 ease-out
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[#0052CC]
          motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
          motion-safe:active:scale-[0.99]
          motion-reduce:transition-none
        "
      >
        {/* Subtle top accent bar */}
        <span
          aria-hidden="true"
          className={`
            absolute inset-x-0 top-0 h-[3px] transition-colors
            ${
              isFree
                ? 'bg-[#FF5722]/85 group-hover:bg-[#0052CC]'
                : 'bg-[#003366]/85 group-hover:bg-[#0052CC]'
            }
          `}
        />

        {/* Header: Title, Detail & Flag */}
        <div className="mb-3 flex w-full items-start justify-between gap-2.5 pt-0.5">
          <div className="min-w-0">
            <h3
              className={`mb-0.5 font-agni-body text-base sm:text-[17px] font-bold [font-synthesis:weight] leading-snug text-[#003366] transition-colors group-hover:text-[#0047B3] ${bn(lang)}`}
            >
              {rate.label[language]}
            </h3>

            <p
              className={`font-agni-body text-xs leading-4 text-slate-500 transition-colors group-hover:text-slate-600 ${bn(lang)}`}
            >
              {rate.detail[language]}
            </p>
          </div>

          <CountryFlags countries={rate.countries} />
        </div>

        {/* Price & Prefix Row */}
        <div className="mb-3 flex w-full items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-1">
            <span
              className={`
                font-agni-body text-[32px] sm:text-[36px]
                font-bold [font-synthesis:weight] leading-none tracking-tight transition-colors
                ${
                  isFree
                    ? 'text-[#FF5722]'
                    : 'text-[#003366] group-hover:text-[#0052CC]'
                }
              `}
            >
              {isFree ? 'FREE' : `৳${rate.rate.toFixed(2)}`}
            </span>

            {!isFree && (
              <span className="font-agni-body text-xs font-medium text-slate-500 transition-colors group-hover:text-slate-600">
                / min
              </span>
            )}
          </div>

          <span
            className="
              rounded-lg border border-slate-200/80 bg-[#F8FAFC] px-2 py-0.5
              font-agni-body text-[11px] text-slate-600 transition-colors
              group-hover:border-[#0052CC]/30 group-hover:bg-white group-hover:text-[#0052CC]
            "
          >
            {rate.prefix}
          </span>
        </div>

        {/* Pulse / Feature Pill */}
        <div
          className={`
            mb-3.5 inline-flex items-center gap-1.5
            self-start rounded-full border border-slate-200/80 bg-[#F8FAFC] px-2.5 py-1
            font-agni-body text-[11px] font-semibold [font-synthesis:weight] leading-4 text-slate-600
            transition-colors group-hover:border-[#0052CC]/30 group-hover:bg-white group-hover:text-[#0052CC]
            ${bn(lang)}
          `}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-3.5 w-3.5 shrink-0 text-[#0052CC]"
          >
            <circle
              cx="10"
              cy="10"
              r="7.5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="m6.5 10 2.3 2.3 4.7-4.6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>
            {isFree
              ? lang === 'bn'
                ? 'আনলিমিটেড এইচডি ভয়েস ও ভিডিও'
                : 'Unlimited HD Voice & Video'
              : lang === 'bn'
                ? '১-সেকেন্ড পালস'
                : '1-Sec Pulse'}
          </span>
        </div>

        {/* Bottom Note */}
        <div
          className="
            mt-auto w-full border-t border-slate-100 pt-2.5
            transition-colors group-hover:border-[#0052CC]/20
          "
        >
          <p
            className={`font-agni-body text-[11px] leading-5 text-slate-500 transition-colors group-hover:text-slate-600 ${bn(lang)}`}
          >
            {rate.note[language]}
          </p>
        </div>
      </button>
    </div>
  )
}

export default function Rates({ lang = 'en' }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [minutes, setMinutes] = useState(20)
  const [destination, setDestination] = useState('local')

  const minutesId = useId()
  const language = lang === 'bn' ? 'bn' : 'en'
  const q = normalizeSearch(search)

  const filtered = RATES.filter((rate) => {
    const matchesFilter =
      filter === 'all' || rate.category === filter

    const searchText = normalizeSearch(
      [
        rate.id,
        rate.label.en,
        rate.label.bn,
        rate.detail.en,
        rate.detail.bn,
        rate.prefix,
        ...rate.countries,
        ...rate.countries.map((code) => COUNTRY_NAMES[code]),
        rate.id === 'uk' ? 'UK' : '',
      ].join(' '),
    )

    return matchesFilter && (!q || searchText.includes(q))
  })

  const handleSelectCard = (rate) => {
    setDestination(rate.category === 'international' ? 'international' : 'local')
  }

  const calculatorRate = destination === 'local' ? 0.4 : 1.1
  const operatorRate = destination === 'local' ? 2 : 5
  const monthlyMinutes = minutes * 30

  const agniCost = Math.round(monthlyMinutes * calculatorRate)
  const operatorCost = Math.round(monthlyMinutes * operatorRate)
  const yearlySavings = (operatorCost - agniCost) * 12

  const month = lang === 'bn' ? 'মাস' : 'month'

  return (
    <section
      id="rates"
      lang={language}
      className="
        agnitalk-ui relative overflow-hidden
        border-b border-slate-200/70
        bg-[#F8FAFF]
        bg-[radial-gradient(#CBD5E1_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
        py-0!
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,255,0.65)_0%,rgba(255,255,255,0.9)_100%)]"
      />

      <div
        id="Rate-Calculator-Module"
        className="
          relative mx-auto w-full max-w-7xl px-4 py-10
          sm:px-6 sm:py-12 lg:px-8 lg:py-14
        "
      >
        {/* Heading */}
        <div className="mb-8 text-center">
          <div
            className={`
              mb-3 inline-flex items-center gap-2 rounded-full
              border border-[#0052CC]/15 bg-white
              px-3.5 py-1 text-[11px] font-bold [font-synthesis:weight]
              uppercase tracking-wider text-[#0052CC] shadow-2xs
              ${bn(lang)}
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            {lang === 'bn'
              ? 'স্বচ্ছ BTRC ট্যারিফ'
              : 'TRANSPARENT BTRC TARIFFS'}
          </div>

          <h2
            className={`
              mb-2 text-[clamp(24px,4vw,36px)]
              font-bold [font-synthesis:weight]
              leading-tight text-[#003366]
              ${lang === 'bn' ? bn(lang) : 'font-agni-heading'}
            `}
          >
            {lang === 'bn'
              ? 'AgniTalk কল রেট দেখুন ও সাশ্রয় হিসাব করুন'
              : 'Check AgniTalk Calling Rates & Calculate Savings'}
          </h2>

          <p
            className={`
              mx-auto max-w-2xl text-sm leading-relaxed
              text-slate-600 sm:text-base ${bn(lang)}
            `}
          >
            {lang === 'bn'
              ? 'কোনো সংযোগ ফি নেই • ১-সেকেন্ড পালস • ৭০% কম ডাটা ব্যবহার'
              : 'No connection fees • 1-Second Pulse • 70% Lower Data Usage'}
          </p>
        </div>

        {/* Search and filters */}
        <div
          className="
            mb-6 flex flex-col items-stretch gap-3
            rounded-[20px] border border-slate-200/90
            bg-white p-3 shadow-[0_4px_18px_-6px_rgba(15,23,42,0.06)]
            sm:p-3.5 lg:flex-row lg:items-center
          "
        >
          <div className="relative flex-1">
            <span
              aria-hidden="true"
              className="
                pointer-events-none absolute left-3.5 top-1/2
                -translate-y-1/2 text-[#0052CC]
              "
            >
              <IconSearch />
            </span>

            <input
              type="search"
              aria-label={
                lang === 'bn'
                  ? 'দেশ বা প্রিফিক্স খুঁজুন'
                  : 'Search country or prefix'
              }
              placeholder={
                lang === 'bn'
                  ? 'দেশ বা প্রিফিক্স খুঁজুন, যেমন বাংলাদেশ, +৮৮০, USA...'
                  : 'Search country or prefix e.g. Bangladesh, +880, USA...'
              }
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className={`
                w-full rounded-xl border border-slate-200
                bg-[#F8FAFC] py-2.5 pl-11 pr-4
                text-sm text-slate-700 outline-none
                transition-colors duration-200
                placeholder:text-slate-400
                focus:border-[#0052CC] focus:bg-white
                focus:ring-2 focus:ring-[#0052CC]/15
                motion-reduce:transition-none
                ${bn(lang)}
              `}
            />
          </div>

          <div
            role="group"
            aria-label={
              lang === 'bn' ? 'রেট ফিল্টার' : 'Filter rates'
            }
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={`
                  rounded-xl px-3.5 py-2 text-xs
                  font-bold [font-synthesis:weight]
                  transition-[background-color,color,box-shadow,transform]
                  duration-200 cursor-pointer
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#0052CC]
                  motion-safe:active:scale-[0.97]
                  motion-reduce:transition-none
                  ${bn(lang)}
                  ${
                    filter === item.id
                      ? 'bg-[#003366] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-[#F4F8FF] hover:text-[#0052CC]'
                  }
                `}
              >
                {item[language]}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Rate Cards Grid */}
        <div
          className="
            mb-10 grid grid-cols-1 gap-4
            sm:grid-cols-2 sm:gap-5 lg:grid-cols-3
          "
        >
          {filtered.map((rate) => (
            <RateCard
              key={rate.id}
              rate={rate}
              lang={lang}
              onSelect={handleSelectCard}
            />
          ))}

          {filtered.length === 0 && (
            <div
              role="status"
              className={`
                col-span-full rounded-[20px] border border-slate-200/90
                bg-white px-5 py-9 text-center text-sm text-slate-500
                ${bn(lang)}
              `}
            >
              {lang === 'bn'
                ? 'এই গন্তব্যের কোনো রেট পাওয়া যায়নি'
                : 'No rates found for that destination'}
            </div>
          )}
        </div>

        {/* Savings calculator */}
        <div
          className="
            grid grid-cols-1 items-center gap-6
            rounded-[20px] border border-slate-200/90
            bg-white p-4 sm:p-6
            shadow-[0_8px_24px_-8px_rgba(15,23,42,0.08)]
            lg:grid-cols-2 lg:gap-8
          "
        >
          <div>
            <div
              className="
                mb-4 flex flex-wrap items-center
                justify-between gap-3
              "
            >
              <label
                htmlFor={minutesId}
                className={`text-sm font-bold [font-synthesis:weight] text-[#003366] sm:text-base ${bn(lang)}`}
              >
                {lang === 'bn'
                  ? 'দৈনিক কলের সময়'
                  : 'Daily Call Duration'}
              </label>

              <span
                className={`
                  rounded-xl border border-[#0052CC]/15 bg-[#F4F8FF]
                  px-3 py-1.5 text-xs sm:text-sm font-bold [font-synthesis:weight] text-[#0052CC]
                  ${bn(lang)}
                `}
              >
                {minutes}{' '}
                {lang === 'bn' ? 'মিনিট / দিন' : 'Mins / Day'}
              </span>
            </div>

            <input
              id={minutesId}
              type="range"
              min="5"
              max="120"
              step="5"
              value={minutes}
              aria-valuetext={`${minutes} ${
                lang === 'bn' ? 'মিনিট / দিন' : 'minutes per day'
              }`}
              onChange={(event) =>
                setMinutes(Number(event.target.value))
              }
              className="
                mb-5 h-5 w-full cursor-pointer accent-[#0052CC]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#0052CC]
              "
            />

            <fieldset>
              <legend
                className={`mb-2.5 text-xs sm:text-sm font-bold [font-synthesis:weight] text-slate-600 ${bn(lang)}`}
              >
                {lang === 'bn' ? 'গন্তব্য' : 'Destination'}
              </legend>

              <div
                className="
                  grid grid-cols-2 gap-1.5
                  rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-1.5
                "
              >
                {['local', 'international'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={destination === item}
                    onClick={() => setDestination(item)}
                    className={`
                      rounded-xl px-3 py-2.5
                      text-xs leading-5 sm:text-sm
                      font-bold [font-synthesis:weight]
                      transition-[background-color,color,box-shadow]
                      duration-200 cursor-pointer
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-[#0052CC]
                      motion-reduce:transition-none
                      ${bn(lang)}
                      ${
                        destination === item
                          ? 'bg-[#003366] text-white shadow-xs'
                          : 'text-slate-600 hover:bg-white hover:text-[#0052CC]'
                      }
                    `}
                  >
                    {item === 'local'
                      ? lang === 'bn'
                        ? 'বিডি মোবাইল (৳০.৪০/মিনিট)'
                        : 'BD Mobile (৳0.40/min)'
                      : lang === 'bn'
                        ? 'আন্তর্জাতিক (৳১.১০/মিনিট থেকে)'
                        : 'International (from ৳1.10/min)'}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div
            className="
              rounded-2xl border border-slate-200/80
              bg-[#F8FAFC] p-4 sm:p-5
            "
          >
            <div
              className={`
                mb-2.5 flex flex-wrap justify-between gap-2
                border-b border-slate-200/80 pb-2.5 text-sm
                ${bn(lang)}
              `}
            >
              <span className="font-bold [font-synthesis:weight] text-[#003366]">
                AgniTalk
              </span>

              <span className="font-bold [font-synthesis:weight] tabular-nums text-[#0052CC]">
                ৳{agniCost.toLocaleString()} / {month}
              </span>
            </div>

            <div
              className={`
                mb-4 flex flex-wrap justify-between gap-2 text-sm
                ${bn(lang)}
              `}
            >
              <span className="text-slate-600">
                {lang === 'bn'
                  ? 'স্ট্যান্ডার্ড মোবাইল অপারেটর'
                  : 'Standard Mobile Operator'}
              </span>

              <span className="tabular-nums text-slate-600 line-through">
                ৳{operatorCost.toLocaleString()} / {month}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5">
              <p
                className={`text-base sm:text-lg font-bold [font-synthesis:weight] leading-snug text-[#003366] ${bn(lang)}`}
              >
                {lang === 'bn'
                  ? `AgniTalk-এ বছরে প্রায় ৳${yearlySavings.toLocaleString()} সাশ্রয় করুন!`
                  : `You Save ~৳${yearlySavings.toLocaleString()} Every Year with AgniTalk!`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}