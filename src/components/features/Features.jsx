import Button from '../shared/Button'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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

const ACCENTS = [
  { color: '#006DA8', soft: '#EAF6FC', border: '#CCE5F3', brand: '#0088D0' },
  { color: '#A94D09', soft: '#FFF3E8', border: '#F4DCC8', brand: '#F58220' },
  { color: '#B51220', soft: '#FFF0F1', border: '#F2D2D6', brand: '#E00010' },
  { color: '#756500', soft: '#FFFBE0', border: '#EBE3A9', brand: '#F8E800' },
]

export default function Features({ lang = 'en' }) {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = useRef([])
  const reduced = useReducedMotion()
  const isBangla = lang === 'bn'
  const active = FEATURES[activeTab]
  const t = isBangla ? active.bn : active.en
  const accent = ACCENTS[activeTab]

  function handleTabKey(event, index) {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % FEATURES.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + FEATURES.length) % FEATURES.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = FEATURES.length - 1
    else return
    event.preventDefault()
    setActiveTab(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="features" lang={lang} aria-labelledby="features-title"
      className="agnitalk-ui relative overflow-hidden border-b border-[#E1EAF0] bg-[#F8FBFD] py-10! sm:py-12! lg:py-14!">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-7 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2.5">
              <span aria-hidden="true" className="flex h-1 gap-0.5">
                <span className="w-5 rounded-full bg-[#0088D0]" />
                <span className="w-2 rounded-full bg-[#E00010]" />
                <span className="w-2 rounded-full bg-[#F58220]" />
                <span className="w-2 rounded-full bg-[#F8E800]" />
              </span>
              <span className={`text-[13px] font-bold tracking-wide text-[#006DA8] ${bn(lang)}`}>
                {isBangla ? 'স্মার্ট ফিচারসমূহ' : 'Platform Capabilities'}
              </span>
            </div>
            <h2 id="features-title" style={display(lang)} className={`m-0 text-[clamp(28px,3.4vw,42px)] leading-[1.22] tracking-tight text-[#003366] ${bn(lang)}`}>
              {isBangla ? 'সম্পূর্ণ যোগাযোগ সমাধান' : 'Everything You Need to Communicate'}
            </h2>
          </div>
          <p className={`m-0 max-w-md text-[16px] leading-7 text-[#334155] ${bn(lang)}`}>
            {isBangla ? 'একটি অ্যাপেই পান সবকিছু — কল, মেসেজ, রিচার্জ এবং আরো অনেক কিছু।' : 'One app for HD calls, smart messaging, balance management, and more.'}
          </p>
        </header>

        <div role="tablist" aria-label={isBangla ? 'ফিচার নির্বাচন করুন' : 'Feature tabs'} className="mb-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const selected = activeTab === i
            const c = ACCENTS[i]
            return (
              <button key={f.num} ref={el => { tabs.current[i] = el }} type="button" role="tab"
                id={`agni-feature-tab-${i}`} aria-controls="agni-feature-panel" aria-selected={selected}
                tabIndex={selected ? 0 : -1} onKeyDown={e => handleTabKey(e, i)} onClick={() => setActiveTab(i)}
                style={{ '--feature-ink': c.color, '--feature-soft': c.soft, '--feature-border': c.border, '--feature-brand': c.brand }}
                className={`group relative flex min-h-[64px] min-w-0 cursor-pointer items-center gap-2.5 overflow-hidden rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0088D0] sm:gap-3 sm:p-4 ${selected ? 'border-[var(--feature-border)] bg-[var(--feature-soft)]' : 'border-[#DFE8EF] bg-white hover:bg-[var(--feature-soft)]'}`}>
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--feature-soft)] text-[var(--feature-ink)] [&>svg]:h-5 [&>svg]:w-5">{f.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-[var(--feature-ink)]">{f.num}</span>
                  <span className={`block text-[15px] font-bold leading-snug text-[#003366] [font-synthesis:weight] sm:text-base ${bn(lang)}`}>{isBangla ? f.bn.tab : f.en.tab}</span>
                </span>
                {selected && <motion.span layoutId={reduced ? undefined : 'agni-feature-indicator'} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-[var(--feature-brand)]" transition={{ duration: reduced ? 0 : 0.25 }} />}
              </button>
            )
          })}
        </div>

        <div id="agni-feature-panel" role="tabpanel" aria-labelledby={`agni-feature-tab-${activeTab}`}
          style={{ '--feature-ink': accent.color, '--feature-soft': accent.soft, '--feature-border': accent.border }}
          className="grid min-w-0 items-center gap-7 rounded-2xl border border-[#DFE8EF] bg-white p-4 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active.num} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.22 }} className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[var(--feature-soft)] px-2.5 py-1 text-xs font-bold text-[var(--feature-ink)]">{active.num} / {String(FEATURES.length).padStart(2, '0')}</span>
                <span className={`text-[13px] font-bold tracking-wide text-[var(--feature-ink)] ${bn(lang)}`}>{t.kicker}</span>
              </div>
              <h3 style={display(lang)} className={`mb-3 text-[clamp(23px,2.7vw,34px)] leading-[1.25] text-[#003366] ${bn(lang)}`}>{t.title}</h3>
              <p className={`mb-5 text-[16px] leading-7 text-[#334155] ${bn(lang)}`}>{t.desc}</p>
              <ul className="mb-6 grid gap-2.5">
                {(isBangla ? active.bullets.bn : active.bullets.en).map(b => (
                  <li key={b} className={`flex items-start gap-3 rounded-lg bg-[#F6F9FB] px-3 py-2.5 text-[15px] leading-6 text-[#334155] ${bn(lang)}`}>
                    <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--feature-soft)] text-[var(--feature-ink)]"><IconCheck size={13} /></span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {/* <div className="flex flex-wrap items-center gap-3">
                <Button to="/download" className="inline-flex" icon={<IconArrowRight />}>{isBangla ? 'অ্যাপ ডাউনলোড করুন' : 'Try This Feature'}</Button>
                <Button to="/app" variant="secondary" className="inline-flex" icon={<IconArrowRight />}>{isBangla ? 'অ্যাপের স্ক্রিন দেখুন' : 'See the App Screens'}</Button>
              </div> */}
            </motion.div>
          </AnimatePresence>
          <div className="relative flex min-h-[370px] min-w-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--feature-border)] bg-[var(--feature-soft)] px-4 py-5 sm:min-h-[440px]">
            <span aria-hidden="true" className="pointer-events-none absolute h-[250px] w-[250px] rounded-full border border-white/80 bg-white/30 sm:h-[330px] sm:w-[330px]" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.num} initial={reduced ? false : { opacity: 0, x: 16, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: reduced ? 0 : -16 }} transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }} className="relative flex w-full items-center justify-center">
                {active.art ? (
                  <img src={active.art.src} alt={active.art.alt} width={active.art.w} height={active.art.h} draggable={false} className="h-auto w-full max-w-[320px] object-contain" />
                ) : (
                  <div className="relative">
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-2 inset-x-4 h-4 rounded-full bg-[#003366]/15 blur-md" />
                    <div className="h-[340px] w-[170px] sm:h-[400px] sm:w-[200px] lg:h-[440px] lg:w-[220px]"><PhoneMockup screen={active.screen} /></div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
