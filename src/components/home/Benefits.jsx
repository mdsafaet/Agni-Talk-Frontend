import { Link } from 'react-router-dom'
import {
  IconData,
  IconHash,
  IconPhone,
  IconWallet,
} from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const BENEFITS = [
  {
    Icon: IconPhone,
    en: {
      title: 'Ultra-Low Call Tariffs',
      desc: 'Call any mobile operator or landline in Bangladesh at a fraction of standard mobile costs. Save hundreds of taka every month.',
    },
    bn: {
      title: 'সর্বনিম্ন কল রেট',
      desc: 'বাংলাদেশের যেকোনো মোবাইল বা ল্যান্ডলাইনে কথা বলুন স্বল্পতম খরচে।',
    },
    link: {
      en: 'Compare Rates',
      bn: 'রেট দেখুন',
    },
    href: '/rates',
    cardTheme:
      'bg-[#F4F8FF] border-[#0052CC]/15 hover:border-[#0052CC]/35 hover:shadow-[0_14px_28px_-10px_rgba(0,82,204,0.2)]',
    iconTheme: 'bg-white text-[#0052CC] border-[#0052CC]/15',
    actionTheme: 'text-[#0052CC] group-hover:bg-[#0052CC] group-hover:text-white',
  },
  {
    Icon: IconData,
    en: {
      title: '70% Data Saver',
      desc: 'Powered by Byte Saver™ technology. Enjoy crystal-clear, drop-free calls even on slow 2G/3G networks across rural Bangladesh.',
    },
    bn: {
      title: '৭০% ডাটা সাশ্রয়',
      desc: 'Byte Saver™ প্রযুক্তিতে ধীর নেটওয়ার্কেও পরিষ্কার কল উপভোগ করুন।',
    },
    link: {
      en: 'Learn More',
      bn: 'আরো জানুন',
    },
    href: '/features',
    cardTheme:
      'bg-[#FFF7F4] border-[#FF5722]/15 hover:border-[#FF5722]/35 hover:shadow-[0_14px_28px_-10px_rgba(255,87,34,0.2)]',
    iconTheme: 'bg-white text-[#FF5722] border-[#FF5722]/15',
    actionTheme: 'text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white',
  },
  {
    Icon: IconWallet,
    en: {
      title: 'Instant Local Top-Up',
      desc: 'Recharge seamlessly via bKash, Nagad, or debit/credit cards in seconds — no bank trip, no hassle.',
    },
    bn: {
      title: 'তাৎক্ষণিক রিচার্জ',
      desc: 'বিকাশ, নগদ বা কার্ড দিয়ে মুহূর্তেই ব্যালেন্স যোগ করুন।',
    },
    link: {
      en: 'Top Up Now',
      bn: 'এখনই রিচার্জ',
    },
    href: '/packages',
    cardTheme:
      'bg-[#F3FBF8] border-emerald-600/15 hover:border-emerald-600/35 hover:shadow-[0_14px_28px_-10px_rgba(5,150,105,0.18)]',
    iconTheme: 'bg-white text-emerald-700 border-emerald-600/15',
    actionTheme: 'text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white',
  },
  {
    Icon: IconHash,
    en: {
      title: 'Your Own 09606 Number',
      desc: "Get a dedicated IPTSP virtual phone number automatically matched to your existing mobile number's digits. Everyone knows it's you.",
    },
    bn: {
      title: 'নিজের ০৯৬০৬ নম্বর',
      desc: 'আপনার মোবাইল নম্বরের সাথে মিলিয়ে স্বয়ংক্রিয়ভাবে একটি IPTSP ভার্চুয়াল নম্বর পান।',
    },
    link: {
      en: 'Get Your Number',
      bn: 'নম্বর পান',
    },
    href: '/how-it-works',
    cardTheme:
      'bg-[#F6F5FF] border-indigo-600/15 hover:border-indigo-600/35 hover:shadow-[0_14px_28px_-10px_rgba(79,70,229,0.18)]',
    iconTheme: 'bg-white text-indigo-700 border-indigo-600/15',
    actionTheme: 'text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white',
  },
]

function TiltBenefitCard({ benefit, titleId, isBangla, lang }) {
  const content = isBangla ? benefit.bn : benefit.en
  const { Icon } = benefit

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

    wrapper.style.setProperty('--card-x', `${(0.5 - y) * 7}deg`)
    wrapper.style.setProperty('--card-y', `${(x - 0.5) * 7}deg`)
    wrapper.style.setProperty('--card-lift', '-4px')
  }

  const resetTilt = (event) => {
    const wrapper = event.currentTarget
    wrapper.style.setProperty('--card-x', '0deg')
    wrapper.style.setProperty('--card-y', '0deg')
    wrapper.style.setProperty('--card-lift', '0px')
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      className="h-full [perspective:1000px]"
    >
      <Link
        to={benefit.href}
        aria-labelledby={titleId}
        className={`
          group relative flex h-full flex-col
          rounded-[20px] border p-4
          shadow-[0_6px_18px_-8px_rgba(0,51,102,0.08)]
          [transform-style:preserve-3d]
          transition-[transform,border-color,box-shadow,background-color]
          duration-200 ease-out
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[#0052CC]
          motion-safe:[transform:translateY(var(--card-lift,0px))_rotateX(var(--card-x,0deg))_rotateY(var(--card-y,0deg))]
          motion-safe:active:scale-[0.99]
          motion-reduce:transition-none
          ${benefit.cardTheme}
        `}
      >
        {/* Compact Icon + Title Row */}
        <div className="mb-2.5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className={`
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border shadow-2xs
              transition-transform duration-200
              motion-safe:group-hover:scale-105
              motion-reduce:transition-none
              ${benefit.iconTheme}
            `}
          >
            <Icon />
          </span>

          <h3
            id={titleId}
            className={`text-base sm:text-[17px] font-bold [font-synthesis:weight] leading-snug text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {content.title}
          </h3>
        </div>

        {/* Description */}
        <p
          className={`mb-3.5 text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
        >
          {content.desc}
        </p>

        {/* Compact Action Footer */}
        <span
          className={`
            mt-auto flex min-h-9 items-center justify-between gap-2
            border-t border-[#003366]/10 pt-2.5
            text-xs sm:text-sm font-bold [font-synthesis:weight] text-[#003366]
            ${bn(lang)}
          `}
        >
          <span>
            {isBangla ? benefit.link.bn : benefit.link.en}
          </span>

          <span
            aria-hidden="true"
            className={`
              flex h-7 w-7 shrink-0 items-center justify-center
              rounded-full border border-[#003366]/10 bg-white
              transition-colors duration-200
              motion-reduce:transition-none
              ${benefit.actionTheme}
            `}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="
                h-3.5 w-3.5 transition-transform duration-200 ease-out
                motion-safe:group-hover:translate-x-0.5
                motion-safe:group-focus-visible:translate-x-0.5
                motion-reduce:transition-none
              "
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </span>
        </span>
      </Link>
    </div>
  )
}

export default function Benefits({ lang = 'en' }) {
  const isBangla = lang === 'bn'

  return (
    <section
      lang={lang}
      aria-labelledby="benefits-title"
      className="
        relative overflow-hidden
        border-b border-slate-200/70
        bg-[#F8FAFF]
        bg-[radial-gradient(#CBD5E1_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
      "
    >
      {/* Subtle surface fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(248,250,255,0.55)_100%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-12">
        {/* Compact Section Heading */}
        <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-8">
          <span
            className={`
              mb-2 inline-flex items-center gap-2
              rounded-full border border-[#0052CC]/15
              bg-white px-3 py-0.5
              text-[11px] font-bold [font-synthesis:weight] uppercase tracking-wider text-[#0052CC]
              shadow-2xs
              ${bn(lang)}
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            {isBangla ? 'অগ্নিটক সুবিধা' : 'Why AgniTalk'}
          </span>

          <h2
            id="benefits-title"
            className={`mb-2 text-[clamp(24px,3.8vw,36px)] font-bold [font-synthesis:weight] leading-tight text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'কেন অগ্নিটক বেছে নেবেন?'
              : 'Why Choose AgniTalk?'}
          </h2>

          <p
            className={`mx-auto max-w-xl text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
          >
            {isBangla
              ? 'অগ্নি সিস্টেমসের ২৫+ বছরের অভিজ্ঞতায় তৈরি বাংলাদেশের সেরা আইপি টেলিফোনি সমাধান।'
              : "Built on 25+ years of Agni Systems' telecom expertise, designed specifically for Bangladesh's network landscape."}
          </p>
        </div>

        {/* Compact 20px Cards */}
        <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {BENEFITS.map((benefit, index) => (
            <li key={benefit.href} className="h-full">
              <TiltBenefitCard
                benefit={benefit}
                titleId={`benefit-title-${index}`}
                isBangla={isBangla}
                lang={lang}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}