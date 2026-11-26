import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FiCheckCircle,
  FiChevronRight,
  FiCreditCard,
  FiDownload,
  FiLock,
  FiMapPin,
  FiPhoneCall,
} from 'react-icons/fi'
import { FaIdCard } from 'react-icons/fa'
import { bn, display } from '../../utils/lang'

const STEPS = [
  {
    num: '01',
    Icon: FiDownload,
    en: {
      title: 'Download AgniTalk',
      desc: 'Install AgniTalk from Google Play Store, Apple App Store, or download the APK directly for Android devices.',
      status: 'App Ready • Android & iOS',
    },
    bn: {
      title: 'AgniTalk ডাউনলোড করুন',
      desc: 'Google Play Store, Apple App Store থেকে AgniTalk ইনস্টল করুন অথবা সরাসরি APK ডাউনলোড করুন।',
      status: 'অ্যাপ প্রস্তুত • Android ও iOS',
    },
  },
  {
    num: '02',
    Icon: FaIdCard,
    en: {
      title: 'Verify Your NID',
      desc: 'Submit your National ID (NID) via our secure Porichoy API integration. BTRC-mandated verification completes in under 2 minutes.',
      status: 'Porichoy EC Verified • < 2 Mins',
    },
    bn: {
      title: 'NID যাচাই করুন',
      desc: 'Porichoy API-এর মাধ্যমে আপনার জাতীয় পরিচয়পত্র (NID) যাচাই করুন। ২ মিনিটেরও কম সময়ে সম্পন্ন হয়।',
      status: 'Porichoy EC যাচাইকৃত • ২ মিনিটে',
    },
  },
  {
    num: '03',
    Icon: FiPhoneCall,
    en: {
      title: 'Get Your 09606 Number',
      desc: "Instantly receive your dedicated virtual IPTSP number with the 09606 prefix, auto-matched to your mobile number's last digits.",
      status: '09606-XXXXXX Assigned',
    },
    bn: {
      title: '০৯৬০৬ নম্বর পান',
      desc: 'স্বয়ংক্রিয়ভাবে একটি ডেডিকেটেড ভার্চুয়াল IPTSP নম্বর পান যা আপনার মোবাইল নম্বরের শেষ ডিজিটের সাথে মিলে।',
      status: '০৯৬০৬-XXXXXX সক্রিয়',
    },
  },
  {
    num: '04',
    Icon: FiCreditCard,
    en: {
      title: 'Top Up & Start Calling',
      desc: 'Recharge via bKash, Nagad, or card in seconds. Make cheap calls to any number in Bangladesh or internationally right away.',
      status: 'bKash / Nagad Top-Up Active',
    },
    bn: {
      title: 'রিচার্জ করে কল শুরু করুন',
      desc: 'বিকাশ, নগদ বা কার্ড দিয়ে সেকেন্ডেই রিচার্জ করুন এবং বাংলাদেশ বা বিশ্বের যেকোনো নম্বরে কল শুরু করুন।',
      status: 'বিকাশ / নগদ রিচার্জ প্রস্তুত',
    },
  },
]

// Logo-inspired accents with readable foreground colors.
const PALETTES = [
  { accent: '#0088D0', ink: '#005B8C', soft: '#EAF6FC', border: '#BBDFF2' },
  { accent: '#F58220', ink: '#984708', soft: '#FFF3E8', border: '#F2D2B7' },
  { accent: '#E00010', ink: '#A81020', soft: '#FFF0F1', border: '#F1C7CB' },
  { accent: '#F8E800', ink: '#716000', soft: '#FFFBE2', border: '#E8DFA5' },
]

export default function HowItWorks({ lang = 'en' }) {
  const [activeStep, setActiveStep] = useState(0)
  const reduced = useReducedMotion()
  const isBangla = lang === 'bn'
  const currentStep = STEPS[activeStep] || STEPS[0]
  const currentContent = isBangla ? currentStep.bn : currentStep.en

  return (
    <section
      id="how-it-works"
      lang={lang}
      aria-labelledby="how-it-works-title"
      className="
        agnitalk-ui relative overflow-hidden
        border-b border-slate-200/70
        bg-[#F8FBFD]
        py-0!
      "
    >
      {/* Subtle surface fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FBFD_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-11">
        {/* Compact Heading */}
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
         <div className="mb-3 flex items-center justify-center gap-2.5">
  <span aria-hidden="true" className="flex h-1 gap-0.5">
    <span className="w-5 rounded-full bg-[#0088D0]" />
    <span className="w-2 rounded-full bg-[#E00010]" />
    <span className="w-2 rounded-full bg-[#F58220]" />
    <span className="w-2 rounded-full bg-[#F8E800]" />
  </span>

  <span
    className={`text-[13px] font-bold tracking-wide text-[#006DA8] ${bn(lang)}`}
  >
    {isBangla ? 'দ্রুত অ্যাক্টিভেশন' : 'Instant Onboarding'}
  </span>
</div>

          <h2
            id="how-it-works-title"
            className={`mb-2 text-[clamp(28px,4vw,40px)] font-bold [font-synthesis:weight] leading-tight text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'মাত্র ৪টি ধাপে শুরু করুন'
              : 'Up & Running in 4 Simple Steps'}
          </h2>

          <p
            className={`mx-auto max-w-xl text-base leading-7 text-slate-700 sm:text-[17px] ${bn(lang)}`}
          >
            {isBangla
              ? 'NID যাচাই থেকে শুরু করে প্রথম কল পর্যন্ত — সব কিছু সহজ।'
              : 'From NID verification to your first call — everything is designed to be effortless.'}
          </p>
        </div>

        {/* Interactive Progress Rail (Desktop) */}
        <div className="mb-5 hidden lg:block" aria-hidden="true">
          <div className="relative mx-auto max-w-5xl px-12">
            <div className="h-1.5 w-full rounded-full bg-slate-200/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#006DA8] transition-all duration-300 ease-out"
                style={{
                  width: `${((activeStep + 1) / STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* 4 Interactive Step Cards */}
        <ol className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const content = isBangla ? step.bn : step.en
            const { Icon } = step
            const isSelected = activeStep === index
            const isCompleted = index < activeStep
            const palette = PALETTES[index]

            return (
              <li key={step.num} className="relative h-full">
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : index * 0.06 }}
                  className="group relative h-full"
                  style={{ '--step-accent': palette.accent, '--step-ink': palette.ink, '--step-soft': palette.soft, '--step-border': palette.border }}
                >
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveStep(index)}
                    className={`
                      relative flex h-full w-full flex-col overflow-hidden
                      rounded-xl border p-4 text-left sm:p-4
                      font-agni-body
                      shadow-[0_4px_16px_-4px_rgba(0,51,102,0.06)]
                      cursor-pointer
                      transition-[transform,box-shadow,border-color,background-color]
                      duration-200 ease-out
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-[#006DA8]
                      motion-safe:hover:-translate-y-1
                      motion-safe:active:scale-[0.99]
                      motion-reduce:transition-none
                      ${
                        isSelected
                          ? 'border-[var(--step-border)] bg-[var(--step-soft)] ring-1 ring-[var(--step-accent)] shadow-sm'
                          : 'border-slate-200 bg-white hover:border-[var(--step-border)] hover:shadow-md'
                      }
                    `}
                  >
                    {/* Top Progress Accent Bar */}
                    <span
                      aria-hidden="true"
                      className={`
                        absolute inset-x-0 top-0 h-1 transition-colors
                        ${
                          isSelected
                            ? 'bg-[var(--step-accent)]'
                            : 'bg-[var(--step-accent)]/60'
                        }
                      `}
                    />

                    {/* Icon & Step Number */}
                    <div className="mb-3.5 flex w-full items-center justify-between gap-3 pt-0.5">
                      <span
                        aria-hidden="true"
                        className={`
                          flex h-11 w-11 items-center justify-center
                          rounded-2xl border transition-colors duration-200
                          ${
                            isSelected
                              ? 'border-[var(--step-border)] bg-white text-[var(--step-ink)]'
                              : 'border-[var(--step-border)] bg-[var(--step-soft)] text-[var(--step-ink)]'
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                      </span>

                      <span
                        className={`
                          inline-flex items-center gap-1 rounded-full px-2.5 py-0.5
                          font-agni-body text-sm font-bold [font-synthesis:weight]
                          transition-colors
                          ${
                            isSelected
                              ? 'bg-[#003366] text-white'
                              : 'bg-slate-100 text-[#003366]/70'
                          }
                        `}
                      >
                        {isCompleted && (
                          <FiCheckCircle
                            aria-hidden="true"
                            className="h-3 w-3 text-emerald-500"
                          />
                        )}
                        STEP {step.num}
                      </span>
                    </div>

                    <h3
                      className={`mb-2 font-agni-body text-[18px] sm:text-[19px] font-bold [font-synthesis:weight] tracking-[0.01em] leading-snug text-[#003366] ${bn(lang)}`}
                    >
                      {content.title}
                    </h3>

                    <p
                      className={`mb-4 font-agni-body text-[15px] leading-6 text-slate-700 ${bn(lang)}`}
                    >
                      {content.desc}
                    </p>

                    {/* Live Status Pill */}
                    <div
                      className={`
                        mt-auto flex w-full items-center justify-between gap-2
                        border-t pt-2.5 font-agni-body text-[13px] font-bold [font-synthesis:weight]
                        ${
                          isSelected
                            ? 'border-[var(--step-border)] text-[var(--step-ink)]'
                            : 'border-slate-100 text-slate-500'
                        }
                        ${bn(lang)}
                      `}
                    >
                      <span className="min-w-0 break-words leading-5">{content.status}</span>
                      <FiChevronRight
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                          isSelected ? 'translate-x-0.5 text-[#984708]' : ''
                        }`}
                      />
                    </div>
                  </button>
                </motion.div>
              </li>
            )
          })}
        </ol>

        {/* Bottom Showcase & Regulatory Compliance Cards */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-6 lg:grid-cols-12 lg:gap-5">
          {/* Phone Preview Stage */}
          <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-white p-5 font-agni-body shadow-[0_6px_22px_-8px_rgba(0,51,102,0.08)] sm:p-6 lg:col-span-5">
            <div className="mb-3 flex w-full items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF6FC] px-3 py-1 font-agni-body text-[13px] font-bold [font-synthesis:weight] text-[#006DA8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F58220]" />
                {isBangla
                  ? `ধাপ ${currentStep.num} প্রিভিউ`
                  : `Step ${currentStep.num} Highlight`}
              </span>

              <span
                className={`font-agni-body text-sm font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
              >
                {currentContent.title}
              </span>
            </div>

            <div className="relative my-auto flex w-full items-center justify-center py-2">
              <img
                src="/images/phones-register-call.webp"
                alt="AgniTalk registration screen next to an active call screen"
                width={728}
                height={809}
                loading="lazy"
                draggable={false}
                className="
                  h-auto w-full max-w-[225px]
                  
                "
              />
            </div>

            {/* Quick Step Switcher Pills */}
            <div className="mt-3 flex w-full items-center justify-center gap-1.5">
              {STEPS.map((s, idx) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  aria-label={isBangla ? `ধাপ ${s.num} নির্বাচন করুন` : `Select step ${s.num}`}
                  aria-pressed={activeStep === idx}
                  className={`
                    rounded-lg px-2.5 py-1 font-agni-body text-[13px]
                    font-bold [font-synthesis:weight] transition-colors cursor-pointer
                    ${
                      activeStep === idx
                        ? 'bg-[#003366] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-[#EAF6FC] hover:text-[#006DA8]'
                    }
                  `}
                >
                  {s.num}
                </button>
              ))}
            </div>
          </div>

          {/* Regulatory & Privacy Assurance Cards */}
          <div className="flex flex-col justify-between gap-3 lg:col-span-7">
            {/* NID Notice */}
            <div className="group flex flex-1 items-start gap-4 rounded-xl border border-slate-200/90 bg-white p-4 font-agni-body sm:p-5 shadow-[0_4px_16px_-4px_rgba(0,51,102,0.05)] transition-colors hover:border-[#006DA8]/35 hover:bg-[#EAF6FC]/40">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#006DA8]/15 bg-[#EAF6FC] text-[#006DA8] transition-colors group-hover:bg-[#006DA8] group-hover:text-white"
              >
                <FiLock className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3
                    className={`font-agni-body text-base sm:text-[17px] font-bold [font-synthesis:weight] tracking-[0.01em] text-[#003366] ${bn(lang)}`}
                  >
                    {isBangla
                      ? 'কেন NID প্রয়োজন?'
                      : 'Why is NID Required?'}
                  </h3>

                  <span className="rounded-full bg-[#EAF6FC] px-2.5 py-0.5 font-agni-body text-sm font-bold [font-synthesis:weight] uppercase tracking-wider text-[#006DA8]">
                    BTRC &amp; Porichoy API
                  </span>
                </div>

                <p
                  className={`font-agni-body text-[15px] leading-6 text-slate-700 ${bn(lang)}`}
                >
                  {isBangla
                    ? 'BTRC-এর বিধিমালা অনুযায়ী ০৯৬০৬ ভার্চুয়াল নম্বর সক্রিয় করতে NID যাচাই বাধ্যতামূলক। আপনার তথ্য Porichoy API-এ এনক্রিপ্টেড আকারে পাঠানো হয়।'
                    : "NID verification is required by BTRC regulations to activate your 09606 virtual number. Your data is encrypted and verified directly via Bangladesh EC's Porichoy API — never stored locally."}
                </p>
              </div>
            </div>

            {/* GPS Notice */}
            <div className="group flex flex-1 items-start gap-4 rounded-xl border border-slate-200/90 bg-white p-4 font-agni-body sm:p-5 shadow-[0_4px_16px_-4px_rgba(0,51,102,0.05)] transition-colors hover:border-[#F58220]/35 hover:bg-[#FFF3E8]/40">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#F58220]/15 bg-[#FFF3E8] text-[#984708] transition-colors group-hover:bg-[#F58220] group-hover:text-white"
              >
                <FiMapPin className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3
                    className={`font-agni-body text-base sm:text-[17px] font-bold [font-synthesis:weight] tracking-[0.01em] text-[#003366] ${bn(lang)}`}
                  >
                    {isBangla
                      ? 'GPS অনুমতি কেন?'
                      : 'Why GPS Location Permission?'}
                  </h3>

                  <span className="rounded-full bg-[#FFF3E8] px-2.5 py-0.5 font-agni-body text-sm font-bold [font-synthesis:weight] uppercase tracking-wider text-[#984708]">
                    One-Time Check
                  </span>
                </div>

                <p
                  className={`font-agni-body text-[15px] leading-6 text-slate-700 ${bn(lang)}`}
                >
                  {isBangla
                    ? 'টেলিযোগাযোগ আইন অনুযায়ী নিবন্ধনের সময় একবার GPS অনুমতি প্রয়োজন যা নিশ্চিত করে আপনি বাংলাদেশে আছেন।'
                    : 'GPS location permission is required once during registration to confirm you are within Bangladesh as per telecom regulations. Location is not tracked continuously.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}