
import { Link } from 'react-router-dom'

import {
  IconData,
  IconHash,
  IconPhone,
  IconWallet,
} from '../icons/Icons'

import {
  FiArrowUpRight,
  FiCreditCard,
  FiTrendingDown,
} from 'react-icons/fi'

import {
  motion,
  useReducedMotion,
} from 'framer-motion'

import { bn, display } from '../../utils/lang'

const BENEFITS = [
  {
    id: 'calling',
    Icon: IconPhone,
    en: {
      title: 'Ultra-Low Call Tariffs',
      desc: 'Call any mobile operator or landline in Bangladesh at a fraction of standard mobile costs.',
      action: 'Compare Rates',
    },
    bn: {
      title: 'সর্বনিম্ন কল রেট',
      desc: 'বাংলাদেশের যেকোনো মোবাইল বা ল্যান্ডলাইনে কথা বলুন স্বল্পতম খরচে।',
      action: 'রেট দেখুন',
    },
    href: '/rates',
    iconTheme: 'bg-[#EDF6FC] text-[#0088D0]',
    accent: 'bg-[#0088D0]',
  },
  {
    id: 'data',
    Icon: IconData,
    en: {
      title: '70% Data Saver',
      desc: 'Powered by Byte Saver™ technology. Enjoy clear calls even on slow 2G/3G networks across Bangladesh.',
      action: 'Learn More',
    },
    bn: {
      title: '৭০% ডাটা সাশ্রয়',
      desc: 'Byte Saver™ প্রযুক্তিতে ধীর নেটওয়ার্কেও পরিষ্কার কল উপভোগ করুন।',
      action: 'আরো জানুন',
    },
    href: '/features',
    iconTheme: 'bg-[#FFF3E8] text-[#C56B16]',
    accent: 'bg-[#F58220]',
  },
  {
    id: 'payment',
    Icon: IconWallet,
    en: {
      title: 'Instant Local Top-Up',
      desc: 'Recharge seamlessly via bKash, Nagad, or debit and credit cards in seconds.',
      action: 'Top Up Now',
    },
    bn: {
      title: 'তাৎক্ষণিক রিচার্জ',
      desc: 'বিকাশ, নগদ বা কার্ড দিয়ে মুহূর্তেই ব্যালেন্স যোগ করুন।',
      action: 'এখনই রিচার্জ',
    },
    href: '/packages',
    iconTheme: 'bg-[#FDEFF0] text-[#E00010]',
    accent: 'bg-[#E00010]',
  },
  {
    id: 'number',
    Icon: IconHash,
    en: {
      title: 'Your Own 09606 Number',
      desc: 'Get a dedicated IPTSP virtual phone number automatically matched to your existing mobile number’s digits.',
      action: 'Get Your Number',
    },
    bn: {
      title: 'নিজের ০৯৬০৬ নম্বর',
      desc: 'আপনার মোবাইল নম্বরের সাথে মিলিয়ে স্বয়ংক্রিয়ভাবে একটি IPTSP ভার্চুয়াল নম্বর পান।',
      action: 'নম্বর পান',
    },
    href: '/how-it-works',
    iconTheme: 'bg-[#FFFBE0] text-[#817400]',
    accent: 'bg-[#F8E800]',
  },
]

/* Animation configuration */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/* Compact benefit illustrations */

function BenefitVisual({ id, isBangla, reduced }) {
  const visualClass = `
    relative my-4 flex min-h-[64px]
    items-center justify-between gap-3
  `

  switch (id) {
    case 'calling':
      return (
        <div aria-hidden="true" className={visualClass}>
          <span
            className="
              font-agni-heading
              text-[23px] leading-tight
              tracking-tight text-[#003366]
            "
          >
            {isBangla ? 'কম খরচে কথা।' : 'Talk for less.'}
          </span>

          <FiTrendingDown
            size={35}
            strokeWidth={1.3}
            className="
              shrink-0 text-[#0088D0]/70
              transition-transform duration-300
              motion-safe:group-hover:translate-y-1
            "
          />
        </div>
      )

    case 'data':
      return (
        <div aria-hidden="true" className={visualClass}>
          <span
            className="
              font-agni-heading
              text-[44px] leading-none
              tracking-tight text-[#003366]
            "
          >
            {isBangla ? '৭০%' : '70%'}
          </span>

          <div className="flex h-11 items-end gap-1">
            {[42, 34, 26, 18, 11].map((height, index) => (
              <motion.span
                key={index}
                initial={
                  reduced ? false : { scaleY: 0 }
                }
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduced ? 0 : 0.45,
                  delay: reduced ? 0 : index * 0.06,
                }}
                style={{
                  height,
                  opacity: 0.85 - index * 0.12,
                  transformOrigin: 'bottom',
                }}
                className="w-2 rounded-sm bg-[#F58220]"
              />
            ))}
          </div>
        </div>
      )

    case 'payment':
      return (
        <div
          aria-hidden="true"
          className="my-4 flex min-h-[64px] items-center gap-2"
        >
          <div
            className="
              flex h-11 min-w-0 flex-1
              items-center justify-center
              rounded-lg border border-slate-200
              bg-white px-2
            "
          >
            <img
              src="/images/bkash.png"
              alt=""
              width="60"
              height="36"
              loading="lazy"
              className="h-7 w-full max-w-[60px] object-contain"
            />
          </div>

          <div
            className="
              flex h-11 min-w-0 flex-1
              items-center justify-center
              rounded-lg border border-slate-200
              bg-white px-2
            "
          >
            <span
              className="
                text-sm font-semibold
                text-[#C64C21]
                [font-synthesis:weight]
              "
            >
              {isBangla ? 'নগদ' : 'Nagad'}
            </span>
          </div>

          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-lg border border-slate-200
              text-[#0088D0]
            "
          >
            <FiCreditCard size={22} strokeWidth={1.5} />
          </div>
        </div>
      )

    case 'number':
      return (
        <div aria-hidden="true" className={visualClass}>
          <div>
            <span
              className="
                block font-agni-heading
                text-[40px] leading-none
                tracking-tight text-[#003366]
              "
            >
              {isBangla ? '০৯৬০৬' : '09606'}
            </span>

            <span
              className="
                mt-2 block h-[3px] w-12
                rounded-full bg-[#F8E800]
                transition-[width] duration-300
                motion-safe:group-hover:w-20
              "
            />
          </div>

          <span
            className="
              font-agni-heading text-[48px]
              leading-none text-[#003366]/10
            "
          >
            #
          </span>
        </div>
      )

    default:
      return null
  }
}

/* Benefit card */

function BenefitCard({
  benefit,
  index,
  lang,
  isBangla,
  reduced,
}) {
  const content = isBangla ? benefit.bn : benefit.en
  const { Icon } = benefit
  const titleId = `benefit-title-${benefit.id}`

  return (
    <motion.li
      variants={itemVariants}
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 28,
      }}
      className="h-full min-w-0"
    >
      <Link
        to={benefit.href}
        aria-labelledby={titleId}
        className="
          group relative flex h-full min-w-0
          flex-col overflow-hidden
          rounded-[16px] border border-[#E0E7ED]
          bg-white p-4 no-underline
          transition-[border-color,box-shadow]
          duration-300
          sm:p-5

          hover:border-[#0088D0]/35
          hover:shadow-[0_8px_24px_-12px_rgba(0,51,102,0.15)]

          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[#0088D0]
        "
      >
        {/* Card header */}

        <div className="flex items-center justify-between">
          <span
            aria-hidden="true"
            className={`
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              [&_svg]:h-5 [&_svg]:w-5
              ${benefit.iconTheme}
            `}
          >
            <Icon />
          </span>

          <span
            aria-hidden="true"
            className="
              text-[12px] tabular-nums
              text-slate-400
            "
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Compact illustration */}

        <BenefitVisual
          id={benefit.id}
          isBangla={isBangla}
          reduced={reduced}
        />

        {/* Card content */}

        <h3
          id={titleId}
          className={`
            mb-2 text-[17px]
            leading-snug text-[#003366]
            sm:text-[18px]
            ${bn(lang)}
          `}
          style={display(lang)}
        >
          {content.title}
        </h3>

        <p
          className={`
            mb-4 text-[13px]
            leading-[1.7] text-slate-600
            ${bn(lang)}
          `}
        >
          {content.desc}
        </p>

        {/* Card action */}

        <div
          className="
            mt-auto flex items-center
            justify-between gap-2
            border-t border-slate-200/80
            pt-3
          "
        >
          <span
            className={`
              text-[13px] font-medium
              text-[#0073B1]
              [font-synthesis:weight]
              ${bn(lang)}
            `}
          >
            {content.action}
          </span>

          <span
            aria-hidden="true"
            className="
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-lg
              text-[#0073B1]
              transition-colors duration-200
              group-hover:bg-[#EDF6FC]
            "
          >
            <FiArrowUpRight
              size={17}
              strokeWidth={1.8}
              className="
                transition-transform duration-200
                motion-safe:group-hover:-translate-y-0.5
                motion-safe:group-hover:translate-x-0.5
              "
            />
          </span>
        </div>

        {/* Subtle brand accent on hover */}

        <span
          aria-hidden="true"
          className={`
            absolute inset-x-0 bottom-0
            h-[2px] origin-left scale-x-0
            transition-transform duration-300
            group-hover:scale-x-100
            group-focus-visible:scale-x-100
            motion-reduce:transition-none
            ${benefit.accent}
          `}
        />
      </Link>
    </motion.li>
  )
}

/* Main Benefits section */

export default function Benefits({ lang = 'en' }) {
  const isBangla = lang === 'bn'
  const reduced = useReducedMotion()

  return (
    <section
      id="benefits"
      lang={lang}
      aria-labelledby="benefits-title"
      className="
        agnitalk-ui relative w-full
        border-b border-slate-200/70
        bg-[#F8FAFC]
        py-8! sm:py-10! lg:py-11!
      "
    >
      <div
        className="
          mx-auto w-full max-w-7xl
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* Section heading */}

        <motion.div
          initial={
            reduced ? false : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduced ? 0 : 0.45 }}
          className="
            mb-6 flex flex-col
            justify-between gap-3
            lg:flex-row lg:items-end
          "
        >
          <div>
            <div
              className={`
                mb-2 flex items-center gap-2
                text-[10px] tracking-wider
                text-[#0073B1]
                ${isBangla ? 'tracking-normal!' : 'uppercase'}
                ${bn(lang)}
              `}
            >
              <span
                aria-hidden="true"
                className="
                  h-[3px] w-5 shrink-0
                  rounded-full bg-[#0088D0]
                "
              />

              {isBangla
                ? 'অগ্নিটকের বিশেষত্ব'
                : 'The AgniTalk Advantage'}
            </div>

            <h2
              id="benefits-title"
              style={display(lang)}
              className={`
                m-0
                text-[clamp(25px,3.2vw,36px)]
                leading-tight tracking-tight
                text-[#003366]
                ${bn(lang)}
              `}
            >
              {isBangla
                ? 'কেন অগ্নিটক বেছে নেবেন?'
                : 'Why Choose AgniTalk?'}
            </h2>
          </div>

          <p
            className={`
              m-0 max-w-[420px]
              text-[13px] leading-relaxed
              text-slate-600 sm:text-sm
              lg:text-right
              ${bn(lang)}
            `}
          >
            {isBangla
              ? 'অগ্নি সিস্টেমসের ২৫+ বছরের অভিজ্ঞতায় বাংলাদেশের জন্য তৈরি আধুনিক আইপি টেলিফোনি সমাধান।'
              : 'Built on 25+ years of Agni Systems’ telecom expertise, designed specifically for Bangladesh’s network landscape.'}
          </p>
        </motion.div>

        {/* Responsive benefits grid */}

        <motion.ul
          variants={containerVariants}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="
            m-0 grid list-none
            grid-cols-1 gap-3.5 p-0
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {BENEFITS.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              index={index}
              lang={lang}
              isBangla={isBangla}
              reduced={reduced}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
