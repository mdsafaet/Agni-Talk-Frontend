
import { Link } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiDownload,
  FiMapPin,
  FiPhone,
  FiMail,
  FiHelpCircle,
} from 'react-icons/fi'

import { bn, display } from '../../utils/lang'

const quickLinks = [
  { to: '/features', en: 'Features', bn: 'ফিচার' },
  { to: '/rates', en: 'Calling Rates', bn: 'কল রেট' },
  // { to: '/packages', en: 'Packages', bn: 'প্যাকেজ' },
  { to: '/about', en: 'About Us', bn: 'আমাদের সম্পর্কে' },
]

export default function Footer({ lang = 'en' }) {
  const isBangla = lang === 'bn'

  const headingClass = `
    mb-4 font-agni-heading
    text-[17px] font-bold
    leading-tight tracking-normal
    text-[#003366]
    sm:text-[18px]
    ${bn(lang)}
  `

  const linkClass = `
    inline-flex max-w-full items-center gap-2
    py-1.5 font-agni-body
    text-[15px] leading-relaxed
    text-[#334155]
    transition-colors duration-200
    hover:text-[#006DA8]
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-[#0088D0]
    motion-reduce:transition-none
    ${bn(lang)}
  `

  return (
    <footer
      lang={lang}
      className={`
        agnitalk-ui relative w-full
        overflow-hidden
        bg-[#F8FBFD]
        font-agni-body
        text-[#334155]
        ${bn(lang)}
      `}
    >

      {/* ========================================
          AgniTalk brand accent
      ======================================== */}

      <div
        aria-hidden="true"
        className="flex h-[3px] w-full"
      >
        <span className="flex-1 bg-[#0088D0]" />
        <span className="w-[5%] bg-[#E00010]" />
        <span className="w-[5%] bg-[#F58220]" />
        <span className="w-[5%] bg-[#F8E800]" />
      </div>

      {/* ========================================
          Full-width footer container
      ======================================== */}

      <div
        className="
          w-full
          px-4 pt-8
          sm:px-6 sm:pt-10
          lg:px-10
        "
      >
        <div
          className="
            grid w-full grid-cols-1
            gap-x-8 gap-y-7 pb-8
            sm:grid-cols-2
            lg:grid-cols-[1.2fr_0.8fr_1.2fr_0.8fr]
            lg:gap-10
            xl:gap-16
          "
        >

          {/* ====================================
              Company information
          ==================================== */}

          <div className="min-w-0">

            <Link
              to="/"
              aria-label="AgniTalk home"
              className="
                inline-flex items-center
                gap-3 rounded-lg
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#0088D0]
              "
            >
              <img
                src="/agni-logo.png"
                alt=""
                width={44}
                height={44}
                className="
                  h-11 w-11 shrink-0
                  object-contain
                "
              />

              <div className="flex flex-col items-start gap-1">

                <img
                  src="/agni-talk-wordmark.png"
                  alt="AgniTalk"
                  className="
                    h-7 w-auto max-w-[150px]
                    object-contain
                  "
                />

                <span
                  className="
                    font-agni-body
                    text-[13px]
                    leading-5 text-slate-600
                  "
                >
                  by Agni Systems PLC.
                </span>

              </div>
            </Link>

            {/* Office address */}

            <address
              className="
                mt-5 flex items-start gap-2.5
                font-agni-body
                text-[15px] not-italic
                leading-relaxed text-[#475569]
              "
            >
              <FiMapPin
                aria-hidden="true"
                className="
                  mt-0.5 h-[18px] w-[18px]
                  shrink-0 text-[#006DA8]
                "
              />

              <span>
                Navana Tower, Gulshan Avenue,
                <br />
                Dhaka, Bangladesh
              </span>
            </address>

          </div>

          {/* ====================================
              Quick links
          ==================================== */}

          <div className="min-w-0">

            <h2
              className={headingClass}
              style={display(lang)}
            >
              {isBangla
                ? 'দ্রুত লিংক'
                : 'Quick Links'}
            </h2>

            <nav
              aria-label={
                isBangla
                  ? 'ফুটার নেভিগেশন'
                  : 'Footer navigation'
              }
            >
              <ul className="space-y-0.5">

                {quickLinks.map((item) => (
                  <li key={item.to}>

                    <Link
                      to={item.to}
                      className={`group ${linkClass}`}
                    >
                      <span
                        aria-hidden="true"
                        className="
                          h-1 w-1 shrink-0
                          rounded-full
                          bg-[#0088D0]/70
                        "
                      />

                      {isBangla
                        ? item.bn
                        : item.en}

                      <FiArrowUpRight
                        aria-hidden="true"
                        className="
                          h-3.5 w-3.5
                          text-[#0088D0]
                          opacity-0
                          transition-opacity
                          group-hover:opacity-100
                          group-focus-visible:opacity-100
                        "
                      />

                    </Link>
                  </li>
                ))}

              </ul>
            </nav>

          </div>

          {/* ====================================
              Support information
          ==================================== */}

          <div className="min-w-0">

            <h2
              className={headingClass}
              style={display(lang)}
            >
              {isBangla
                ? 'সহায়তা'
                : 'Support'}
            </h2>

            <ul className="space-y-1">

              {/* Hotline */}

              <li className="flex items-start gap-2.5">

                <FiPhone
                  aria-hidden="true"
                  className="
                    mt-1 h-4 w-4 shrink-0
                    text-[#006DA8]
                  "
                />

                <div className="min-w-0">

                  <span
                    className={`
                      block font-agni-body
                      text-[13px] font-semibold
                      text-[#475569]
                      ${bn(lang)}
                    `}
                  >
                    {isBangla
                      ? 'হটলাইন'
                      : 'Hotline'}
                  </span>

                  <div
                    className="
                      flex flex-wrap
                      items-center gap-x-2
                    "
                  >

                    <a
                      href="tel:16620"
                      className="
                        inline-flex items-center
                        py-1.5 font-agni-body
                        text-[19px] font-bold
                        leading-relaxed
                        [font-synthesis:weight]
                        text-[#006DA8]
                        transition-colors
                        hover:text-[#003366]
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-[#0088D0]
                      "
                    >
                      16620
                    </a>

                    <span className="text-slate-400">
                      /
                    </span>

                    <a
                      href="tel:+8809606100700"
                      className={linkClass}
                    >
                      +8809606100700
                    </a>

                  </div>
                </div>
              </li>

              {/* Customer care email */}

              <li>
                <a
                  href="mailto:customer.care@agni.com"
                  className={`
                    ${linkClass}
                    items-start
                    [overflow-wrap:anywhere]
                  `}
                >
                  <FiMail
                    aria-hidden="true"
                    className="
                      mt-1 h-4 w-4
                      shrink-0 text-[#006DA8]
                    "
                  />

                  <span className="min-w-0">
                    customer.care@agni.com
                  </span>
                </a>
              </li>

              {/* Help center */}

              <li>
                <Link
                  to="/faq"
                  className={linkClass}
                >
                  <FiHelpCircle
                    aria-hidden="true"
                    className="
                      h-4 w-4 shrink-0
                      text-[#006DA8]
                    "
                  />

                  {isBangla
                    ? 'প্রশ্ন ও সহায়তা'
                    : 'FAQ & Help Center'}

                </Link>
              </li>

            </ul>
          </div>

          {/* ====================================
              Download application
          ==================================== */}

          <div className="min-w-0">

            <h2
              className={headingClass}
              style={display(lang)}
            >
              {isBangla
                ? 'অগ্নিটক'
                : 'Get AgniTalk'}
            </h2>

            <p
              className={`
                mb-4 font-agni-body
                text-[15px] leading-relaxed
                text-[#475569]
                ${bn(lang)}
              `}
            >
              {isBangla
                ? 'Android ও iOS-এ AgniTalk ডাউনলোড করুন।'
                : 'Available on Android & iOS.'}
            </p>

            <Link
              to="/download"
              className={`
                group inline-flex min-h-11
                items-center justify-center gap-2
                rounded-lg bg-[#006DA8]
                px-5 py-2.5
                text-center font-agni-body
                text-[15px] font-bold
                [font-synthesis:weight]
                text-white no-underline
                transition-[background-color,transform]
                duration-200
                hover:bg-[#005789]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#0088D0]
                motion-safe:hover:-translate-y-0.5
                motion-reduce:transition-none
                ${bn(lang)}
              `}
            >
              <FiDownload
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
              />

              {isBangla
                ? 'ডাউনলোড করুন'
                : 'Download App'}

              <FiArrowUpRight
                aria-hidden="true"
                className="
                  h-3.5 w-3.5
                  opacity-80
                  transition-transform
                  motion-safe:group-hover:-translate-y-0.5
                  motion-safe:group-hover:translate-x-0.5
                "
              />

            </Link>

          </div>
        </div>
      </div>

      {/* ========================================
          Full-width copyright bar
      ======================================== */}

      <div
        className="
          w-full
          border-t border-[#DFE8EF]
          bg-[#EDF3F8]
        "
      >
        <div
          className="
            flex w-full flex-col
            items-center justify-center
            gap-2 px-4 py-4
            sm:px-6 lg:px-10
          "
        >
          <p
            className="
              m-0 text-center
              font-agni-body
              text-[13px] leading-relaxed
              text-[#475569]
              sm:text-[14px]
            "
          >
            © {new Date().getFullYear()} Agni Systems PLC.
            All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}
