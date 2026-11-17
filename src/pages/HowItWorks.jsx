import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import HowItWorks from '../components/howItWorks/HowItWorks'

export default function HowItWorksPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <HowItWorks lang={lang} />
    </Page>
  )
}
