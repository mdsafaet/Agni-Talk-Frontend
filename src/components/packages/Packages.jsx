import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhoneCall, FiCalendar, FiGift } from 'react-icons/fi'
import { bn } from '../../utils/lang'

const PACKAGES = [
  {
    badge: { en: 'Most Popular', bn: 'সবচেয়ে জনপ্রিয়' },
    en: {
      name: 'Talk 100 Pack',
      price: '৳49',
      desc: '100 minutes to any Bangladesh mobile/landline. Valid 7 days.',
      minutes: '100 min',
      validity: '7 days',
      bonus: '',
    },
    bn: {
      name: 'টক ১০০ প্যাক',
      price: '৳49',
      desc: 'যেকোনো বাংলাদেশী মোবাইল/ল্যান্ডলাইনে ১০০ মিনিট।',
      minutes: '১০০ মিনিট',
      validity: '৭ দিন',
      bonus: '',
    },
    highlight: true,
  },
  {
    badge: { en: 'Best Value', bn: 'সেরা মূল্য' },
    en: {
      name: 'Talk 500 Pack',
      price: '৳199',
      desc: '500 minutes to any number. Valid 30 days. Extra 50 min bonus!',
      minutes: '500+50 min',
      validity: '30 days',
      bonus: '+50 min Bonus',
    },
    bn: {
      name: 'টক ৫০০ প্যাক',
      price: '৳199',
      desc: '৫০০ মিনিট + ৫০ মিনিট বোনাস। ৩০ দিন মেয়াদ।',
      minutes: '৫০০+৫০ মিনিট',
      validity: '৩০ দিন',
      bonus: '+৫০ মিনিট বোনাস',
    },
    highlight: false,
  },
  {
    badge: { en: 'Quick Pack', bn: 'কুইক প্যাক' },
    en: {
      name: 'Talk 30 Pack',
      price: '৳18',
      desc: '30 minutes to any Bangladesh number. Valid 3 days.',
      minutes: '30 min',
      validity: '3 days',
      bonus: '',
    },
    bn: {
      name: 'টক ৩০ প্যাক',
      price: '৳18',
      desc: 'যেকোনো নাম্বারে ৩০ মিনিট। ৩ দিন মেয়াদ।',
      minutes: '৩০ মিনিট',
      validity: '৩ দিন',
      bonus: '',
    },
    highlight: false,
  },
]

const THEMES = [
  { accent: '#0088D0', ink: '#005B8C', soft: '#EAF6FC' },
  { accent: '#F58220', ink: '#934509', soft: '#FFF3E8' },
  { accent: '#E00010', ink: '#A81020', soft: '#FFF0F1' },
]

function BrandMark() {
  return (
    <span aria-hidden="true" className="inline-flex h-1 shrink-0 gap-0.5">
      <span className="w-5 rounded-full bg-[#0088D0]" />
      <span className="w-2 rounded-full bg-[#E00010]" />
      <span className="w-2 rounded-full bg-[#F58220]" />
      <span className="w-2 rounded-full bg-[#F8E800]" />
    </span>
  )
}

export default function Packages({
  lang = 'en',
  showHeader = true,
  showReferral = true,
  className = '',
}) {
  const isBangla = lang === 'bn'
  const language = isBangla ? 'bn' : 'en'
  const font = isBangla ? bn(lang) : 'font-agni-body'
  const heading = isBangla ? 'ভয়েস প্যাকেজ ও অফার' : 'Voice Packages & Special Offers'

  return (
    <section id="packages" lang={language} aria-label={heading}
      className={`agnitalk-ui relative border-b border-slate-200/70 bg-[#F8FBFD] py-0! ${font} ${className}`}
      style={isBangla ? undefined : { fontFamily: 'Questrial, sans-serif' }}>
      <div className="mx-auto w-full max-w-7xl px-4 py-9 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {showHeader && (
          <header className="mx-auto mb-7 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-2.5">
              <BrandMark />
              <span className="text-[13px] font-bold tracking-wide text-[#006DA8]">
                {isBangla ? 'সাশ্রয়ী মিনিট বান্ডেল' : 'Voice Bundles'}
              </span>
            </div>
            <h2 className={`mb-2 text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.2] tracking-tight text-[#003366] ${font}`} style={{fontFamily:'inherit'}}>{heading}</h2>
            <p className="text-base leading-relaxed text-slate-700">
              {isBangla ? 'আরো বেশি সাশ্রয়ের জন্য বেছে নিন আমাদের প্যাকেজ।' : 'Save even more with bundled voice minute packages.'}
            </p>
          </header>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {PACKAGES.map((pack, index) => {
            const content = pack[language]
            const theme = THEMES[index]
            return (
              <article key={pack.en.name}
                style={{ '--pack-accent': theme.accent, '--pack-ink': theme.ink, '--pack-soft': theme.soft }}
                className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-200 motion-safe:hover:-translate-y-1 hover:border-[var(--pack-accent)] hover:shadow-md motion-reduce:transition-none ${pack.highlight ? 'border-[#0088D0]/45' : 'border-[#DFE6ED]'}`}>
                <div className="border-t-[3px] border-t-[var(--pack-accent)] bg-[var(--pack-soft)] px-5 py-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--pack-ink)]">
                      <FiPhoneCall aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="rounded-md bg-white/80 px-2.5 py-1 text-[13px] font-bold text-[var(--pack-ink)]">{pack.badge[language]}</span>
                  </div>
                  <h3 className={`mb-2 text-[22px] font-bold leading-snug text-[#003366] ${font}`} style={{fontFamily:'inherit'}}>{content.name}</h3>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[40px] font-bold leading-none tracking-tight tabular-nums text-[var(--pack-ink)]">{content.price}</span>
                    <span className="text-[15px] text-slate-700">{isBangla ? '/প্যাক' : '/ pack'}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-[15px] leading-relaxed text-slate-700">{content.desc}</p>
                  <div className="mt-auto divide-y divide-slate-100 border-y border-slate-100">
                    <div className="flex items-center gap-2.5 py-2.5 text-[15px] text-slate-700">
                      <FiPhoneCall aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--pack-ink)]" />
                      <span>{content.minutes}</span>
                    </div>
                    <div className="flex items-center gap-2.5 py-2.5 text-[15px] text-slate-700">
                      <FiCalendar aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--pack-ink)]" />
                      <span>{content.validity} {isBangla ? 'মেয়াদ' : 'validity'}</span>
                    </div>
                  </div>
                  <div className="mt-3 min-h-8">
                    {content.bonus && <div className="inline-flex items-center gap-2 rounded-md bg-[#FFF9E1] px-3 py-1.5 text-sm font-bold text-[#785700]"><FiGift aria-hidden="true" className="h-4 w-4 shrink-0" />{content.bonus}</div>}
                  </div>
                  <Link to="/download" aria-label={`${isBangla ? 'অ্যাপে পাবেন' : 'Claim in App'} — ${content.name}`}
                    className={`mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-[15px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006DA8] ${pack.highlight ? 'border-[#006DA8] bg-[#006DA8] text-white hover:bg-[#005580]' : 'border-transparent bg-[var(--pack-soft)] text-[var(--pack-ink)] hover:border-[var(--pack-accent)]'}`}>
                    {isBangla ? 'অ্যাপে পাবেন' : 'Claim in App'}<FiArrowRight aria-hidden="true" className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
        {showReferral && (
          <aside className="mt-5 flex flex-col items-center gap-4 rounded-2xl border border-[#D7E7F1] bg-[#EDF6FC] p-4 sm:p-5 md:flex-row md:gap-6">
            <div className="flex h-24 w-28 shrink-0 items-center justify-center rounded-xl bg-white p-2">
              <img src="/images/refer-a-friend.webp" alt="" width={455} height={465} loading="lazy" draggable={false} className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 text-center md:flex-1 md:text-left">
              <div className="mb-1 flex items-center justify-center gap-2 md:justify-start"><BrandMark /><span className="text-[13px] font-bold text-[#006DA8]">{isBangla ? 'রেফারেল বোনাস' : 'Referral Rewards'}</span></div>
              <h3 className={`mb-1 text-[23px] font-bold leading-snug text-[#003366] ${font}`} style={{fontFamily:'inherit'}}>{isBangla ? 'বন্ধুকে রেফার করুন, ক্রেডিট পান!' : 'Refer a Friend & Earn Credit!'}</h3>
              <p className="text-[15px] leading-relaxed text-slate-700">{isBangla ? 'প্রতিটি সফল রেফারেলে আপনি ও আপনার বন্ধু উভয়েই বোনাস ক্রেডিট পাবেন।' : 'Every successful referral earns both you and your friend bonus calling credit. Multi-level rewards.'}</p>
            </div>
            <Link to="/download" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#006DA8] px-5 py-2.5 text-[15px] font-bold text-white transition-colors hover:bg-[#005580] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006DA8]">
              {isBangla ? 'এখনই শুরু করুন' : 'Start Referring'}<FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </aside>
        )}
      </div>
    </section>
  )
}
