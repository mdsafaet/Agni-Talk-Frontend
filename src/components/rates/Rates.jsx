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

const CARD_COLORS = {
  mobile: {
    surface: '#F0F7FF',
    border: '#C7DFFF',
    accent: '#175CD3',
    glow: 'rgba(59, 130, 246, 0.20)',
    tint: '#DBEAFE',
  },
  landline: {
    surface: '#F5F2FF',
    border: '#DDD2FE',
    accent: '#7047C6',
    glow: 'rgba(139, 92, 246, 0.20)',
    tint: '#EDE5FF',
  },
  app: {
    surface: '#EFFBF5',
    border: '#BDE8D0',
    accent: '#087A50',
    glow: 'rgba(16, 185, 129, 0.20)',
    tint: '#D8F5E5',
  },
  usa: {
    surface: '#FFF2F5',
    border: '#F8CDDA',
    accent: '#BD3565',
    glow: 'rgba(236, 72, 153, 0.18)',
    tint: '#FFE1EA',
  },
  uk: {
    surface: '#F1F3FF',
    border: '#D1D8FF',
    accent: '#4E54C8',
    glow: 'rgba(99, 102, 241, 0.20)',
    tint: '#E1E6FF',
  },
  saudi: {
    surface: '#EFFAF7',
    border: '#BDE7DD',
    accent: '#087F72',
    glow: 'rgba(20, 184, 166, 0.20)',
    tint: '#D5F2EB',
  },
  uae: {
    surface: '#FFF7EB',
    border: '#F3DCB5',
    accent: '#996015',
    glow: 'rgba(245, 158, 11, 0.20)',
    tint: '#FCEACB',
  },
  malaysia: {
    surface: '#FFF3EE',
    border: '#F5D0BF',
    accent: '#B8542C',
    glow: 'rgba(249, 115, 22, 0.20)',
    tint: '#FFE3D5',
  },
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

  const x = Math.max(
    0,
    Math.min(1, (event.clientX - rect.left) / rect.width),
  )

  const y = Math.max(
    0,
    Math.min(1, (event.clientY - rect.top) / rect.height),
  )

  wrapper.style.setProperty('--tilt-x', `${(0.5 - y) * 16}deg`)
  wrapper.style.setProperty('--tilt-y', `${(x - 0.5) * 16}deg`)
  wrapper.style.setProperty('--lift', '-6px')
  wrapper.style.setProperty('--pointer-x', `${x * 100}%`)
  wrapper.style.setProperty('--pointer-y', `${y * 100}%`)
}

function resetTilt(event) {
  const wrapper = event.currentTarget

  wrapper.style.setProperty('--tilt-x', '0deg')
  wrapper.style.setProperty('--tilt-y', '0deg')
  wrapper.style.setProperty('--lift', '0px')
  wrapper.style.setProperty('--pointer-x', '50%')
  wrapper.style.setProperty('--pointer-y', '50%')
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
          rounded-lg border border-white/90
          bg-white/80 text-[var(--card-accent)]
          shadow-[0_3px_10px_rgba(15,23,42,0.05)]
        "
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
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
            rounded-lg border border-white/90 bg-white/90
            shadow-[0_3px_10px_rgba(15,23,42,0.05)]
          "
        >
          <ReactCountryFlag
            countryCode={code}
            svg
            title={COUNTRY_NAMES[code]}
            aria-label={COUNTRY_NAMES[code]}
            style={{
              width: '24px',
              height: '18px',
              objectFit: 'cover',
              borderRadius: '2px',
            }}
          />
        </span>
      ))}
    </div>
  )
}

function RateCard({ rate, lang }) {
  const language = lang === 'bn' ? 'bn' : 'en'
  const isFree = rate.rate === 0
  const colors = CARD_COLORS[rate.id] ?? CARD_COLORS.mobile

  return (
    <div
      onPointerMove={handleTilt}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      className="
        group relative isolate h-full min-w-0
        [perspective:1000px] hover:z-10
      "
      style={{
        '--card-surface': colors.surface,
        '--card-border': colors.border,
        '--card-accent': colors.accent,
        '--card-glow': colors.glow,
        '--card-tint': colors.tint,
      }}
    >
      {/* Colour glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-5 bottom-0 -z-10
          h-12 rounded-full bg-[var(--card-glow)] blur-xl
          opacity-30 transition-opacity duration-500
          group-hover:opacity-100
          motion-reduce:transition-none
        "
      />

      <article
        className="
          relative flex h-full flex-col
          rounded-[20px] border border-[var(--card-border)]
          bg-[var(--card-surface)] p-4
          shadow-[0_4px_16px_rgba(15,23,42,0.035)]
          [transform-style:preserve-3d]
          transition-[transform,box-shadow,border-color]
          duration-300 ease-out
          group-hover:border-[var(--card-accent)]
          group-hover:shadow-[0_18px_35px_-16px_var(--card-glow)]
          motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
          motion-reduce:transition-none
          sm:p-5
        "
      >
        {/* Mouse-following light */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 rounded-[inherit]
            opacity-0 transition-opacity duration-500
            group-hover:opacity-100 motion-reduce:hidden
          "
          style={{
            background:
              'radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255,255,255,0.85), transparent 65%)',
          }}
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-1.5
            rounded-[15px] border border-white/60
          "
        />

        <div
          className="
            relative mb-3 flex items-start justify-between gap-2
            [transform-style:preserve-3d]
            motion-safe:[transform:translateZ(16px)]
          "
        >
          <div className="min-w-0">
            <h3
              className={`mb-1 text-sm leading-5 text-slate-800 ${bn(lang)}`}
            >
              {rate.label[language]}
            </h3>

            <p
              className={`text-[11px] leading-4 text-slate-500 ${bn(lang)}`}
            >
              {rate.detail[language]}
            </p>
          </div>

          <div
            className="
              shrink-0 transition-transform duration-300 ease-out
              motion-safe:[transform:translateZ(12px)]
              motion-safe:group-hover:[transform:translateZ(18px)_translateY(-2px)_rotate(3deg)]
              motion-reduce:transition-none
            "
          >
            <CountryFlags countries={rate.countries} />
          </div>
        </div>

        <div
          className="
            relative mb-3 flex items-end gap-1.5
            motion-safe:[transform:translateZ(28px)]
          "
        >
          <span
            className="
              font-agni-heading text-[32px] leading-tight
              tracking-tight text-[var(--card-accent)]
              sm:text-[36px]
            "
          >
            {isFree ? 'FREE' : `৳${rate.rate.toFixed(2)}`}
          </span>

          {!isFree && (
            <span className="mb-1.5 text-xs text-slate-500">
              / min
            </span>
          )}
        </div>

        <div
          className={`
            relative mb-4 inline-flex items-center gap-1.5
            self-start rounded-full border border-white/80
            bg-[var(--card-tint)] px-2.5 py-1
            text-[11px] leading-4 text-[var(--card-accent)]
            motion-safe:[transform:translateZ(18px)]
            ${bn(lang)}
          `}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-3.5 w-3.5 shrink-0"
          >
            <circle
              cx="10"
              cy="10"
              r="7.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="m6.5 10 2.3 2.3 4.7-4.6"
              stroke="currentColor"
              strokeWidth="1.7"
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

        <div
          className="
            relative mt-auto border-t border-[var(--card-border)]
            pt-3 motion-safe:[transform:translateZ(10px)]
          "
        >
          <p
            className={`text-[11px] leading-5 text-slate-600 ${bn(lang)}`}
          >
            {rate.note[language]}
          </p>
        </div>
      </article>
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
      className="agnitalk-ui bg-[#F8FAFD] py-0!"
    >
      <div
        id="Rate-Calculator-Module"
        className="
          mx-auto w-full max-w-7xl px-4 py-14
          sm:px-6 sm:py-16 lg:px-8 lg:py-20
        "
      >
        {/* Heading */}
        <div className="mb-10 text-center">
          <div
            className={`
              mb-4 inline-flex rounded-full
              border border-blue-100 bg-blue-50
              px-4 py-2 text-xs tracking-wide text-[#0052CC]
              ${bn(lang)}
            `}
          >
            {lang === 'bn'
              ? 'স্বচ্ছ BTRC ট্যারিফ'
              : 'TRANSPARENT BTRC TARIFFS'}
          </div>

          <h2
            className={`
              mb-3 text-[clamp(26px,4vw,36px)]
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
              mx-auto max-w-2xl text-sm leading-7
              text-slate-500 sm:text-base ${bn(lang)}
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
            mb-6 flex flex-col items-stretch gap-4
            rounded-2xl border border-slate-200/80
            bg-white p-3 shadow-[0_4px_20px_rgba(15,23,42,0.03)]
            sm:p-4 lg:flex-row lg:items-center
          "
        >
          <div className="relative flex-1">
            <span
              aria-hidden="true"
              className="
                pointer-events-none absolute left-4 top-1/2
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
                bg-[#FAFCFE] py-3 pl-12 pr-4
                text-sm text-slate-700 outline-none
                transition-colors duration-200
                placeholder:text-slate-400
                focus:border-blue-400 focus:bg-white
                focus:ring-2 focus:ring-blue-100
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
                  rounded-full px-4 py-2.5 text-xs
                  transition-[background-color,color,box-shadow,transform]
                  duration-200
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#0052CC]
                  motion-safe:hover:-translate-y-0.5
                  motion-safe:active:scale-[0.97]
                  motion-reduce:transition-none
                  ${bn(lang)}
                  ${
                    filter === item.id
                      ? 'bg-[#0052CC] text-white shadow-sm hover:bg-[#003F9E]'
                      : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-[#0052CC]'
                  }
                `}
              >
                {item[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Compact rate cards */}
        <div
          className="
            mb-8 grid grid-cols-1 gap-4
            sm:grid-cols-2 xl:grid-cols-4
          "
        >
          {filtered.map((rate) => (
            <RateCard key={rate.id} rate={rate} lang={lang} />
          ))}

          {filtered.length === 0 && (
            <div
              role="status"
              className={`
                col-span-full rounded-2xl border border-slate-200
                bg-white px-5 py-10 text-center text-slate-500
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
            grid grid-cols-1 items-center gap-8
            rounded-3xl border border-slate-200/80
            bg-white p-5
            shadow-[0_8px_30px_rgba(0,51,102,0.04)]
            sm:p-7 lg:grid-cols-2
          "
        >
          <div>
            <div
              className="
                mb-5 flex flex-wrap items-center
                justify-between gap-3
              "
            >
              <label
                htmlFor={minutesId}
                className={`text-sm text-slate-700 sm:text-base ${bn(lang)}`}
              >
                {lang === 'bn'
                  ? 'দৈনিক কলের সময়'
                  : 'Daily Call Duration'}
              </label>

              <span
                className={`
                  rounded-xl border border-blue-100 bg-blue-50
                  px-3 py-2 text-sm text-[#0052CC]
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
                mb-6 h-6 w-full cursor-pointer accent-[#0052CC]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#0052CC]
              "
            />

            <fieldset>
              <legend
                className={`mb-3 text-sm text-slate-600 ${bn(lang)}`}
              >
                {lang === 'bn' ? 'গন্তব্য' : 'Destination'}
              </legend>

              <div
                className="
                  grid grid-cols-2 gap-2
                  rounded-2xl bg-slate-100 p-1.5
                "
              >
                {['local', 'international'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={destination === item}
                    onClick={() => setDestination(item)}
                    className={`
                      rounded-xl px-3 py-3
                      text-xs leading-5 sm:text-sm
                      transition-[background-color,color,box-shadow]
                      duration-200
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-[#0052CC]
                      motion-reduce:transition-none
                      ${bn(lang)}
                      ${
                        destination === item
                          ? 'bg-white text-[#0052CC] shadow-sm hover:bg-blue-50'
                          : 'text-slate-500 hover:bg-white/80 hover:text-[#0052CC]'
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
              rounded-2xl border border-blue-100
              bg-[#F0F6FF] p-5 sm:p-6
            "
          >
            <div
              className={`
                mb-3 flex flex-wrap justify-between gap-2
                border-b border-blue-100 pb-3 text-sm
                ${bn(lang)}
              `}
            >
              <span className="text-slate-600">AgniTalk</span>

              <span className="tabular-nums text-[#003366]">
                ৳{agniCost.toLocaleString()} / {month}
              </span>
            </div>

            <div
              className={`
                mb-5 flex flex-wrap justify-between gap-2 text-sm
                ${bn(lang)}
              `}
            >
              <span className="text-slate-600">
                {lang === 'bn'
                  ? 'স্ট্যান্ডার্ড মোবাইল অপারেটর'
                  : 'Standard Mobile Operator'}
              </span>

              <span className="tabular-nums text-slate-700">
                ৳{operatorCost.toLocaleString()} / {month}
              </span>
            </div>

            <p
              className={`text-lg leading-7 text-[#0052CC] ${bn(lang)}`}
            >
              {lang === 'bn'
                ? `AgniTalk-এ বছরে প্রায় ৳${yearlySavings.toLocaleString()} সাশ্রয় করুন!`
                : `You Save ~৳${yearlySavings.toLocaleString()} Every Year with AgniTalk!`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}