import { motion, useReducedMotion } from 'framer-motion'
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

const palette = [
  { accent: '#0088D0', ink: '#005B8C', tint: '#EDF7FC' },
  { accent: '#F58220', ink: '#98500C', tint: '#FFF5EB' },
  { accent: '#E00010', ink: '#A61520', tint: '#FFF0F1' },
  { accent: '#F8E800', ink: '#786800', tint: '#FFFCE5' },
]

function BrandIcon({ Icon, theme }) {
  return (
    <span aria-hidden="true" style={{ backgroundColor: theme.tint, color: theme.ink }}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg">
      <Icon size={20} strokeWidth={1.8} />
    </span>
  )
}

function Reveal({ children, reduced, index = 0, className = '', ...props }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : index * 0.055 }}
      className={className} {...props}
    >{children}</motion.div>
  )
}

function StatCard({ stat, index, lang, reduced }) {
  const theme = palette[index % palette.length]
  return (
    <Reveal reduced={reduced} index={index} className="h-full">
      <div style={{ '--accent': theme.accent, '--tint': theme.tint, '--accent-ink': theme.ink }}
        className="relative flex h-full min-h-[148px] flex-col overflow-hidden rounded-xl border border-[#DFE8EF] bg-white p-4 transition-[border-color,box-shadow,transform] duration-200 hover:border-[var(--accent)] hover:shadow-md motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[var(--accent)]" />
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className={`text-[14px] font-bold [font-synthesis:weight] text-[var(--accent-ink)] ${bn(lang)}`}>{stat.tag[lang]}</span>
          <BrandIcon Icon={stat.Icon} theme={theme} />
        </div>
        <div aria-label={stat.value} className="font-agni-body font-bold [font-synthesis:weight] tabular-nums text-[clamp(36px,3.5vw,48px)] leading-none text-[#002B55]">
          {typeof stat.count === 'number' && reduced === false && CountUp ? (
            <CountUp start={0} end={stat.count} suffix={stat.suffix} duration={1.4} enableScrollSpy scrollSpyOnce />
          ) : stat.value}
        </div>
        <p className={`mb-0 mt-2 text-[16px] leading-relaxed text-[#25364A] ${bn(lang)}`}>{stat[lang]}</p>
      </div>
    </Reveal>
  )
}

export default function Corporate({ lang = 'en' }) {
  const language = lang === 'bn' ? 'bn' : 'en'
  const isBangla = language === 'bn'
  const reduced = useReducedMotion()

  return (
    <section id="corporate" lang={language} aria-labelledby="corporate-title"
      className="agnitalk-ui font-agni-body w-full border-b border-[#DFE8EF] bg-[#F7FAFC] py-8! sm:py-10! lg:py-11!">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal reduced={reduced} className="min-w-0 lg:col-span-7">
            <div className={`mb-3 flex items-center gap-2 text-[13px] font-bold text-[#006DA8] ${bn(lang)}`}>
              <span aria-hidden="true" className="flex items-center gap-0.5">
                <span className="h-[3px] w-5 rounded-full bg-[#0088D0]" />
                <span className="h-[3px] w-2 rounded-full bg-[#E00010]" />
                <span className="h-[3px] w-2 rounded-full bg-[#F58220]" />
                <span className="h-[3px] w-2 rounded-full bg-[#F8E800]" />
              </span>
              {isBangla ? 'অগ্নি সিস্টেমস সম্পর্কে' : 'About Agni Systems'}
            </div>
            <h2 id="corporate-title" style={display(lang)} className={`m-0 text-[clamp(28px,3.2vw,40px)] leading-[1.2] text-[#003366] ${bn(lang)}`}>
              {isBangla ? <>অগ্নি সিস্টেমস PLC. <span className="text-[#0073B1]">১৯৯৫ সাল থেকে</span> বাংলাদেশের সংযোগ সেবায়</> : <>Agni Systems PLC. <span className="text-[#0073B1]">Connecting Bangladesh</span> Since 1995</>}
            </h2>
            <p className={`mb-0 mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-700 sm:text-[17px] ${bn(lang)}`}>
              {isBangla ? 'অগ্নি সিস্টেমস PLC. সারা বাংলাদেশে ব্যক্তি ও প্রতিষ্ঠানের জন্য ইন্টারনেট, ডাটা ও টেলিফোনি সেবা প্রদান করে। ঢাকায় প্রধান কার্যালয়ের পাশাপাশি দেশের বিভিন্ন জেলায় প্রতিষ্ঠানটির অফিস রয়েছে।' : 'Agni Systems PLC. provides internet, data and telephony services to individuals and businesses across Bangladesh. Its main office is in Dhaka, with offices in districts across the country.'}
            </p>
            <div className="mt-4 grid gap-2">
              {INFRASTRUCTURE.map((item, index) => (
                <Reveal key={item.id} reduced={reduced} index={index}>
                  <div className="flex items-start gap-3 rounded-xl border border-[#DFE8EF] bg-white p-3 transition-colors hover:border-[#0088D0]/40">
                    <BrandIcon Icon={item.Icon} theme={palette[index]} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                        <h3 className={`m-0 font-agni-body text-[18px] font-bold leading-[1.3] text-[#002B55] [font-synthesis:weight] ${bn(lang)}`}>{item[language]}</h3>
                        <span style={{ backgroundColor: palette[index].tint, color: palette[index].ink }} className={`rounded-md px-2 py-0.5 text-[13px] font-bold [font-synthesis:weight] ${bn(lang)}`}>{item.badge[language]}</span>
                      </div>
                      <p className={`mb-0 mt-1 font-agni-body text-[15px] leading-[1.6] text-[#25364A] ${bn(lang)}`}>{item.detail[language]}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <div className="grid min-w-0 grid-cols-2 gap-3 lg:col-span-5">
            {STATS.map((stat, index) => <StatCard key={stat.id} stat={stat} index={index} lang={language} reduced={reduced} />)}
          </div>
        </div>
        <aside aria-labelledby="corporate-services-title" className="mt-7 border-t border-[#DFE8EF] pt-6 sm:mt-8">
          <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
            <Reveal reduced={reduced} className="min-w-0 lg:col-span-4">
              <span className={`text-xs font-medium text-[#006DA8] ${bn(lang)}`}>{isBangla ? 'আমাদের সেবা' : 'Our services'}</span>
              <h3 id="corporate-services-title" style={display(lang)} className={`mb-2 mt-2 text-[clamp(22px,2.4vw,28px)] leading-tight text-[#003366] ${bn(lang)}`}>
                {isBangla ? 'বাড়ি ও ব্যবসার জন্য সংযোগ' : 'Connectivity for homes and businesses'}
              </h3>
              <p className={`m-0 text-[15px] leading-relaxed text-slate-700 ${bn(lang)}`}>
                {isBangla ? 'ইন্টারনেট সংযোগের পাশাপাশি অগ্নি সিস্টেমস ক্লাউড, হোস্টিং অবকাঠামো ও টেলিফোনি সেবা প্রদান করে।' : 'Alongside internet access, Agni Systems offers cloud, hosting infrastructure and telephony services.'}
              </p>
              <a href="https://agni.com/about/" target="_blank" rel="noopener noreferrer" className={`group mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#006DA8] px-4 py-2 text-sm text-white no-underline transition-colors hover:bg-[#005789] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0088D0] ${bn(lang)}`}>
                {isBangla ? 'অগ্নি সিস্টেমস সম্পর্কে আরও জানুন' : 'More about Agni Systems'}
                <FiArrowUpRight aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                <span className="sr-only">{isBangla ? '(নতুন ট্যাবে খুলবে)' : '(opens in a new tab)'}</span>
              </a>
            </Reveal>
            <div className="grid min-w-0 gap-2.5 sm:grid-cols-2 xl:grid-cols-3 lg:col-span-8">
              {SERVICES.map((item, index) => (
                <Reveal key={item.id} reduced={reduced} index={index} className="h-full">
                  <div className="flex h-full items-start gap-3 rounded-xl border border-[#DFE8EF] bg-white p-3 transition-[border-color,transform] duration-200 hover:border-[#0088D0]/40 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
                    <BrandIcon Icon={item.Icon} theme={palette[index % palette.length]} />
                    <div className="min-w-0">
                      <h4 className={`m-0 font-agni-body text-[18px] font-bold leading-[1.3] text-[#002B55] [font-synthesis:weight] ${bn(lang)}`}>{item[language]}</h4>
                      <p className={`mb-0 mt-1 font-agni-body text-[15px] leading-[1.6] text-[#25364A] ${bn(lang)}`}>{item.desc[language]}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
