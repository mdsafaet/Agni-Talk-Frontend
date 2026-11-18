import { FiArrowRight, FiCheckCircle, FiLock, FiShield } from 'react-icons/fi'
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
  wrapper.style.setProperty('--lift', '-5px')
}

function resetTilt(event) {
  const wrapper = event.currentTarget
  wrapper.style.setProperty('--tilt-x', '0deg')
  wrapper.style.setProperty('--tilt-y', '0deg')
  wrapper.style.setProperty('--lift', '0px')
}

export default function Security({ lang = 'en' }) {
  const isBangla = lang === 'bn'

  return (
    <section
      id="security"
      lang={lang}
      aria-labelledby="security-title"
      className="relative isolate overflow-hidden bg-[#07162B] py-14 sm:py-16 lg:py-20"
    >
      {/* Creative Layered Dark Security Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(145deg,#061326_0%,#0A2244_55%,#081B36_100%)]"
      >
        {/* Subtle Precision Matrix Dots */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Ambient Emerald & Royal Blue Security Glows */}
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="absolute -right-24 bottom-6 h-96 w-96 rounded-full bg-[#0052CC]/25 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <div
            className={`
              mb-3 inline-flex items-center gap-2 rounded-full
              border border-emerald-400/25 bg-emerald-500/10
              px-4 py-1.5 text-xs font-bold [font-synthesis:weight]
              uppercase tracking-wider text-emerald-300
              ${bn(lang)}
            `}
          >
            <FiLock aria-hidden="true" className="h-3.5 w-3.5" />
            <span>{isBangla ? 'সুরক্ষা ও গোপনীয়তা' : 'SECURITY & PRIVACY'}</span>
          </div>

          <h2
            id="security-title"
            className={`mb-3 text-[clamp(24px,4vw,38px)] font-bold [font-synthesis:weight] leading-tight text-white ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'আপনার কথোপকথন সম্পূর্ণ নিরাপদ'
              : 'Your Privacy Is Non-Negotiable'}
          </h2>

          <p
            className={`mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-slate-300/80 ${bn(lang)}`}
          >
            {isBangla
              ? 'অগ্নিটক ব্যবহার করে কথা বলুন নিশ্চিন্তে — প্রতিটি কল ও বার্তা আন্তর্জাতিক নিরাপত্তা মানদণ্ডে সুরক্ষিত।'
              : "Built on Agni Systems' enterprise-grade infrastructure with international security standards applied to every connection."}
          </p>
        </div>

        {/* 3 Security Pillar Cards */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {PILLARS.map((p) => {
            const t = isBangla ? p.bn : p.en
            return (
              <div
                key={p.id}
                onPointerMove={handleTilt}
                onPointerLeave={resetTilt}
                onPointerCancel={resetTilt}
                className="group relative h-full [perspective:1000px]"
              >
                <article
                  className="
                    relative flex h-full flex-col overflow-hidden
                    rounded-[22px] border border-white/10
                    bg-white/[0.04] p-6 sm:p-7
                    shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)]
                    backdrop-blur-md
                    [transform-style:preserve-3d]
                    transition-[transform,border-color,background-color,box-shadow]
                    duration-200 ease-out
                    hover:border-emerald-400/40
                    hover:bg-white/[0.07]
                    hover:shadow-[0_22px_48px_-14px_rgba(16,185,129,0.18)]
                    motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
                    motion-reduce:transition-none
                  "
                >
                  {/* Top Accent Line */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400/80 via-[#0052CC] to-emerald-400/80 opacity-70 transition-opacity duration-200 group-hover:opacity-100"
                  />

                  {/* Icon & Compliance Tag */}
                  <div className="mb-5 flex items-center justify-between gap-3 pt-0.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/15 text-emerald-300 transition-colors duration-200 group-hover:bg-emerald-400 group-hover:text-[#061326]">
                      {p.icon}
                    </div>

                    <span
                      className={`
                        rounded-full border border-white/10 bg-white/[0.05]
                        px-3 py-1 text-[11px] font-bold [font-synthesis:weight]
                        text-slate-300
                        ${bn(lang)}
                      `}
                    >
                      {t.badge}
                    </span>
                  </div>

                  <h3
                    className={`mb-2.5 text-lg sm:text-xl font-bold [font-synthesis:weight] leading-snug text-white ${bn(lang)}`}
                    style={display(lang)}
                  >
                    {t.title}
                  </h3>

                  <p
                    className={`mb-6 text-sm leading-relaxed text-slate-300/80 ${bn(lang)}`}
                  >
                    {t.desc}
                  </p>

                  {/* Bottom Verification Strip */}
                  <div
                    className={`
                      mt-auto flex items-center gap-2 border-t border-white/10
                      pt-3.5 text-xs font-medium text-emerald-300/90
                      ${bn(lang)}
                    `}
                  >
                    <FiCheckCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                    <span>{t.footer}</span>
                  </div>
                </article>
              </div>
            )
          })}
        </div>

        {/* Bottom Policy Link Bar */}
        <div className="mt-9 flex justify-center">
          <a
            href="#privacy-policy"
            className={`
              group inline-flex items-center gap-2 rounded-full
              border border-white/12 bg-white/[0.04] px-5 py-2.5
              text-xs sm:text-sm font-bold [font-synthesis:weight]
              text-slate-200 transition-[background-color,border-color,color]
              duration-200 hover:border-emerald-400/40 hover:bg-white/[0.08] hover:text-white
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400
              ${bn(lang)}
            `}
          >
            <FiShield aria-hidden="true" className="h-4 w-4 text-emerald-400" />
            <span>
              {isBangla
                ? 'আমাদের সম্পূর্ণ গোপনীয়তা নীতি পড়ুন'
                : 'Read Our Full Security & Privacy Policy'}
            </span>
            <FiArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 text-emerald-400 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}