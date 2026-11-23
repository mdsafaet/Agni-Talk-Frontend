import { useId, useState } from 'react'
import {
  FiCheckCircle,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from 'react-icons/fi'
import { IconChevronDown } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const FAQS = [
  {
    en: {
      q: 'How do I get my 09606 virtual number?',
      a: 'After downloading AgniTalk and completing NID verification via Porichoy API, your 09606 virtual number is assigned automatically. The number is matched to the last 6-7 digits of your registered mobile number, making it easy for contacts to recognize.',
    },
    bn: {
      q: 'আমি কীভাবে আমার ০৯৬০৬ ভার্চুয়াল নম্বর পাব?',
      a: 'AgniTalk ডাউনলোড করে Porichoy API-এর মাধ্যমে NID যাচাই সম্পন্ন করলে স্বয়ংক্রিয়ভাবে আপনার ০৯৬০৬ ভার্চুয়াল নম্বর বরাদ্দ হবে।',
    },
  },
  {
    en: {
      q: 'Why is NID submission required?',
      a: "BTRC (Bangladesh Telecommunication Regulatory Commission) regulations mandate identity verification for all IPTSP virtual number holders. Your NID data is encrypted and verified directly via the Bangladesh Election Commission's Porichoy API — it is never stored on AgniTalk's servers.",
    },
    bn: {
      q: 'কেন NID জমা দেওয়া প্রয়োজন?',
      a: 'BTRC-এর বিধিমালা অনুযায়ী সকল IPTSP ভার্চুয়াল নম্বর ধারকদের পরিচয় যাচাই বাধ্যতামূলক। আপনার NID তথ্য Porichoy API-এ সরাসরি যাচাই করা হয়।',
    },
  },
  {
    en: {
      q: 'How do I top up my balance using bKash or Nagad?',
      a: 'Open AgniTalk → Tap "Top Up" → Select bKash or Nagad → Enter your amount → Confirm with your mobile banking PIN. The balance is credited within seconds. You can also use credit/debit cards via SSLCommerz.',
    },
    bn: {
      q: 'বিকাশ বা নগদ দিয়ে কীভাবে ব্যালেন্স যোগ করব?',
      a: 'AgniTalk খুলুন → "টপ আপ" ট্যাপ করুন → বিকাশ বা নগদ বেছে নিন → পরিমাণ লিখুন → মোবাইল ব্যাংকিং PIN দিয়ে নিশ্চিত করুন। সেকেন্ডেই ব্যালেন্স যোগ হবে।',
    },
  },
  {
    en: {
      q: 'Why does the app require GPS location permission?',
      a: 'GPS location permission is required once during initial registration to confirm you are located within Bangladesh, as per Bangladesh telecommunications regulations. AgniTalk does not continuously track or store your location after this one-time verification.',
    },
    bn: {
      q: 'অ্যাপটি কেন GPS লোকেশন অনুমতি চায়?',
      a: 'বাংলাদেশের টেলিযোগাযোগ আইন অনুযায়ী নিবন্ধনের সময় একবারই GPS অনুমতি প্রয়োজন। AgniTalk পরবর্তীতে আপনার লোকেশন ট্র্যাক বা সংরক্ষণ করে না।',
    },
  },
  {
    en: {
      q: 'How does the 70% Data Saver (Byte Saver) technology work?',
      a: "Byte Saver is AgniTalk's proprietary voice compression and packet optimization technology. It intelligently compresses audio data, removes silence periods, and optimizes network packet routing to reduce bandwidth consumption by up to 70% compared to standard VoIP applications — maintaining HD call quality even on 2G/3G connections.",
    },
    bn: {
      q: '৭০% ডাটা সেভার (Byte Saver) প্রযুক্তি কীভাবে কাজ করে?',
      a: 'Byte Saver হলো AgniTalk-এর নিজস্ব ভয়েস কমপ্রেশন প্রযুক্তি যা অডিও ডাটা স্মার্টভাবে সংকুচিত করে এবং নেটওয়ার্ক প্যাকেট অপ্টিমাইজ করে। এটি স্ট্যান্ডার্ড VoIP অ্যাপের তুলনায় ৭০% পর্যন্ত ব্যান্ডউইথ কমায়।',
    },
  },
  {
    en: {
      q: 'Can I use AgniTalk to make international calls?',
      a: 'Yes. AgniTalk supports competitive international calling rates to most countries worldwide. Middle East, UK, USA, Malaysia, and other destinations popular among Bangladeshi expats are covered. Use the Rate Checker on our Rates page to see exact per-minute tariffs.',
    },
    bn: {
      q: 'AgniTalk দিয়ে কি আন্তর্জাতিক কল করা যাবে?',
      a: 'হ্যাঁ। AgniTalk বিশ্বের অধিকাংশ দেশে প্রতিযোগিতামূলক আন্তর্জাতিক কল রেট অফার করে। মধ্যপ্রাচ্য, যুক্তরাজ্য, যুক্তরাষ্ট্র, মালয়েশিয়া সহ আরো অনেক দেশে কল করা যাবে।',
    },
  },
]

const TOPICS = [
  { id: '09606', en: '09606 Number & NID', bn: '০৯৬০৬ নম্বর ও NID' },
  { id: 'topup', en: 'bKash / Nagad Top-Up', bn: 'বিকাশ / নগদ রিচার্জ' },
  { id: 'rates', en: 'Call Rates & Packages', bn: 'কল রেট ও প্যাকেজ' },
  { id: 'corporate', en: 'Corporate / Business', bn: 'কর্পোরেট / বিজনেস' },
  { id: 'other', en: 'General Support', bn: 'সাধারণ সহায়তা' },
]

export default function FAQ({ lang = 'en' }) {
  const [open, setOpen] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: '09606',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const nameId = useId()
  const phoneId = useId()
  const emailId = useId()
  const topicId = useId()
  const messageId = useId()

  const isBangla = lang === 'bn'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (submitted) setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      return
    }
    setSubmitted(true)
  }

  return (
    <section
      id="faq"
      lang={lang}
      className="
        relative overflow-hidden
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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
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
            {isBangla ? 'সহায়তা কেন্দ্র' : 'HELP & ENQUIRY'}
          </div>

          <h2
            className={`mb-2.5 text-[clamp(24px,4vw,36px)] font-bold [font-synthesis:weight] leading-tight text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla ? 'সাধারণ প্রশ্নাবলী' : 'Frequently Asked Questions'}
          </h2>

          <p className={`text-sm sm:text-base text-slate-600 ${bn(lang)}`}>
            {isBangla
              ? 'সাধারণ প্রশ্নের উত্তর পান দ্রুত।'
              : 'Quick answers to the most common questions about AgniTalk.'}
          </p>
        </div>

        {/* Two-Column Layout: FAQ Accordion + Enquiry Form */}
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: FAQ List */}
          <div className="space-y-3 lg:col-span-7">
            {FAQS.map((f, i) => {
              const t = isBangla ? f.bn : f.en
              const isOpen = open === i
              return (
                <div
                  key={i}
                  className={`
                    rounded-[20px] border bg-white transition-colors duration-200
                    ${
                      isOpen
                        ? 'border-[#0052CC]/35 bg-[#F4F8FF]/50 shadow-[0_10px_24px_-12px_rgba(0,82,204,0.18)]'
                        : 'border-slate-200/90 hover:border-[#003366]/25'
                    }
                  `}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="
                      flex w-full items-center justify-between gap-4
                      p-4 sm:p-5 text-left cursor-pointer
                      rounded-[20px]
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-[#0052CC]
                    "
                  >
                    <span
                      className={`text-sm sm:text-base font-bold [font-synthesis:weight] leading-snug text-[#003366] ${bn(lang)}`}
                    >
                      {t.q}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`
                        flex h-7 w-7 shrink-0 items-center justify-center
                        rounded-full transition-transform duration-200
                        ${
                          isOpen
                            ? 'rotate-180 bg-[#0052CC] text-white'
                            : 'bg-slate-100 text-slate-500'
                        }
                      `}
                    >
                      <IconChevronDown />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className={`px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
                    >
                      <div className="border-t border-slate-200/80 pt-3">
                        {t.a}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Column: Direct Enquiry Form */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[20px] border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_8px_28px_-10px_rgba(0,51,102,0.1)]">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-[#FF5722]"
              />

              <div className="mb-4 pt-0.5">
                <h3
                  className={`text-lg sm:text-xl font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
                  style={display(lang)}
                >
                  {isBangla ? 'সরাসরি প্রশ্ন পাঠান' : 'Send Us an Enquiry'}
                </h3>
                <p
                  className={`mt-1 text-xs sm:text-sm text-slate-500 ${bn(lang)}`}
                >
                  {isBangla
                    ? 'আপনার প্রশ্ন বা মতামত লিখুন, আমাদের সাপোর্ট টিম দ্রুত যোগাযোগ করবে।'
                    : 'Have a specific question? Fill out the form and our team will get back to you shortly.'}
                </p>
              </div>

              {submitted ? (
                <div
                  role="status"
                  className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-center space-y-2.5"
                >
                  <FiCheckCircle
                    aria-hidden="true"
                    className="mx-auto h-8 w-8 text-emerald-600"
                  />
                  <h4
                    className={`text-base font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
                  >
                    {isBangla
                      ? 'আপনার বার্তা পাঠানো হয়েছে!'
                      : 'Enquiry Received!'}
                  </h4>
                  <p
                    className={`text-xs sm:text-sm text-slate-600 leading-relaxed ${bn(lang)}`}
                  >
                    {isBangla
                      ? `ধন্যবাদ, ${formData.name}। আমাদের সাপোর্ট টিম শীঘ্রই ${formData.phone} নম্বরে যোগাযোগ করবে।`
                      : `Thank you, ${formData.name}. Our AgniTalk support team will reach out to ${formData.phone} soon.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        topic: '09606',
                        message: '',
                      })
                    }}
                    className={`
                      mt-1 inline-flex items-center justify-center
                      rounded-xl bg-[#003366] px-4 py-2 text-xs
                      font-bold [font-synthesis:weight] text-white
                      hover:bg-[#0052CC] transition-colors cursor-pointer
                      ${bn(lang)}
                    `}
                  >
                    {isBangla ? 'আরেকটি প্রশ্ন পাঠান' : 'Send Another Enquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label
                      htmlFor={nameId}
                      className={`mb-1 block text-xs font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
                    >
                      {isBangla ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={
                        isBangla ? 'পূর্ণ নাম লিখুন' : 'Enter your full name'
                      }
                      className={`
                        w-full rounded-xl border border-slate-200 bg-[#F8FAFC]
                        px-3.5 py-2.5 text-sm text-slate-800 outline-none
                        transition-colors placeholder:text-slate-400
                        focus:border-[#0052CC] focus:bg-white focus:ring-2 focus:ring-[#0052CC]/15
                        ${bn(lang)}
                      `}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor={phoneId}
                        className={`mb-1 block text-xs font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
                      >
                        {isBangla ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                      </label>
                      <input
                        id={phoneId}
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        className="
                          w-full rounded-xl border border-slate-200 bg-[#F8FAFC]
                          px-3.5 py-2.5 text-sm text-slate-800 outline-none
                          transition-colors placeholder:text-slate-400
                          focus:border-[#0052CC] focus:bg-white focus:ring-2 focus:ring-[#0052CC]/15
                        "
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={emailId}
                        className={`mb-1 block text-xs font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
                      >
                        {isBangla ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                      </label>
                      <input
                        id={emailId}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="
                          w-full rounded-xl border border-slate-200 bg-[#F8FAFC]
                          px-3.5 py-2.5 text-sm text-slate-800 outline-none
                          transition-colors placeholder:text-slate-400
                          focus:border-[#0052CC] focus:bg-white focus:ring-2 focus:ring-[#0052CC]/15
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={topicId}
                      className={`mb-1 block text-xs font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
                    >
                      {isBangla ? 'বিষয় নির্বাচন করুন' : 'Enquiry Topic'}
                    </label>
                    <select
                      id={topicId}
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className={`
                        w-full rounded-xl border border-slate-200 bg-[#F8FAFC]
                        px-3.5 py-2.5 text-sm text-slate-800 outline-none
                        transition-colors
                        focus:border-[#0052CC] focus:bg-white focus:ring-2 focus:ring-[#0052CC]/15
                        ${bn(lang)}
                      `}
                    >
                      {TOPICS.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {isBangla ? topic.bn : topic.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={messageId}
                      className={`mb-1 block text-xs font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
                    >
                      {isBangla ? 'আপনার বার্তা *' : 'Your Message *'}
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        isBangla
                          ? 'আপনার প্রশ্নটি বিস্তারিত লিখুন...'
                          : 'Write your question or enquiry details...'
                      }
                      className={`
                        w-full resize-none rounded-xl border border-slate-200 bg-[#F8FAFC]
                        px-3.5 py-2.5 text-sm text-slate-800 outline-none
                        transition-colors placeholder:text-slate-400
                        focus:border-[#0052CC] focus:bg-white focus:ring-2 focus:ring-[#0052CC]/15
                        ${bn(lang)}
                      `}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`
                      inline-flex w-full items-center justify-center gap-2
                      rounded-xl bg-[#FF5722] px-5 py-3 text-sm
                      font-bold [font-synthesis:weight] text-white
                      shadow-[0_10px_22px_-8px_rgba(255,87,34,0.5)]
                      transition-[background-color,transform,box-shadow]
                      duration-200 hover:bg-[#e64a19]
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-[#0052CC]
                      motion-safe:active:scale-[0.98]
                      cursor-pointer
                      ${bn(lang)}
                    `}
                  >
                    <FiSend aria-hidden="true" className="h-4 w-4" />
                    <span>
                      {isBangla ? 'বার্তা পাঠান' : 'Submit Enquiry'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Direct Support Contacts Strip */}
        <div className="mt-8 rounded-[20px] border border-slate-200/90 bg-white px-4 py-3.5 text-center shadow-2xs">
          <p className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-600 ${bn(lang)}`}>
            <span className="font-bold [font-synthesis:weight] text-[#003366]">
              {isBangla ? 'আরো সাহায্য দরকার?' : 'Need more help?'}
            </span>

            <a
              href="tel:16620"
              className="inline-flex items-center gap-1.5 font-bold [font-synthesis:weight] text-[#0052CC] hover:underline"
            >
              <FiPhone aria-hidden="true" className="h-3.5 w-3.5" />
              16620
            </a>

            <span aria-hidden="true" className="text-slate-300">·</span>

            {/* <a
              href="https://wa.me/8801894829135"
              className="inline-flex items-center gap-1.5 font-bold [font-synthesis:weight] text-[#28A745] hover:underline"
            >
              <FiMessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
              WhatsApp 01894829135
            </a> */}

            <span aria-hidden="true" className="text-slate-300">·</span>

            <a
              href="mailto:customer.care@agni.com"
              className="inline-flex items-center gap-1.5 font-bold [font-synthesis:weight] text-[#003366] hover:underline"
            >
              <FiMail aria-hidden="true" className="h-3.5 w-3.5" />
              - customer.care@agni.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}