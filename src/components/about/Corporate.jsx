import { useEffect, useRef, useState } from 'react'
import Button from '../shared/Button'
import {
  FiAward,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiCpu,
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
    tag: { en: 'Legacy', bn: 'অভিজ্ঞতা' },
    en: 'Years in Bangladesh Telecom',
    bn: 'বছর টেলিকম অভিজ্ঞতা',
  },
  {
    id: 'founded',
    num: '1995',
    Icon: FiCalendar,
    accent: 'orange',
    tag: { en: 'Established', bn: 'প্রতিষ্ঠিত' },
    en: 'Founded by Agni Systems PLC.',
    bn: 'প্রতিষ্ঠার বছর — অগ্নি সিস্টেমস PLC',
  },
  {
    id: 'dse',
    num: 'DSE',
    Icon: FiTrendingUp,
    accent: 'orange',
    tag: { en: 'Publicly Listed', bn: 'পাবলিক লিমিটেড' },
    en: 'Listed on Dhaka Stock Exchange',
    bn: 'ঢাকা স্টক এক্সচেঞ্জে তালিকাভুক্ত',
  },
  {
    id: 'iptsp',
    num: 'IPTSP',
    Icon: FiShield,
    accent: 'blue',
    tag: { en: 'Regulated', bn: 'লাইসেন্সপ্রাপ্ত' },
    en: 'Licensed by BTRC Bangladesh',
    bn: 'BTRC বাংলাদেশ লাইসেন্সপ্রাপ্ত',
  },
]

const INFRASTRUCTURE_PILLS = [
  { en: 'Dedicated Fiber-Optic Backbone', bn: 'ডেডিকেটেড ফাইবার-অপটিক ব্যাকবোন' },
  { en: 'iTel Class 5 Softswitch', bn: 'iTel Class 5 সফটসুইচ' },
  { en: '24/7 NOC Engineering', bn: '২৪/৭ NOC ইঞ্জিনিয়ারিং সাপোর্ট' },
]

const ENTERPRISE = [
  { en: 'Hosted IP PBX & SIP Trunking', bn: 'হোস্টেড IP PBX ও SIP ট্রাঙ্কিং' },
  { en: 'Omni-Channel Call Center Solutions', bn: 'কল সেন্টার সমাধান' },
  { en: 'Dedicated Corporate 09606 Lines', bn: 'ডেডিকেটেড কর্পোরেট ০৯৬০৬ লাইন' },
  { en: 'SLA-Backed 99.9% Uptime Guarantee', bn: 'SLA-সমর্থিত আপটাইম নিশ্চয়তা' },
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

  wrapper.style.setProperty('--tilt-x', `${(0.5 - y) * 6}deg`)
  wrapper.style.setProperty('--tilt-y', `${(x - 0.5) * 6}deg`)
  wrapper.style.setProperty('--lift', '-6px')
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
        relative isolate overflow-hidden
        border-b border-slate-200/80
        bg-[#F8FAFF]
        py-16 sm:py-20 lg:py-24
      "
    >
      {/* Creative Architectural Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Subtle Dot Matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_0.9px,transparent_0.9px)] [background-size:24px_24px] opacity-75" />

        {/* Soft Ambient Brand Glows */}
        <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-[#0052CC]/[0.07] blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#FF5722]/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Standard Clean Typography & Architectural Stat Grid */}
          <div className="lg:col-span-7">
            {/* Refined Section Eyebrow Pill */}
            <div
              className={`
                mb-4 inline-flex items-center gap-2 rounded-full
                border border-[#0052CC]/15 bg-white
                px-3.5 py-1.5 text-xs font-semibold
                uppercase tracking-wider text-[#003366]
                shadow-[0_2px_10px_-3px_rgba(0,51,102,0.12)]
                ${bn(lang)}
              `}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0052CC]/10 text-[#0052CC]">
                <FiBriefcase aria-hidden="true" className="h-3 w-3" />
              </span>
              <span>{isBangla ? 'আমাদের সম্পর্কে' : 'About AgniTalk'}</span>
            </div>

            {/* Clean Standard Display Heading */}
            <h2
              id="corporate-title"
              className={`mb-4 text-[clamp(26px,3.6vw,38px)] font-bold [font-synthesis:weight] leading-[1.2] tracking-tight text-[#003366] ${bn(lang)}`}
              style={display(lang)}
            >
              {isBangla ? (
                <>
                  অগ্নি সিস্টেমস PLC-এর{' '}
                  <span className="text-[#0052CC]">২৫+ বছরের</span> টেলিকম
                  অভিজ্ঞতায় তৈরি
                </>
              ) : (
                <>
                  Powered by Agni Systems PLC. {' '}
                  <span className="text-[#0052CC]">25+ Years</span> of Telecom
                  Excellence
                </>
              )}
            </h2>

            {/* Comfortable Readable Body Copy */}
            <p
              className={`mb-6 text-sm sm:text-base font-normal leading-relaxed text-slate-600 ${bn(lang)}`}
            >
              {isBangla
                ? 'AgniTalk হলো Agni Systems PLC.-এর একটি পণ্য, যা ১৯৯৫ সাল থেকে বাংলাদেশের টেলিযোগাযোগ খাতে নেতৃত্ব দিয়ে আসছে। ঢাকা স্টক এক্সচেঞ্জে তালিকাভুক্ত এই কোম্পানি দেশের অন্যতম বিশ্বস্ত ISP এবং IPTSP অপারেটর।'
                : 'AgniTalk is a product of Agni Systems PLC., a publicly-listed pioneer in Bangladesh telecommunications since 1995. With a dedicated fiber-optic backbone, enterprise-grade iTel Class 5 softswitch, and full BTRC IPTSP licensing, AgniTalk is built on infrastructure trusted for mission-critical communications.'}
            </p>

            {/* Infrastructure Credential Chips */}
            <div className="mb-8 flex flex-wrap gap-2">
              {INFRASTRUCTURE_PILLS.map((pill) => (
                <span
                  key={pill.en}
                  className={`
                    inline-flex items-center gap-1.5 rounded-xl
                    border border-slate-200/90 bg-white px-3 py-1.5
                    text-xs font-medium text-slate-700 shadow-2xs
                    ${bn(lang)}
                  `}
                >
                  <FiCheckCircle
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-[#0052CC]"
                  />
                  <span>{isBangla ? pill.bn : pill.en}</span>
                </span>
              ))}
            </div>

            {/* 2x2 Modern Stat Cards */}
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
                      shadow-[0_10px_28px_-12px_rgba(0,51,102,0.12)]
                      transition-[transform,border-color,background-color,box-shadow]
                      duration-200 motion-safe:hover:-translate-y-1
                      ${
                        isOrange
                          ? 'border-slate-200/90 hover:border-[#FF5722]/45 hover:bg-[#FFF9F7]/70 hover:shadow-[0_16px_34px_-12px_rgba(255,87,34,0.18)]'
                          : 'border-slate-200/90 hover:border-[#0052CC]/45 hover:bg-[#F4F8FF]/70 hover:shadow-[0_16px_34px_-12px_rgba(0,82,204,0.18)]'
                      }
                    `}
                  >
                    {/* Top Accent Line */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-1 ${
                        isOrange ? 'bg-[#FF5722]' : 'bg-[#0052CC]'
                      }`}
                    />

                    {/* Subtle Corner Watermark */}
                    <Icon
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 text-slate-900/[0.035] transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Icon + Tag Row */}
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
                          rounded-full px-2.5 py-0.5 text-[11px]
                          font-semibold tracking-wide
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

                    {/* Crisp Metric Number */}
                    <div
                      className={`
                        mb-1 text-3xl sm:text-[34px] font-bold [font-synthesis:weight]
                        leading-none tracking-tight text-[#003366]
                        transition-colors
                        ${isOrange ? 'group-hover:text-[#FF5722]' : 'group-hover:text-[#0052CC]'}
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

                    {/* Standard Medium-Weight Subtitle */}
                    <div
                      className={`text-xs sm:text-sm font-medium text-slate-600 leading-snug ${bn(lang)}`}
                    >
                      {isBangla ? s.bn : s.en}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Creative Layered Enterprise Card with 3D Floor Shadow */}
          <div
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
            onPointerCancel={resetTilt}
            className="group relative lg:col-span-5 [perspective:1100px]"
          >
            {/* 3D Floor Shadow Underneath Card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 inset-x-6 h-8 rounded-[100%] bg-[#001F4D]/35 blur-xl transition-opacity duration-200 group-hover:opacity-95"
            />

            {/* Decorative Offset Backplate for Depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-2.5 -bottom-2.5 inset-0 hidden rounded-[26px] border border-[#0052CC]/20 bg-[#E4EEFF] sm:block"
            />

            <div
              className="
                relative overflow-hidden rounded-[24px]
                border border-white/15
                bg-[linear-gradient(145deg,#00244D_0%,#003366_52%,#0052CC_100%)]
                p-6 sm:p-8
                shadow-[0_24px_48px_-14px_rgba(0,33,71,0.4)]
                [transform-style:preserve-3d]
                transition-transform duration-200 ease-out
                motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
                motion-reduce:transition-none
              "
            >
              {/* Top Orange Accent Bar */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-[#FF5722]"
              />

              {/* Subtle Telecom Grid Texture inside Card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:20px_20px] opacity-50"
              />

              {/* Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-sky-400/20 blur-2xl"
              />

              <div className="relative">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-sky-100 backdrop-blur-xs">
                    <FiServer
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-[#FF5722]"
                    />
                    <span>
                      {isBangla ? 'এন্টারপ্রাইজ সমাধান' : 'Enterprise Solutions'}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-400/25 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                    <FiCpu className="h-3 w-3" />
                    <span>Class 5 IPTSP</span>
                  </span>
                </div>

                <h3
                  className={`mb-2.5 text-xl sm:text-2xl font-bold [font-synthesis:weight] leading-snug text-white ${bn(lang)}`}
                  style={{ fontFamily: 'var(--agni-display)' }}
                >
                  {isBangla
                    ? 'বিজনেস ও কর্পোরেট IP PBX'
                    : 'Business & Corporate IP PBX'}
                </h3>

                <p
                  className={`mb-6 text-sm font-normal leading-relaxed text-sky-100/85 ${bn(lang)}`}
                >
                  {isBangla
                    ? 'আপনার ব্যবসার জন্য Agni Systems-এর এন্টারপ্রাইজ টেলিফোনি সমাধান বিবেচনা করুন।'
                    : 'Need enterprise telephony? Agni Systems offers hosted IP PBX, SIP trunking, and call center solutions backed by the same infrastructure powering AgniTalk.'}
                </p>

                <ul className="mb-7 flex flex-col gap-3 border-t border-white/15 pt-5">
                  {ENTERPRISE.map((item) => (
                    <li
                      key={item.en}
                      className={`flex items-center gap-2.5 text-sm font-normal text-white/95 ${bn(lang)}`}
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300"
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
                  className={`w-full justify-center font-semibold ${bn(lang)}`}
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