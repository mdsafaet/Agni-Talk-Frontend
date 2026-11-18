import { useOutletContext } from 'react-router-dom'

import Page from '../components/shared/Page'
import Hero from '../components/home/Hero'
import DownloadBar from '../components/home/DownloadBar'
import Benefits from '../components/home/Benefits'
import FinalCTA from '../components/shared/FinalCTA'
import Packages from '../components/packages/Packages'
import RatesPreview from '../components/rates/RatesPreview'

const Home = () => {
  const { lang = 'en' } = useOutletContext() ?? {}

  return (
    <Page lang={lang}>
      <Hero lang={lang} />
      <DownloadBar lang={lang} />
      <Benefits lang={lang} />
      <RatesPreview lang={lang} />
      <Packages lang={lang} />
      <FinalCTA lang={lang} />
    </Page>
  )
}

export default Home