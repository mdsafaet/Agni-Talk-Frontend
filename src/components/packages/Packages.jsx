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

  const wrapper = event.currentTarget
  const rect = wrapper.getBoundingClientRect()
  if (!rect.width || !rect.height) return

  const x = Math.max(
    -0.5,
    Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5),
  )

  const y = Math.max(
    -0.5,
    Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5),
  )

  wrapper.style.setProperty('--tilt-x', `${-y * 8}deg`)
  wrapper.style.setProperty('--tilt-y', `${x * 8}deg`)
  wrapper.style.setProperty('--lift', '-3px')
}

function resetTilt(event) {
  const wrapper = event.currentTarget

  wrapper.style.setProperty('--tilt-x', '0deg')
  wrapper.style.setProperty('--tilt-y', '0deg')
  wrapper.style.setProperty('--lift', '0px')
}

export default function Packages({
  lang = 'en',
  showHeader = true,
  showReferral = true,
  className = '',
}) {
  const [selectedPackage, setSelectedPackage] = useState(0)
  const groupId = useId()
  const isBangla = lang === 'bn'

  return (
    <section
      id="packages"
      lang={lang}
      className={`
        relative overflow-hidden
        border-b border-slate-200/70
        bg-[#F8FAFF]
        bg-[radial-gradient(#CBD5E1_0.85px,transparent_0.85px)]
        [background-size:22px_22px]
        ${className}
      `}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,255,0.7)_0%,rgba(255,255,255,0.9)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Optional Compact Heading */}
        {showHeader && (
          <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
            <div
              className={`
                mb-2 inline-flex items-center gap-2 rounded-full
                border border-[#0052CC]/15 bg-white
                px-3 py-0.5 text-[11px] font-bold [font-synthesis:weight]
                uppercase tracking-wider text-[#0052CC] shadow-2xs
                ${bn(lang)}
              `}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722]" />
              {isBangla ? 'সাশ্রয়ী মিনিট বান্ডেল' : 'VOICE BUNDLES'}
            </div>

            <h2
              className={`mb-1.5 text-[clamp(22px,3.5vw,32px)] font-bold [font-synthesis:weight] leading-tight text-[#003366] ${bn(lang)}`}
              style={display(lang)}
            >
              {isBangla
                ? 'ভয়েস প্যাকেজ ও অফার'
                : 'Voice Packages & Special Offers'}
            </h2>

            <p
              className={`text-xs sm:text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
            >
              {isBangla
                ? 'আরো বেশি সাশ্রয়ের জন্য বেছে নিন আমাদের প্যাকেজ।'
                : 'Save even more with bundled voice minute packages.'}
            </p>
          </div>
        )}

        {/* Native radio controls support keyboard and touch selection */}
        <fieldset>
          <legend className="sr-only">
            {isBangla ? 'প্যাকেজ বেছে নিন' : 'Choose a package'}
          </legend>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
            {PACKAGES.map((pack, index) => {
              const content = isBangla ? pack.bn : pack.en
              const selected = selectedPackage === index
              const inputId = `${groupId}-${index}`

              return (
                <div
                  key={pack.en.name}
                  className="relative h-full [perspective:1000px]"
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
                    className={`
                      relative flex h-full flex-col overflow-hidden
                      rounded-[20px] border bg-white
                      shadow-[0_4px_16px_-6px_rgba(0,51,102,0.08)]
                      [transform-style:preserve-3d]
                      transition-[transform,background-color,border-color,box-shadow]
                      duration-200 ease-out
                      peer-focus-visible:outline-2
                      peer-focus-visible:outline-offset-4
                      peer-focus-visible:outline-[#0052CC]
                      motion-safe:[transform:translateY(var(--lift,0px))_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]
                      motion-reduce:transition-none
                      ${
                        selected
                          ? 'border-[#0052CC] bg-[#F4F8FF] ring-2 ring-[#0052CC]/20 shadow-[0_12px_26px_-10px_rgba(0,82,204,0.2)]'
                          : pack.highlight
                            ? 'border-[#FF5722]/35 hover:border-[#FF5722]/65 hover:bg-[#FFF7F4]/45'
                            : 'border-slate-200/90 hover:border-[#0052CC]/45 hover:bg-[#F4F8FF]/45'
                      }
                    `}
                  >
                    {/* Top Accent Bar */}
                    <span
                      aria-hidden="true"
                      className={`
                        absolute inset-x-0 top-0 h-1
                        ${
                          pack.highlight
                            ? 'bg-[#FF5722]'
                            : selected
                              ? 'bg-[#0052CC]'
                              : 'bg-[#003366]/80'
                        }
                      `}
                    />

                    {/* Clicking the card content selects the package */}
                    <label
                      htmlFor={inputId}
                      className="flex flex-1 cursor-pointer flex-col p-4 pb-3 sm:p-5 sm:pb-3.5"
                    >
                      <span className="mb-3 flex items-center justify-between gap-2 pt-0.5">
                        <span
                          className={`
                            rounded-full px-2.5 py-0.5 text-[11px] font-bold [font-synthesis:weight]
                            ${bn(lang)}
                            ${
                              pack.highlight
                                ? 'border border-[#FF5722]/20 bg-[#FFF7F4] text-[#FF5722]'
                                : selected
                                  ? 'bg-[#0052CC] text-white'
                                  : 'bg-[#F4F8FF] text-[#0052CC]'
                            }
                          `}
                        >
                          {isBangla ? pack.badge.bn : pack.badge.en}
                        </span>

                        <span
                          aria-hidden="true"
                          className={`
                            flex h-5 w-5 shrink-0 items-center justify-center
                            rounded-full border transition-colors duration-200
                            ${
                              selected
                                ? 'border-[#0052CC] bg-[#0052CC] text-white'
                                : 'border-slate-300 bg-white'
                            }
                          `}
                        >
                          {selected && <FiCheck className="h-3 w-3" />}
                        </span>
                      </span>

                      <div className="mb-2 flex items-baseline justify-between gap-2">
                        <span
                          className={`text-base sm:text-lg font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
                          style={display(lang)}
                        >
                          {content.name}
                        </span>

                        <span className="flex items-baseline gap-1 shrink-0">
                          <span
                            className={`text-2xl sm:text-3xl font-bold [font-synthesis:weight] leading-none tracking-tight ${
                              pack.highlight
                                ? 'text-[#FF5722]'
                                : 'text-[#003366]'
                            }`}
                            style={display(lang)}
                          >
                            {content.price}
                          </span>

                          <span className="text-xs font-medium text-slate-500">
                            {isBangla ? '/প্যাক' : '/pack'}
                          </span>
                        </span>
                      </div>

                      <span
                        className={`mb-3.5 block text-xs sm:text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
                      >
                        {content.desc}
                      </span>

                      <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-slate-200/80 pt-3 text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0052CC]/10 text-[#0052CC]">
                            <FiCheck aria-hidden="true" className="h-2.5 w-2.5" />
                          </span>

                          <span
                            className={`font-medium text-slate-700 ${bn(lang)}`}
                          >
                            {content.minutes}
                          </span>
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0052CC]/10 text-[#0052CC]">
                            <FiCheck aria-hidden="true" className="h-2.5 w-2.5" />
                          </span>

                          <span
                            className={`font-medium text-slate-700 ${bn(lang)}`}
                          >
                            {content.validity}{' '}
                            {isBangla ? 'মেয়াদ' : 'validity'}
                          </span>
                        </span>

                        {content.bonus && (
                          <span className="inline-flex items-center gap-1 font-bold [font-synthesis:weight] text-[#FF5722]">
                            <FiGift aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                            <span className={bn(lang)}>{content.bonus}</span>
                          </span>
                        )}
                      </span>
                    </label>

                    {/* Separate from the selection control */}
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                      <Link
                        to="/download"
                        aria-label={`${isBangla ? 'অ্যাপে পাবেন' : 'Claim in App'} — ${content.name}`}
                        className={`
                          group inline-flex h-10 w-full items-center
                          justify-center gap-2 rounded-xl border px-3.5
                          text-xs sm:text-sm font-bold [font-synthesis:weight]
                          transition-[background-color,color,border-color,box-shadow]
                          duration-200
                          focus-visible:outline-2
                          focus-visible:outline-offset-4
                          focus-visible:outline-[#0052CC]
                          motion-reduce:transition-none
                          ${bn(lang)}
                          ${
                            selected
                              ? 'border-[#0052CC] bg-[#0052CC] text-white shadow-[0_6px_14px_-4px_rgba(0,82,204,0.4)] hover:border-[#003366] hover:bg-[#003366]'
                              : pack.highlight
                                ? 'border-[#FF5722] bg-[#FF5722] text-white shadow-[0_6px_14px_-4px_rgba(255,87,34,0.35)] hover:border-[#e64a19] hover:bg-[#e64a19]'
                                : 'border-slate-200 bg-[#F8FAFC] text-[#003366] hover:border-[#0052CC] hover:bg-[#0052CC] hover:text-white'
                          }
                        `}
                      >
                        {isBangla ? 'অ্যাপে পাবেন' : 'Claim in App'}

                        <FiArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </fieldset>

        {/* Optional Compact Referral Banner */}
        {showReferral && (
          <div
            className="
              relative mt-6 flex flex-col items-center gap-4
              overflow-hidden rounded-[20px] border border-slate-200/90
              bg-white px-5 py-4 shadow-[0_6px_20px_-8px_rgba(0,51,102,0.08)]
              md:flex-row md:gap-6 md:px-6 md:py-5
            "
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-[#0052CC]"
            />

            <img
              src="/images/refer-a-friend.webp"
              alt=""
              width={455}
              height={465}
              loading="lazy"
              draggable={false}
              className="h-20 w-auto shrink-0 md:h-24"
            />

            <div className="text-center md:flex-1 md:text-left">
              <span
                className={`
                  mb-1 inline-flex items-center gap-1.5 rounded-full
                  bg-[#FFF7F4] px-2.5 py-0.5 text-[10px] font-bold [font-synthesis:weight]
                  uppercase tracking-wider text-[#FF5722]
                  ${bn(lang)}
                `}
              >
                {isBangla ? 'রেফারেল বোনাস' : 'REFERRAL REWARDS'}
              </span>

              <h3
                className={`mb-1 text-base sm:text-lg font-bold [font-synthesis:weight] text-[#003366] ${bn(lang)}`}
                style={display(lang)}
              >
                {isBangla
                  ? 'বন্ধুকে রেফার করুন, ক্রেডিট পান!'
                  : 'Refer a Friend & Earn Credit!'}
              </h3>

              <p
                className={`text-xs sm:text-sm leading-relaxed text-slate-600 ${bn(lang)}`}
              >
                {isBangla
                  ? 'প্রতিটি সফল রেফারেলে আপনি ও আপনার বন্ধু উভয়েই বোনাস ক্রেডিট পাবেন।'
                  : 'Every successful referral earns both you and your friend bonus calling credit. Multi-level rewards.'}
              </p>
            </div>

            <Link
              to="/download"
              className={`
                group inline-flex h-10 shrink-0 items-center justify-center gap-2
                rounded-xl bg-[#FF5722] px-4 text-xs sm:text-sm font-bold [font-synthesis:weight]
                text-white shadow-[0_8px_18px_-6px_rgba(255,87,34,0.45)]
                transition-colors duration-200 hover:bg-[#0052CC]
                focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-[#0052CC] motion-reduce:transition-none
                ${bn(lang)}
              `}
            >
              {isBangla ? 'এখনই শুরু করুন' : 'Start Referring'}
              <FiArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}