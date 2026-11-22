import Button from '../shared/Button'
import { useState } from 'react'
import PhoneMockup from '../shared/PhoneMockup'
import {
  IconArrowRight,
  IconCheck,
  IconMessage,
  IconMic,
  IconTransfer,
  IconVideo,
} from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const FEATURES = [
  {
    num: '01',
    icon: <IconVideo />,
    en: {
      tab: 'HD Calls',
      kicker: 'VOICE & VIDEO',
      title: 'Crystal-Clear HD Audio & Video Calls',
      desc: "Experience 1-on-1 and group video calls with up to 6 participants globally. Agni's dedicated IPTSP infrastructure ensures HD clarity even during peak hours, with zero call drops on stable connections.",
    },
    bn: {
      tab: 'এইচডি কল',
      kicker: 'ভয়েস ও ভিডিও',
      title: 'এইচডি ভয়েস ও ভিডিও কল',
      desc: 'বিশ্বের যেকোনো প্রান্তে ৬ জন পর্যন্ত গ্রুপ ভিডিও কল করুন। অগ্নির ডেডিকেটেড নেটওয়ার্কে সর্বোচ্চ মানের কল উপভোগ করুন।',
    },
    screen: 'video-call',
    bullets: {
      en: [
        'Up to 6-person HD video conferencing',
        'Audio conferencing for up to 4 participants',
        'End-to-end TLS encryption on all calls',
        'Seamless switching between 4G/WiFi',
      ],
      bn: [
        '৬ জন পর্যন্ত ভিডিও কনফারেন্স',
        '৪ জন পর্যন্ত অডিও কনফারেন্স',
        'সম্পূর্ণ TLS এনক্রিপশন',
        '4G/WiFi স্বয়ংক্রিয় সুইচিং',
      ],
    },
  },
  {
    num: '02',
    icon: <IconMic />,
    en: {
      tab: 'Call Management',
      kicker: 'SMART ROUTING',
      title: 'Smart Call Recording & Forwarding',
      desc: 'Never miss a critical conversation. Record important calls, forward incoming calls to your GSM number or voicemail when offline, and manage everything from one intuitive dashboard.',
    },
    bn: {
      tab: 'কল ম্যানেজমেন্ট',
      kicker: 'স্মার্ট রাউটিং',
      title: 'স্মার্ট কল রেকর্ডিং ও ফরওয়ার্ডিং',
      desc: 'গুরুত্বপূর্ণ কল রেকর্ড করুন এবং অফলাইনে থাকলে কল ফরওয়ার্ড করুন।',
    },
    screen: 'call',
    bullets: {
      en: [
        'One-tap in-call recording',
        'Forward calls to any GSM number',
        'Voicemail with instant playback',
        'Custom do-not-disturb schedules',
      ],
      bn: [
        'এক ট্যাপেই কল রেকর্ডিং',
        'যেকোনো GSM নম্বরে কল ফরওয়ার্ড',
        'ভয়েসমেইল প্লেব্যাক',
        'কাস্টম DND সময়সূচি',
      ],
    },
  },
  {
    num: '03',
    icon: <IconMessage />,
    en: {
      tab: 'Messaging',
      kicker: 'ENCRYPTED CHAT',
      title: 'Rich Instant Messaging & Group Chat',
      desc: 'Stay connected with group chats supporting up to 50 members. Share your live location, voice notes, documents, stickers, and media with end-to-end encryption on every message.',
    },
    bn: {
      tab: 'মেসেজিং',
      kicker: 'এনক্রিপ্টেড চ্যাট',
      title: 'গ্রুপ চ্যাট ও তাৎক্ষণিক বার্তা',
      desc: '৫০ জন পর্যন্ত গ্রুপ চ্যাটে থাকুন সংযুক্ত। লোকেশন, ভয়েস নোট, ডকুমেন্ট শেয়ার করুন।',
    },
    screen: 'chat',
    bullets: {
      en: [
        'Group chats up to 50 members',
        'Live location sharing',
        'Voice notes, stickers & documents',
        'Read receipts & typing indicators',
      ],
      bn: [
        '৫০ জন পর্যন্ত গ্রুপ চ্যাট',
        'লাইভ লোকেশন শেয়ারিং',
        'ভয়েস নোট, স্টিকার ও ডকুমেন্ট',
        'রিড রিসিট ও টাইপিং ইন্ডিকেটর',
      ],
    },
  },
  {
    num: '04',
    icon: <IconTransfer />,
    en: {
      tab: 'Balance & Referral',
      kicker: 'CREDIT & REWARDS',
      title: 'Balance Transfer & Referral Rewards',
      desc: "Transfer credit to friends and family instantly. Earn bonus taka through AgniTalk's multi-level referral program — the more friends you invite, the more you earn.",
    },
    bn: {
      tab: 'ব্যালেন্স ও রেফারেল',
      kicker: 'ক্রেডিট ও বোনাস',
      title: 'ব্যালেন্স ট্রান্সফার ও রেফারেল বোনাস',
      desc: 'বন্ধুদের কাছে ব্যালেন্স পাঠান এবং রেফারেল প্রোগ্রামে বোনাস উপার্জন করুন।',
    },
    art: {
      src: '/images/refer-a-friend.webp',
      alt: 'Illustration: refer a friend and earn credit',
      w: 455,
      h: 465,
    },
    bullets: {
      en: [
        'Instant peer-to-peer balance transfer',
        'Multi-level referral bonus program',
        'Earn credit for every referral',
        'Real-time balance tracking dashboard',
      ],
      bn: [
        'তাৎক্ষণিক ব্যালেন্স ট্রান্সফার',
        'মাল্টি-লেভেল রেফারেল বোনাস',
        'প্রতিটি রেফারেলে ক্রেডিট আয়',
        'রিয়েল-টাইম ব্যালেন্স ট্র্যাকিং',
      ],
    },
  },
]

export default function Features({ lang = 'en' }) {
  const [activeTab, setActiveTab] = useState(0)
  const isBangla = lang === 'bn'
  const active = FEATURES[activeTab]
  const t = isBangla ? active.bn : active.en

  return (
    <section
      id="features"
      lang={lang}
      aria-labelledby="features-title"
      className="
        agnitalk-ui relative overflow-hidden
        border-b border-slate-200/80
        bg-[#F8FAFF]
        bg-[radial-gradient(#CBD5E1_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
        py-16! sm:py-20! lg:py-24!
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(248,250,255,0.65)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200/90 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span
              className={`mb-2.5 block text-xs font-bold [font-synthesis:weight] uppercase tracking-[0.16em] text-[#FF5722] ${bn(lang)}`}
            >
              {isBangla ? 'স্মার্ট ফিচারসমূহ' : 'Platform Capabilities'}
            </span>

            <h2
              id="features-title"
              className={`text-[clamp(26px,3.8vw,38px)] leading-[1.18] tracking-tight text-[#003366] ${bn(lang)}`}
              style={display(lang)}
            >
              {isBangla
                ? 'সম্পূর্ণ যোগাযোগ সমাধান'
                : 'Everything You Need to Communicate'}
            </h2>
          </div>

          <p
            className={`max-w-md text-sm sm:text-base leading-relaxed text-slate-600 ${bn(lang)}`}
          >
            {isBangla
              ? 'একটি অ্যাপেই পান সবকিছু — কল, মেসেজ, রিচার্জ এবং আরো অনেক কিছু।'
              : 'One app for HD calls, smart messaging, balance management, and more.'}
          </p>
        </div>

        {/* Clean Numbered Tab Rail */}
        <div
          role="tablist"
          aria-label={isBangla ? 'ফিচার নির্বাচন করুন' : 'Feature tabs'}
          className="mb-12 grid grid-cols-2 border-b border-slate-200/90 sm:grid-cols-4"
        >
          {FEATURES.map((f, i) => {
            const isActive = activeTab === i
            return (
              <button
                key={f.num}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(i)}
                className={`
                  group relative flex items-center gap-3 px-3 py-4 text-left
                  transition-colors duration-200 cursor-pointer
                  focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0052CC]
                  sm:px-5
                  ${isActive ? 'text-[#003366]' : 'text-slate-500 hover:text-[#003366]'}
                `}
              >
                <span
                  aria-hidden="true"
                  className={`
                    font-agni-heading text-xs tracking-wider transition-colors
                    ${isActive ? 'text-[#FF5722]' : 'text-slate-400 group-hover:text-[#0052CC]'}
                  `}
                >
                  {f.num}
                </span>

                <span
                  aria-hidden="true"
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#0052CC]'
                      : 'text-slate-400 group-hover:text-[#0052CC]'
                  }`}
                >
                  {f.icon}
                </span>

                <span
                  className={`truncate text-sm font-bold [font-synthesis:weight] ${bn(lang)}`}
                >
                  {isBangla ? f.bn.tab : f.en.tab}
                </span>

                {/* Active Bottom Indicator Bar */}
                <span
                  aria-hidden="true"
                  className={`
                    absolute inset-x-0 bottom-[-1px] h-[2.5px] transition-all duration-200
                    ${isActive ? 'bg-[#0052CC]' : 'bg-transparent'}
                  `}
                />
              </button>
            )
          })}
        </div>

        {/* 2-Column Feature Showcase */}
        <div
          role="tabpanel"
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
        >
          {/* Left Narrative */}
          <div className="lg:col-span-6">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="font-agni-heading text-xs tracking-widest text-[#0052CC]">
                {active.num} / 04
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-slate-300" />
              <span
                className={`text-xs font-bold [font-synthesis:weight] uppercase tracking-wider text-slate-500 ${bn(lang)}`}
              >
                {t.kicker}
              </span>
            </div>

            <h3
              className={`mb-4 text-[clamp(22px,3vw,32px)] leading-[1.24] text-[#003366] ${bn(lang)}`}
              style={display(lang)}
            >
              {t.title}
            </h3>

            <p
              className={`mb-7 text-sm sm:text-base leading-relaxed text-slate-600 ${bn(lang)}`}
            >
              {t.desc}
            </p>

            <ul className="mb-8 divide-y divide-slate-200/70 border-y border-slate-200/80">
              {(isBangla ? active.bullets.bn : active.bullets.en).map(
                (b, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 py-3 text-sm sm:text-[15px] text-slate-700 ${bn(lang)}`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#0052CC] shadow-2xs ring-1 ring-[#0052CC]/15"
                    >
                      <IconCheck size={13} />
                    </span>
                    <span>{b}</span>
                  </li>
                ),
              )}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                to="/download"
                className="inline-flex"
                icon={<IconArrowRight />}
              >
                {isBangla ? 'অ্যাপ ডাউনলোড করুন' : 'Try This Feature'}
              </Button>

              <Button
                to="/app"
                variant="secondary"
                className="inline-flex"
                icon={<IconArrowRight />}
              >
                {isBangla ? 'অ্যাপের স্ক্রিন দেখুন' : 'See the App Screens'}
              </Button>
            </div>
          </div>

          {/* Right Framed Stage */}
          <div className="lg:col-span-6">
            <div className="relative flex min-h-[460px] items-center justify-center rounded-3xl border border-slate-200/90 bg-white/90 px-6 py-10 shadow-[0_14px_34px_-14px_rgba(0,51,102,0.1)] sm:min-h-[540px] sm:px-10">
              {/* Subtle Architectural Corner Registration Marks */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-5 left-5 h-3 w-3 border-t-2 border-l-2 border-[#0052CC]/30"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-5 right-5 h-3 w-3 border-t-2 border-r-2 border-[#0052CC]/30"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 left-5 h-3 w-3 border-b-2 border-l-2 border-[#0052CC]/30"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 right-5 h-3 w-3 border-b-2 border-r-2 border-[#0052CC]/30"
              />

              {active.art ? (
                <img
                  key={active.art.src}
                  src={active.art.src}
                  alt={active.art.alt}
                  width={active.art.w}
                  height={active.art.h}
                  draggable={false}
                  className="h-auto w-full max-w-[350px]"
                />
              ) : (
                <div className="relative">
                  {/* Grounded Floor Shadow Under Phone */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-4 inset-x-4 h-6 rounded-[100%] bg-[#00244D]/25 blur-lg"
                  />
                  <div className="w-[260px] h-[520px]">
                    <PhoneMockup screen={active.screen} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}