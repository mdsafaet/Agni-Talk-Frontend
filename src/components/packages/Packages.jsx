import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiGift } from 'react-icons/fi'
import { bn, display } from '../../utils/lang'

const PACKAGES = [
  {
    badge: { en: 'Most Popular', bn: 'সবচেয়ে জনপ্রিয়' },
    en: {
      name: 'Talk 100 Pack',
      price: '৳49',
      desc: '100 minutes to any Bangladesh mobile/landline. Valid 7 days.',
      minutes: '100 min',
      validity: '7 days',
      bonus: '',
    },
    bn: {
      name: 'টক ১০০ প্যাক',
      price: '৳49',
      desc: 'যেকোনো বাংলাদেশী মোবাইল/ল্যান্ডলাইনে ১০০ মিনিট।',
      minutes: '১০০ মিনিট',
      validity: '৭ দিন',
      bonus: '',
    },
    highlight: true,
  },
  {
    badge: { en: 'Best Value', bn: 'সেরা মূল্য' },
    en: {
      name: 'Talk 500 Pack',
      price: '৳199',
      desc: '500 minutes to any number. Valid 30 days. Extra 50 min bonus!',
      minutes: '500+50 min',
      validity: '30 days',
      bonus: '+50 min Bonus',
    },
    bn: {
      name: 'টক ৫০০ প্যাক',
      price: '৳199',
      desc: '৫০০ মিনিট + ৫০ মিনিট বোনাস। ৩০ দিন মেয়াদ।',
      minutes: '৫০০+৫০ মিনিট',
      validity: '৩০ দিন',
      bonus: '+৫০ মিনিট বোনাস',
    },
    highlight: false,
  },
  {
    badge: { en: 'Quick Pack', bn: 'কুইক প্যাক' },
    en: {
      name: 'Talk 30 Pack',
      price: '৳18',
      desc: '30 minutes to any Bangladesh number. Valid 3 days.',
      minutes: '30 min',
      validity: '3 days',
      bonus: '',
    },
    bn: {
      name: 'টক ৩০ প্যাক',
      price: '৳18',
      desc: 'যেকোনো নাম্বারে ৩০ মিনিট। ৩ দিন মেয়াদ।',
      minutes: '৩০ মিনিট',
      validity: '৩ দিন',
      bonus: '',
    },
    highlight: false,
  },
]

function handleTilt(event) {
  if (
    event.pointerType !== 'mouse' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return
  }

  // Measure the stationary wrapper, not the tilted card.
  const wrapper = event.currentTarget
  const rect = wrapper.getBoundingClientRect()

  const x = Math.max(
    -0.5,
    Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5),
  )

  const y = Math.max(
    -0.5,
    Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5),
  )

  wrapper.style.setProperty('--tilt-x', `${-y * 10}deg`)
  wrapper.style.setProperty('--tilt-y', `${x * 10}deg`)
  wrapper.style.setProperty('--lift', '-5px')
}

function resetTilt(event) {
  const wrapper = event.currentTarget

  wrapper.style.setProperty('--tilt-x', '0deg')
  wrapper.style.setProperty('--tilt-y', '0deg')
  wrapper.style.setProperty('--lift', '0px')
}

export default function Packages({ lang = 'en' }) {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const groupId = useId()
  const isBangla = lang === 'bn'

  return (
    <section
      id="packages"
      lang={lang}
      className="bg-[#F8FAFC] py-0!"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <h2
            className={`mb-3 text-[clamp(24px,4vw,36px)] font-normal text-[#003366] ${bn(lang)}`}
            style={display(lang)}
          >
            {isBangla
              ? 'ভয়েস প্যাকেজ ও অফার'
              : 'Voice Packages & Special Offers'}
          </h2>

          <p className={`leading-7 text-slate-600 ${bn(lang)}`}>
            {isBangla
              ? 'আরো বেশি সাশ্রয়ের জন্য বেছে নিন আমাদের প্যাকেজ।'
              : 'Save even more with bundled voice minute packages.'}
          </p>
        </div>

        {/* Native radio controls support keyboard and touch selection */}
        <fieldset>
          <legend className="sr-only">
            {isBangla ? 'প্যাকেজ বেছে নিন' : 'Choose a package'}
          </legend>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PACKAGES.map((pack, index) => {
              const content = isBangla ? pack.bn : pack.en
              const selected = selectedPackage === index
              const inputId = `${groupId}-${index}`

              return (
                <div
                  key={pack.en.name}
                  className="relative h-full"
                  onPointerMove={handleTilt}
                  onPointerLeave={resetTilt}
                  onPointerCancel={resetTilt}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name={`${groupId}-package`}
                    value={pack.en.name}
                    checked={selected}
                    onChange={() => setSelectedPackage(index)}
                    aria-label={`${content.name}, ${content.price}`}
                    className="peer sr-only"
                  />

                  <div
                    className={`relative flex h-full flex-col rounded-3xl border-2 transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#0052CC] motion-safe:[transform:perspective(1000px)_translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] motion-reduce:transition-none ${
                      selected
                        ? 'border-[#0052CC] bg-[#EAF3FF] shadow-[0_14px_35px_rgba(0,82,204,0.12)]'
                        : pack.highlight
                          ? 'border-[#D9BC94] bg-[#FBF6EF] shadow-sm'
                          : 'border-slate-200 bg-white shadow-sm'
                    }`}
                  >
                    {/* Clicking the card content selects the package */}
                    <label
                      htmlFor={inputId}
                      className="flex flex-1 cursor-pointer flex-col p-6 pb-4 lg:p-7 lg:pb-4"
                    >
                      <span className="mb-5 flex items-center justify-between gap-3">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs ${bn(lang)} ${
                            selected
                              ? 'border-blue-200 bg-white/80 text-[#0052CC]'
                              : 'border-[#C5A267]/20 bg-[#F5EFE4]/70 text-[#77552D]'
                          }`}
                        >
                          {isBangla ? pack.badge.bn : pack.badge.en}
                        </span>

                        <span
                          aria-hidden="true"
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                            selected
                              ? 'border-[#0052CC] bg-[#0052CC] text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {selected && (
                            <FiCheck className="h-4 w-4" />
                          )}
                        </span>
                      </span>

                      <span
                        className={`mb-3 block text-xl text-[#003366] ${bn(lang)}`}
                        style={display(lang)}
                      >
                        {content.name}
                      </span>

                      <span className="mb-4 flex items-baseline gap-2">
                        <span
                          className="text-5xl text-[#003366]"
                          style={display(lang)}
                        >
                          {content.price}
                        </span>

                        <span className="text-sm text-slate-500">
                          {isBangla ? '/প্যাক' : '/pack'}
                        </span>
                      </span>

                      <span
                        className={`mb-5 block text-sm leading-7 text-slate-600 ${bn(lang)}`}
                      >
                        {content.desc}
                      </span>

                      <span className="mt-auto flex flex-col gap-3 border-t border-[#003366]/10 pt-5">
                        <span className="flex items-center gap-2 text-sm">
                          <FiCheck
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-emerald-700"
                          />

                          <span className={`text-slate-600 ${bn(lang)}`}>
                            {content.minutes}
                          </span>
                        </span>

                        <span className="flex items-center gap-2 text-sm">
                          <FiCheck
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-emerald-700"
                          />

                          <span className={`text-slate-600 ${bn(lang)}`}>
                            {content.validity}{' '}
                            {isBangla ? 'মেয়াদ' : 'validity'}
                          </span>
                        </span>

                        {content.bonus && (
                          <span className="flex items-center gap-2 text-sm text-[#0052CC]">
                            <FiGift
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0"
                            />

                            <span className={bn(lang)}>
                              {content.bonus}
                            </span>
                          </span>
                        )}
                      </span>
                    </label>

                    {/* Separate from the selection control */}
                    <div className="px-6 pb-6 lg:px-7 lg:pb-7">
                      <Link
                        to="/download"
                        aria-label={`${isBangla ? 'অ্যাপে পাবেন' : 'Claim in App'} — ${content.name}`}
                        className={`group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0052CC] motion-reduce:transition-none ${bn(lang)} ${
                          selected
                            ? 'border-[#0052CC] bg-[#0052CC] text-white hover:border-[#003366] hover:bg-[#003366]'
                            : 'border-[#CCD9E5] bg-white/80 text-[#003366] hover:border-[#0052CC] hover:bg-[#0052CC] hover:text-white'
                        }`}
                      >
                        {isBangla ? 'অ্যাপে পাবেন' : 'Claim in App'}

                        <FiArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </fieldset>

        {/* Referral banner */}
        <div className="mt-12 flex flex-col items-center gap-6 rounded-3xl border border-[#D3DFEC] bg-[#E4ECF4] p-6 md:flex-row md:gap-10 md:p-8">
          <img
            src="/images/refer-a-friend.webp"
            alt=""
            width={455}
            height={465}
            loading="lazy"
            draggable={false}
            className="h-36 w-auto shrink-0 md:h-44"
          />

          <div className="text-center md:flex-1 md:text-left">
            <h3
              className={`mb-2 text-xl text-[#003366] ${bn(lang)}`}
              style={display(lang)}
            >
              {isBangla
                ? 'বন্ধুকে রেফার করুন, ক্রেডিট পান!'
                : 'Refer a Friend & Earn Credit!'}
            </h3>

            <p className={`text-sm leading-7 text-slate-600 ${bn(lang)}`}>
              {isBangla
                ? 'প্রতিটি সফল রেফারেলে আপনি ও আপনার বন্ধু উভয়েই বোনাস ক্রেডিট পাবেন।'
                : 'Every successful referral earns both you and your friend bonus calling credit. Multi-level rewards.'}
            </p>
          </div>

          <Link
            to="/download"
            className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C94316] px-5 py-3 text-sm text-white transition-colors duration-300 hover:bg-[#0052CC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0052CC] motion-reduce:transition-none ${bn(lang)}`}
          >
            {isBangla ? 'এখনই শুরু করুন' : 'Start Referring'}
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}