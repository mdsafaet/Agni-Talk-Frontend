import Button from '../shared/Button'
import { useState } from 'react'
import { IconArrowRight } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const SLIDES = [
  {
    src: '/app/free-calls.jpg',
    en: {
      title: 'Free Calls',
      desc: 'Free video and audio calls and chat between AgniTalk users, end-to-end encrypted.',
    },
    bn: {
      title: 'বিনামূল্যে কল',
      desc: 'AgniTalk ব্যবহারকারীদের মধ্যে বিনামূল্যে ভিডিও ও অডিও কল এবং এন্ড-টু-এন্ড এনক্রিপ্টেড চ্যাট।',
    },
  },
  {
    src: '/images/app/video-call.webp',
    en: {
      title: 'Group Video Calls',
      desc: 'HD video with up to 6 people, with mute, camera switch and hang-up one tap away.',
    },
    bn: {
      title: 'গ্রুপ ভিডিও কল',
      desc: '৬ জন পর্যন্ত এইচডি ভিডিও কল; মিউট, ক্যামেরা পরিবর্তন ও কল শেষ করার বোতাম হাতের কাছেই।',
    },
  },
  {
    src: '/images/app/call.webp',
    en: {
      title: 'In-Call Controls',
      desc: 'Add a person, switch to video, record the call, or change the speaker without leaving the call screen.',
    },
    bn: {
      title: 'কলের মধ্যে কন্ট্রোল',
      desc: 'কল স্ক্রিন থেকেই কাউকে যোগ করুন, ভিডিওতে যান, কল রেকর্ড করুন বা স্পিকার বদলান।',
    },
  },
  {
    src: '/images/app/chat.webp',
    en: {
      title: 'Group Chat',
      desc: 'Photos with captions and messages in one group conversation.',
    },
    bn: {
      title: 'গ্রুপ চ্যাট',
      desc: 'ছবি, ক্যাপশন ও বার্তা এক গ্রুপ কথোপকথনে।',
    },
  },
  {
    src: '/app/low-rates.jpg',
    en: {
      title: 'SMS & VoIP at Low Prices',
      desc: 'International VoIP calls and SMS at very low rates.',
    },
    bn: {
      title: 'কম দামে SMS ও VoIP',
      desc: 'অত্যন্ত কম রেটে আন্তর্জাতিক VoIP কল ও SMS।',
    },
  },
  {
    src: '/app/low-bandwidth.jpg',
    en: {
      title: 'Works on Slow Internet',
      desc: 'Uses far less bandwidth than other apps, so calls stay clear even on 2G.',
    },
    bn: {
      title: 'ধীর ইন্টারনেটেও চলে',
      desc: 'অন্য অ্যাপের চেয়ে অনেক কম ব্যান্ডউইথ লাগে, তাই 2G-তেও কল পরিষ্কার থাকে।',
    },
  },
  {
    src: '/app/agni-number.jpg',
    en: {
      title: 'Agni Number +8809606xxxxxx',
      desc: 'Get an extra number to make and receive calls and messages, and to register on messaging apps.',
    },
    bn: {
      title: 'Agni নম্বর +8809606xxxxxx',
      desc: 'কল ও মেসেজ পাঠানো-পাওয়া এবং মেসেজিং অ্যাপে রেজিস্ট্রেশনের জন্য অতিরিক্ত নম্বর।',
    },
  },
  {
    src: '/app/privacy.jpg',
    en: {
      title: 'Safety & Privacy',
      desc: 'Your personal information is never shared or kept beyond providing your services.',
    },
    bn: {
      title: 'নিরাপত্তা ও গোপনীয়তা',
      desc: 'আপনার ব্যক্তিগত তথ্য কখনো শেয়ার করা হয় না, সেবা প্রদানের বাইরে সংরক্ষণও করা হয় না।',
    },
  },
]

export default function Screenshots({ lang = 'en' }) {
  const [active, setActive] = useState(0)
  const isBangla = lang === 'bn'
  const currentSlide = SLIDES[active] || SLIDES[0]
  const currentTitle = isBangla ? currentSlide.bn.title : currentSlide.en.title

  return (
    <section
      id="app"
      lang={lang}
      aria-labelledby="app-preview-title"
      className="border-b border-slate-200/70 bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
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
            {isBangla ? 'অ্যাপ প্রিভিউ' : 'APP WALKTHROUGH'}
          </div>

          <h2
            id="app-preview-title"
            className={`mb-3 text-[clamp(24px,4vw,36px)] font-bold [font-synthesis:weight] leading-tight text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla ? 'অ্যাপের ভেতরে উঁকি দিন' : 'See AgniTalk in Action'}
          </h2>

          <p className={`text-sm sm:text-base text-slate-600 ${bn(lang)}`}>
            {isBangla
              ? 'ইনস্টলের আগেই দেখুন কতটা সহজ এই অ্যাপ।'
              : 'Explore the actual app interface before you install.'}
          </p>
        </div>

        {/* Main Content: Left Phone Preview + Right Slide Selector */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-12">
          {/* Phone Preview */}
          <div className="flex shrink-0 flex-col items-center lg:sticky lg:top-24">
            <div
              className="relative phone-mockup overflow-hidden shadow-[0_22px_45px_-15px_rgba(0,51,102,0.22)]"
              style={{ width: '250px', aspectRatio: '600 / 1194' }}
            >
              {SLIDES.map((sl, i) => (
                <img
                  key={sl.src}
                  src={sl.src}
                  alt={(isBangla ? sl.bn : sl.en).title}
                  width="600"
                  height="1194"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
            </div>

            {/* Active Screen Indicator Pill */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-[#F8FAFC] px-3.5 py-1.5 text-xs">
              <span className="font-agni-heading font-bold [font-synthesis:weight] text-[#FF5722]">
                {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="text-slate-300">
                •
              </span>
              <span
                className={`font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
              >
                {currentTitle}
              </span>
            </div>
          </div>

          {/* Slide List */}
          <div className="w-full flex-1">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SLIDES.map((s, i) => {
                const t = isBangla ? s.bn : s.en
                const isActive = active === i
                return (
                  <button
                    key={s.src}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(i)}
                    className={`
                      group relative flex items-start gap-3.5 rounded-2xl
                      border p-4 text-left cursor-pointer
                      transition-[background-color,border-color,box-shadow,transform]
                      duration-200
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-[#0052CC]
                      motion-safe:active:scale-[0.99]
                      motion-reduce:transition-none
                      ${
                        isActive
                          ? 'border-[#0052CC] bg-[#F4F8FF] ring-2 ring-[#0052CC]/15 shadow-[0_12px_24px_-10px_rgba(0,82,204,0.18)]'
                          : 'border-slate-200/85 bg-white hover:border-[#0052CC]/40 hover:bg-[#F4F8FF]/55'
                      }
                    `}
                  >
                    <div
                      className={`
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-xl text-xs font-bold [font-synthesis:weight]
                        transition-colors
                        ${
                          isActive
                            ? 'bg-[#003366] text-white shadow-2xs'
                            : 'bg-[#F8FAFC] text-slate-500 border border-slate-200/80 group-hover:border-[#0052CC]/30 group-hover:text-[#0052CC]'
                        }
                      `}
                      style={{ fontFamily: 'var(--agni-display)' }}
                    >
                      {i + 1}
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`
                          text-sm font-bold [font-synthesis:weight] leading-snug
                          transition-colors
                          ${isActive ? 'text-[#0052CC]' : 'text-[#003366]'}
                          ${bn(lang)}
                        `}
                        style={display(lang)}
                      >
                        {t.title}
                      </div>

                      <div
                        className={`mt-1 text-xs leading-relaxed text-slate-500 ${bn(lang)}`}
                      >
                        {t.desc}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
              <p className={`text-xs sm:text-sm text-slate-500 ${bn(lang)}`}>
                {isBangla
                  ? 'Android ও iOS ডিভাইসে বিনামূল্যে ডাউনলোড করুন।'
                  : 'Available free on Android & iOS devices.'}
              </p>

              <Button
                to="/download"
                className="inline-flex"
                icon={<IconArrowRight />}
              >
                {isBangla ? 'এখনই ডাউনলোড করুন' : 'Download Free Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}