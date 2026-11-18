import { Link } from 'react-router-dom'

const quickLinks = [
  { to: '/features', en: 'Features', bn: 'ফিচার' },
  { to: '/rates', en: 'Calling Rates', bn: 'কল রেট' },
  // { to: '/packages', en: 'Packages', bn: 'প্যাকেজ' },
  { to: '/about', en: 'About Us', bn: 'আমাদের সম্পর্কে' },
]

export default function Footer({ lang = 'en' }) {
  const isBangla = lang === 'bn'

  const headingClass =
    'font-agni-heading mb-3 text-sm font-normal text-[#003366] sm:text-base'

  const linkClass =
    'inline-block max-w-full py-1.5 text-xs leading-6 text-slate-600 transition-colors duration-200 hover:text-[#0052CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] motion-reduce:transition-none sm:text-sm'

  return (
    <footer
      lang={lang}
      className="agnitalk-ui w-full border-t border-slate-200 bg-white text-slate-700"
    >
      <div className="w-full px-4 pt-10 sm:px-6 lg:px-10">
        <div className="grid grid-cols-3 gap-x-3 gap-y-6 pb-8 sm:gap-x-6 lg:grid-cols-[1.1fr_0.8fr_1.2fr_0.9fr]">
          {/* Logo */}
          <div className="col-span-3 min-w-0 lg:col-span-1">
            <Link
              to="/"
              aria-label="AgniTalk home"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0052CC]"
            >
              <img
                src="/agni-logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />

              <div className="flex flex-col items-start gap-1">
                <img
                  src="/agni-talk-wordmark.png"
                  alt="AgniTalk"
                  className="h-6 w-auto max-w-[130px] object-contain"
                />

                <span className="font-agni-body text-xs leading-5 text-slate-500">
                  by Agni Systems PLC.
                </span>
              </div>
            </Link>

            <address className="mt-3 hidden text-sm leading-6 not-italic text-slate-500 lg:block">
              Navana Tower, Gulshan Avenue,
              <br />
              Dhaka, Bangladesh
            </address>
          </div>

          {/* Quick links */}
          <div className="min-w-0">
            <h2 className={headingClass}>
              {isBangla ? 'দ্রুত লিংক' : 'Quick Links'}
            </h2>

            <nav aria-label="Footer navigation">
              <ul>
                {quickLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={linkClass}>
                      {isBangla ? item.bn : item.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Support */}
          <div className="min-w-0">
            <h2 className={headingClass}>
              {isBangla ? 'সহায়তা' : 'Support'}
            </h2>

            <ul>
              <li className="flex flex-wrap items-baseline gap-x-1 text-xs leading-6 text-slate-600 sm:text-sm">
                <span>
                  {isBangla ? 'হটলাইন:' : 'Hotline:'}
                </span>

                <a href="tel:16620" className={linkClass}>
                  16620
                </a>

                <span>{isBangla ? 'ও' : 'and'}</span>

                <a href="tel:09606100520" className={linkClass}>
                  09606100520
                </a>
              </li>

              <li>
                <a
                  href="mailto:agniapps@agni.com"
                  className={`${linkClass} [overflow-wrap:anywhere]`}
                >
                  agniapps@agni.com
                </a>
              </li>

              <li>
                <Link to="/faq" className={linkClass}>
                  {isBangla ? 'প্রশ্ন ও সহায়তা' : 'FAQ & Help Center'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and download */}
          <div className="min-w-0">
            {/* <h2 className={headingClass}>
              {isBangla ? 'নীতিমালা' : 'Legal'}
            </h2> */}

            {/* <ul>
              <li>
                <Link to="/privacy-policy" className={linkClass}>
                  {isBangla ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                </Link>
              </li>

              <li>
                <Link to="/terms" className={linkClass}>
                  {isBangla ? 'সেবার শর্তাবলি' : 'Terms of Service'}
                </Link>
              </li>
            </ul> */}

            <h2 className={`${headingClass}`}>
              {isBangla ? 'অগ্নিটক' : 'Get AgniTalk'}
            </h2>

            <Link
              to="/download"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#C94316] px-3 py-2.5 text-center text-xs leading-5 text-white transition-[background-color,transform] duration-300 ease-out hover:bg-[#0052CC] focus-visible:bg-[#0052CC] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0052CC] motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none sm:px-5 sm:text-sm"
            >
              {isBangla ? 'ডাউনলোড করুন' : 'Download App'}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 py-4 text-center">
          <p className="text-xs leading-6 text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} Agni Systems PLC. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}