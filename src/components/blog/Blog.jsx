import { useState } from 'react'
import { IconArrowRight } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

// Sample posts: swap for real content or load them from your CMS.
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
    cover: { src: '/app/low-bandwidth.jpg', kind: 'phone', alt: 'Low bandwidth screen in AgniTalk' },
    date: '2026-11-04',
    readMin: 4,
    en: {
      title: 'How to Save Up to 70% Data on Every Call',
      excerpt: 'A simple guide to getting clear HD calls on slow 2G/3G networks using AgniTalk’s Byte Saver™ technology.',
    },
    bn: {
      title: 'প্রতিটি কলে ৭০% পর্যন্ত ডাটা সাশ্রয় করার উপায়',
      excerpt: 'Byte Saver™ প্রযুক্তি ব্যবহার করে ধীর নেটওয়ার্কেও পরিষ্কার এইচডি কল করার সহজ গাইড।',
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
      excerpt: 'Step-by-step: add balance to your AgniTalk account and start calling any number in Bangladesh instantly.',
    },
    bn: {
      title: 'এক মিনিটেরও কমে বিকাশ বা নগদে রিচার্জ করুন',
      excerpt: 'ধাপে ধাপে দেখুন কীভাবে ব্যালেন্স যোগ করে বাংলাদেশের যেকোনো নম্বরে কল শুরু করবেন।',
    },
  },
  {
    id: 'nid-verification',
    category: 'safety',
    cover: { src: '/images/app/registration.webp', kind: 'phone', alt: 'AgniTalk registration screen' },
    date: '2026-10-20',
    readMin: 5,
    en: {
      title: 'Why NID Verification Keeps Your 09606 Number Safe',
      excerpt: 'What the BTRC verification step involves, what data is checked, and how your information is protected.',
    },
    bn: {
      title: 'NID যাচাই কেন আপনার ০৯৬০৬ নম্বরকে নিরাপদ রাখে',
      excerpt: 'BTRC যাচাই ধাপে কী হয়, কোন তথ্য যাচাই করা হয় এবং আপনার তথ্য কীভাবে সুরক্ষিত থাকে।',
    },
  },
  {
    id: 'group-video',
    category: 'news',
    cover: { src: '/images/app/video-call.webp', kind: 'phone', alt: 'Group video call in AgniTalk' },
    date: '2026-10-12',
    readMin: 3,
    en: {
      title: 'Group Video Calls: Now Up to 6 Participants',
      excerpt: 'Meet family and teams in HD from anywhere. Here’s how to start and manage a group video call.',
    },
    bn: {
      title: 'গ্রুপ ভিডিও কল: এখন ৬ জন পর্যন্ত',
      excerpt: 'যেকোনো জায়গা থেকে পরিবার ও টিমের সাথে এইচডিতে কথা বলুন। গ্রুপ ভিডিও কল শুরু করার নিয়ম দেখুন।',
    },
  },
  {
    id: 'international-rates',
    category: 'tips',
    cover: { src: '/app/low-rates.jpg', kind: 'phone', alt: 'International SMS and VoIP rates screen' },
    date: '2026-10-05',
    readMin: 4,
    en: {
      title: 'Calling Family Abroad: Cheapest Routes Explained',
      excerpt: 'A quick look at international calling to the Middle East, UK, USA and Malaysia, and how to check live rates.',
    },
    bn: {
      title: 'প্রবাসে পরিবারকে কল: সবচেয়ে সাশ্রয়ী রুট',
      excerpt: 'মধ্যপ্রাচ্য, যুক্তরাজ্য, যুক্তরাষ্ট্র ও মালয়েশিয়ায় কলের রেট এবং লাইভ রেট দেখার নিয়ম।',
    },
  },
  {
    id: 'privacy',
    category: 'safety',
    cover: { src: '/app/privacy.jpg', kind: 'phone', alt: 'Safety and privacy screen in AgniTalk' },
    date: '2026-09-29',
    readMin: 3,
    en: {
      title: 'Staying Private: How TLS Encryption Protects Your Calls',
      excerpt: 'A plain-language explanation of how your calls and messages are protected from end to end.',
    },
    bn: {
      title: 'গোপনীয়তা: TLS এনক্রিপশন কীভাবে আপনার কল সুরক্ষিত রাখে',
      excerpt: 'সহজ ভাষায় জানুন কীভাবে আপনার কল ও বার্তা শুরু থেকে শেষ পর্যন্ত সুরক্ষিত থাকে।',
    },
  },
]

// Tinted block with a product screen peeking in from the bottom edge (or a flat icon).
function Cover({ cover, tall }) {
  const isIcon = cover.kind === 'icon'
  return (
    <div
      className={`flex justify-center overflow-hidden ${isIcon ? 'items-center' : 'items-start pt-6'} ${tall ? 'min-h-[260px] lg:min-h-full' : 'h-44'}`}
      style={{ background: '#E4ECF4' }}
    >
      <img
        src={cover.src}
        alt={cover.alt}
        loading="lazy"
        draggable={false}
        className={isIcon ? 'h-24 w-auto' : `w-36 rounded-t-[18px] ${tall ? 'lg:w-44' : ''}`}
        style={isIcon ? undefined : { boxShadow: '0 0 0 1px rgba(0,51,102,0.12)' }}
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
    <div className={`flex items-center gap-2 text-xs text-gray-400 ${bn(lang)}`}>
      <span>{formatDate(post.date, lang)}</span>
      <span>·</span>
      <span>
        {post.readMin} {lang === 'bn' ? 'মিনিট পড়া' : 'min read'}
      </span>
    </div>
  )
}

export default function Blog({ lang }) {
  const [category, setCategory] = useState('all')
  const visible = POSTS.filter((p) => category === 'all' || p.category === category)
  const [featured, ...rest] = visible
  const label = (id) => {
    const c = CATEGORIES.find((x) => x.id === id)
    return lang === 'bn' ? c.bn : c.en
  }

  return (
    <section id="blog" style={{ background: '#F8F9FA', padding: '80px 0' }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div
            className={`inline-flex rounded-full px-4 py-2 mb-4 text-xs font-bold tracking-wider ${bn(lang)}`}
            style={{ background: '#E3F2FD', color: '#0052CC' }}
          >
            {lang === 'bn' ? 'ব্লগ' : 'THE AGNITALK BLOG'}
          </div>
          <h2
            className={`font-bold mb-3 ${bn(lang)}`}
            style={{ ...display(lang), fontSize: 'clamp(24px, 4vw, 36px)', color: '#003366' }}
          >
            {lang === 'bn' ? 'টিপস, গাইড ও সর্বশেষ খবর' : 'Tips, Guides & Latest News'}
          </h2>
          <p className={`text-gray-500 max-w-xl mx-auto ${bn(lang)}`}>
            {lang === 'bn'
              ? 'কম খরচে কল করা, নিরাপদ থাকা এবং AgniTalk-এর নতুন ফিচার সম্পর্কে জানুন।'
              : 'Learn how to call for less, stay secure, and get the most out of AgniTalk.'}
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${bn(lang)}`}
              style={{
                ...display(lang),
                background: category === c.id ? '#003366' : 'white',
                color: category === c.id ? 'white' : '#4a5568',
                border: category === c.id ? '1px solid #003366' : '1px solid #E2E8F0',
              }}
            >
              {lang === 'bn' ? c.bn : c.en}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <a
            href={`#blog-${featured.id}`}
            className="card block overflow-hidden mb-8 lg:grid lg:grid-cols-2"
            style={{ textDecoration: 'none' }}
          >
            <Cover cover={featured.cover} tall />
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <span
                className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold mb-4 ${bn(lang)}`}
                style={{ background: 'rgba(0,82,204,0.08)', color: '#0052CC' }}
              >
                {label(featured.category)}
              </span>
              <h3
                className={`font-bold mb-3 ${bn(lang)}`}
                style={{ ...display(lang), fontSize: 'clamp(20px, 3vw, 28px)', color: '#003366' }}
              >
                {lang === 'bn' ? featured.bn.title : featured.en.title}
              </h3>
              <p className={`text-gray-600 leading-relaxed mb-5 ${bn(lang)}`}>
                {lang === 'bn' ? featured.bn.excerpt : featured.en.excerpt}
              </p>
              <div className="flex items-center justify-between gap-4">
                <PostMeta post={featured} lang={lang} />
                <span className={`inline-flex items-center gap-1 text-sm font-semibold ${bn(lang)}`} style={{ color: '#0052CC' }}>
                  {lang === 'bn' ? 'পড়ুন' : 'Read more'}
                  <IconArrowRight />
                </span>
              </div>
            </div>
          </a>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p) => (
            <a key={p.id} href={`#blog-${p.id}`} className="card block overflow-hidden" style={{ textDecoration: 'none' }}>
              <Cover cover={p.cover} />
              <div className="p-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold mb-3 ${bn(lang)}`}
                  style={{ background: 'rgba(0,82,204,0.08)', color: '#0052CC' }}
                >
                  {label(p.category)}
                </span>
                <h3 className={`font-bold text-lg mb-2 ${bn(lang)}`} style={{ ...display(lang), color: '#1a202c' }}>
                  {lang === 'bn' ? p.bn.title : p.en.title}
                </h3>
                <p className={`text-sm leading-relaxed text-gray-500 mb-4 ${bn(lang)}`}>
                  {lang === 'bn' ? p.bn.excerpt : p.en.excerpt}
                </p>
                <PostMeta post={p} lang={lang} />
              </div>
            </a>
          ))}
        </div>

        {visible.length === 0 && (
          <div className={`text-center text-gray-400 py-12 ${bn(lang)}`}>
            {lang === 'bn' ? 'কোনো পোস্ট পাওয়া যায়নি' : 'No posts in this category yet'}
          </div>
        )}
      </div>
    </section>
  )
}
