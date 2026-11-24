
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import {
  FiArrowUpRight,
  FiCamera,
  FiDownload,
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
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const imageVariants = {
  hidden: {
    opacity: 0,
    x: 35,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/* ========================================
   Animated brand background
======================================== */

function BrandBackground({ reduced }) {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none absolute inset-0
        overflow-hidden
      "
    >
      {/* Blue brand composition */}
      <div
        className="
          absolute inset-0
          bg-linear-to-br
          from-[#004A80]
          via-[#0069A8]
          to-[#0088D0]
        "
      />

      {/* Asymmetric background panel */}
      <div
        className="
          absolute inset-y-0 right-0
          w-[48%] bg-[#0088D0]
          opacity-50
          [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]
        "
      />

      <motion.svg
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {/* Animated brand ribbons */}
        <motion.g
          fill="none"
          strokeLinecap="round"
          initial={false}
          animate={
            reduced
              ? {}
              : {
                  x: [0, -18, 0],
                  y: [0, 16, 0],
                  rotate: [0, 3, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            transformOrigin: '85% 50%',
          }}
        >
          <path
            d="M810 -130 C550 120 1320 120 1020 390 S760 570 1030 680"
            stroke="#E00010"
            strokeWidth="18"
            opacity=".85"
          />

          <path
            d="M870 -130 C610 120 1380 120 1080 390 S820 570 1090 680"
            stroke="#F58220"
            strokeWidth="34"
          />

          <path
            d="M930 -130 C670 120 1440 120 1140 390 S880 570 1150 680"
            stroke="#F8E800"
            strokeWidth="17"
          />
        </motion.g>

        {/* Subtle signal rings */}
        <g
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity=".12"
        >
          {[150, 200, 250, 300, 350].map((radius) => (
            <circle
              key={radius}
              cx="975"
              cy="240"
              r={radius}
            />
          ))}
        </g>

        {/* Moving signal point */}
        <motion.circle
          cx="975"
          cy="90"
          r="5"
          fill="#F8E800"
          initial={false}
          animate={
            reduced ? {} : { opacity: [1, 0.3, 1] }
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        />
      </motion.svg>

      {/* Maintain text readability */}
      <div
        className="
          absolute inset-0
          bg-linear-to-r
          from-[#004A80]
          via-[#005B96]/65
          to-transparent
        "
      />
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
              y: -4,
              scale: 1.025,
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
              hover:border-[#F8E800]
              hover:bg-[#F8E800]
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
   Floating QR code dock
======================================== */

function QRDownloadDock({
  lang,
  isBangla,
  reduced,
}) {
  return (
    <motion.div
      initial={
        reduced
          ? false
          : {
              opacity: 0,
              y: 25,
              scale: 0.95,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.65,
        delay: reduced ? 0 : 0.35,
      }}
      className="
        relative z-20
        -mt-10 w-full max-w-[285px]
        self-center
        sm:-mt-12
        lg:-ml-12 lg:self-start
      "
    >
      <motion.div
        initial={false}
        animate={
          reduced
            ? {}
            : {
                y: [0, -7, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          flex items-center gap-3
          rounded-2xl
          border border-white/50
          bg-white/85 p-3
          shadow-[0_18px_40px_-12px_rgba(0,51,102,0.3)]
          backdrop-blur-xl
        "
      >
        {/* Functional QR code */}
        <div
          className="
            relative shrink-0
            overflow-hidden rounded-xl
            border border-[#DCE8F0]
            bg-white p-2
          "
        >
          <QRCode size={76} caption="" />
        </div>

        {/* QR instructions */}
        <div className="min-w-0">
          <div
            className={`
              mb-1 flex items-center gap-1.5
              text-[9px] tracking-[0.12em]
              text-[#006DA8]
              ${isBangla ? 'tracking-normal!' : 'uppercase'}
              ${bn(lang)}
            `}
          >
            <FiCamera
              size={12}
              aria-hidden="true"
            />

            {isBangla
              ? 'স্ক্যান করুন'
              : 'Scan & Install'}
          </div>

          <strong
            className={`
              block text-[15px]
              font-semibold leading-snug
              text-[#003366]
              [font-synthesis:weight]
              ${bn(lang)}
            `}
          >
            {isBangla
              ? 'মিনিটেই শুরু করুন।'
              : 'Ready in minutes.'}
          </strong>

          <p
            className={`
              mb-0 mt-1 text-[11px]
              leading-relaxed text-[#526579]
              ${bn(lang)}
            `}
          >
            {isBangla
              ? 'ফোনের ক্যামেরা দিয়ে QR কোড স্ক্যান করুন।'
              : 'Open your phone camera to download.'}
          </p>
        </div>

        {/* Decorative download icon */}
        <span
          aria-hidden="true"
          className="
            absolute -right-2 -top-2
            flex h-7 w-7
            items-center justify-center
            rounded-full
            border-2 border-white
            bg-[#F8E800]
            text-[#003366]
          "
        >
          <FiDownload
            size={13}
            strokeWidth={2.5}
          />
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ========================================
   Campaign image showcase
======================================== */

function CampaignVisual({
  lang,
  isBangla,
  reduced,
}) {
  return (
    <motion.div
      variants={imageVariants}
      className="
        relative mx-auto flex
        w-full max-w-[380px]
        flex-col items-center
        lg:mx-0 lg:ml-auto
      "
    >
      {/* Background decorative shape */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          reduced
            ? {}
            : {
                rotate: [-10, -6, -10],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute inset-x-3 top-3
          aspect-square rounded-[26px]
          bg-[#F8E800]
          opacity-90
        "
      />

      {/* Secondary brand accent */}
      <div
        aria-hidden="true"
        className="
          absolute -right-3 top-8
          h-[75%] w-[85%]
          rotate-[8deg]
          rounded-[24px]
          border-2 border-white/35
        "
      />

      {/* Campaign image */}
      <motion.div
        initial={false}
        animate={
          reduced
            ? {}
            : {
                y: [0, -5, 0],
                rotate: [2, 0, 2],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          relative z-10 w-full
          max-w-[330px]
          overflow-hidden rounded-[22px]
          border border-white/40
          bg-white p-1.5
          shadow-[0_30px_60px_-20px_rgba(0,25,50,0.5)]
        "
      >
        <img
          src="/images/campaign.webp"
          alt={
            isBangla
              ? 'অগ্নিটক অ্যাপ এবং ভার্চুয়াল নম্বরের প্রচারণা'
              : 'AgniTalk campaign featuring the Agni virtual number and mobile app'
          }
          width="1000"
          height="1000"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="
            block aspect-square
            h-auto w-full
            rounded-[17px] object-cover
          "
        />
      </motion.div>

      {/* Floating QR download dock */}
      <QRDownloadDock
        lang={lang}
        isBangla={isBangla}
        reduced={reduced}
      />
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
          agnitalk-ui relative
          w-full overflow-hidden
          bg-[#F5F8FA]
          py-7! sm:py-9! lg:py-10!
        "
      >
        <div
          className="
            mx-auto w-full max-w-7xl
            px-4 sm:px-6 lg:px-8
          "
        >
          {/* Main campaign banner */}
          <div
            className="
              relative isolate overflow-hidden
              rounded-[24px]
              bg-[#005B96]
              sm:rounded-[28px]
              lg:rounded-[32px]
            "
          >
            <BrandBackground reduced={reduced} />

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
                gap-9 px-5 py-8
                sm:px-8 sm:py-10
                lg:grid-cols-12
                lg:gap-10 lg:px-12 lg:py-9
                xl:px-14
              "
            >
              {/* Left content */}
              <div
                className="
                  min-w-0 text-center
                  lg:col-span-7 lg:text-left
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
                    lg:justify-start
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
                    text-[clamp(34px,5vw,65px)]
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
                    lg:mx-0
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
                    grid-cols-2 gap-2.5
                    sm:flex sm:w-auto
                    sm:max-w-none
                    sm:flex-wrap
                    sm:justify-center
                    lg:mx-0 lg:justify-start
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
                    lg:justify-start
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

                {/* Brand signature */}
                <motion.div
                  variants={revealVariants}
                  aria-hidden="true"
                  className="
                    mt-6 flex items-center
                    justify-center gap-1
                    lg:justify-start
                  "
                >
                  <span className="h-[3px] w-8 rounded-full bg-[#F8E800]" />
                  <span className="h-[3px] w-5 rounded-full bg-[#F58220]" />
                  <span className="h-[3px] w-3 rounded-full bg-[#E00010]" />
                  <span className="h-[3px] w-2 rounded-full bg-[#0088D0]" />
                </motion.div>
              </div>

              {/* Right campaign showcase */}
              <div
                className="
                  relative min-w-0
                  lg:col-span-5
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
        </div>
      </section>
    </MotionConfig>
  )
}
