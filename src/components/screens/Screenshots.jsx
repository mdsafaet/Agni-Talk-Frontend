import Button from '../shared/Button'
import { useState } from 'react'
import { IconArrowRight } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const SLIDES = [
  { src: '/app/free-calls.jpg', en: { title: 'Free Calls', desc: 'Free video and audio calls and chat between AgniTalk users, end-to-end encrypted.' }, bn: { title: 'বিনামূল্যে কল', desc: 'AgniTalk ব্যবহারকারীদের মধ্যে বিনামূল্যে ভিডিও ও অডিও কল এবং এন্ড-টু-এন্ড এনক্রিপ্টেড চ্যাট।' } },
  { src: '/images/app/video-call.webp', en: { title: 'Group Video Calls', desc: 'HD video with up to 6 people, with mute, camera switch and hang-up one tap away.' }, bn: { title: 'গ্রুপ ভিডিও কল', desc: '৬ জন পর্যন্ত এইচডি ভিডিও কল; মিউট, ক্যামেরা পরিবর্তন ও কল শেষ করার বোতাম হাতের কাছেই।' } },
  { src: '/images/app/call.webp', en: { title: 'In-Call Controls', desc: 'Add a person, switch to video, record the call, or change the speaker without leaving the call screen.' }, bn: { title: 'কলের মধ্যে কন্ট্রোল', desc: 'কল স্ক্রিন থেকেই কাউকে যোগ করুন, ভিডিওতে যান, কল রেকর্ড করুন বা স্পিকার বদলান।' } },
  { src: '/images/app/chat.webp', en: { title: 'Group Chat', desc: 'Photos with captions and messages in one group conversation.' }, bn: { title: 'গ্রুপ চ্যাট', desc: 'ছবি, ক্যাপশন ও বার্তা এক গ্রুপ কথোপকথনে।' } },
  { src: '/app/low-rates.jpg', en: { title: 'SMS & VoIP at Low Prices', desc: 'International VoIP calls and SMS at very low rates.' }, bn: { title: 'কম দামে SMS ও VoIP', desc: 'অত্যন্ত কম রেটে আন্তর্জাতিক VoIP কল ও SMS।' } },
  { src: '/app/low-bandwidth.jpg', en: { title: 'Works on Slow Internet', desc: 'Uses far less bandwidth than other apps, so calls stay clear even on 2G.' }, bn: { title: 'ধীর ইন্টারনেটেও চলে', desc: 'অন্য অ্যাপের চেয়ে অনেক কম ব্যান্ডউইথ লাগে, তাই 2G-তেও কল পরিষ্কার থাকে।' } },
  { src: '/app/agni-number.jpg', en: { title: 'Agni Number +8809606xxxxxx', desc: 'Get an extra number to make and receive calls and messages, and to register on messaging apps.' }, bn: { title: 'Agni নম্বর +8809606xxxxxx', desc: 'কল ও মেসেজ পাঠানো-পাওয়া এবং মেসেজিং অ্যাপে রেজিস্ট্রেশনের জন্য অতিরিক্ত নম্বর।' } },
  { src: '/app/privacy.jpg', en: { title: 'Safety & Privacy', desc: 'Your personal information is never shared or kept beyond providing your services.' }, bn: { title: 'নিরাপত্তা ও গোপনীয়তা', desc: 'আপনার ব্যক্তিগত তথ্য কখনো শেয়ার করা হয় না, সেবা প্রদানের বাইরে সংরক্ষণও করা হয় না।' } },
]

export default function Screenshots({ lang }) {
  const [active, setActive] = useState(0)

  return (
    <section id="app" style={{ background: 'white', padding: '80px 0' }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`font-bold mb-3 ${bn(lang)}`} style={{ ...display(lang), fontSize: 'clamp(24px, 4vw, 36px)', color: '#003366' }}>
            {lang === 'bn' ? 'অ্যাপের ভেতরে উঁকি দিন' : 'See AgniTalk in Action'}
          </h2>
          <p className={`text-gray-500 ${bn(lang)}`}>
            {lang === 'bn' ? 'ইনস্টলের আগেই দেখুন কতটা সহজ এই অ্যাপ।' : 'Explore the actual app interface before you install.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Phone preview */}
          <div className="flex-shrink-0 relative phone-mockup overflow-hidden" style={{ width: '240px', aspectRatio: '600 / 1194' }}>
            {SLIDES.map((sl, i) => (
              <img
                key={sl.src}
                src={sl.src}
                alt={(lang === 'bn' ? sl.bn : sl.en).title}
                width="600"
                height="1194"
                loading={i === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: active === i ? 1 : 0 }}
              />
            ))}
          </div>

          {/* Slide list */}
          <div className="flex-1">
            <div className="flex flex-col gap-3">
              {SLIDES.map((s, i) => {
                const t = lang === 'bn' ? s.bn : s.en
                const isActive = active === i
                return (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="text-left rounded-xl p-4 transition-all"
                    style={{
                      background: isActive ? 'rgba(0,51,102,0.04)' : 'transparent',
                      border: isActive ? '2px solid rgba(0,51,102,0.15)' : '2px solid transparent',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: isActive ? '#003366' : '#F8F9FA', color: isActive ? 'white' : '#718096', fontFamily: 'var(--agni-display)' }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${bn(lang)}`} style={{ ...display(lang), color: isActive ? '#003366' : '#1a202c' }}>
                          {t.title}
                        </div>
                        <div className={`text-xs text-gray-400 mt-0.5 ${bn(lang)}`}>{t.desc}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="mt-6">
              <Button to="/download" className="inline-flex" icon={<IconArrowRight />}>
                {lang === 'bn' ? 'এখনই ডাউনলোড করুন' : 'Download Free Now'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
