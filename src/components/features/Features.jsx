import Button from '../shared/Button'
import { useState } from 'react'
import PhoneMockup from '../shared/PhoneMockup'
import { IconArrowRight, IconCheck, IconMessage, IconMic, IconTransfer, IconVideo } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const FEATURES = [
  {
    icon: <IconVideo />,
    en: { tab: 'HD Calls', title: 'Crystal-Clear HD Audio & Video Calls', desc: "Experience 1-on-1 and group video calls with up to 6 participants globally. Agni's dedicated IPTSP infrastructure ensures HD clarity even during peak hours, with zero call drops on stable connections." },
    bn: { tab: 'এইচডি কল', title: 'এইচডি ভয়েস ও ভিডিও কল', desc: 'বিশ্বের যেকোনো প্রান্তে ৬ জন পর্যন্ত গ্রুপ ভিডিও কল করুন। অগ্নির ডেডিকেটেড নেটওয়ার্কে সর্বোচ্চ মানের কল উপভোগ করুন।' },
    screen: 'video-call',
    bullets: {
      en: ['Up to 6-person HD video conferencing', 'Audio conferencing for up to 4 participants', 'End-to-end TLS encryption on all calls', 'Seamless switching between 4G/WiFi'],
      bn: ['৬ জন পর্যন্ত ভিডিও কনফারেন্স', '৪ জন পর্যন্ত অডিও কনফারেন্স', 'সম্পূর্ণ TLS এনক্রিপশন', '4G/WiFi স্বয়ংক্রিয় সুইচিং'],
    },
  },
  {
    icon: <IconMic />,
    en: { tab: 'Call Management', title: 'Smart Call Recording & Forwarding', desc: 'Never miss a critical conversation. Record important calls, forward incoming calls to your GSM number or voicemail when offline, and manage everything from one intuitive dashboard.' },
    bn: { tab: 'কল ম্যানেজমেন্ট', title: 'স্মার্ট কল রেকর্ডিং ও ফরওয়ার্ডিং', desc: 'গুরুত্বপূর্ণ কল রেকর্ড করুন এবং অফলাইনে থাকলে কল ফরওয়ার্ড করুন।' },
    screen: 'call',
    bullets: {
      en: ['One-tap in-call recording', 'Forward calls to any GSM number', 'Voicemail with instant playback', 'Custom do-not-disturb schedules'],
      bn: ['এক ট্যাপেই কল রেকর্ডিং', 'যেকোনো GSM নম্বরে কল ফরওয়ার্ড', 'ভয়েসমেইল প্লেব্যাক', 'কাস্টম DND সময়সূচি'],
    },
  },
  {
    icon: <IconMessage />,
    en: { tab: 'Messaging', title: 'Rich Instant Messaging & Group Chat', desc: 'Stay connected with group chats supporting up to 50 members. Share your live location, voice notes, documents, stickers, and media with end-to-end encryption on every message.' },
    bn: { tab: 'মেসেজিং', title: 'গ্রুপ চ্যাট ও তাৎক্ষণিক বার্তা', desc: '৫০ জন পর্যন্ত গ্রুপ চ্যাটে থাকুন সংযুক্ত। লোকেশন, ভয়েস নোট, ডকুমেন্ট শেয়ার করুন।' },
    screen: 'chat',
    bullets: {
      en: ['Group chats up to 50 members', 'Live location sharing', 'Voice notes, stickers & documents', 'Read receipts & typing indicators'],
      bn: ['৫০ জন পর্যন্ত গ্রুপ চ্যাট', 'লাইভ লোকেশন শেয়ারিং', 'ভয়েস নোট, স্টিকার ও ডকুমেন্ট', 'রিড রিসিট ও টাইপিং ইন্ডিকেটর'],
    },
  },
  {
    icon: <IconTransfer />,
    en: { tab: 'Balance & Referral', title: 'Balance Transfer & Referral Rewards', desc: "Transfer credit to friends and family instantly. Earn bonus taka through AgniTalk's multi-level referral program — the more friends you invite, the more you earn." },
    bn: { tab: 'ব্যালেন্স ও রেফারেল', title: 'ব্যালেন্স ট্রান্সফার ও রেফারেল বোনাস', desc: 'বন্ধুদের কাছে ব্যালেন্স পাঠান এবং রেফারেল প্রোগ্রামে বোনাস উপার্জন করুন।' },
    art: { src: '/images/refer-a-friend.webp', alt: 'Illustration: refer a friend and earn credit', w: 455, h: 465 },
    bullets: {
      en: ['Instant peer-to-peer balance transfer', 'Multi-level referral bonus program', 'Earn credit for every referral', 'Real-time balance tracking dashboard'],
      bn: ['তাৎক্ষণিক ব্যালেন্স ট্রান্সফার', 'মাল্টি-লেভেল রেফারেল বোনাস', 'প্রতিটি রেফারেলে ক্রেডিট আয়', 'রিয়েল-টাইম ব্যালেন্স ট্র্যাকিং'],
    },
  },
]

export default function Features({ lang }) {
  const [activeTab, setActiveTab] = useState(0)
  const active = FEATURES[activeTab]
  const t = lang === 'bn' ? active.bn : active.en

  return (
    <section id="features" style={{ background: 'white', padding: '80px 0' }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`font-bold mb-3 ${bn(lang)}`} style={{ ...display(lang), fontSize: 'clamp(24px, 4vw, 36px)', color: '#003366' }}>
            {lang === 'bn' ? 'সম্পূর্ণ যোগাযোগ সমাধান' : 'Everything You Need to Communicate'}
          </h2>
          <p className={`text-gray-500 ${bn(lang)}`}>
            {lang === 'bn'
              ? 'একটি অ্যাপেই পান সবকিছু — কল, মেসেজ, রিচার্জ এবং আরো অনেক কিছু।'
              : 'One app for HD calls, smart messaging, balance management, and more.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FEATURES.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${bn(lang)}`}
              style={{
                ...display(lang),
                background: activeTab === i ? '#003366' : '#F8F9FA',
                color: activeTab === i ? 'white' : '#4a5568',
                border: activeTab === i ? 'none' : '1px solid #E2E8F0',
              }}
            >
              <span style={{ color: activeTab === i ? 'white' : '#0052CC' }}>{f.icon}</span>
              {lang === 'bn' ? f.bn.tab : f.en.tab}
            </button>
          ))}
        </div>

        {/* Feature content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className={`font-bold mb-4 ${bn(lang)}`} style={{ ...display(lang), fontSize: 'clamp(22px, 3vw, 30px)', color: '#003366' }}>
              {t.title}
            </h3>
            <p className={`text-gray-600 mb-6 leading-relaxed ${bn(lang)}`}>{t.desc}</p>
            <ul className="flex flex-col gap-3 mb-8">
              {(lang === 'bn' ? active.bullets.bn : active.bullets.en).map((b, i) => (
                <li key={i} className={`flex items-center gap-3 ${bn(lang)}`}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(40,167,69,0.1)', color: '#28A745' }}>
                    <IconCheck />
                  </div>
                  <span className="text-gray-700 text-sm">{b}</span>
                </li>
              ))}
            </ul>
            <Button to="/download" className="inline-flex" icon={<IconArrowRight />}>
              {lang === 'bn' ? 'অ্যাপ ডাউনলোড করুন' : 'Try This Feature'}
            </Button>
          </div>
          <div className="flex justify-center">
            {active.art ? (
              <img
                key={active.art.src}
                src={active.art.src}
                alt={active.art.alt}
                width={active.art.w}
                height={active.art.h}
                draggable={false}
                className="h-auto w-full max-w-[360px] lg:my-6"
              />
            ) : (
              <div style={{ width: '260px', height: '520px', transform: 'rotate(2deg)' }}>
                <PhoneMockup screen={active.screen} />
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-10">
          <Button to="/app" variant="secondary" className="inline-flex" icon={<IconArrowRight />}>
            {lang === 'bn' ? 'অ্যাপের স্ক্রিন দেখুন' : 'See the App Screens'}
          </Button>
        </div>
      </div>
    </section>
  )
}
