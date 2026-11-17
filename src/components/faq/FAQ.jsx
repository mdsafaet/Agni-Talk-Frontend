import { FiPhone } from 'react-icons/fi'
import { useState } from 'react'
import { IconChevronDown } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const FAQS = [
  {
    en: { q: 'How do I get my 09606 virtual number?', a: 'After downloading AgniTalk and completing NID verification via Porichoy API, your 09606 virtual number is assigned automatically. The number is matched to the last 6-7 digits of your registered mobile number, making it easy for contacts to recognize.' },
    bn: { q: 'আমি কীভাবে আমার ০৯৬০৬ ভার্চুয়াল নম্বর পাব?', a: 'AgniTalk ডাউনলোড করে Porichoy API-এর মাধ্যমে NID যাচাই সম্পন্ন করলে স্বয়ংক্রিয়ভাবে আপনার ০৯৬০৬ ভার্চুয়াল নম্বর বরাদ্দ হবে।' },
  },
  {
    en: { q: 'Why is NID submission required?', a: "BTRC (Bangladesh Telecommunication Regulatory Commission) regulations mandate identity verification for all IPTSP virtual number holders. Your NID data is encrypted and verified directly via the Bangladesh Election Commission's Porichoy API — it is never stored on AgniTalk's servers." },
    bn: { q: 'কেন NID জমা দেওয়া প্রয়োজন?', a: 'BTRC-এর বিধিমালা অনুযায়ী সকল IPTSP ভার্চুয়াল নম্বর ধারকদের পরিচয় যাচাই বাধ্যতামূলক। আপনার NID তথ্য Porichoy API-এ সরাসরি যাচাই করা হয়।' },
  },
  {
    en: { q: 'How do I top up my balance using bKash or Nagad?', a: 'Open AgniTalk → Tap "Top Up" → Select bKash or Nagad → Enter your amount → Confirm with your mobile banking PIN. The balance is credited within seconds. You can also use credit/debit cards via SSLCommerz.' },
    bn: { q: 'বিকাশ বা নগদ দিয়ে কীভাবে ব্যালেন্স যোগ করব?', a: 'AgniTalk খুলুন → "টপ আপ" ট্যাপ করুন → বিকাশ বা নগদ বেছে নিন → পরিমাণ লিখুন → মোবাইল ব্যাংকিং PIN দিয়ে নিশ্চিত করুন। সেকেন্ডেই ব্যালেন্স যোগ হবে।' },
  },
  {
    en: { q: 'Why does the app require GPS location permission?', a: 'GPS location permission is required once during initial registration to confirm you are located within Bangladesh, as per Bangladesh telecommunications regulations. AgniTalk does not continuously track or store your location after this one-time verification.' },
    bn: { q: 'অ্যাপটি কেন GPS লোকেশন অনুমতি চায়?', a: 'বাংলাদেশের টেলিযোগাযোগ আইন অনুযায়ী নিবন্ধনের সময় একবারই GPS অনুমতি প্রয়োজন। AgniTalk পরবর্তীতে আপনার লোকেশন ট্র্যাক বা সংরক্ষণ করে না।' },
  },
  {
    en: { q: 'How does the 70% Data Saver (Byte Saver) technology work?', a: "Byte Saver is AgniTalk's proprietary voice compression and packet optimization technology. It intelligently compresses audio data, removes silence periods, and optimizes network packet routing to reduce bandwidth consumption by up to 70% compared to standard VoIP applications — maintaining HD call quality even on 2G/3G connections." },
    bn: { q: '৭০% ডাটা সেভার (Byte Saver) প্রযুক্তি কীভাবে কাজ করে?', a: 'Byte Saver হলো AgniTalk-এর নিজস্ব ভয়েস কমপ্রেশন প্রযুক্তি যা অডিও ডাটা স্মার্টভাবে সংকুচিত করে এবং নেটওয়ার্ক প্যাকেট অপ্টিমাইজ করে। এটি স্ট্যান্ডার্ড VoIP অ্যাপের তুলনায় ৭০% পর্যন্ত ব্যান্ডউইথ কমায়।' },
  },
  {
    en: { q: 'Can I use AgniTalk to make international calls?', a: 'Yes. AgniTalk supports competitive international calling rates to most countries worldwide. Middle East, UK, USA, Malaysia, and other destinations popular among Bangladeshi expats are covered. Use the Rate Checker on our Rates page to see exact per-minute tariffs.' },
    bn: { q: 'AgniTalk দিয়ে কি আন্তর্জাতিক কল করা যাবে?', a: 'হ্যাঁ। AgniTalk বিশ্বের অধিকাংশ দেশে প্রতিযোগিতামূলক আন্তর্জাতিক কল রেট অফার করে। মধ্যপ্রাচ্য, যুক্তরাজ্য, যুক্তরাষ্ট্র, মালয়েশিয়া সহ আরো অনেক দেশে কল করা যাবে।' },
  },
]

export default function FAQ({ lang }) {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" style={{ background: 'white', padding: '80px 0' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`font-bold mb-3 ${bn(lang)}`} style={{ ...display(lang), fontSize: 'clamp(24px, 4vw, 36px)', color: '#003366' }}>
            {lang === 'bn' ? 'সাধারণ প্রশ্নাবলী' : 'Frequently Asked Questions'}
          </h2>
          <p className={`text-gray-500 ${bn(lang)}`}>
            {lang === 'bn' ? 'সাধারণ প্রশ্নের উত্তর পান দ্রুত।' : 'Quick answers to the most common questions about AgniTalk.'}
          </p>
        </div>

        <div>
          {FAQS.map((f, i) => {
            const t = lang === 'bn' ? f.bn : f.en
            const isOpen = open === i
            return (
              <div key={i} className="faq-item">
                <button className="faq-question" onClick={() => setOpen(isOpen ? null : i)}>
                  <span className={bn(lang)}>{t.q}</span>
                  <span
                    className="flex-shrink-0 transition-transform"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', color: isOpen ? '#0052CC' : '#718096' }}
                  >
                    <IconChevronDown />
                  </span>
                </button>
                {isOpen && <div className={`faq-answer ${bn(lang)}`}>{t.a}</div>}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <p className={`text-sm text-gray-500 ${bn(lang)}`}>
            {lang === 'bn' ? 'আরো সাহায্য দরকার?' : 'Need more help?'}{' '}
            <a href="tel:16620" className="font-semibold hover:underline" style={{ color: '#0052CC' }}><FiPhone className="inline mr-1 -mt-0.5" />16620</a>
            {' · '}
            <a href="https://wa.me/8801894829135" className="font-semibold hover:underline" style={{ color: '#28A745' }}>WhatsApp 01894829135</a>
            {' · '}
            <a href="mailto:agniapps@agni.com" className="font-semibold hover:underline" style={{ color: '#003366' }}>agniapps@agni.com</a>
          </p>
        </div>
      </div>
    </section>
  )
}
