import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiLock, FiShield, FiStar, FiPause, FiPlay, FiBarChart2, FiPhone } from 'react-icons/fi'
import { motion, AnimatePresence, MotionConfig, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'




const reveal = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: .5, ease: [.22, 1, .36, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: .08 } } }

const screens = [
  { src: '/app/agni-number.jpg', en: 'Your own number', bn: 'নিজস্ব নাম্বার', detail: 'A dedicated 09606 virtual number.', detailBn: 'নিজস্ব ০৯৬০৬ ভার্চুয়াল নাম্বার।' },
  { src: '/app/free-calls.jpg', en: 'Free calls', bn: 'ফ্রি কল', detail: 'HD app-to-app voice and video calls.', detailBn: 'অ্যাপ থেকে অ্যাপে এইচডি ভয়েস ও ভিডিও কল।' },
  { src: '/app/low-rates.jpg', en: 'Low rates', bn: 'কম কলরেট', detail: 'Affordable calls to any number.', detailBn: 'সাশ্রয়ী খরচে যেকোনো নাম্বারে কল।' },
  { src: '/app/low-bandwidth.jpg', en: 'Data saver', bn: 'ডাটা সেভার', detail: 'Up to 70% lower data usage.', detailBn: '৭০% পর্যন্ত কম ডাটা ব্যবহার।' },
  { src: '/app/privacy.jpg', en: 'Privacy', bn: 'গোপনীয়তা', detail: 'TLS encrypted communication.', detailBn: 'TLS এনক্রিপ্টেড যোগাযোগ।' },
]

function FloatingFeature({ className, icon, title, subtitle, delay, x, y, reduced }) {
  return (
    <motion.div className={`agt-float-position ${className}`} style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}>
      <motion.div className="agt-float-enter" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .65, delay: reduced ? 0 : delay }}>
        <div className="agt-float-card" style={{ '--float-delay': `${-delay * 3}s` }}>
          <span className="agt-float-icon">{icon}</span>
          <span className="agt-float-text"><strong>{title}</strong><small>{subtitle}</small></span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function StoreLink({ apple, bn }) {
  const Icon = apple ? FaApple : FaGooglePlay
  return <Link to="/download" className="agt-store" aria-label={apple ? 'Download on the App Store' : 'Get it on Google Play'}>
    <Icon aria-hidden="true" size={23} />
    <span><small>{bn ? 'ডাউনলোড করুন' : apple ? 'Download on the' : 'GET IT ON'}</small><strong>{apple ? 'App Store' : 'Google Play'}</strong></span>
    <FiArrowUpRight className="agt-store-arrow" aria-hidden="true" />
  </Link>
}

export default function Hero({ lang = 'en' }) {
  const bn = lang === 'bn'
  const [active, setActive] = useState(0)
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
    const timer = window.setInterval(() => setActive(i => (i + 1) % screens.length), 5000)
    return () => window.clearInterval(timer)
  }, [playing, hovered, focused, active])
  const select = i => { setActive((i + screens.length) % screens.length); setPlaying(false) }
  const current = screens[active]
  const running = playing && !hovered && !focused
  const reduced = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-1, 1], [3, -3]), { stiffness: 110, damping: 22 })
  const ry = useSpring(useTransform(px, [-1, 1], [-4, 4]), { stiffness: 110, damping: 22 })
  const cardX = useSpring(useTransform(px, [-1, 1], [-4, 4]), { stiffness: 90, damping: 22 })
  const cardY = useSpring(useTransform(py, [-1, 1], [-3, 3]), { stiffness: 90, damping: 22 })
  const reverseX = useTransform(cardX, v => -v)
  const reverseY = useTransform(cardY, v => -v)
  const move = e => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width * 2 - 1)
    py.set((e.clientY - r.top) / r.height * 2 - 1)
  }
  const reset = () => { px.set(0); py.set(0) }
  return (
    <MotionConfig reducedMotion="user"><section className={`agt-hero ${bn ? 'agt-bn' : ''}`} lang={lang} aria-labelledby="hero-title">
      <div className="agt-shell">
        <div className="agt-main">
          <motion.div className="agt-copy" variants={stagger} initial={reduced ? false : "hidden"} animate="visible">
            <motion.div variants={reveal} className="agt-kicker"><span aria-hidden="true" />{bn ? 'বাংলাদেশের আইপি টেলিফোনি অ্যাপ' : 'IP TELEPHONY MADE FOR BANGLADESH'}</motion.div>
            <h1 id="hero-title">{(bn ? ['দূরত্ব যতই হোক,','কথা হোক।'] : ['Talk more.','Spend less.']).map((line,i) => <span className="agt-line" key={line}><motion.span variants={reveal} className={i === 1 ? 'agt-accent' : ''}>{line}</motion.span></span>)}</h1>
            <motion.p variants={reveal} className="agt-description">{bn ? 'নিজস্ব ০৯৬০৬ নাম্বার, ফ্রি এইচডি ভয়েস ও ভিডিও কল, মেসেজিং এবং সাশ্রয়ী কলরেট। বিকাশ দিয়ে সহজেই রিচার্জ করুন।' : 'Your own 09606 number. Free app-to-app HD calls and messaging, affordable calls to any number, and instant bKash top-ups.'}</motion.p>
            <motion.div variants={reveal} className="agt-stores"><StoreLink bn={bn}/><StoreLink apple bn={bn}/></motion.div>
            <motion.div variants={reveal} className="agt-trust">
              <Link to="/security"><FiLock aria-hidden="true"/>{bn ? 'TLS এনক্রিপ্টেড' : 'TLS encrypted'}</Link>
              <Link to="/about"><FiShield aria-hidden="true"/>{bn ? 'বিটিআরসি লাইসেন্সপ্রাপ্ত' : 'BTRC licensed'}</Link>
              <Link to="/download"><FiStar aria-hidden="true"/>{bn ? '৪.৫ প্লে স্টোর' : '4.5 on Play Store'}</Link>
            </motion.div>
          </motion.div>
          <motion.div initial={reduced ? false : {opacity:0, y:12}} animate={{opacity:1,y:0}} transition={{duration:.85}} onPointerMove={move} onPointerLeave={reset} className="agt-stage" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false) }}>
            <svg className="agt-signal" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
              {[100,150,200].map(r => <circle key={r} cx="350" cy="280" r={r} fill="none" stroke="currentColor" strokeWidth="1"/>)}
              
            </svg>
            <div className="agt-stage-top"><span>{bn ? 'অগ্নিটক অ্যাপ' : 'EXPLORE AGNITALK'}</span><span>{String(active + 1).padStart(2,'0')} — 05</span></div>
            <div className="agt-device-area">
              <motion.div className="agt-device-rig" style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry }}>
                <div className="agt-device">
                  <AnimatePresence initial={false}>
                    <motion.img key={current.src} src={current.src} alt={bn ? current.bn : current.en} initial={reduced ? false : {opacity:0,x:8}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,x:-8}} transition={{duration:reduced ? 0 : .45}} width="600" height="1194" draggable={false}/>
                  </AnimatePresence>
                </div>
              </motion.div>
              <FloatingFeature className="agt-float-data" icon={<FiBarChart2 aria-hidden="true" />} title={bn ? '৭০% ডাটা সেভিং' : '70% Data Saved'} subtitle="Byte Saver™" delay={.3} x={reverseX} y={cardY} reduced={reduced} />
              <FloatingFeature className="agt-float-bkash" icon={<img src="/images/bkash.png" alt="" width="36" height="28" />} title={bn ? 'বিকাশ রেডি' : 'bKash Ready'} subtitle={bn ? 'তাৎক্ষণিক রিচার্জ' : 'Instant Top-up'} delay={.5} x={cardX} y={reverseY} reduced={reduced} />
              <FloatingFeature className="agt-float-number" icon={<FiPhone aria-hidden="true" />} title={bn ? '০৯৬০৬ নাম্বার' : '09606 Number'} subtitle={bn ? 'ভার্চুয়াল আইপিটিএসপি' : 'Virtual IPTSP'} delay={.7} x={reverseX} y={reverseY} reduced={reduced} />
              
              
            </div>
            <div className="agt-stage-bottom">
              <div className="agt-caption" aria-live={playing ? 'off' : 'polite'}><AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={reduced ? false : {opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:reduced ? 0 : .18}}><strong>{bn ? current.bn : current.en}</strong><span>{bn ? current.detailBn : current.detail}</span></motion.div></AnimatePresence></div>
              <div className="agt-controls">
                <button type="button" onClick={() => select(active - 1)} aria-label={bn ? 'আগের স্ক্রিন' : 'Previous screen'}><FiChevronLeft/></button>
                <button type="button" onClick={() => { setPlaying(p => !p); setFocused(false); setHovered(false) }} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>{playing ? <FiPause/> : <FiPlay/>}</button>
                <button type="button" onClick={() => select(active + 1)} aria-label={bn ? 'পরের স্ক্রিন' : 'Next screen'}><FiChevronRight/></button>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="agt-feature-nav" role="group" aria-label={bn ? 'অ্যাপের ফিচার' : 'Explore app features'}>
          {screens.map((s,i) => <button type="button" key={s.src} aria-pressed={active === i} onClick={() => select(i)} className={active === i ? 'is-active' : ''}>{active === i && <motion.span layoutId="agt-active-track" className="agt-active-track" transition={{type:"spring",stiffness:300,damping:30}}/>}<span className="agt-feature-number">0{i + 1}</span><span>{bn ? s.bn : s.en}</span><FiArrowUpRight aria-hidden="true"/>{active === i && <span key={`${active}-${running}`} className={`agt-progress ${running ? "is-run" : "is-still"}`} aria-hidden="true"/>}</button>)}
        </div>
      </div>
    </section></MotionConfig>
  )
}
