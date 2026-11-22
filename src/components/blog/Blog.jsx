import { useEffect, useState } from 'react'
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiX,
} from 'react-icons/fi'
import { IconArrowRight } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const CATEGORIES = [
  { id: 'all', en: 'All', bn: 'সব' },
  { id: 'tips', en: 'Tips & Guides', bn: 'টিপস ও গাইড' },
  { id: 'news', en: 'Product News', bn: 'পণ্য সংবাদ' },
  { id: 'safety', en: 'Security', bn: 'নিরাপত্তা' },
]

const POSTS = [
  {
    id: 'byte-saver',
    category: 'tips',
    cover: {
      src: '/app/low-bandwidth.jpg',
      kind: 'phone',
      alt: 'Low bandwidth screen in AgniTalk',
    },
    date: '2026-11-04',
    readMin: 4,
    en: {
      title: 'How to Save Up to 70% Data on Every Call',
      excerpt:
        'A simple guide to getting clear HD calls on slow 2G/3G networks using AgniTalk’s Byte Saver™ technology.',
      body: [
        'Mobile data can run out quickly when making frequent voice calls over cellular networks. AgniTalk’s built-in Byte Saver™ engine solves this by dynamically compressing voice packets and filtering out silent pauses during conversations.',
        'Unlike standard VoIP apps that require high constant bandwidth, Byte Saver™ adapts in real time to 2G, 3G, 4G, and congested Wi-Fi connections—reducing data usage by up to 70% while keeping voices natural and clear.',
        'Byte Saver™ is enabled automatically on every AgniTalk call, so you do not need to adjust any complicated settings before dialing.',
      ],
    },
    bn: {
      title: 'প্রতিটি কলে ৭০% পর্যন্ত ডাটা সাশ্রয় করার উপায়',
      excerpt:
        'Byte Saver™ প্রযুক্তি ব্যবহার করে ধীর নেটওয়ার্কেও পরিষ্কার এইচডি কল করার সহজ গাইড।',
      body: [
        'মোবাইল ডাটা ব্যবহার করে নিয়মিত ভয়েস কল করলে দ্রুত ইন্টারনেট শেষ হয়ে যেতে পারে। AgniTalk-এর বিল্ট-ইন Byte Saver™ প্রযুক্তি কথোপকথনের নীরব অংশ বাদ দিয়ে এবং ভয়েস প্যাকেট অপ্টিমাইজ করে এই সমস্যার সমাধান করে।',
        'সাধারণ VoIP অ্যাপের তুলনায় এটি 2G, 3G, 4G কিংবা দুর্বল Wi-Fi নেটওয়ার্কেও স্বয়ংক্রিয়ভাবে মানিয়ে নিয়ে ৭০% পর্যন্ত কম ডাটা খরচ করে এবং ভয়েস পরিষ্কার রাখে।',
        'প্রতিটি AgniTalk কলে Byte Saver™ স্বয়ংক্রিয়ভাবে চালু থাকে, তাই আলাদা কোনো সেটিংস পরিবর্তনের প্রয়োজন নেই।',
      ],
    },
  },
  {
    id: 'bkash-topup',
    category: 'tips',
    cover: { src: '/images/wallet.webp', kind: 'icon', alt: 'Wallet' },
    date: '2026-10-28',
    readMin: 3,
    en: {
      title: 'Top Up with bKash or Nagad in Under a Minute',
      excerpt:
        'Step-by-step: add balance to your AgniTalk account and start calling any number in Bangladesh instantly.',
      body: [
        'Recharging your AgniTalk wallet takes less than 60 seconds directly inside the mobile app—no scratch cards or store visits needed.',
        'Open AgniTalk, tap the "Top Up" button on your home screen, choose bKash, Nagad, or Card (SSLCommerz), enter your desired amount, and confirm with your PIN and OTP.',
        'Your balance is credited immediately and never expires as long as your 09606 account remains active.',
      ],
    },
    bn: {
      title: 'এক মিনিটেরও কমে বিকাশ বা নগদে রিচার্জ করুন',
      excerpt:
        'ধাপে ধাপে দেখুন কীভাবে ব্যালেন্স যোগ করে বাংলাদেশের যেকোনো নম্বরে কল শুরু করবেন।',
      body: [
        'অ্যাপের ভেতর থেকেই মাত্র ৬০ সেকেন্ডের কম সময়ে আপনার AgniTalk অ্যাকাউন্ট রিচার্জ করতে পারবেন—কোনো দোকানে যাওয়ার প্রয়োজন নেই।',
        'AgniTalk অ্যাপ খুলে হোম স্ক্রিনের "টপ আপ" বাটনে ট্যাপ করুন, বিকাশ, নগদ অথবা কার্ড (SSLCommerz) নির্বাচন করুন, টাকার পরিমাণ লিখুন এবং পিন ও ওটিপি দিয়ে নিশ্চিত করুন।',
        'সাথে সাথেই আপনার অ্যাকাউন্টে ব্যালেন্স যোগ হয়ে যাবে এবং আপনি দেশের যেকোনো মোবাইল বা ল্যান্ডলাইনে কল করতে পারবেন।',
      ],
    },
  },
  {
    id: 'nid-verification',
    category: 'safety',
    cover: {
      src: '/images/app/registration.webp',
      kind: 'phone',
      alt: 'AgniTalk registration screen',
    },
    date: '2026-10-20',
    readMin: 5,
    en: {
      title: 'Why NID Verification Keeps Your 09606 Number Safe',
      excerpt:
        'What the BTRC verification step involves, what data is checked, and how your information is protected.',
      body: [
        'Every AgniTalk user receives a dedicated 09606 virtual IPTSP number that can receive calls from any mobile or landline operator in Bangladesh.',
        'Under Bangladesh Telecommunication Regulatory Commission (BTRC) rules, identity verification via National ID (NID) is required to prevent spam, spoofing, and unauthorized number misuse.',
        'Your NID details are verified securely through the Election Commission’s Porichoy API over an encrypted connection and are never stored as raw files on your device.',
      ],
    },
    bn: {
      title: 'NID যাচাই কেন আপনার ০৯৬০৬ নম্বরকে নিরাপদ রাখে',
      excerpt:
        'BTRC যাচাই ধাপে কী হয়, কোন তথ্য যাচাই করা হয় এবং আপনার তথ্য কীভাবে সুরক্ষিত থাকে।',
      body: [
        'প্রতিটি AgniTalk ব্যবহারকারী একটি নিজস্ব ০৯৬০৬ ভার্চুয়াল IPTSP নম্বর পান, যাতে দেশের যেকোনো মোবাইল বা ল্যান্ডলাইন থেকে কল রিসিভ করা যায়।',
        'বাংলাদেশ টেলিযোগাযোগ নিয়ন্ত্রণ কমিশন (BTRC)-এর বিধিমালা অনুযায়ী স্প্যাম ও অপব্যবহার রোধে জাতীয় পরিচয়পত্র (NID) যাচাই বাধ্যতামূলক।',
        'আপনার NID তথ্য এনক্রিপ্টেড সংযোগের মাধ্যমে নির্বাচন কমিশনের Porichoy API দ্বারা যাচাই করা হয় এবং সম্পূর্ণ নিরাপদ থাকে।',
      ],
    },
  },
  {
    id: 'group-video',
    category: 'news',
    cover: {
      src: '/images/app/video-call.webp',
      kind: 'phone',
      alt: 'Group video call in AgniTalk',
    },
    date: '2026-10-12',
    readMin: 3,
    en: {
      title: 'Group Video Calls: Now Up to 6 Participants',
      excerpt:
        'Meet family and teams in HD from anywhere. Here’s how to start and manage a group video call.',
      body: [
        'Connecting with family across cities or catching up with teammates is now easier with multi-party HD video calling in AgniTalk.',
        'Start a one-on-one video call with any AgniTalk contact and tap the "Add Participant" icon to bring up to 6 people into the same room—completely free of per-minute call charges.',
        'Dynamic video bitrate adjustment ensures smooth video playback even when one participant is on mobile data.',
      ],
    },
    bn: {
      title: 'গ্রুপ ভিডিও কল: এখন ৬ জন পর্যন্ত',
      excerpt:
        'যেকোনো জায়গা থেকে পরিবার ও টিমের সাথে এইচডিতে কথা বলুন। গ্রুপ ভিডিও কল শুরু করার নিয়ম দেখুন।',
      body: [
        'দূরে থাকা পরিবার কিংবা অফিস টিমের সাথে একসাথে কথা বলা এখন আরও সহজ AgniTalk-এর গ্রুপ ভিডিও কল ফিচারের মাধ্যমে।',
        'যেকোনো AgniTalk কন্টাক্টের সাথে ভিডিও কল শুরু করে "Add Participant" আইকনে ট্যাপ করে একসাথে ৬ জন পর্যন্ত যুক্ত করতে পারবেন—কোনো মিনিট চার্জ ছাড়াই।',
        'মোবাইল ডাটাতেও যেন ভিডিও আটকে না যায় সেজন্য অ্যাপটি স্বয়ংক্রিয়ভাবে ভিডিও কোয়ালিটি অপ্টিমাইজ করে।',
      ],
    },
  },
  {
    id: 'international-rates',
    category: 'tips',
    cover: {
      src: '/app/low-rates.jpg',
      kind: 'phone',
      alt: 'International SMS and VoIP rates screen',
    },
    date: '2026-10-05',
    readMin: 4,
    en: {
      title: 'Calling Family Abroad: Cheapest Routes Explained',
      excerpt:
        'A quick look at international calling to the Middle East, UK, USA and Malaysia, and how to check live rates.',
      body: [
        'Calling international mobile and landline numbers through standard operator roaming or ISD tariffs can quickly drain your balance.',
        'With AgniTalk, you can call popular destinations—including Saudi Arabia (৳0.80/min), UAE (৳0.90/min), Malaysia (৳0.70/min), USA & Canada (৳1.10/min), and the UK (৳1.20/min)—with transparent 1-second pulse billing.',
        'Visit the Rates page anytime to search by country name or dialing prefix before placing your call.',
      ],
    },
    bn: {
      title: 'প্রবাসে পরিবারকে কল: সবচেয়ে সাশ্রয়ী রুট',
      excerpt:
        'মধ্যপ্রাচ্য, যুক্তরাজ্য, যুক্তরাষ্ট্র ও মালয়েশিয়ায় কলের রেট এবং লাইভ রেট দেখার নিয়ম।',
      body: [
        'সাধারণ মোবাইল অপারেটরের আন্তর্জাতিক কল রেটে বিদেশে কথা বললে দ্রুত ব্যালেন্স শেষ হয়ে যায়।',
        'AgniTalk-এর মাধ্যমে সৌদি আরব (৳০.৮০/মিনিট), সংযুক্ত আরব আমিরাত (৳০.৯০/মিনিট), মালয়েশিয়া (৳০.৭০/মিনিট), যুক্তরাষ্ট্র ও কানাডা (৳১.১০/মিনিট) এবং যুক্তরাজ্যে (৳১.২০/মিনিট) ১-সেকেন্ড পালসে কথা বলতে পারবেন।',
        'কল করার আগে আমাদের Rates পেজ থেকে যেকোনো দেশের নাম বা কোড লিখে লাইভ কল রেট দেখে নিতে পারেন।',
      ],
    },
  },
  {
    id: 'privacy',
    category: 'safety',
    cover: {
      src: '/app/privacy.jpg',
      kind: 'phone',
      alt: 'Safety and privacy screen in AgniTalk',
    },
    date: '2026-09-29',
    readMin: 3,
    en: {
      title: 'Staying Private: How TLS Encryption Protects Your Calls',
      excerpt:
        'A plain-language explanation of how your calls and messages are protected from end to end.',
      body: [
        'Whether you are on public Wi-Fi at a café or using mobile data on the go, your conversations deserve strong protection.',
        'AgniTalk secures call signaling and instant messages using Transport Layer Security (TLS) encryption, preventing eavesdropping or tampering while data travels across networks.',
        'Combined with BTRC-compliant infrastructure operated by Agni Systems Limited, your personal communication stays private and reliable.',
      ],
    },
    bn: {
      title: 'গোপনীয়তা: TLS এনক্রিপশন কীভাবে আপনার কল সুরক্ষিত রাখে',
      excerpt:
        'সহজ ভাষায় জানুন কীভাবে আপনার কল ও বার্তা শুরু থেকে শেষ পর্যন্ত সুরক্ষিত থাকে।',
      body: [
        'পাবলিক Wi-Fi কিংবা মোবাইল ডাটা—যে নেটওয়ার্কই ব্যবহার করুন না কেন, আপনার ব্যক্তিগত কথোপকথনের নিরাপত্তা সবচেয়ে গুরুত্বপূর্ণ।',
        'AgniTalk কল সিগন্যালিং এবং ইনস্ট্যান্ট মেসেজ সুরক্ষিত রাখতে TLS (Transport Layer Security) এনক্রিপশন ব্যবহার করে, যা অননুমোদিত প্রবেশ রোধ করে।',
        'অগ্নি সিস্টেমস লিমিটেডের বিটিআরসি অনুমোদিত নেটওয়ার্ক অবকাঠামোয় আপনার যোগাযোগ থাকে নিরাপদ ও নির্ভরযোগ্য।',
      ],
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
  wrapper.style.setProperty('--lift', '-4px')
}

function resetTilt(event) {
  const wrapper = event.currentTarget
  wrapper.style.setProperty('--tilt-x', '0deg')
  wrapper.style.setProperty('--tilt-y', '0deg')
  wrapper.style.setProperty('--lift', '0px')
}

function Cover({ cover, tall }) {
  const isIcon = cover.kind === 'icon'
  return (
    <div
      className={`flex justify-center overflow-hidden bg-[#F0F5FB] ${
        isIcon ? 'items-center' : 'items-start pt-5'
      } ${tall ? 'min-h-[240px] lg:min-h-full' : 'h-44'}`}
    >
      <img
        src={cover.src}
        alt={cover.alt}
        loading="lazy"
        draggable={false}
        className={
          isIcon
            ? 'h-24 w-auto'
            : `w-36 rounded-t-[18px] shadow-[0_8px_24px_rgba(0,51,102,0.12)] ${
                tall ? 'lg:w-44' : ''
              }`
        }
      />
    </div>
  )
}

function formatDate(iso, lang) {
  return new Date(iso).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function PostMeta({ post, lang }) {
  return (
    <div
      className={`flex items-center gap-2 font-agni-body text-xs text-slate-400 ${bn(lang)}`}
    >
      <span>{formatDate(post.date, lang)}</span>
      <span>·</span>
      <span>
        {post.readMin} {lang === 'bn' ? 'মিনিট পড়া' : 'min read'}
      </span>
    </div>
  )
}

export default function Blog({ lang = 'en' }) {
  const [category, setCategory] = useState('all')
  const [activePostId, setActivePostId] = useState(null)

  const isBangla = lang === 'bn'
  const visible = POSTS.filter(
    (p) => category === 'all' || p.category === category,
  )
  const [featured, ...rest] = visible

  const activeIndex = POSTS.findIndex((p) => p.id === activePostId)
  const activePost = activeIndex >= 0 ? POSTS[activeIndex] : null

  useEffect(() => {
    if (!activePost) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActivePostId(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activePost])

  const label = (id) => {
    const c = CATEGORIES.find((x) => x.id === id)
    return isBangla ? c.bn : c.en
  }

  const goPrevPost = () => {
    if (activeIndex < 0) return
    const prevIdx = (activeIndex - 1 + POSTS.length) % POSTS.length
    setActivePostId(POSTS[prevIdx].id)
  }

  const goNextPost = () => {
    if (activeIndex < 0) return
    const nextIdx = (activeIndex + 1) % POSTS.length
    setActivePostId(POSTS[nextIdx].id)
  }

  return (
    <section
      id="blog"
      lang={lang}
      className="
        agnitalk-ui relative overflow-hidden
        border-b border-slate-200/70
        bg-[#F8FAFF]
        bg-[radial-gradient(#CBD5E1_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
        py-12 sm:py-16
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(248,250,255,0.65)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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
            {isBangla ? 'ব্লগ' : 'THE AGNITALK BLOG'}
          </div>

          <h2
            className={`mb-2.5 text-[clamp(24px,4vw,36px)] font-bold [font-synthesis:weight] leading-tight text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'টিপস, গাইড ও সর্বশেষ খবর'
              : 'Tips, Guides & Latest News'}
          </h2>

          <p
            className={`mx-auto max-w-xl text-sm sm:text-base text-slate-600 ${bn(lang)}`}
          >
            {isBangla
              ? 'কম খরচে কল করা, নিরাপদ থাকা এবং AgniTalk-এর নতুন ফিচার সম্পর্কে জানুন।'
              : 'Learn how to call for less, stay secure, and get the most out of AgniTalk.'}
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const active = category === c.id
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c.id)}
                className={`
                  rounded-xl px-4 py-2 text-xs sm:text-sm
                  font-bold [font-synthesis:weight]
                  transition-[background-color,color,border-color,box-shadow]
                  duration-200 cursor-pointer
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#0052CC]
                  ${bn(lang)}
                  ${
                    active
                      ? 'border border-[#003366] bg-[#003366] text-white shadow-xs'
                      : 'border border-slate-200/90 bg-white text-slate-600 hover:border-[#0052CC]/35 hover:bg-[#F4F8FF] hover:text-[#0052CC]'
                  }
                `}
              >
                {isBangla ? c.bn : c.en}
              </button>
            )
          })}
        </div>

        {/* Featured post */}
        {featured && (
          <div
            onPointerMove={handleTilt}
            onPointerLeave={resetTilt}
            onPointerCancel={resetTilt}
            className="mb-7 [perspective:1200px]"
          >
            <button
              type="button"
              onClick={() => setActivePostId(featured.id)}
              className="
                group relative block w-full overflow-hidden
                rounded-[20px] border border-slate-200/90
                bg-white text-left font-agni-body
                shadow-[0_6px_22px_-8px_rgba(0,51,102,0.08)]
                transition-[transform,border-color,box-shadow,background-color]
                duration-200 ease-out cursor-pointer
                hover:border-[#0052CC]/45 hover:bg-[#F4F8FF]/45
                hover:shadow-[0_16px_32px_-12px_rgba(0,82,204,0.16)]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#0052CC]
                motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
                motion-reduce:transition-none
                lg:grid lg:grid-cols-2
              "
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-1 bg-[#FF5722]"
              />

              <Cover cover={featured.cover} tall />

              <div className="flex flex-col justify-center p-5 font-agni-body sm:p-7">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`
                      inline-flex rounded-full bg-[#F4F8FF] px-3 py-1
                      font-agni-body text-xs font-bold [font-synthesis:weight] text-[#0052CC]
                      ${bn(lang)}
                    `}
                  >
                    {label(featured.category)}
                  </span>

                  <span className="rounded-full bg-[#FFF7F4] px-2.5 py-0.5 font-agni-body text-[11px] font-bold [font-synthesis:weight] text-[#FF5722]">
                    {isBangla ? 'ফিচার্ড' : 'Featured'}
                  </span>
                </div>

                <h3
                  className={`mb-2.5 font-agni-body text-[clamp(20px,2.8vw,28px)] font-extrabold [font-synthesis-weight:auto] [-webkit-text-stroke:0.45px_currentColor] tracking-[0.01em] leading-snug text-[#003366] group-hover:text-[#0052CC] transition-colors ${bn(lang)}`}
                >
                  {isBangla ? featured.bn.title : featured.en.title}
                </h3>

                <p
                  className={`mb-5 font-agni-body text-sm sm:text-base leading-relaxed text-slate-600 ${bn(lang)}`}
                >
                  {isBangla ? featured.bn.excerpt : featured.en.excerpt}
                </p>

                <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3.5">
                  <PostMeta post={featured} lang={lang} />

                  <span
                    className={`
                      inline-flex items-center gap-1.5 font-agni-body text-sm
                      font-bold [font-synthesis:weight] text-[#0052CC]
                      ${bn(lang)}
                    `}
                  >
                    {isBangla ? 'পড়ুন' : 'Read article'}
                    <IconArrowRight />
                  </span>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* 3-Column Post Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <div
              key={p.id}
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
              onPointerCancel={resetTilt}
              className="h-full [perspective:1000px]"
            >
              <button
                type="button"
                onClick={() => setActivePostId(p.id)}
                className="
                  group relative flex h-full w-full flex-col overflow-hidden
                  rounded-[20px] border border-slate-200/90
                  bg-white text-left font-agni-body
                  shadow-[0_4px_16px_-4px_rgba(0,51,102,0.06)]
                  transition-[transform,border-color,box-shadow,background-color]
                  duration-200 ease-out cursor-pointer
                  hover:border-[#0052CC]/45 hover:bg-[#F4F8FF]/45
                  hover:shadow-[0_14px_28px_-10px_rgba(0,82,204,0.14)]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#0052CC]
                  motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
                  motion-reduce:transition-none
                "
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-1 bg-[#0052CC]"
                />

                <div className="w-full">
                  <Cover cover={p.cover} />
                </div>

                <div className="flex flex-1 flex-col p-4 font-agni-body sm:p-5">
                  <span
                    className={`
                      mb-2.5 inline-flex self-start rounded-full
                      bg-[#F4F8FF] px-2.5 py-0.5 font-agni-body text-[11px]
                      font-bold [font-synthesis:weight] text-[#0052CC]
                      ${bn(lang)}
                    `}
                  >
                    {label(p.category)}
                  </span>

                  <h3
                    className={`mb-2 font-agni-body text-[17px] sm:text-[18px] font-extrabold [font-synthesis-weight:auto] [-webkit-text-stroke:0.4px_currentColor] tracking-[0.01em] leading-snug text-[#003366] group-hover:text-[#0052CC] transition-colors ${bn(lang)}`}
                  >
                    {isBangla ? p.bn.title : p.en.title}
                  </h3>

                  <p
                    className={`mb-4 font-agni-body text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
                  >
                    {isBangla ? p.bn.excerpt : p.en.excerpt}
                  </p>

                  <div className="mt-auto flex w-full items-center justify-between gap-2 border-t border-slate-100 pt-3">
                    <PostMeta post={p} lang={lang} />

                    <span
                      className={`
                        inline-flex items-center gap-1 font-agni-body text-xs
                        font-bold [font-synthesis:weight] text-[#FF5722]
                        ${bn(lang)}
                      `}
                    >
                      {isBangla ? 'পড়ুন' : 'Read'}
                      <IconArrowRight />
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div
            role="status"
            className={`
              rounded-[20px] border border-slate-200/90 bg-white
              py-10 text-center text-sm text-slate-500
              ${bn(lang)}
            `}
          >
            {isBangla
              ? 'কোনো পোস্ট পাওয়া যায়নি'
              : 'No posts in this category yet'}
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#003366]/55 p-4 backdrop-blur-xs"
          onClick={() => setActivePostId(null)}
        >
          <article
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[24px] border border-slate-200 bg-white shadow-[0_24px_60px_-15px_rgba(0,33,71,0.4)]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-100 bg-white/95 px-5 py-3.5 backdrop-blur-xs sm:px-6">
              <span
                className={`
                  inline-flex rounded-full bg-[#F4F8FF] px-3 py-1
                  text-xs font-bold [font-synthesis:weight] text-[#0052CC]
                  ${bn(lang)}
                `}
              >
                {label(activePost.category)}
              </span>

              <button
                type="button"
                aria-label={isBangla ? 'বন্ধ করুন' : 'Close article'}
                onClick={() => setActivePostId(null)}
                className="
                  inline-flex h-8 w-8 items-center justify-center
                  rounded-full border border-slate-200 bg-slate-50
                  text-slate-600 transition-colors hover:bg-[#003366] hover:text-white
                  cursor-pointer
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]
                "
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            {/* Cover Banner */}
            <Cover cover={activePost.cover} />

            {/* Article Body */}
            <div className="p-5 sm:p-7">
              <div
                className={`mb-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 ${bn(lang)}`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar className="h-3.5 w-3.5 text-[#0052CC]" />
                  {formatDate(activePost.date, lang)}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <FiClock className="h-3.5 w-3.5 text-[#FF5722]" />
                  {activePost.readMin}{' '}
                  {isBangla ? 'মিনিট পড়া' : 'min read'}
                </span>
              </div>

              <h3
                id="blog-modal-title"
                className={`mb-4 text-xl sm:text-2xl font-bold [font-synthesis:weight] leading-snug text-[#003366] ${bn(lang)}`}
                style={display(lang)}
              >
                {isBangla ? activePost.bn.title : activePost.en.title}
              </h3>

              <div className={`space-y-3.5 text-sm sm:text-base leading-relaxed text-slate-700 ${bn(lang)}`}>
                {(isBangla ? activePost.bn.body : activePost.en.body).map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ),
                )}
              </div>

              {/* Previous / Next Post Navigation */}
              <div className="mt-7 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={goPrevPost}
                  className={`
                    inline-flex items-center gap-1.5 rounded-xl border border-slate-200
                    bg-[#F8FAFC] px-3.5 py-2 text-xs font-bold [font-synthesis:weight]
                    text-[#003366] transition-colors hover:border-[#0052CC]/40 hover:bg-[#F4F8FF] hover:text-[#0052CC]
                    cursor-pointer
                    ${bn(lang)}
                  `}
                >
                  <FiArrowLeft className="h-3.5 w-3.5" />
                  {isBangla ? 'পূর্ববর্তী পোস্ট' : 'Previous Post'}
                </button>

                <button
                  type="button"
                  onClick={goNextPost}
                  className={`
                    inline-flex items-center gap-1.5 rounded-xl border border-slate-200
                    bg-[#F8FAFC] px-3.5 py-2 text-xs font-bold [font-synthesis:weight]
                    text-[#003366] transition-colors hover:border-[#0052CC]/40 hover:bg-[#F4F8FF] hover:text-[#0052CC]
                    cursor-pointer
                    ${bn(lang)}
                  `}
                >
                  {isBangla ? 'পরবর্তী পোস্ট' : 'Next Post'}
                  <FiArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  )
}