import { Link } from 'react-router-dom'

const quickLinks = [
  { to: '/features', en: 'Features', bn: 'ফিচার' },
  { to: '/rates', en: 'Calling Rates', bn: 'কল রেট' },
  { to: '/how-it-works', en: 'How It Works', bn: 'কীভাবে' },
  { to: '/packages', en: 'Packages', bn: 'প্যাকেজ' },
  { to: '/blog', en: 'Blog', bn: 'ব্লগ' },
  { to: '/about', en: 'About AgniTalk', bn: 'পরিচিতি' },
]

export default function Footer({ lang = 'en', socialLinks = [] }) {
  const isBangla = lang === 'bn'

  const headingClass =
    'font-agni-heading mb-4 text-base text-white'

  const linkClass =
    'inline-block py-2 text-sm leading-6 text-slate-300 transition-colors hover:text-white'

  return (
    <footer
      lang={lang}
      className="agnitalk-ui w-full bg-[#1A202C] text-white"
    >
      <div className="w-full px-4 pt-10 sm:px-6 sm:pt-12 lg:px-10 lg:pt-16">
        <div className="grid grid-cols-1 gap-8 pb-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="min-w-0">
            <Link
              to="/"
              aria-label="AgniTalk home"
              className="inline-flex items-center gap-3"
            >
              <img
                src="/agni-logo.png"
                alt=""
                className="h-12 w-12 shrink-0 rounded-xl object-contain"
              />

              <div>
                <span className="font-agni-heading block text-xl">
                  AgniTalk
                </span>

                <span className="mt-1 block text-xs text-slate-400">
                  by Agni Systems PLC.
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              {isBangla
                ? 'অগ্নিটকের মাধ্যমে প্রিয়জনদের সঙ্গে সংযুক্ত থাকুন। সহজ কলিং ও যোগাযোগের অভিজ্ঞতা উপভোগ করুন।'
                : 'Stay connected with the people who matter through AgniTalk. Enjoy simple calling and communication wherever you go.'}
            </p>

            <address className="mt-4 text-sm leading-7 not-italic text-slate-400">
              Navana Tower, Gulshan Avenue,
              <br />
              Dhaka, Bangladesh
            </address>
          </div>

          {/* Navigation */}
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
              <li>
                <a href="tel:16620" className={linkClass}>
                  {isBangla ? 'হটলাইন: ' : 'Hotline: '}16620
                </a>
              </li>

              <li>
                <a href="tel:09606100520" className={linkClass}>
                  09606100520
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/8801894829135"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {isBangla ? 'হোয়াটসঅ্যাপ সহায়তা' : 'WhatsApp Support'}
                </a>
              </li>

              <li>
                <a
                  href="mailto:agniapps@agni.com"
                  className={`${linkClass} max-w-full break-words`}
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

          {/* Download and legal */}
          <div className="min-w-0">
            <h2 className={headingClass}>
              {isBangla ? 'অ্যাপ ডাউনলোড' : 'Get AgniTalk'}
            </h2>

            <Link
              to="/download"
              className="flex min-h-12 w-full items-center justify-center rounded-lg bg-[#FF5722] px-5 py-3 text-sm text-white transition-colors hover:bg-[#E64A19] sm:w-fit"
            >
              {isBangla ? 'ডাউনলোড করুন' : 'Download App'}
            </Link>

            {socialLinks.length > 0 && (
              <nav
                aria-label="Social media"
                className="mt-5 flex flex-wrap gap-2"
              >
                {socialLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/20 px-3 py-2 text-sm text-slate-300 hover:border-white/50 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            )}

            <h2 className={`${headingClass} mt-7`}>
              {isBangla ? 'নীতিমালা' : 'Legal'}
            </h2>

            <ul>
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
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 py-6 text-center md:flex-row md:text-left">
          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            © {new Date().getFullYear()} Agni Systems PLC. All Rights Reserved.
          </p>

          <p className="text-xs text-slate-400 sm:text-sm">
            Made in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  )
}