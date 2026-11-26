import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import {
  FiArrowUpRight,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiLock,
  FiPause,
  FiPhone,
  FiPlay,
  FiShield,
  FiStar,
} from 'react-icons/fi'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

const SLIDE_INTERVAL = 2500

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.085 } },
}

const slideVariants = {
  enter: ({ direction, reduced }) => reduced
    ? { opacity: 0, x: 0, scale: 1 }
    : { x: direction > 0 ? '100%' : '-100%', opacity: 0.72, scale: 0.96 },
  center: ({ reduced }) => ({
    x: '0%', opacity: 1, scale: 1,
    transition: reduced ? { duration: 0 } : {
      x: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.35 },
      scale: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
    },
  }),
  exit: ({ direction, reduced }) => reduced
    ? { opacity: 0, transition: { duration: 0 } }
    : {
        x: direction > 0 ? '-100%' : '100%', opacity: 0.65, scale: 0.96,
        transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
      },
}

const screens = [
  {
    src: '/app/agni-number.jpg',
    en: 'Your own number',
    bn: 'নিজস্ব নাম্বার',
    detail: 'A dedicated 09606 virtual number.',
    detailBn: 'নিজস্ব ০৯৬০৬ ভার্চুয়াল নাম্বার।',
  },
  {
    src: '/app/free-calls.jpg',
    en: 'Free calls',
    bn: 'ফ্রি কল',
    detail: 'HD app-to-app voice and video calls.',
    detailBn: 'অ্যাপ থেকে অ্যাপে এইচডি ভয়েস ও ভিডিও কল।',
  },
  {
    src: '/app/low-rates.jpg',
    en: 'Low rates',
    bn: 'কম কলরেট',
    detail: 'Affordable calls to any number.',
    detailBn: 'সাশ্রয়ী খরচে যেকোনো নাম্বারে কল।',
  },
  {
    src: '/app/low-bandwidth.jpg',
    en: 'Data saver',
    bn: 'ডাটা সেভার',
    detail: 'Up to 70% lower data usage.',
    detailBn: '৭০% পর্যন্ত কম ডাটা ব্যবহার।',
  },
  {
    src: '/app/privacy.jpg',
    en: 'Privacy',
    bn: 'গোপনীয়তা',
    detail: 'TLS encrypted communication.',
    detailBn: 'TLS এনক্রিপ্টেড যোগাযোগ।',
  },
]

function FloatingFeature({ className, icon, title, subtitle, delay, x, y, reduced }) {
  return (
    <motion.div
      className={`agt-float-position ${className}`}
      style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
    >
      <motion.div
        className="agt-float-enter"
        initial={reduced ? false : { opacity: 0, y: 14, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 22,
          delay: reduced ? 0 : delay,
        }}
        whileHover={reduced ? undefined : { scale: 1.05, y: -3 }}
      >
        <div className="agt-float-card" style={{ '--float-delay': `${-delay * 3}s` }}>
          <span className="agt-float-icon">{icon}</span>
          <span className="agt-float-text">
            <strong>{title}</strong>
            <small>{subtitle}</small>
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function StoreLink({ apple, bn }) {
  const Icon = apple ? FaApple : FaGooglePlay
  return (
    <Link
      to="/download"
      className="agt-store"
      aria-label={apple ? 'Download on the App Store' : 'Get it on Google Play'}
    >
      <Icon aria-hidden="true" size={23} />
      <span>
        <small>{bn ? 'ডাউনলোড করুন' : apple ? 'Download on the' : 'GET IT ON'}</small>
        <strong>{apple ? 'App Store' : 'Google Play'}</strong>
      </span>
      <FiArrowUpRight className="agt-store-arrow" aria-hidden="true" />
    </Link>
  )
}

export default function Hero({ lang = 'en' }) {
  const bn = lang === 'bn'
  const [[active, direction], setSlide] = useState([0, 1])
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setPlaying(!media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!playing || hovered || focused) return
    const timer = window.setInterval(() => {
      setSlide(([prev]) => [(prev + 1) % screens.length, 1])
    }, SLIDE_INTERVAL)
    return () => window.clearInterval(timer)
  }, [playing, hovered, focused, active])

  useEffect(() => {
    screens.forEach(({ src }) => {
      const image = new Image()
      image.src = src
    })
  }, [])

  const select = (nextIndex, explicitDir) => {
    const wrapped = (nextIndex + screens.length) % screens.length
    const dir = explicitDir ?? (wrapped >= active ? 1 : -1)
    setSlide([wrapped, dir])
    setPlaying(false)
  }

  const current = screens[active]
  const running = playing && !hovered && !focused
  const reduced = useReducedMotion()

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const cardX = useSpring(useTransform(px, [-1, 1], [-8, 8]), { stiffness: 120, damping: 20 })
  const cardY = useSpring(useTransform(py, [-1, 1], [-6, 6]), { stiffness: 120, damping: 20 })
  const reverseX = useTransform(cardX, (v) => -v)
  const reverseY = useTransform(cardY, (v) => -v)
  const tiltY = useSpring(useTransform(px, [-1, 1], [-6, 6]), { stiffness: 110, damping: 22 })
  const tiltX = useSpring(useTransform(py, [-1, 1], [6, -6]), { stiffness: 110, damping: 22 })

  const move = (e) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        className={`agt-hero ${bn ? 'agt-bn' : ''}`}
        style={{ '--agt-slide-duration': `${SLIDE_INTERVAL}ms` }}
        lang={lang}
        aria-labelledby="hero-title"
      >
        <div className="agt-ambient-orb agt-orb-1" aria-hidden="true" />
        <div className="agt-ambient-orb agt-orb-2" aria-hidden="true" />

        <div className="agt-shell">
          <div className="agt-main">
            <motion.div
              className="agt-copy"
              variants={stagger}
              initial={reduced ? false : 'hidden'}
              animate="visible"
            >
              <motion.div variants={reveal} className="agt-kicker">
                <span className="agt-live-dot" aria-hidden="true" />
                {bn ? 'বাংলাদেশের আইপি টেলিফোনি অ্যাপ' : 'IP TELEPHONY MADE FOR BANGLADESH'}
              </motion.div>

              <h1 id="hero-title">
                {(bn ? ['এইচডি আইপি টেলিফোনি', 'ও ফ্রি মেসেজিং', 'সাশ্রয়ী কলরেটে'] : ['HD IP Telephony &', 'Free Messaging at', 'Unbeatable Rates']).map(
                  (line, i) => (
                    <span className="agt-line" key={line}>
                      <motion.span variants={reveal} className={i === 2 ? 'agt-accent' : ''}>
                        {line}
                      </motion.span>
                    </span>
                  )
                )}
              </h1>

              <motion.p variants={reveal} className="agt-description">
                {bn ? (
                  <>আপনার নিজস্ব <strong>০৯৬০৬ ভার্চুয়াল নম্বর</strong> পান। উপভোগ করুন ফ্রি অ্যাপ-টু-অ্যাপ এইচডি ভয়েস ও ভিডিও কল, তাৎক্ষণিক বিকাশ রিচার্জ এবং বাংলাদেশের যেকোনো নেটওয়ার্কে <strong>৭০% পর্যন্ত কম ডাটা ব্যবহার</strong>।</>
                ) : (
                  <>Get your dedicated <strong>09606 virtual number</strong>. Enjoy free app-to-app HD voice &amp; video calls, instant bKash top-ups, and up to <strong>70% lower data usage</strong> on any network across Bangladesh.</>
                )}
              </motion.p>

              <motion.div variants={reveal} className="agt-stores">
                <StoreLink bn={bn} />
                <StoreLink apple bn={bn} />
              </motion.div>

              <motion.div variants={reveal} className="agt-trust">
                <Link to="/security" className="agt-trust-card agt-trust-security">
                  <span className="agt-trust-icon"><FiLock aria-hidden="true" /></span>
                  <span className="agt-trust-label">{bn ? 'TLS এনক্রিপ্টেড' : 'TLS encrypted'}</span>
                </Link>
                <Link to="/about" className="agt-trust-card agt-trust-license">
                  <span className="agt-trust-icon"><FiShield aria-hidden="true" /></span>
                  <span className="agt-trust-label">{bn ? 'বিটিআরসি লাইসেন্সপ্রাপ্ত' : 'BTRC licensed'}</span>
                </Link>
                <Link to="/download" className="agt-trust-card agt-trust-rating">
                  <span className="agt-trust-icon"><FiStar aria-hidden="true" /></span>
                  <span className="agt-trust-label">{bn ? '৪.৫ প্লে স্টোর' : '4.5 on Play Store'}</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              onPointerMove={move}
              onPointerLeave={reset}
              className="agt-stage"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocusCapture={() => setFocused(true)}
              onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
              }}
            >
              <div className="agt-stage-top">
                <span>{bn ? 'অগ্নিটক অ্যাপ' : 'EXPLORE AGNITALK'}</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active}
                    initial={reduced ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                  >
                    {String(active + 1).padStart(2, '0')} — {String(screens.length).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="agt-device-area">
                <div className="agt-stage-glow" aria-hidden="true" />
                <div className="agt-stage-ring" aria-hidden="true" />

                {/* 3D Tilting Phone Rig */}
                <motion.div
                  className="agt-phone-rig"
                  style={
                    reduced
                      ? undefined
                      : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }
                  }
                  animate={reduced ? { y: 0 } : { y: [0, -10, 0] }}
                  transition={{
                    duration: 3.2,
                    repeat: reduced ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="agt-phone-frame">
                    {/* Hardware side buttons */}
                    <span className="agt-phone-btn agt-phone-vol-up" aria-hidden="true" />
                    <span className="agt-phone-btn agt-phone-vol-down" aria-hidden="true" />
                    <span className="agt-phone-btn agt-phone-power" aria-hidden="true" />

                    {/* Inner Screen Bezel */}
                    <div className="agt-phone-screen">
                      {/* Dynamic Island / Speaker Notch */}
                      <div className="agt-phone-island" aria-hidden="true">
                        <span className="agt-phone-speaker" />
                        <span className="agt-phone-camera" />
                      </div>

                      {/* Screen Slideshow */}
                      <AnimatePresence
                        initial={false}
                        mode="sync"
                        custom={{ direction, reduced }}
                      >
                        <motion.div
                          key={current.src}
                          custom={{ direction, reduced }}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="agt-phone-slide"
                        >
                          <img
                            src={current.src}
                            alt={bn ? current.bn : current.en}
                            width="600"
                            height="1194"
                            draggable={false}
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Subtle Screen Glass Glare & Home Indicator */}
                      <div className="agt-phone-glare" aria-hidden="true" />
                      <div className="agt-phone-home-bar" aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>

                <FloatingFeature
                  className="agt-float-data"
                  icon={<FiBarChart2 aria-hidden="true" />}
                  title={bn ? '৭০% ডাটা সেভিং' : '70% Data Saved'}
                  subtitle="Byte Saver™"
                  delay={0.25}
                  x={reverseX}
                  y={cardY}
                  reduced={reduced}
                />
                <FloatingFeature
                  className="agt-float-bkash"
                  icon={<img src="/images/bkash.png" alt="" width="36" height="28" />}
                  title={bn ? 'বিকাশ রেডি' : 'bKash Ready'}
                  subtitle={bn ? 'তাৎক্ষণিক রিচার্জ' : 'Instant Top-up'}
                  delay={0.4}
                  x={cardX}
                  y={reverseY}
                  reduced={reduced}
                />
                <FloatingFeature
                  className="agt-float-number"
                  icon={<FiPhone aria-hidden="true" />}
                  title={bn ? '০৯৬০৬ নাম্বার' : '09606 Number'}
                  subtitle={bn ? 'ভার্চুয়াল আইপিটিএসপি' : 'Virtual IPTSP'}
                  delay={0.55}
                  x={reverseX}
                  y={reverseY}
                  reduced={reduced}
                />
              </div>

              <div className="agt-stage-bottom">
                <div className="agt-caption" aria-live={playing ? 'off' : 'polite'}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <strong>{bn ? current.bn : current.en}</strong>
                      <span>{bn ? current.detailBn : current.detail}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="agt-controls">
                  <button
                    type="button"
                    onClick={() => select(active - 1, -1)}
                    aria-label={bn ? 'আগের স্ক্রিন' : 'Previous screen'}
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={
                      playing
                        ? bn
                          ? 'স্লাইডশো থামান'
                          : 'Pause slideshow'
                        : bn
                          ? 'স্লাইডশো চালু করুন'
                          : 'Play slideshow'
                    }
                  >
                    {playing ? <FiPause /> : <FiPlay />}
                  </button>
                  <button
                    type="button"
                    onClick={() => select(active + 1, 1)}
                    aria-label={bn ? 'পরের স্ক্রিন' : 'Next screen'}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div
            className="agt-feature-nav"
            role="group"
            aria-label={bn ? 'অ্যাপের ফিচার' : 'Explore app features'}
          >
            {screens.map((s, i) => (
              <button
                type="button"
                key={s.src}
                aria-pressed={active === i}
                onClick={() => select(i, i > active ? 1 : -1)}
                className={active === i ? 'is-active' : ''}
              >
                {active === i && (
                  <motion.span
                    layoutId="agt-active-track"
                    className="agt-active-track"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="agt-feature-number">0{i + 1}</span>
                <span>{bn ? s.bn : s.en}</span>
                <FiArrowUpRight aria-hidden="true" />
                {active === i && (
                  <span
                    key={`${active}-${running}`}
                    className={`agt-progress ${running ? 'is-run' : 'is-still'}`}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
