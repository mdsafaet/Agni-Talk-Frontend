
import { Link } from 'react-router-dom'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import {
  FiSmartphone,
  FiDownload,
  FiArrowUpRight,
} from 'react-icons/fi'
import {
  motion,
  MotionConfig,
  useReducedMotion,
} from 'framer-motion'

import { bn, display } from '../../utils/lang'

const MotionLink = motion.create(Link)

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
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
      <motion.svg
        viewBox="0 0 1440 240"
        preserveAspectRatio="xMidYMid slice"
        className="absolute h-full w-full"
      >
        <motion.g
          fill="none"
          strokeLinecap="round"
          initial={false}
          animate={
            reduced
              ? {}
              : {
                  x: [0, -25, 0],
                  y: [0, 12, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M1050 360 C1200 200 1100 30 1510 -70"
            stroke="#E00010"
            strokeWidth="24"
            opacity=".65"
          />

          <path
            d="M1120 390 C1270 210 1170 40 1570 -40"
            stroke="#F58220"
            strokeWidth="34"
          />

          <path
            d="M1190 420 C1340 220 1240 50 1630 -10"
            stroke="#F8E800"
            strokeWidth="18"
          />
        </motion.g>

        <g
          stroke="white"
          strokeWidth="1"
          opacity=".10"
          fill="none"
        >
          <circle cx="1420" cy="220" r="180" />
          <circle cx="1420" cy="220" r="230" />
          <circle cx="1420" cy="220" r="280" />
          <circle cx="1420" cy="220" r="330" />
        </g>
      </motion.svg>

      {/* Background contrast layer */}
      <div
        className="
          absolute inset-0
          bg-linear-to-r
          from-[#0088D0]
          via-[#0088D0]/90
          to-transparent
        "
      />
    </div>
  )
}

/* ========================================
   Animated app icon
======================================== */

function AppIcon({ reduced }) {
  return (
    <motion.div
      variants={itemVariants}
      aria-hidden="true"
      className="
        relative flex h-[76px] w-[76px]
        shrink-0 items-center justify-center
        rounded-[22px]
        border border-white/30
        bg-white/12
        backdrop-blur-md
        sm:h-[84px] sm:w-[84px]
      "
    >
      <motion.div
        animate={
          reduced
            ? {}
            : {
                y: [0, -4, 0],
                rotate: [-5, 3, -5],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <FiSmartphone
          size={38}
          strokeWidth={1.5}
          className="text-white"
        />
      </motion.div>

      {/* Animated download indicator */}
      <motion.span
        animate={
          reduced
            ? {}
            : {
                y: [0, -3, 0],
              }
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute -right-2 -top-2
          flex h-7 w-7
          items-center justify-center
          rounded-full
          border-[3px] border-[#0088D0]
          bg-[#F8E800]
          text-[#003366]
        "
      >
        <FiDownload size={13} strokeWidth={2.5} />
      </motion.span>
    </motion.div>
  )
}

/* ========================================
   Download button
======================================== */

function StoreButton({
  apple = false,
  isBangla,
  reduced,
}) {
  const Icon = apple ? FaApple : FaGooglePlay

  return (
    <MotionLink
      to="/download"
      variants={itemVariants}
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
        damping: 22,
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
        group relative flex min-h-[58px]
        min-w-0 items-center gap-3
        overflow-hidden rounded-xl
        border px-4 py-2.5
        font-agni-body no-underline
        transition-colors duration-300
        sm:min-w-[175px]
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
              border-white
              bg-white
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
          relative z-10 h-6 w-6 shrink-0
          ${apple ? 'text-white' : 'text-[#0088D0]'}
        `}
      />

      <span className="relative z-10 min-w-0 text-left">
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
            mt-0.5 block
            whitespace-nowrap
            text-[15px] font-semibold
            leading-tight
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
          ml-auto hidden h-4 w-4 shrink-0
          opacity-50
          transition-transform duration-300
          motion-safe:group-hover:-translate-y-0.5
          motion-safe:group-hover:translate-x-0.5
          sm:block
        "
      />
    </MotionLink>
  )
}

/* ========================================
   Main Download Bar
======================================== */

export default function DownloadBar({ lang = 'en' }) {
  const isBangla = lang === 'bn'
  const reduced = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="download-bar"
        lang={lang}
        aria-labelledby="download-bar-title"
        className="
          agnitalk-ui
          relative isolate w-full
          overflow-hidden
          bg-[#0088D0]
          py-6! sm:py-7! lg:py-8!
        "
      >
        <BrandBackground reduced={reduced} />

        <motion.div
          variants={containerVariants}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            relative z-10 mx-auto
            flex w-full max-w-7xl
            flex-col items-center
            justify-between gap-6
            px-4 sm:px-6 lg:px-8
            lg:flex-row lg:gap-10
          "
        >
          {/* Left content */}
          <div
            className="
              flex flex-col items-center
              gap-4 text-center
              sm:flex-row sm:gap-6 sm:text-left
            "
          >
            <AppIcon reduced={reduced} />

            <div className="min-w-0">
              <motion.div
                variants={itemVariants}
                className={`
                  mb-2 flex items-center
                  justify-center gap-2
                  text-[10px] tracking-[0.14em]
                  text-white/85
                  sm:justify-start
                  ${isBangla ? 'tracking-normal!' : 'uppercase'}
                  ${bn(lang)}
                `}
              >
                <span
                  aria-hidden="true"
                  className="
                    h-1.5 w-1.5 shrink-0
                    rounded-full bg-[#F8E800]
                  "
                />

                {isBangla
                  ? 'অ্যান্ড্রয়েড ও আইওএসে পাওয়া যাচ্ছে'
                  : 'Available on Android & iOS'}
              </motion.div>

              <motion.h2
                id="download-bar-title"
                variants={itemVariants}
                style={display(lang)}
                className={`
                  m-0 font-agni-heading
                  text-[24px] leading-[1.2]
                  text-white
                  sm:text-[28px] lg:text-[30px]
                  ${bn(lang)}
                `}
              >
                {isBangla
                  ? 'আপনার পৃথিবী, একটি অ্যাপ।'
                  : 'Your world. One app.'}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className={`
                  mb-0 mt-2
                  font-agni-body
                  text-[13px] leading-relaxed
                  text-white/90
                  sm:text-[14px]
                  ${bn(lang)}
                `}
              >
                {isBangla
                  ? 'অগ্নিটক ডাউনলোড করুন — মিনিটেই কথা বলা শুরু করুন।'
                  : 'Download AgniTalk and start calling in minutes.'}
              </motion.p>

              {/* Brand color signature */}
              <motion.div
                variants={itemVariants}
                aria-hidden="true"
                className="
                  mt-3 flex items-center
                  justify-center gap-1
                  sm:justify-start
                "
              >
                <motion.span
                  initial={false}
                  animate={
                    reduced
                      ? {}
                      : { width: [24, 34, 24] }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="
                    h-[3px] w-6
                    rounded-full bg-[#F8E800]
                  "
                />

                <span
                  className="
                    h-[3px] w-4
                    rounded-full bg-[#F58220]
                  "
                />

                <span
                  className="
                    h-[3px] w-2
                    rounded-full bg-[#E00010]
                  "
                />
              </motion.div>
            </div>
          </div>

          {/* Store download buttons */}
          <div
            className="
              grid w-full max-w-[420px]
              shrink-0 grid-cols-2
              gap-2.5
              sm:flex sm:w-auto sm:max-w-none
              sm:gap-3
            "
          >
            <StoreButton
              isBangla={isBangla}
              reduced={reduced}
            />

            <StoreButton
              apple
              isBangla={isBangla}
              reduced={reduced}
            />
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}
