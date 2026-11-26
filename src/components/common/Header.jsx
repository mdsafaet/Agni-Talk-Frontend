import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navigation = [
  { to: '/about', en: 'About', bn: 'আমাদের সম্পর্কে' },
  { to: '/features', en: 'Features', bn: 'ফিচার' },
  { to: '/rates', en: 'Rates', bn: 'রেট' },
  { to: '/how-it-works', en: 'How It Works', bn: 'কীভাবে' },
  // { to: '/packages', en: 'Packages', bn: 'প্যাকেজ' },
  { to: '/blog', en: 'Blog', bn: 'ব্লগ' },
  { to: '/faq', en: 'Support', bn: 'সহায়তা' },
]

export default function Header({ lang = 'en', setLang }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef(null)
  const openButtonRef = useRef(null)

  const location = useLocation()
  const isBangla = lang === 'bn'

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const dialog = menuRef.current

    if (!menuOpen || !dialog) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    if (!dialog.open) dialog.showModal()

    const desktop = window.matchMedia('(min-width: 1280px)')

    const handleResize = () => {
      if (desktop.matches) {
        setMenuOpen(false)
      }
    }

    desktop.addEventListener('change', handleResize)
    handleResize()

    return () => {
      desktop.removeEventListener('change', handleResize)
      document.body.style.overflow = previousOverflow

      if (dialog.open) dialog.close()

      if (!desktop.matches) openButtonRef.current?.focus()
    }
  }, [menuOpen])

  const toggleLanguage = () => {
    setLang?.(isBangla ? 'en' : 'bn')
  }

  const logo = (
    <>
      <img
        src="/agni-logo.png"
        alt=""
        className="h-10 w-10 shrink-0 rounded-xl object-contain"
      />

      <div className="min-w-0">
        <img
          src="/agni-talk-wordmark.png"
          alt="AgniTalk"
          className="h-6 w-auto max-w-full object-contain"
        />

        <span className="mt-1 block text-[11px] text-slate-600 sm:text-[12px]">
          by Agni Systems PLC.
        </span>
      </div>
    </>
  )

  return (
    <>
      <header
        lang={lang}
        className="
          agnitalk-ui agnitalk-header font-agni-body
          sticky top-0 z-40 w-full
          border-b border-[#DCE6EF] bg-white
        "
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-[3px] pointer-events-none">
          <span className="flex-1 bg-[#0088D0]" />
          <span className="w-[5%] bg-[#E00010]" />
          <span className="w-[5%] bg-[#F58220]" />
          <span className="w-[5%] bg-[#F8E800]" />
        </div>
        <div
          className="
            flex h-[76px] w-full items-center justify-between
            gap-4 px-4 sm:px-6 lg:px-10
          "
        >
          <Link
            to="/"
            aria-label="AgniTalk home"
            className="flex min-w-0 items-center gap-3"
          >
            {logo}
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1.5 xl:flex"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
                    relative whitespace-nowrap rounded-lg px-3 py-2.5 text-[15px] font-bold [font-synthesis:weight] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0088D0]
                    transition-colors duration-200
                    hover:text-[#006DA8]
                    motion-reduce:transition-none
                    ${isActive ? 'bg-[#EAF6FC] text-[#006DA8] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[#0088D0]' : 'text-[#334155] hover:bg-[#F4F8FB]'}
                  `
                }
              >
                {isBangla ? item.bn : item.en}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            {setLang && (
              <button
                type="button"
                onClick={toggleLanguage}
                className="
                  rounded-lg border border-slate-300
                  px-4 py-2.5 text-[15px] font-bold [font-synthesis:weight] text-[#003366]
                  transition-colors duration-200 cursor-pointer
                  hover:border-[#006DA8] hover:bg-[#F4F8FF] hover:text-[#006DA8]
                  motion-reduce:transition-none
                "
              >
                {isBangla ? 'English' : 'বাংলা'}
              </button>
            )}

            <Link
              to="/download"
              className="
                rounded-lg bg-[#006DA8]
                px-5 py-2.5 text-[15px] font-bold [font-synthesis:weight] text-white
                transition-colors duration-200
                hover:bg-[#005580]
                motion-reduce:transition-none
              "
            >
              {isBangla ? 'ডাউনলোড করুন' : 'Download App'}
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            ref={openButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-lg text-[#003366]
              hover:bg-slate-100 xl:hidden
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Full-screen mobile navigation */}
      <dialog
        ref={menuRef}
        id="mobile-navigation"
        lang={lang}
        aria-label={isBangla ? 'মেনু' : 'Navigation menu'}
        onClose={() => setMenuOpen(false)}
        className="
          agnitalk-ui agnitalk-header font-agni-body
          fixed inset-0 m-0 h-dvh max-h-none
          w-full max-w-none border-0
          bg-white p-0 text-slate-800
          backdrop:bg-black/40
        "
      >
        <div className="flex h-full min-h-0 flex-col">
          {/* Mobile header */}
          <div
            className="
              flex h-[76px] shrink-0 items-center justify-between
              gap-4 border-b border-slate-200 px-4 sm:px-6
            "
          >
            <Link
              to="/"
              onClick={closeMenu}
              aria-label="AgniTalk home"
              className="flex min-w-0 items-center gap-3"
            >
              {logo}
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation"
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-lg text-[#003366] hover:bg-slate-100
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {/* Scrollable menu content */}
          <div
            className="
              flex min-h-0 flex-1 flex-col
              overflow-y-auto overscroll-contain
              px-4 pt-6
              pb-[max(1.5rem,env(safe-area-inset-bottom))]
              sm:px-6
            "
          >
            <nav aria-label="Mobile navigation">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `
                          flex min-h-14 items-center justify-between
                          gap-4 rounded-xl px-4 py-3 text-[17px] font-bold [font-synthesis:weight]
                          transition-colors duration-200
                          motion-reduce:transition-none
                          ${
                            isActive
                              ? 'bg-[#EAF6FC] text-[#006DA8]'
                              : 'text-[#334155] hover:bg-slate-50'
                          }
                        `
                      }
                    >
                      <span>{isBangla ? item.bn : item.en}</span>
                      <span aria-hidden="true">→</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile actions */}
            <div className="mt-auto pt-8">
              <div
                className="
                  flex flex-col gap-3
                  border-t border-slate-200 pt-6
                  sm:flex-row
                "
              >
                {setLang && (
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="
                      min-h-12 flex-1 rounded-xl
                      border border-slate-300
                      px-5 py-3 text-base font-bold [font-synthesis:weight] text-[#003366]
                      transition-colors duration-200 cursor-pointer
                      hover:border-[#006DA8] hover:bg-[#F4F8FF] hover:text-[#006DA8]
                      motion-reduce:transition-none
                    "
                  >
                    {isBangla ? 'English' : 'বাংলা'}
                  </button>
                )}

                <Link
                  to="/download"
                  onClick={closeMenu}
                  className="
                    flex min-h-12 flex-1 items-center justify-center
                    rounded-xl bg-[#006DA8]
                    px-5 py-3 text-base font-bold [font-synthesis:weight] text-white
                    transition-colors duration-200
                    hover:bg-[#005580]
                    motion-reduce:transition-none
                  "
                >
                  {isBangla ? 'ডাউনলোড করুন' : 'Download App'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}