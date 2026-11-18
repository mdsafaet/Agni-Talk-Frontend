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
    icon: <IconVideo />,
    en: {
      tab: 'HD Calls',
      title: 'Crystal-Clear HD Audio & Video Calls',
      desc: "Experience 1-on-1 and group video calls with up to 6 participants globally. Agni's dedicated IPTSP infrastructure ensures HD clarity even during peak hours, with zero call drops on stable connections.",
    },
    bn: {
      tab: 'এইচডি কল',
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
    icon: <IconMic />,
    en: {
      tab: 'Call Management',
      title: 'Smart Call Recording & Forwarding',
      desc: 'Never miss a critical conversation. Record important calls, forward incoming calls to your GSM number or voicemail when offline, and manage everything from one intuitive dashboard.',
    },
    bn: {
      tab: 'কল ম্যানেজমেন্ট',
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
    icon: <IconMessage />,
    en: {
      tab: 'Messaging',
      title: 'Rich Instant Messaging & Group Chat',
      desc: 'Stay connected with group chats supporting up to 50 members. Share your live location, voice notes, documents, stickers, and media with end-to-end encryption on every message.',
    },
    bn: {
      tab: 'মেসেজিং',
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
    icon: <IconTransfer />,
    en: {
      tab: 'Balance & Referral',
      title: 'Balance Transfer & Referral Rewards',
      desc: "Transfer credit to friends and family instantly. Earn bonus taka through AgniTalk's multi-level referral program — the more friends you invite, the more you earn.",
    },
    bn: {
      tab: 'ব্যালেন্স ও রেফারেল',
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
      className="border-b border-slate-200/70 bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div
            className={`
              mb-3 inline-flex items-center gap-2 rounded-full
              border border-[#0052CC]/15 bg-[#F4F8FF]
              px-3.5 py-1 text-[11px] font-bold [font-synthesis:weight]
              uppercase tracking-wider text-[#0052CC]
              ${bn(lang)}
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
            {isBangla ? 'স্মার্ট ফিচারসমূহ' : 'PLATFORM FEATURES'}
          </div>

          <h2
            id="features-title"
            className={`mb-3 text-[clamp(24px,4vw,36px)] font-bold [font-synthesis:weight] leading-tight text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'সম্পূর্ণ যোগাযোগ সমাধান'
              : 'Everything You Need to Communicate'}
          </h2>

          <p className={`text-sm sm:text-base text-slate-600 ${bn(lang)}`}>
            {isBangla
              ? 'একটি অ্যাপেই পান সবকিছু — কল, মেসেজ, রিচার্জ এবং আরো অনেক কিছু।'
              : 'One app for HD calls, smart messaging, balance management, and more.'}
          </p>
        </div>

        {/* Pill Tabs */}
        <div
          role="tablist"
          aria-label={isBangla ? 'ফিচার নির্বাচন করুন' : 'Feature tabs'}
          className="mb-12 flex flex-wrap justify-center gap-2.5"
        >
          {FEATURES.map((f, i) => {
            const isActive = activeTab === i
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(i)}
                className={`
                  inline-flex items-center gap-2 rounded-full
                  px-5 py-2.5 text-sm font-bold [font-synthesis:weight]
                  transition-[background-color,color,border-color,box-shadow,transform]
                  duration-200 cursor-pointer
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#0052CC]
                  motion-safe:hover:-translate-y-0.5
                  motion-safe:active:scale-[0.98]
                  motion-reduce:transition-none
                  ${bn(lang)}
                  ${
                    isActive
                      ? 'border border-[#003366] bg-[#003366] text-white shadow-[0_10px_22px_-8px_rgba(0,51,102,0.4)]'
                      : 'border border-slate-200/90 bg-[#F8FAFC] text-slate-600 hover:border-[#0052CC]/35 hover:bg-[#F4F8FF] hover:text-[#0052CC]'
                  }
                `}
                style={display(lang)}
              >
                <span
                  aria-hidden="true"
                  className={isActive ? 'text-[#FF5722]' : 'text-[#0052CC]'}
                >
                  {f.icon}
                </span>
                <span>{isBangla ? f.bn.tab : f.en.tab}</span>
              </button>
            )
          })}
        </div>

        {/* Original 2-Column Feature Content */}
        <div
          role="tabpanel"
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
        >
          <div>
            <h3
              className={`mb-4 text-[clamp(22px,3vw,30px)] font-bold [font-synthesis:weight] leading-snug text-[#003366] ${bn(lang)}`}
              style={display(lang)}
            >
              {t.title}
            </h3>

            <p
              className={`mb-6 text-sm sm:text-base leading-relaxed text-slate-600 ${bn(lang)}`}
            >
              {t.desc}
            </p>

            <ul className="mb-8 flex flex-col gap-3">
              {(isBangla ? active.bullets.bn : active.bullets.en).map(
                (b, i) => (
                  <li key={i} className={`flex items-center gap-3 ${bn(lang)}`}>
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0052CC]/10 text-[#0052CC]"
                    >
                      <IconCheck />
                    </span>
                    <span className="text-sm sm:text-[15px] text-slate-700">
                      {b}
                    </span>
                  </li>
                ),
              )}
            </ul>

            <Button
              to="/download"
              className="inline-flex"
              icon={<IconArrowRight />}
            >
              {isBangla ? 'অ্যাপ ডাউনলোড করুন' : 'Try This Feature'}
            </Button>
          </div>

          {/* Right Phone Mockup / Artwork */}
          <div className="flex justify-center">
            {active.art ? (
              <img
                key={active.art.src}
                src={active.art.src}
                alt={active.art.alt}
                width={active.art.w}
                height={active.art.h}
                draggable={false}
                className="h-auto w-full max-w-[360px] lg:my-6 motion-safe:animate-[agniHeroFloat_4.8s_ease-in-out_infinite]"
              />
            ) : (
              <div className="w-[260px] h-[520px] rotate-2 transition-transform duration-300 motion-safe:hover:rotate-0">
                <PhoneMockup screen={active.screen} />
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
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
    </section>
  )
}