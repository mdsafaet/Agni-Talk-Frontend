
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import {
  FiArrowUpRight,
  FiSmartphone,
} from 'react-icons/fi'
import {
  motion,
  MotionConfig,
  useReducedMotion,
} from 'framer-motion'

import QRCode from './QRCode'
import { bn, display } from '../../utils/lang'

/* ========================================
   Animation configuration
======================================== */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
}

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const imageVariants = {
  hidden: {
    opacity: 0,
    x: 12,
    scale: 1,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/* ========================================
   Animated brand background
======================================== */

function BrandBackground({ reduced }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#004A80] via-[#0069A8] to-[#0088D0]" />
      <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <motion.g
          fill="none" strokeLinecap="round" opacity=".16"
          initial={false}
          animate={reduced ? {} : { x: [0, -12, 0], y: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M810 -130 C550 120 1320 120 1020 390 S760 570 1030 680" stroke="#E00010" strokeWidth="12" />
          <path d="M870 -130 C610 120 1380 120 1080 390 S820 570 1090 680" stroke="#F58220" strokeWidth="20" />
          <path d="M930 -130 C670 120 1440 120 1140 390 S880 570 1150 680" stroke="#F8E800" strokeWidth="10" />
        </motion.g>
      </svg>
      <div className="absolute inset-0 bg-linear-to-r from-[#004A80] via-[#005B96]/65 to-transparent" />
    </div>
  )
}

/* ========================================
   Animated store button
======================================== */

function StoreAnchor({
  href,
  apple = false,
  isBangla,
  reduced,
}) {
  const Icon = apple ? FaApple : FaGooglePlay

  return (
    <motion.a
      href={href}
      variants={revealVariants}
      whileHover={
        reduced
          ? undefined
          : {
              y: -2,
              scale: 1,
            }
      }
      whileTap={
        reduced
          ? undefined
          : {
              scale: 0.97,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 23,
      }}
      aria-label={
        apple
          ? isBangla
            ? 'অ্যাপ স্টোর থেকে ডাউনলোড করুন'
            : 'Download on the App Store'
          : isBangla
            ? 'গুগল প্লে থেকে ডাউনলোড করুন'
            : 'Get it on Google Play'
      }
      className={`
        group relative flex min-h-[56px]
        min-w-0 items-center gap-3
        overflow-hidden rounded-xl
        border px-4 py-2.5
        font-agni-body no-underline
        transition-colors duration-300
        sm:min-w-[174px]

        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#F8E800]

        ${
          apple
            ? `
              border-white/25
              bg-[#003366]
              text-white
              hover:bg-[#00284F]
            `
            : `
              border-white bg-white
              text-[#003366]
              hover:border-white
              hover:bg-[#EFF7FC]
            `
        }
      `}
    >
      <Icon
        aria-hidden="true"
        className={`
          h-6 w-6 shrink-0
          ${apple ? 'text-white' : 'text-[#0088D0]'}
        `}
      />

      <span className="min-w-0 text-left">
        <small
          className={`
            block text-[9px]
            leading-tight tracking-wide
            ${apple ? 'text-white/80' : 'text-slate-500'}
          `}
        >
          {isBangla
            ? 'ডাউনলোড করুন'
            : apple
              ? 'DOWNLOAD ON THE'
              : 'GET IT ON'}
        </small>

        <strong
          className="
            mt-1 block whitespace-nowrap
            text-[15px] font-semibold
            leading-none
            [font-synthesis:weight]
            sm:text-[16px]
          "
        >
          {apple ? 'App Store' : 'Google Play'}
        </strong>
      </span>

      <FiArrowUpRight
        aria-hidden="true"
        className="
          ml-auto hidden h-4 w-4
          shrink-0 opacity-50
          transition-transform duration-300
          motion-safe:group-hover:-translate-y-0.5
          motion-safe:group-hover:translate-x-0.5
          sm:block
        "
      />
    </motion.a>
  )
}

/* ========================================
   Stationary QR code dock
======================================== */

function QRDownloadDock() {
  return (
    <motion.div
      variants={revealVariants}
      className="
        relative z-20 mx-auto mt-4
        w-fit rounded-xl
        border border-white/25
        bg-[#003366]/30 p-1.5
        backdrop-blur-sm
        xl:absolute xl:bottom-4 xl:left-0
        xl:mx-0 xl:mt-0
      "
    >
      <div className="rounded-lg bg-white p-2">
        <QRCode size={88} caption="" />
      </div>
    </motion.div>
  )
}

/* Larger campaign image with lower-left QR dock */
function CampaignVisual({ lang, isBangla, reduced }) {
  return (
    <motion.div
      variants={containerVariants}
      className="relative mx-auto w-full min-w-0 max-w-[720px] xl:ml-auto xl:mr-0"
    >
      <motion.div variants={imageVariants} className="relative z-10 ml-auto w-full min-w-0 max-w-[600px]">
        <motion.div
          whileHover={reduced ? undefined : { y: -3 }}
          transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          className="rounded-2xl"
        >
        <img
          src="/images/campaign.webp"
          alt={isBangla ? 'অগ্নিটক অ্যাপ এবং ভার্চুয়াল নম্বরের প্রচারণা' : 'AgniTalk campaign featuring the Agni virtual number and mobile app'}
          width="1000"
          height="1000"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-auto w-full rounded-2xl border border-white/20 object-contain"
        />
        </motion.div>
      </motion.div>
      <QRDownloadDock lang={lang} isBangla={isBangla} />
    </motion.div>
  )
}

/* ========================================
   Main Final CTA
======================================== */

export default function FinalCTA({
  lang = 'en',
  appStoreUrl = '#',
  googlePlayUrl = '#',
}) {
  const isBangla = lang === 'bn'
  const reduced = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="download"
        lang={lang}
        aria-labelledby="final-cta-title"
        className="
          agnitalk-ui relative isolate
          w-full overflow-hidden
          bg-[#005B96]
          py-7! sm:py-8! lg:py-9!
        "
      >
        <BrandBackground reduced={reduced} />
        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">

            <motion.div
              variants={containerVariants}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="
                relative z-10 grid
                grid-cols-1 items-center
                gap-7
                xl:grid-cols-12
                lg:gap-8 xl:gap-12
              "
            >
              {/* Left content */}
              <div
                className="
                  min-w-0 text-center
                  xl:col-span-5 xl:text-left
                "
              >
                {/* Editorial eyebrow */}
                <motion.div
                  variants={revealVariants}
                  className={`
                    mb-5 flex items-center
                    justify-center gap-2.5
                    text-[10px]
                    tracking-[0.16em]
                    text-white/90
                    xl:justify-start
                    ${isBangla ? 'tracking-normal!' : 'uppercase'}
                    ${bn(lang)}
                  `}
                >
                  <span
                    aria-hidden="true"
                    className="
                      h-[3px] w-6 shrink-0
                      rounded-full bg-[#F8E800]
                    "
                  />

                  {isBangla
                    ? 'আপনার পরবর্তী কথোপকথন'
                    : 'Your Next Conversation'}
                </motion.div>

                {/* Animated editorial headline */}
                <h2
                  id="final-cta-title"
                  style={display(lang)}
                  className={`
                    m-0
                    text-[clamp(30px,4vw,48px)]
                    leading-[1.08]
                    tracking-[-0.035em]
                    text-white
                    ${isBangla ? 'leading-[1.3]! tracking-normal!' : ''}
                    ${bn(lang)}
                  `}
                >
                  {(isBangla
                    ? [
                        'বিদায় অতিরিক্ত বিল।',
                        'স্বাগতম অগ্নিটক।',
                      ]
                    : [
                        'Goodbye high bills.',
                        'Hello AgniTalk.',
                      ]
                  ).map((line, index) => (
                    <span
                      key={line}
                      className="
                        block overflow-hidden
                        pb-[0.08em]
                      "
                    >
                      <motion.span
                        variants={revealVariants}
                        className={`
                          block
                          ${
                            index === 1
                              ? 'text-[#F8E800]'
                              : 'text-white'
                          }
                        `}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h2>

                {/* Description */}
                <motion.p
                  variants={revealVariants}
                  className={`
                    mx-auto mb-6 mt-4
                    max-w-[490px]
                    text-[15px]
                    leading-[1.7]
                    text-white/90
                    sm:text-[16px]
                    xl:mx-0
                    ${bn(lang)}
                  `}
                >
                  {isBangla
                    ? 'নিজস্ব ০৯৬০৬ নম্বর, ফ্রি অ্যাপ-টু-অ্যাপ এইচডি কল এবং সাশ্রয়ী কলরেট। আজই অগ্নিটক ডাউনলোড করুন।'
                    : 'Your own 09606 number, free app-to-app HD calls and affordable calling rates. Stay connected for less with AgniTalk.'}
                </motion.p>

                {/* Download buttons */}
                <motion.div
                  variants={containerVariants}
                  className="
                    mx-auto grid w-full
                    max-w-[420px]
                    grid-cols-1 gap-2.5 min-[420px]:grid-cols-2
                    sm:flex sm:w-auto
                    sm:max-w-none
                    sm:flex-wrap
                    sm:justify-center
                    xl:mx-0 xl:justify-start
                  "
                >
                  <StoreAnchor
                    href={googlePlayUrl}
                    isBangla={isBangla}
                    reduced={reduced}
                  />

                  <StoreAnchor
                    href={appStoreUrl}
                    apple
                    isBangla={isBangla}
                    reduced={reduced}
                  />
                </motion.div>

                {/* Availability information */}
                <motion.div
                  variants={revealVariants}
                  className="
                    mt-5 flex flex-wrap
                    items-center justify-center
                    gap-x-3 gap-y-2
                    text-[12px]
                    text-white/85
                    xl:justify-start
                  "
                >
                  <span
                    className={`
                      inline-flex items-center gap-1.5
                      ${bn(lang)}
                    `}
                  >
                    <FiSmartphone
                      size={15}
                      aria-hidden="true"
                    />

                    {isBangla
                      ? 'ফ্রি অ্যাপ ডাউনলোড'
                      : 'Free to download'}
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      h-1 w-1 rounded-full
                      bg-[#F8E800]
                    "
                  />

                  <span>Android & iOS</span>

                  <span
                    aria-hidden="true"
                    className="
                      h-1 w-1 rounded-full
                      bg-[#F8E800]
                    "
                  />

                  <span
                    className={bn(lang)}
                  >
                    {isBangla
                      ? 'সহজ রেজিস্ট্রেশন'
                      : 'Easy registration'}
                  </span>
                </motion.div>

              </div>

              {/* Right campaign showcase */}
              <div
                className="
                  relative min-w-0
                  xl:col-span-7
                "
              >
                <CampaignVisual
                  lang={lang}
                  isBangla={isBangla}
                  reduced={reduced}
                />
              </div>
            </motion.div>
        </div>
      </section>
    </MotionConfig>
  )
}
