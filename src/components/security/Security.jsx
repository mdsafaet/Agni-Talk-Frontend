import { FiArrowRight, FiCheckCircle, FiShield } from 'react-icons/fi'
import { IconID, IconLock, IconPrivacy } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const PILLARS = [
  {
    id: 'tls',
    icon: <IconLock />,
    en: {
      badge: 'Encrypted Transport',
      title: 'TLS End-to-End Encryption',
      desc: 'All voice calls, video sessions, and messages are secured with industry-standard TLS encryption. Your conversations stay private — always.',
      footer: 'Active on every call & message',
    },
    bn: {
      badge: 'এনক্রিপ্টেড ট্রান্সপোর্ট',
      title: 'TLS এনক্রিপশন',
      desc: 'সকল কল, ভিডিও ও বার্তা TLS এনক্রিপশনে সুরক্ষিত। আপনার কথোপকথন সম্পূর্ণ গোপন।',
      footer: 'প্রতিটি কল ও বার্তায় সক্রিয়',
    },
  },
  {
    id: 'nid',
    icon: <IconID />,
    en: {
      badge: 'BTRC & EC Verified',
      title: 'Official NID Compliance',
      desc: "NID verification via Bangladesh Election Commission's Porichoy API ensures national security compliance. BTRC-mandated, fully lawful.",
      footer: 'Verified via Porichoy API',
    },
    bn: {
      badge: 'BTRC ও EC অনুমোদিত',
      title: 'NID সম্মতি',
      desc: 'বাংলাদেশ নির্বাচন কমিশনের Porichoy API-এর মাধ্যমে NID যাচাই। BTRC-অনুমোদিত, সম্পূর্ণ আইনসম্মত।',
      footer: 'Porichoy API দ্বারা যাচাইকৃত',
    },
  },
  {
    id: 'privacy',
    icon: <IconPrivacy />,
    en: {
      badge: 'Strict Data Protection',
      title: 'Zero Third-Party Sharing',
      desc: 'Your personal data, call records, and message history are never sold or shared with any third party. Our privacy policy is publicly auditable.',
      footer: 'Never sold or shared',
    },
    bn: {
      badge: 'কঠোর তথ্য সুরক্ষা',
      title: 'কোনো তৃতীয় পক্ষ নয়',
      desc: 'আপনার ব্যক্তিগত তথ্য, কল রেকর্ড বা বার্তার ইতিহাস কখনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।',
      footer: 'কখনো বিক্রি বা শেয়ার করা হয় না',
    },
  },
]

const THEMES = [
  { accent: '#0088D0', ink: '#005B8C', soft: '#EAF6FC' },
  { accent: '#F58220', ink: '#934509', soft: '#FFF3E8' },
  { accent: '#E00010', ink: '#A81020', soft: '#FFF0F1' },
]

export default function Security({ lang = 'en' }) {
  const isBangla = lang === 'bn'

  return (
    <section
      id="security"
      lang={lang}
      aria-labelledby="security-title"
      className="agnitalk-ui relative isolate overflow-hidden bg-[#F0F7FC] py-10 sm:py-12 lg:py-14 font-agni-body"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,#EAF4FC_0%,#F5F9FC_65%,#EDF5FA_100%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
          <div className="mb-3 flex items-center justify-center gap-2.5">
            <span aria-hidden="true" className="flex h-1 gap-0.5">
              <span className="w-5 rounded-full bg-[#0088D0]" />
              <span className="w-2 rounded-full bg-[#E00010]" />
              <span className="w-2 rounded-full bg-[#F58220]" />
              <span className="w-2 rounded-full bg-[#F8E800]" />
            </span>
            <span className={`text-[13px] font-bold tracking-wide text-[#006DA8] ${bn(lang)}`}>
              {isBangla ? 'সুরক্ষা ও গোপনীয়তা' : 'Security & Privacy'}
            </span>
          </div>
          <h2 id="security-title" style={display(lang)} className={`mb-3 text-[clamp(28px,3.8vw,40px)] font-agni-heading font-bold leading-[1.2] text-[#003366] ${bn(lang)}`}>
            {isBangla ? 'আপনার কথোপকথন সম্পূর্ণ নিরাপদ' : 'Your Privacy Is Non-Negotiable'}
          </h2>
          <p className={`mx-auto max-w-xl text-[16px] leading-relaxed text-slate-700 ${bn(lang)}`}>
            {isBangla
              ? 'অগ্নিটক ব্যবহার করে কথা বলুন নিশ্চিন্তে — প্রতিটি কল ও বার্তা আন্তর্জাতিক নিরাপত্তা মানদণ্ডে সুরক্ষিত।'
              : "Built on Agni Systems' enterprise-grade infrastructure with international security standards applied to every connection."}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {PILLARS.map((p, index) => {
            const t = isBangla ? p.bn : p.en
            const theme = THEMES[index]
            return (
              <article
                key={p.id}
                style={{ '--security-accent': theme.accent, '--security-ink': theme.ink, '--security-soft': theme.soft }}
                className="group font-agni-body relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#D7E5EF] bg-white p-5 sm:p-6 transition-[transform,border-color,background-color] duration-200 hover:border-[var(--security-accent)] hover:bg-white hover:shadow-md motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[var(--security-accent)]" />
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--security-soft)] text-[var(--security-ink)] [&_svg]:h-6 [&_svg]:w-6">
                    {p.icon}
                  </div>
                  <span className={`rounded-md bg-[var(--security-soft)] px-2.5 py-1 text-[14px] font-bold [font-synthesis:weight] text-[var(--security-ink)] ${bn(lang)}`}>
                    {t.badge}
                  </span>
                </div>
                <h3 className={`mb-2 font-agni-body text-[23px] sm:text-[24px] font-bold [font-synthesis:weight] leading-[1.25] text-[#002B55] ${bn(lang)}`}>
                  {t.title}
                </h3>
                <p className={`mb-5 text-[16px] leading-[1.65] text-[#25364A] ${bn(lang)}`}>
                  {t.desc}
                </p>
                <div className={`mt-auto flex items-center gap-2 border-t border-[#D7E5EF] pt-3 text-[15px] font-bold [font-synthesis:weight] leading-snug text-[var(--security-ink)] ${bn(lang)}`}>
                  <FiCheckCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span>{t.footer}</span>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <a href="#privacy-policy" className={`group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg border border-[#C9DDEB] bg-white px-5 py-2.5 text-[15px] font-bold text-[#003366] transition-colors hover:border-[#0088D0] hover:bg-[#EAF6FC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#005B8C] ${bn(lang)}`}>
            <FiShield aria-hidden="true" className="h-4 w-4 shrink-0 text-[#005B8C]" />
            <span>{isBangla ? 'আমাদের সম্পূর্ণ গোপনীয়তা নীতি পড়ুন' : 'Read Our Full Security & Privacy Policy'}</span>
            <FiArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#005B8C] transition-transform motion-safe:group-hover:translate-x-1 motion-reduce:transition-none" />
          </a>
        </div>
      </div>
    </section>
  )
}
