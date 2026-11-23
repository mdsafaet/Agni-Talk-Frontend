import { useEffect, useState } from 'react'
import CountUpModule from 'react-countup'
import {
  FiArrowUpRight,
  FiAward,
  FiCalendar,
  FiCloud,
  FiCpu,
  FiGlobe,
  FiHome,
  FiLayers,
  FiPhoneCall,
  FiServer,
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi'
import { bn, display } from '../../utils/lang'

// Support both direct and CommonJS-wrapped default exports.
const CountUp =
  typeof CountUpModule === 'function'
    ? CountUpModule
    : CountUpModule.default

const STATS = [
  {
    id: 'experience',
    value: '30+',
    count: 30,
    suffix: '+',
    highlightTag: true,
    Icon: FiAward,
    tag: { en: 'Experience', bn: 'অভিজ্ঞতা' },
    en: 'Years serving Bangladesh',
    bn: 'বছর ধরে বাংলাদেশে সেবা',
  },
  {
    id: 'founded',
    value: '1995',
    highlightTag: true,
    Icon: FiCalendar,
    tag: { en: 'Established', bn: 'প্রতিষ্ঠিত' },
    en: 'Operations began',
    bn: 'কার্যক্রম শুরু',
  },
  {
    id: 'listed',
    value: '2003',
    highlightTag: true,
    Icon: FiTrendingUp,
    tag: { en: 'Publicly listed', bn: 'তালিকাভুক্ত' },
    en: 'Listed on DSE and CSE',
    bn: 'DSE ও CSE-তে তালিকাভুক্ত',
  },
  {
    id: 'iptsp',
    value: '2009',
    highlightTag: true,
    Icon: FiShield,
    tag: { en: 'IP telephony', bn: 'আইপি টেলিফোনি' },
    en: 'IPTSP licence obtained',
    bn: 'IPTSP লাইসেন্স অর্জন',
  },
]

const INFRASTRUCTURE = [
  {
    id: 'isp',
    Icon: FiGlobe,
    badge: { en: 'BTRC Licensed', bn: 'বিটিআরসি অনুমোদিত' },
    en: 'Nationwide ISP licence',
    bn: 'দেশব্যাপী ISP লাইসেন্স',
    detail: {
      en: 'Authorized nationwide internet & data connectivity across Bangladesh.',
      bn: 'সারা বাংলাদেশে অনুমোদিত ইন্টারনেট ও ডাটা কানেক্টিভিটি সেবা।',
    },
  },
  {
    id: 'fiber',
    Icon: FiServer,
    badge: { en: 'Since 2006', bn: '২০০৬ থেকে' },
    en: 'Fiber-optic deployment since 2006',
    bn: '২০০৬ সাল থেকে ফাইবার-অপটিক নেটওয়ার্ক স্থাপন',
    detail: {
      en: 'High-capacity optical fiber backbone built for low-latency voice & data.',
      bn: 'কম ল্যাটেন্সির ভয়েস ও ডাটার জন্য উচ্চক্ষমতার অপটিক্যাল ফাইবার ব্যাকবোন।',
    },
  },
  {
    id: 'icx',
    Icon: FiPhoneCall,
    badge: { en: 'Since 2012', bn: '২০১২ থেকে' },
    en: 'ICX operator licence obtained in 2012',
    bn: '২০১২ সালে ICX অপারেটর লাইসেন্স অর্জন',
    detail: {
      en: 'Carrier-grade interconnection exchange routing domestic & international calls.',
      bn: 'দেশীয় ও আন্তর্জাতিক কল রাউটিংয়ের জন্য ক্যারিয়ার-গ্রেড ইন্টারকানেকশন এক্সচেঞ্জ।',
    },
  },
]

const SERVICES = [
  {
    id: 'corporate-internet',
    Icon: FiGlobe,
    en: 'Corporate internet',
    bn: 'কর্পোরেট ইন্টারনেট',
    desc: {
      en: 'Dedicated enterprise bandwidth with SLA-backed uptime',
      bn: 'SLA-সমর্থিত নিরবচ্ছিন্ন ডেডিকেটেড এন্টারপ্রাইজ ব্যান্ডউইথ',
    },
  },
  {
    id: 'home-internet',
    Icon: FiHome,
    en: 'Home internet',
    bn: 'হোম ইন্টারনেট',
    desc: {
      en: 'High-speed FTTP fiber broadband for everyday households',
      bn: 'দৈনন্দিন ব্যবহারের জন্য দ্রুতগতির FTTP ফাইবার ব্রডব্যান্ড',
    },
  },
  {
    id: 'cloud-services',
    Icon: FiCloud,
    en: 'Cloud services',
    bn: 'ক্লাউড সেবা',
    desc: {
      en: 'Scalable local cloud hosting and managed infrastructure',
      bn: 'স্কেলেবল লোকাল ক্লাউড হোস্টিং ও ম্যানেজড অবকাঠামো',
    },
  },
  {
    id: 'vps',
    Icon: FiCpu,
    en: 'VPS',
    bn: 'VPS',
    desc: {
      en: 'Isolated virtual private servers with full root control',
      bn: 'সম্পূর্ণ রুট কন্ট্রোলসহ আইসোলেটেড ভার্চুয়াল প্রাইভেট সার্ভার',
    },
  },
  {
    id: 'telephony',
    Icon: FiPhoneCall,
    en: 'Telephony',
    bn: 'টেলিফোনি',
    desc: {
      en: '09606 IPTSP voice solutions & AgniTalk cloud calling',
      bn: '০৯৬০৬ IPTSP ভয়েস সলিউশন ও AgniTalk ক্লাউড কলিং',
    },
  },
  {
    id: 'co-location',
    Icon: FiLayers,
    en: 'Co-location',
    bn: 'কো-লোকেশন',
    desc: {
      en: 'Secure data center rack space, redundant power & cooling',
      bn: 'নিরাপদ ডাটা সেন্টার র‍্যাক স্পেস, ব্যাকআপ পাওয়ার ও কুলিং',
    },
  },
]

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    const update = () => setReducedMotion(media.matches)

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  return reducedMotion
}

function StatCard({ stat, index, lang, reducedMotion }) {
  const language = lang === 'bn' ? 'bn' : 'en'
  const { Icon, highlightTag } = stat

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse' || reducedMotion) return

    const stage = event.currentTarget
    const rect = stage.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const x = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width),
    )
    const y = Math.max(
      0,
      Math.min(1, (event.clientY - rect.top) / rect.height),
    )

    stage.style.setProperty('--card-rx', `${(0.5 - y) * 16}deg`)
    stage.style.setProperty('--card-ry', `${(x - 0.5) * 16}deg`)
    stage.style.setProperty('--card-lift', '-6px')
    stage.style.setProperty('--glare-x', `${x * 100}%`)
    stage.style.setProperty('--glare-y', `${y * 100}%`)
    stage.style.setProperty('--glare-opacity', '1')
  }

  const resetCard = (event) => {
    const stage = event.currentTarget
    stage.style.setProperty('--card-rx', '0deg')
    stage.style.setProperty('--card-ry', '0deg')
    stage.style.setProperty('--card-lift', '0px')
    stage.style.setProperty('--glare-opacity', '0')
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetCard}
      onPointerCancel={resetCard}
      className="
        h-full [perspective:900px]
        motion-safe:animate-[agniCorporateFloat_7s_ease-in-out_infinite]
      "
      style={{ animationDelay: `${index * -1.6}s` }}
    >
      <div
        className="
          group relative flex h-full flex-col rounded-2xl
          border border-[#DCE6F2] bg-white/95 p-5
          [transform-style:preserve-3d]
          shadow-[0_14px_32px_-12px_rgba(0,51,102,0.14),0_4px_10px_-4px_rgba(15,23,42,0.06)]
          transition-[transform,border-color,box-shadow]
          duration-200 ease-out
          hover:border-[#9EC2EA]
          hover:shadow-[0_24px_46px_-14px_rgba(0,82,204,0.22),0_8px_18px_-6px_rgba(0,51,102,0.1)]
          motion-safe:[transform:translateY(var(--card-lift,0px))_rotateX(var(--card-rx,0deg))_rotateY(var(--card-ry,0deg))]
          motion-reduce:transition-none sm:p-6
        "
      >
        {/* Subtle 3D specular highlight following pointer */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 rounded-2xl
            opacity-[var(--glare-opacity,0)]
            transition-opacity duration-200
            bg-[radial-gradient(circle_at_var(--glare-x,50%)_var(--glare-y,50%),rgba(0,82,204,0.09),transparent_65%)]
          "
        />

        {/* Soft bottom depth rim */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-x-3 -bottom-1.5 -z-10 h-3
            rounded-b-2xl bg-[#003366]/[0.06] blur-[2px]
          "
        />

        <div
          className="
            mb-6 flex items-center justify-between gap-3
            motion-safe:[transform:translateZ(14px)]
          "
        >
          <span
            className={`
              ${
                highlightTag
                  ? 'rounded-full border border-[#0052CC]/25 bg-[#E6F0FF] px-3 py-1 text-xs sm:text-[13px] font-bold [font-synthesis:weight] text-[#0052CC] transition-colors duration-200 group-hover:bg-[#0052CC] group-hover:text-white'
                  : 'text-xs sm:text-[13px] font-semibold text-[#1E40AF]'
              }
              ${bn(lang)}
            `}
          >
            {stat.tag[language]}
          </span>

          <span
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-xl border border-[#E6EEF8] bg-[#F6FAFF]
              text-[#0052CC] shadow-2xs
              transition-colors duration-300
              group-hover:border-[#0052CC] group-hover:bg-[#0052CC] group-hover:text-white
              motion-reduce:transition-none
            "
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.7}
              className="h-4 w-4"
            />
          </span>
        </div>

        <div
          aria-label={stat.value}
          className="
            mb-3 font-agni-heading text-[34px]
            leading-none tracking-tight text-[#003366]
            transition-colors duration-200 group-hover:text-[#0052CC]
            sm:text-[40px]
            motion-safe:[transform:translateZ(22px)]
          "
        >
          {typeof stat.count === 'number' && !reducedMotion ? (
            <CountUp
              start={0}
              end={stat.count}
              suffix={stat.suffix}
              duration={1.4}
              enableScrollSpy
              scrollSpyOnce
            />
          ) : (
            stat.value
          )}
        </div>

        <p
          className={`mt-auto text-sm sm:text-[15px] leading-6 text-[#2B548E] ${bn(lang)}`}
        >
          {stat[language]}
        </p>
      </div>
    </div>
  )
}

export default function Corporate({ lang = 'en' }) {
  const language = lang === 'bn' ? 'bn' : 'en'
  const isBangla = language === 'bn'
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="corporate"
      lang={language}
      aria-labelledby="corporate-title"
      className="
        agnitalk-ui relative w-full overflow-hidden
        border-b border-slate-200/70
        bg-[#F8FAFF]
        bg-[radial-gradient(#CBD5E1_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
        py-0!
      "
    >
      {/* Matching top-to-bottom surface fade like other pages */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,255,0.45)_0%,rgba(255,255,255,0.92)_100%)]"
      />

      <div
        className="
          relative mx-auto max-w-7xl px-4 py-14
          sm:px-6 sm:py-16 lg:px-8 lg:py-20
        "
      >
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Company introduction */}
          <div className="min-w-0 lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#0052CC]"
              />

              <span
                className={`text-xs sm:text-sm font-medium tracking-wide text-[#0052CC] ${bn(lang)}`}
              >
                {isBangla
                  ? 'অগ্নি সিস্টেমস সম্পর্কে'
                  : 'About Agni Systems'}
              </span>
            </div>

            <h2
              id="corporate-title"
              className={`
                max-w-2xl text-[clamp(28px,3.6vw,42px)]
                leading-[1.2] tracking-tight text-[#003366]
                ${bn(lang)}
              `}
              style={display(lang)}
            >
              {isBangla ? (
                <>
                  অগ্নি সিস্টেমস PLC.{' '}
                  <span className="text-[#0052CC]">
                    ১৯৯৫ সাল থেকে
                  </span>{' '}
                  বাংলাদেশের সংযোগ সেবায়
                </>
              ) : (
                <>
                  Agni Systems PLC.{' '}
                  <span className="text-[#0052CC]">
                    Connecting Bangladesh
                  </span>{' '}
                  Since 1995
                </>
              )}
            </h2>

            <p
              className={`
                mt-5 max-w-2xl text-base leading-7
                text-slate-600 sm:text-[17px] sm:leading-8
                ${bn(lang)}
              `}
            >
              {isBangla
                ? 'অগ্নি সিস্টেমস PLC. সারা বাংলাদেশে ব্যক্তি ও প্রতিষ্ঠানের জন্য ইন্টারনেট, ডাটা ও টেলিফোনি সেবা প্রদান করে। ঢাকায় প্রধান কার্যালয়ের পাশাপাশি দেশের বিভিন্ন জেলায় প্রতিষ্ঠানটির অফিস রয়েছে।'
                : 'Agni Systems PLC. provides internet, data and telephony services to individuals and businesses across Bangladesh. Its main office is in Dhaka, with offices in districts across the country.'}
            </p>

            {/* Hover-only Blue-Focused Infrastructure Cards */}
            <div className="mt-7 grid gap-4 sm:grid-cols-1">
              {INFRASTRUCTURE.map(({ id, Icon, badge, detail, ...item }) => (
                <div
                  key={id}
                  tabIndex={0}
                  className="
                    group w-full rounded-2xl border border-[#DCE6F2]
                    bg-white/90 p-4 sm:p-5 text-left
                    shadow-[0_6px_18px_-8px_rgba(0,51,102,0.08)]
                    transition-all duration-200
                    hover:-translate-y-0.5 hover:border-[#0052CC]/50
                    hover:bg-[linear-gradient(135deg,#EBF3FF_0%,#F6FAFF_100%)]
                    hover:shadow-[0_12px_28px_-8px_rgba(0,82,204,0.22)]
                    focus-visible:border-[#0052CC]/50
                    focus-visible:bg-[linear-gradient(135deg,#EBF3FF_0%,#F6FAFF_100%)]
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]
                    motion-reduce:transition-none motion-reduce:hover:translate-y-0
                  "
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="
                        mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                        bg-[#E1EDFF] text-[#0052CC] transition-colors duration-200
                        group-hover:bg-[#0052CC] group-hover:text-white
                        group-hover:shadow-[0_6px_14px_-4px_rgba(0,82,204,0.55)]
                        group-focus-visible:bg-[#0052CC] group-focus-visible:text-white
                      "
                    >
                      <Icon aria-hidden="true" strokeWidth={1.9} className="h-5 w-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`
                            text-base sm:text-[17px] font-bold [font-synthesis:weight]
                            text-[#003366] transition-colors duration-200
                            group-hover:text-[#0052CC] group-focus-visible:text-[#0052CC]
                            ${bn(lang)}
                          `}
                        >
                          {item[language]}
                        </span>

                        <span
                          className={`
                            rounded-full border border-[#0052CC]/20 bg-[#E6F0FF]
                            px-3 py-0.5 text-xs font-semibold text-[#0052CC]
                            transition-colors duration-200
                            group-hover:border-[#0052CC]/25 group-hover:bg-[#0052CC] group-hover:text-white
                            group-focus-visible:bg-[#0052CC] group-focus-visible:text-white
                            ${bn(lang)}
                          `}
                        >
                          {badge[language]}
                        </span>
                      </div>

                      <p
                        className={`
                          mt-1.5 text-sm leading-6 text-[#2B548E]
                          transition-colors duration-200
                          group-hover:text-[#1D4ED8] group-focus-visible:text-[#1D4ED8]
                          ${bn(lang)}
                        `}
                      >
                        {detail[language]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating 3D milestone cards */}
          <div
            className="
              grid min-w-0 grid-cols-1 gap-5
              sm:grid-cols-2 lg:col-span-5 lg:pt-2
            "
          >
            {STATS.map((stat, index) => (
              <StatCard
                key={stat.id}
                stat={stat}
                index={index}
                lang={lang}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Services panel with highlighted hover cards */}
        <aside
          aria-labelledby="corporate-services-title"
          className="
            mt-12 rounded-3xl border border-[#DCE7F3]
            bg-white/85 p-6 shadow-[0_10px_30px_-12px_rgba(0,51,102,0.08)]
            backdrop-blur-xs sm:mt-14 sm:p-8 lg:p-10
          "
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-5">
              <span
                className={`mb-4 block text-xs sm:text-sm font-semibold text-[#0052CC] ${bn(lang)}`}
              >
                {isBangla ? 'আমাদের সেবা' : 'Our services'}
              </span>

              <h3
                id="corporate-services-title"
                className={`
                  mb-4 text-2xl leading-snug text-[#003366]
                  sm:text-[26px] ${bn(lang)}
                `}
                style={display(lang)}
              >
                {isBangla
                  ? 'বাড়ি ও ব্যবসার জন্য সংযোগ'
                  : 'Connectivity for homes and businesses'}
              </h3>

              <p
                className={`text-sm sm:text-base leading-7 text-slate-600 ${bn(lang)}`}
              >
                {isBangla
                  ? 'ইন্টারনেট সংযোগের পাশাপাশি অগ্নি সিস্টেমস ক্লাউড, হোস্টিং অবকাঠামো ও টেলিফোনি সেবা প্রদান করে।'
                  : 'Alongside internet access, Agni Systems offers cloud, hosting infrastructure and telephony services.'}
              </p>

              <a
                href="https://agni.com/about/"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group mt-7 inline-flex min-h-12
                  w-full items-center justify-center gap-3
                  rounded-xl border border-[#003366]
                  bg-[#003366] px-5 py-3
                  text-center text-sm sm:text-[15px] text-white
                  transition-[background-color,border-color,transform]
                  duration-200
                  hover:border-[#0052CC] hover:bg-[#0052CC]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#0052CC]
                  motion-safe:active:scale-[0.98]
                  motion-reduce:transition-none
                  sm:w-auto ${bn(lang)}
                `}
              >
                <span>
                  {isBangla
                    ? 'অগ্নি সিস্টেমস সম্পর্কে আরও জানুন'
                    : 'More about Agni Systems'}
                </span>

                <FiArrowUpRight
                  aria-hidden="true"
                  className="
                    h-4 w-4 shrink-0
                    transition-transform duration-200
                    motion-safe:group-hover:-translate-y-0.5
                    motion-safe:group-hover:translate-x-0.5
                    motion-reduce:transition-none
                  "
                />

                <span className="sr-only">
                  {isBangla
                    ? '(নতুন ট্যাবে খুলবে)'
                    : '(opens in a new tab)'}
                </span>
              </a>
            </div>

            <div
              className="
                min-w-0 border-t border-[#D4E0ED] pt-6
                lg:col-span-7 lg:border-l lg:border-t-0
                lg:pl-10 lg:pt-0
              "
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {SERVICES.map(({ id, Icon, desc, ...item }) => (
                  <div
                    key={id}
                    tabIndex={0}
                    className="
                      group rounded-2xl border border-[#D4E2F2]
                      bg-[#F8FAFF]/90 p-4 sm:p-5
                      shadow-[0_6px_16px_-8px_rgba(0,51,102,0.08)]
                      transition-all duration-200
                      hover:-translate-y-0.5 hover:border-[#0052CC]/50
                      hover:bg-[linear-gradient(135deg,#FFFFFF_0%,#EBF3FF_100%)]
                      hover:shadow-[0_12px_26px_-8px_rgba(0,82,204,0.22)]
                      focus-visible:border-[#0052CC]/50
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]
                      motion-reduce:transition-none motion-reduce:hover:translate-y-0
                    "
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className="
                          mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                          bg-[#E6F0FF] text-[#0052CC]
                          transition-colors duration-200
                          group-hover:bg-[#0052CC] group-hover:text-white
                          group-hover:shadow-[0_6px_14px_-4px_rgba(0,82,204,0.5)]
                          group-focus-visible:bg-[#0052CC] group-focus-visible:text-white
                        "
                      >
                        <Icon aria-hidden="true" strokeWidth={1.9} className="h-5 w-5" />
                      </span>

                      <div className="min-w-0">
                        <h4
                          className={`
                            text-base font-bold [font-synthesis:weight]
                            text-[#003366] transition-colors duration-200
                            group-hover:text-[#0052CC] group-focus-visible:text-[#0052CC]
                            ${bn(lang)}
                          `}
                        >
                          {item[language]}
                        </h4>

                        <p
                          className={`
                            mt-1.5 text-sm leading-6 text-[#2B548E]
                            transition-colors duration-200
                            group-hover:text-[#1D4ED8]
                            ${bn(lang)}
                          `}
                        >
                          {desc[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}