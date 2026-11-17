import {
  FiArrowRight,
  FiCreditCard,
  FiDownload,
  FiLock,
  FiMapPin,
  FiPhoneCall,
} from 'react-icons/fi'
import { FaIdCard } from 'react-icons/fa'
import { bn, display } from '../../utils/lang'

const STEPS = [
  {
    num: '01',
    Icon: FiDownload,
    en: {
      title: 'Download AgniTalk',
      desc: 'Install AgniTalk from Google Play Store, Apple App Store, or download the APK directly for Android devices.',
    },
    bn: {
      title: 'AgniTalk ডাউনলোড করুন',
      desc: 'Google Play Store, Apple App Store থেকে AgniTalk ইনস্টল করুন অথবা সরাসরি APK ডাউনলোড করুন।',
    },
  },
  {
    num: '02',
    Icon: FaIdCard,
    en: {
      title: 'Verify Your NID',
      desc: 'Submit your National ID (NID) via our secure Porichoy API integration. BTRC-mandated verification completes in under 2 minutes.',
    },
    bn: {
      title: 'NID যাচাই করুন',
      desc: 'Porichoy API-এর মাধ্যমে আপনার জাতীয় পরিচয়পত্র (NID) যাচাই করুন। ২ মিনিটেরও কম সময়ে সম্পন্ন হয়।',
    },
  },
  {
    num: '03',
    Icon: FiPhoneCall,
    en: {
      title: 'Get Your 09606 Number',
      desc: "Instantly receive your dedicated virtual IPTSP number with the 09606 prefix, auto-matched to your mobile number's last digits.",
    },
    bn: {
      title: '০৯৬০৬ নম্বর পান',
      desc: 'স্বয়ংক্রিয়ভাবে একটি ডেডিকেটেড ভার্চুয়াল IPTSP নম্বর পান যা আপনার মোবাইল নম্বরের শেষ ডিজিটের সাথে মিলে।',
    },
  },
  {
    num: '04',
    Icon: FiCreditCard,
    en: {
      title: 'Top Up & Start Calling',
      desc: 'Recharge via bKash, Nagad, or card in seconds. Make cheap calls to any number in Bangladesh or internationally right away.',
    },
    bn: {
      title: 'রিচার্জ করে কল শুরু করুন',
      desc: 'বিকাশ, নগদ বা কার্ড দিয়ে সেকেন্ডেই রিচার্জ করুন এবং বাংলাদেশ বা বিশ্বের যেকোনো নম্বরে কল শুরু করুন।',
    },
  },
]

export default function HowItWorks({ lang = 'en' }) {
  const isBangla = lang === 'bn'

  return (
    <section
      id="how-it-works"
      lang={lang}
      aria-labelledby="how-it-works-title"
      className="relative isolate overflow-hidden bg-[#F1F5F9] py-0!"
    >
      {/* Soft background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-sky-200/35 blur-[80px]" />

        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-200/30 blur-[90px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <h2
            id="how-it-works-title"
            className={`mb-4 text-[clamp(24px,4vw,36px)] font-normal leading-tight text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'মাত্র ৪টি ধাপে শুরু করুন'
              : 'Up & Running in 4 Simple Steps'}
          </h2>

          <p
            className={`mx-auto max-w-xl text-sm leading-7 text-slate-600 sm:text-base ${bn(lang)}`}
          >
            {isBangla
              ? 'NID যাচাই থেকে শুরু করে প্রথম কল পর্যন্ত — সব কিছু সহজ।'
              : 'From NID verification to your first call — everything is designed to be effortless.'}
          </p>
        </div>

        {/* Steps */}
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, index) => {
            const content = isBangla ? step.bn : step.en
            const { Icon } = step

            return (
              <li key={step.num} className="relative h-full">
                <div className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-white/90 bg-white/65 p-6 shadow-[0_8px_24px_rgba(15,45,75,0.05)] backdrop-blur-xl transition-transform duration-500 ease-out motion-safe:hover:-translate-y-2 motion-reduce:transition-none">
                  {/* Fade in colour rather than animating blur */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[#003366] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
                  />

                  {/* Icon and step number */}
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-[#0052CC]/[0.07] text-[#0052CC] transition-colors duration-500 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-[#FFB46A] motion-reduce:transition-none"
                    >
                      <Icon className="h-6 w-6" />
                    </span>

                    <span
                      aria-hidden="true"
                      className="font-agni-heading text-5xl font-normal text-[#003366]/15 transition-colors duration-500 group-hover:text-white/25 motion-reduce:transition-none"
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3
                    className={`mb-3 text-lg font-normal leading-snug text-[#003366] transition-colors duration-500 group-hover:text-white motion-reduce:transition-none ${bn(lang)}`}
                    style={display(lang)}
                  >
                    {content.title}
                  </h3>

                  <p
                    className={`text-sm leading-7 text-slate-600 transition-colors duration-500 group-hover:text-slate-200 motion-reduce:transition-none ${bn(lang)}`}
                  >
                    {content.desc}
                  </p>

                  {/* Bottom accent */}
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-6"
                  >
                    <span className="block h-0.5 w-8 rounded-full bg-[#0052CC]/25 transition-[width,background-color] duration-500 group-hover:w-16 group-hover:bg-[#FFB46A] motion-reduce:transition-none" />
                  </span>
                </div>

                {/* Desktop connector */}
                {index < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0052CC] shadow-sm lg:flex"
                  >
                    <FiArrowRight className="h-4 w-4" />
                  </span>
                )}
              </li>
            )
          })}
        </ol>

        {/* App preview and notices */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-5">
          {/* Phone image */}
          <div className="group relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/90 bg-white/55 p-6 shadow-[0_8px_24px_rgba(15,45,75,0.04)] backdrop-blur-xl sm:p-8 lg:col-span-2">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-56 w-56 rounded-full bg-sky-100/70 blur-3xl"
            />

            <img
              src="/images/phones-register-call.webp"
              alt="AgniTalk registration screen next to an active call screen"
              width={728}
              height={809}
              loading="lazy"
              draggable={false}
              className="relative h-auto w-full max-w-[300px] transition-transform duration-700 ease-out motion-safe:group-hover:-translate-y-2 motion-reduce:transition-none"
            />
          </div>

          <div className="flex flex-col justify-center gap-5 lg:col-span-3">
            {/* NID notice */}
            <div className="group flex gap-4 rounded-2xl border border-white/90 bg-white/60 p-5 backdrop-blur-lg transition-[background-color,border-color,transform] duration-300 hover:border-blue-200 hover:bg-blue-50/90 motion-safe:hover:-translate-y-1 motion-reduce:transition-none sm:p-6">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0052CC]/[0.07] text-[#0052CC] transition-colors duration-300 group-hover:bg-[#0052CC] group-hover:text-white motion-reduce:transition-none"
              >
                <FiLock className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <h3
                  className={`mb-2 text-sm font-normal text-[#003366] ${bn(lang)}`}
                  style={display(lang)}
                >
                  {isBangla
                    ? 'কেন NID প্রয়োজন?'
                    : 'Why is NID Required?'}
                </h3>

                <p
                  className={`text-sm leading-7 text-slate-600 ${bn(lang)}`}
                >
                  {isBangla
                    ? 'BTRC-এর বিধিমালা অনুযায়ী ০৯৬০৬ ভার্চুয়াল নম্বর সক্রিয় করতে NID যাচাই বাধ্যতামূলক। আপনার তথ্য Porichoy API-এ এনক্রিপ্টেড আকারে পাঠানো হয়।'
                    : "NID verification is required by BTRC regulations to activate your 09606 virtual number. Your data is encrypted and verified directly via Bangladesh EC's Porichoy API — never stored locally."}
                </p>
              </div>
            </div>

            {/* GPS notice */}
            <div className="group flex gap-4 rounded-2xl border border-white/90 bg-white/60 p-5 backdrop-blur-lg transition-[background-color,border-color,transform] duration-300 hover:border-orange-200 hover:bg-orange-50/90 motion-safe:hover:-translate-y-1 motion-reduce:transition-none sm:p-6">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100/70 text-[#C74B16] transition-colors duration-300 group-hover:bg-[#C74B16] group-hover:text-white motion-reduce:transition-none"
              >
                <FiMapPin className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <h3
                  className={`mb-2 text-sm font-normal text-[#003366] ${bn(lang)}`}
                  style={display(lang)}
                >
                  {isBangla
                    ? 'GPS অনুমতি কেন?'
                    : 'Why GPS Location Permission?'}
                </h3>

                <p
                  className={`text-sm leading-7 text-slate-600 ${bn(lang)}`}
                >
                  {isBangla
                    ? 'টেলিযোগাযোগ আইন অনুযায়ী নিবন্ধনের সময় একবার GPS অনুমতি প্রয়োজন যা নিশ্চিত করে আপনি বাংলাদেশে আছেন।'
                    : 'GPS location permission is required once during registration to confirm you are within Bangladesh as per telecom regulations. Location is not tracked continuously.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}