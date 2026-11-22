import { useState } from 'react'
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

  wrapper.style.setProperty('--tilt-x', `${(0.5 - y) * 10}deg`)
  wrapper.style.setProperty('--tilt-y', `${(x - 0.5) * 10}deg`)
  wrapper.style.setProperty('--lift', '-4px')
}

function resetTilt(event) {
  const wrapper = event.currentTarget
  wrapper.style.setProperty('--tilt-x', '0deg')
  wrapper.style.setProperty('--tilt-y', '0deg')
  wrapper.style.setProperty('--lift', '0px')
}

export default function HowItWorks({ lang = 'en' }) {
  const [activeStep, setActiveStep] = useState(0)
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
        bg-[#F8FAFF]
        bg-[radial-gradient(#CBD5E1_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
        py-0!
      "
    >
      {/* Subtle surface fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.8)_0%,rgba(248,250,255,0.65)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {/* Compact Heading */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <div
            className={`
              mb-2.5 inline-flex items-center gap-2 rounded-full
              border border-[#0052CC]/15 bg-white
              px-3.5 py-1 text-[11px] font-bold [font-synthesis:weight]
              uppercase tracking-wider text-[#0052CC] shadow-2xs
              ${bn(lang)}
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            {isBangla ? 'দ্রুত অ্যাক্টিভেশন' : 'INSTANT ONBOARDING'}
          </div>

          <h2
            id="how-it-works-title"
            className={`mb-2 text-[clamp(24px,4vw,36px)] font-bold [font-synthesis:weight] leading-tight text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'মাত্র ৪টি ধাপে শুরু করুন'
              : 'Up & Running in 4 Simple Steps'}
          </h2>

          <p
            className={`mx-auto max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base ${bn(lang)}`}
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
                className="h-full rounded-full bg-[#0052CC] transition-all duration-300 ease-out"
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

            return (
              <li key={step.num} className="relative h-full">
                <div
                  onPointerMove={handleTilt}
                  onPointerLeave={resetTilt}
                  onPointerCancel={resetTilt}
                  className="group relative h-full [perspective:1000px]"
                >
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveStep(index)}
                    className={`
                      relative flex h-full w-full flex-col overflow-hidden
                      rounded-[20px] border p-4 text-left sm:p-5
                      font-agni-body
                      shadow-[0_4px_16px_-4px_rgba(0,51,102,0.06)]
                      [transform-style:preserve-3d] cursor-pointer
                      transition-[transform,box-shadow,border-color,background-color]
                      duration-200 ease-out
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-[#0052CC]
                      motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
                      motion-safe:active:scale-[0.99]
                      motion-reduce:transition-none
                      ${
                        isSelected
                          ? 'border-[#0052CC] bg-[#F4F8FF] ring-2 ring-[#0052CC]/20 shadow-[0_14px_28px_-10px_rgba(0,82,204,0.2)]'
                          : 'border-slate-200/90 bg-white hover:border-[#0052CC]/45 hover:bg-[#F4F8FF]/65 hover:shadow-[0_14px_28px_-10px_rgba(0,82,204,0.14)]'
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
                            ? 'bg-[#FF5722]'
                            : isCompleted
                              ? 'bg-[#0052CC]'
                              : 'bg-slate-200 group-hover:bg-[#0052CC]/50'
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
                              ? 'border-[#0052CC] bg-[#0052CC] text-white shadow-xs'
                              : 'border-[#0052CC]/15 bg-[#F4F8FF] text-[#0052CC] group-hover:bg-[#0052CC] group-hover:text-white'
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                      </span>

                      <span
                        className={`
                          inline-flex items-center gap-1 rounded-full px-2.5 py-0.5
                          font-agni-body text-xs font-extrabold [font-synthesis-weight:auto] [-webkit-text-stroke:0.35px_currentColor]
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
                      className={`mb-2 font-agni-body text-[17px] sm:text-[18px] font-extrabold [font-synthesis-weight:auto] [-webkit-text-stroke:0.4px_currentColor] tracking-[0.01em] leading-snug text-[#003366] ${bn(lang)}`}
                    >
                      {content.title}
                    </h3>

                    <p
                      className={`mb-4 font-agni-body text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
                    >
                      {content.desc}
                    </p>

                    {/* Live Status Pill */}
                    <div
                      className={`
                        mt-auto flex w-full items-center justify-between gap-2
                        border-t pt-2.5 font-agni-body text-[11px] font-bold [font-synthesis:weight]
                        ${
                          isSelected
                            ? 'border-[#0052CC]/15 text-[#0052CC]'
                            : 'border-slate-100 text-slate-500'
                        }
                        ${bn(lang)}
                      `}
                    >
                      <span className="truncate">{content.status}</span>
                      <FiChevronRight
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                          isSelected ? 'translate-x-0.5 text-[#FF5722]' : ''
                        }`}
                      />
                    </div>
                  </button>
                </div>
              </li>
            )
          })}
        </ol>

        {/* Bottom Showcase & Regulatory Compliance Cards */}
        <div className="mt-7 grid grid-cols-1 gap-4 lg:mt-8 lg:grid-cols-12 lg:gap-5">
          {/* Phone Preview Stage */}
          <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-[20px] border border-slate-200/90 bg-white p-5 font-agni-body shadow-[0_6px_22px_-8px_rgba(0,51,102,0.08)] sm:p-6 lg:col-span-5">
            <div className="mb-3 flex w-full items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F8FF] px-3 py-1 font-agni-body text-[11px] font-bold [font-synthesis:weight] text-[#0052CC]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
                {isBangla
                  ? `ধাপ ${currentStep.num} প্রিভিউ`
                  : `Step ${currentStep.num} Highlight`}
              </span>

              <span
                className={`font-agni-body text-xs font-extrabold [font-synthesis-weight:auto] [-webkit-text-stroke:0.35px_currentColor] text-[#003366] ${bn(lang)}`}
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
                  h-auto w-full max-w-[265px]
                  motion-safe:animate-[agniHeroFloat_4.8s_ease-in-out_infinite]
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
                  aria-label={`Select step ${s.num}`}
                  className={`
                    rounded-lg px-2.5 py-1 font-agni-body text-[11px]
                    font-extrabold [font-synthesis-weight:auto] [-webkit-text-stroke:0.35px_currentColor] transition-colors cursor-pointer
                    ${
                      activeStep === idx
                        ? 'bg-[#003366] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-[#F4F8FF] hover:text-[#0052CC]'
                    }
                  `}
                >
                  {s.num}
                </button>
              ))}
            </div>
          </div>

          {/* Regulatory & Privacy Assurance Cards */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-7">
            {/* NID Notice */}
            <div className="group flex flex-1 items-start gap-4 rounded-[20px] border border-slate-200/90 bg-white p-4 font-agni-body sm:p-5 shadow-[0_4px_16px_-4px_rgba(0,51,102,0.05)] transition-colors hover:border-[#0052CC]/35 hover:bg-[#F4F8FF]/40">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#0052CC]/15 bg-[#F4F8FF] text-[#0052CC] transition-colors group-hover:bg-[#0052CC] group-hover:text-white"
              >
                <FiLock className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3
                    className={`font-agni-body text-base sm:text-[17px] font-extrabold [font-synthesis-weight:auto] [-webkit-text-stroke:0.4px_currentColor] tracking-[0.01em] text-[#003366] ${bn(lang)}`}
                  >
                    {isBangla
                      ? 'কেন NID প্রয়োজন?'
                      : 'Why is NID Required?'}
                  </h3>

                  <span className="rounded-full bg-[#F4F8FF] px-2.5 py-0.5 font-agni-body text-[10px] font-bold [font-synthesis:weight] uppercase tracking-wider text-[#0052CC]">
                    BTRC &amp; Porichoy API
                  </span>
                </div>

                <p
                  className={`font-agni-body text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
                >
                  {isBangla
                    ? 'BTRC-এর বিধিমালা অনুযায়ী ০৯৬০৬ ভার্চুয়াল নম্বর সক্রিয় করতে NID যাচাই বাধ্যতামূলক। আপনার তথ্য Porichoy API-এ এনক্রিপ্টেড আকারে পাঠানো হয়।'
                    : "NID verification is required by BTRC regulations to activate your 09606 virtual number. Your data is encrypted and verified directly via Bangladesh EC's Porichoy API — never stored locally."}
                </p>
              </div>
            </div>

            {/* GPS Notice */}
            <div className="group flex flex-1 items-start gap-4 rounded-[20px] border border-slate-200/90 bg-white p-4 font-agni-body sm:p-5 shadow-[0_4px_16px_-4px_rgba(0,51,102,0.05)] transition-colors hover:border-[#FF5722]/35 hover:bg-[#FFF7F4]/40">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#FF5722]/15 bg-[#FFF7F4] text-[#FF5722] transition-colors group-hover:bg-[#FF5722] group-hover:text-white"
              >
                <FiMapPin className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3
                    className={`font-agni-body text-base sm:text-[17px] font-extrabold [font-synthesis-weight:auto] [-webkit-text-stroke:0.4px_currentColor] tracking-[0.01em] text-[#003366] ${bn(lang)}`}
                  >
                    {isBangla
                      ? 'GPS অনুমতি কেন?'
                      : 'Why GPS Location Permission?'}
                  </h3>

                  <span className="rounded-full bg-[#FFF7F4] px-2.5 py-0.5 font-agni-body text-[10px] font-bold [font-synthesis:weight] uppercase tracking-wider text-[#FF5722]">
                    One-Time Check
                  </span>
                </div>

                <p
                  className={`font-agni-body text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
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