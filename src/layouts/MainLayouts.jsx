import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import ScrollToTop from '../components/shared/ScrollToTop'


const MainLayouts = () => {
  const [lang, setLang] = useState('en')

  return (
    <div className="flex min-h-screen w-full flex-col">
      <ScrollToTop />
      <Header lang={lang} setLang={setLang} />

      <main className="w-full flex-1">
        <Outlet context={{ lang }} />
      </main>

      <Footer lang={lang} />
    </div>
  )
}

export default MainLayouts