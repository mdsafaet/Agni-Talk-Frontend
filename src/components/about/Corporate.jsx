import { useEffect, useRef, useState } from 'react'
import Button from '../shared/Button'
import {
  FiAward,
  FiBriefcase,
  FiCalendar,
  FiServer,
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi'
import { IconArrowRight, IconCheck } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const STATS = [
  {
    id: 'years',
    countTarget: 25,
    suffix: '+',
    num: '25+',
    Icon: FiAward,
    accent: 'blue',
    tag: { en: 'LEGACY', bn: 'অভিজ্ঞতা' },
    en: 'Years in Bangladesh Telecom',
    bn: 'বছর টেলিকম অভিজ্ঞতা',
  },
  {
    id: 'founded',
    num: '1995',
    Icon: FiCalendar,
    accent: 'orange',
    tag: { en: 'ESTABLISHED', bn: 'প্রতিষ্ঠিত' },
    en: 'Founded by Agni Systems PLC.',
    bn: 'প্রতিষ্ঠার বছর — অগ্নি সিস্টেমস PLC',
  },
  {
    id: 'dse',
    num: 'DSE',
    Icon: FiTrendingUp,
    accent: 'orange',
    tag: { en: 'PUBLIC COMPANY', bn: 'পাবলিক লিমিটেড' },
    en: 'Publicly Listed on Dhaka Stock Exchange',
    bn: 'ঢাকা স্টক এক্সচেঞ্জে তালিকাভুক্ত',
  },
  {
    id: 'iptsp',
    num: 'IPTSP',
    Icon: FiShield,
    accent: 'blue',
    tag: { en: 'REGULATED', bn: 'লাইসেন্সপ্রাপ্ত' },
    en: 'Licensed by BTRC Bangladesh',
    bn: 'BTRC বাংলাদেশ লাইসেন্সপ্রাপ্ত',
  },
]

const ENTERPRISE = [
  { en: 'Hosted IP PBX & SIP Trunking', bn: 'হোস্টেড IP PBX ও SIP ট্রাঙ্কিং' },
  { en: 'Call Center Solutions', bn: 'কল সেন্টার সমাধান' },
  { en: 'Dedicated Corporate Lines', bn: 'ডেডিকেটেড কর্পোরেট লাইন' },
  { en: 'SLA-backed Uptime Guarantees', bn: 'SLA-সমর্থিত আপটাইম নিশ্চয়তা' },
]

function CountUpNumber({ target, suffix = '', shouldStart }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!shouldStart) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return undefined
    }

    let frameId
    const duration = 1300
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [shouldStart, target])

  return (
    <span className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
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

  const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))

  wrapper.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`)
  wrapper.style.setProperty('--tilt-y', `${(x - 0.5) * 7}deg`)
  wrapper.style.setProperty('--lift', '-4px')
}

function resetTilt(event) {
  const wrapper = event.currentTarget
  wrapper.style.setProperty('--tilt-x', '0deg')
  wrapper.style.setProperty('--tilt-y', '0deg')
  wrapper.style.setProperty('--lift', '0px')
}

export default function Corporate({ lang = 'en' }) {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const isBangla = lang === 'bn'

  useEffect(() => {
    const node = statsRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="corporate"
      lang={lang}
      aria-labelledby="corporate-title"
      className="
        relative overflow-hidden
        border-b border-slate-200/70
        bg-[#F8FAFF]
        bg-[radial-gradient(#CBD5E1_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
        py-14 sm:py-16 lg:py-20
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(248,250,255,0.65)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Trust Narrative & Modern Stat Cards */}
          <div className="lg:col-span-7">
            {/* Bold ABOUT AGNITALK Badge */}
            <div
              className={`
                mb-4 inline-flex items-center gap-2 rounded-full
                border border-[#003366]/20 bg-[#003366]
                px-4 py-1.5 text-xs font-extrabold [font-synthesis:weight]
                uppercase tracking-[0.14em] text-white
                shadow-[0_6px_18px_-6px_rgba(0,51,102,0.45)]
                ${bn(lang)}
              `}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5722] text-white">
                <FiBriefcase aria-hidden="true" className="h-3 w-3" />
              </span>
              <span>{isBangla ? 'আমাদের সম্পর্কে' : 'ABOUT AGNITALK'}</span>
            </div>

            <h2
              id="corporate-title"
              className={`mb-4 text-[clamp(24px,3.8vw,38px)] font-extrabold [font-synthesis:weight] leading-tight text-[#003366] ${bn(lang)}`}
              style={display(lang)}
            >
              {isBangla
                ? 'অগ্নি সিস্টেমস PLC-এর ২৫+ বছরের টেলিকম অভিজ্ঞতায় তৈরি'
                : 'Powered by Agni Systems PLC. — 25+ Years of Telecom Excellence'}
            </h2>

            <p
              className={`mb-7 text-sm sm:text-base leading-relaxed text-slate-600 ${bn(lang)}`}
            >
              {isBangla
                ? 'AgniTalk হলো Agni Systems PLC.-এর একটি পণ্য, যা ১৯৯৫ সাল থেকে বাংলাদেশের টেলিযোগাযোগ খাতে নেতৃত্ব দিয়ে আসছে। ঢাকা স্টক এক্সচেঞ্জে তালিকাভুক্ত এই কোম্পানি দেশের অন্যতম বিশ্বস্ত ISP এবং IPTSP অপারেটর।'
                : 'AgniTalk is a product of Agni Systems PLC., a publicly-listed pioneer in Bangladesh telecommunications since 1995. With a dedicated fiber-optic backbone, enterprise-grade iTel Class 5 softswitch, and full BTRC IPTSP licensing, AgniTalk is built on infrastructure that enterprise clients trust with mission-critical communications.'}
            </p>

            {/* Modernized 2x2 Stats Grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {STATS.map((s) => {
                const { Icon } = s
                const isOrange = s.accent === 'orange'

                return (
                  <div
                    key={s.id}
                    className={`
                      group relative overflow-hidden rounded-[22px]
                      border bg-white p-5 sm:p-6
                      shadow-[0_8px_24px_-10px_rgba(0,51,102,0.09)]
                      transition-[transform,border-color,background-color,box-shadow]
                      duration-200 motion-safe:hover:-translate-y-1
                      ${
                        isOrange
                          ? 'border-slate-200/90 hover:border-[#FF5722]/45 hover:bg-[#FFF9F7] hover:shadow-[0_14px_30px_-12px_rgba(255,87,34,0.18)]'
                          : 'border-slate-200/90 hover:border-[#0052CC]/45 hover:bg-[#F4F8FF]/65 hover:shadow-[0_14px_30px_-12px_rgba(0,82,204,0.18)]'
                      }
                    `}
                  >
                    {/* Top Accent Bar */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-1 ${
                        isOrange ? 'bg-[#FF5722]' : 'bg-[#0052CC]'
                      }`}
                    />

                    {/* Subtle Watermark Icon */}
                    <Icon
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 text-slate-900/[0.03] transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Header Row: Icon + Category Pill */}
                    <div className="mb-3.5 flex items-center justify-between gap-2">
                      <span
                        aria-hidden="true"
                        className={`
                          flex h-10 w-10 items-center justify-center rounded-xl
                          transition-colors duration-200
                          ${
                            isOrange
                              ? 'bg-[#FFF7F4] text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white'
                              : 'bg-[#F4F8FF] text-[#0052CC] group-hover:bg-[#0052CC] group-hover:text-white'
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                      </span>

                      <span
                        className={`
                          rounded-full px-2.5 py-0.5 text-[10px]
                          font-extrabold [font-synthesis:weight]
                          uppercase tracking-wider
                          ${
                            isOrange
                              ? 'bg-[#FFF7F4] text-[#FF5722]'
                              : 'bg-[#F4F8FF] text-[#0052CC]'
                          }
                          ${bn(lang)}
                        `}
                      >
                        {isBangla ? s.tag.bn : s.tag.en}
                      </span>
                    </div>

                    {/* Bold Metric / Badge Value */}
                    <div
                      className={`
                        mb-1.5 text-3xl sm:text-[34px] font-extrabold [font-synthesis:weight]
                        leading-none tracking-tight
                        ${isOrange ? 'text-[#003366]' : 'text-[#003366] group-hover:text-[#0052CC]'}
                        transition-colors
                      `}
                      style={{ fontFamily: 'var(--agni-display)' }}
                    >
                      {typeof s.countTarget === 'number' ? (
                        <CountUpNumber
                          target={s.countTarget}
                          suffix={s.suffix}
                          shouldStart={statsVisible}
                        />
                      ) : (
                        s.num
                      )}
                    </div>

                    <div
                      className={`text-xs sm:text-sm font-semibold text-slate-600 leading-snug ${bn(lang)}`}
                    >
                      {isBangla ? s.bn : s.en}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: B2B Enterprise Callout Card */}
          <div
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
            onPointerCancel={resetTilt}
            className="lg:col-span-5 [perspective:1100px]"
          >
            <div
              className="
                relative overflow-hidden rounded-[24px]
                border border-white/10
                bg-[linear-gradient(145deg,#00244D_0%,#003366_55%,#004799_100%)]
                p-6 sm:p-8
                shadow-[0_22px_48px_-14px_rgba(0,33,71,0.38)]
                [transform-style:preserve-3d]
                transition-transform duration-200 ease-out
                motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
                motion-reduce:transition-none
              "
            >
              {/* Subtle Top Orange Accent Bar */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-[#FF5722]"
              />

              {/* Subtle Decorative Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#0052CC]/35 blur-2xl"
              />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold [font-synthesis:weight] uppercase tracking-wider text-sky-200">
                  <FiServer
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#FF5722]"
                  />
                  <span>
                    {isBangla ? 'এন্টারপ্রাইজ সমাধান' : 'ENTERPRISE SOLUTIONS'}
                  </span>
                </div>

                <h3
                  className={`mb-3 text-xl sm:text-2xl font-bold [font-synthesis:weight] leading-snug text-white ${bn(lang)}`}
                  style={{ fontFamily: 'var(--agni-display)' }}
                >
                  {isBangla
                    ? 'বিজনেস ও কর্পোরেট IP PBX'
                    : 'Business & Corporate IP PBX'}
                </h3>

                <p
                  className={`mb-6 text-sm leading-relaxed text-sky-100/85 ${bn(lang)}`}
                >
                  {isBangla
                    ? 'আপনার ব্যবসার জন্য Agni Systems-এর এন্টারপ্রাইজ টেলিফোনি সমাধান বিবেচনা করুন।'
                    : 'Need enterprise telephony? Agni Systems offers hosted IP PBX, SIP trunking, and call center solutions backed by the same infrastructure powering AgniTalk.'}
                </p>

                <ul className="mb-7 flex flex-col gap-3 border-t border-white/10 pt-5">
                  {ENTERPRISE.map((item) => (
                    <li
                      key={item.en}
                      className={`flex items-center gap-2.5 text-sm text-white/95 ${bn(lang)}`}
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300"
                      >
                        <IconCheck size={13} />
                      </span>
                      <span>{isBangla ? item.bn : item.en}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  to="/faq"
                  variant="outlineWhite"
                  className={`w-full justify-center ${bn(lang)}`}
                  style={{ display: 'flex' }}
                  icon={<IconArrowRight />}
                >
                  {isBangla
                    ? 'এন্টারপ্রাইজ সমাধান দেখুন'
                    : 'Explore Enterprise Solutions'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}