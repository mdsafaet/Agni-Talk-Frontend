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
    menuRef.current?.close()
  }, [location])

  useEffect(() => {
    const dialog = menuRef.current

    if (!menuOpen || !dialog) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    dialog.showModal()

    const desktop = window.matchMedia('(min-width: 1280px)')

    const handleResize = () => {
      if (desktop.matches) {
        dialog.close()
      }
    }

    desktop.addEventListener('change', handleResize)
    handleResize()

    return () => {
      desktop.removeEventListener('change', handleResize)
      document.body.style.overflow = previousOverflow

      if (dialog.open) dialog.close()

      openButtonRef.current?.focus()
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

        <span className="mt-1 block text-[10px] text-slate-500 sm:text-xs">
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
          agnitalk-ui agnitalk-header
          sticky top-0 z-40 w-full
          border-b border-slate-200 bg-white
        "
      >
        <div
          className="
            flex h-20 w-full items-center justify-between
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
            className="hidden items-center gap-6 xl:flex"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
                    whitespace-nowrap py-2 text-sm
                    transition-colors duration-200
                    hover:text-[#0052CC]
                    motion-reduce:transition-none
                    ${isActive ? 'text-[#0052CC]' : 'text-slate-600'}
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
                  px-4 py-3 text-sm text-slate-700
                  transition-colors duration-200 cursor-pointer
                  hover:border-[#0052CC] hover:bg-[#F4F8FF] hover:text-[#0052CC]
                  motion-reduce:transition-none
                "
              >
                {isBangla ? 'English' : 'বাংলা'}
              </button>
            )}

            <Link
              to="/download"
              className="
                rounded-lg bg-[#FF5722]
                px-5 py-3 text-sm text-white
                transition-colors duration-200
                hover:bg-[#0052CC]
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
          agnitalk-ui agnitalk-header
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
              flex h-20 shrink-0 items-center justify-between
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
                          gap-4 rounded-xl px-4 py-4 text-xl
                          transition-colors duration-200
                          motion-reduce:transition-none
                          ${
                            isActive
                              ? 'bg-blue-50 text-[#0052CC]'
                              : 'text-slate-700 hover:bg-slate-50'
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
                      px-5 py-3 text-base text-slate-700
                      transition-colors duration-200 cursor-pointer
                      hover:border-[#0052CC] hover:bg-[#F4F8FF] hover:text-[#0052CC]
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
                    rounded-xl bg-[#FF5722]
                    px-5 py-3 text-base text-white
                    transition-colors duration-200
                    hover:bg-[#0052CC]
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