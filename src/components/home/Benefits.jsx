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
  },
]

export default function Benefits({ lang = 'en' }) {
  const isBangla = lang === 'bn'

  return (
    <section
      lang={lang}
      aria-labelledby="benefits-title"
      className="relative isolate overflow-hidden bg-[#EAF1F8] py-0!"
    >
      {/* Background colours make the transparent cards visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-20 top-16 h-80 w-80 rounded-full bg-sky-300/35 blur-[80px]" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-200/45 blur-[90px]" />

        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/80 blur-[60px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2
            id="benefits-title"
            className={`mb-4 text-[clamp(24px,4vw,36px)] font-normal leading-tight text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'কেন অগ্নিটক বেছে নেবেন?'
              : 'Why Choose AgniTalk?'}
          </h2>

          <p
            className={`mx-auto max-w-xl text-sm leading-7 text-slate-600 sm:text-base ${bn(lang)}`}
          >
            {isBangla
              ? 'অগ্নি সিস্টেমসের ২৫+ বছরের অভিজ্ঞতায় তৈরি বাংলাদেশের সেরা আইপি টেলিফোনি সমাধান।'
              : "Built on 25+ years of Agni Systems' telecom expertise, designed specifically for Bangladesh's network landscape."}
          </p>
        </div>

        {/* Glass cards */}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {BENEFITS.map((benefit, index) => {
            const content = isBangla ? benefit.bn : benefit.en
            const titleId = `benefit-title-${index}`
            const { Icon } = benefit

            return (
              <li key={benefit.href} className="h-full">
                <Link
                  to={benefit.href}
                  aria-labelledby={titleId}
                  className="group relative isolate flex h-full flex-col rounded-3xl border border-white/80 bg-white/65 p-6 shadow-[0_8px_24px_rgba(30,60,90,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] transition-transform duration-500 ease-out supports-[backdrop-filter:blur(1px)]:bg-white/30 supports-[backdrop-filter:blur(1px)]:backdrop-blur-xl supports-[backdrop-filter:blur(1px)]:backdrop-saturate-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0052CC] motion-safe:hover:-translate-y-2 motion-reduce:transition-none"
                >
                  {/* Soft hover highlight */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-white/20 opacity-0 shadow-[0_18px_36px_rgba(30,60,90,0.10)] transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  />

                  {/* Top glass edge */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white to-transparent"
                  />

                  {/* Icon */}
                  <span
                    aria-hidden="true"
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/90 bg-white/60 text-[#0052CC] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_10px_rgba(30,60,90,0.04)]"
                  >
                    <Icon />
                  </span>

                  {/* Title */}
                  <h3
                    id={titleId}
                    className={`mb-3 text-lg font-normal leading-snug text-[#003366] ${bn(lang)}`}
                    style={display(lang)}
                  >
                    {content.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`mb-6 text-sm leading-7 text-slate-600 ${bn(lang)}`}
                  >
                    {content.desc}
                  </p>

                  {/* Action */}
                  <span
                    className={`mt-auto flex min-h-11 items-center justify-between gap-3 border-t border-white/80 pt-4 text-sm text-[#0052CC] ${bn(lang)}`}
                  >
                    <span>
                      {isBangla
                        ? benefit.link.bn
                        : benefit.link.en}
                    </span>

                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/55"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-reduce:transition-none"
                      >
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}