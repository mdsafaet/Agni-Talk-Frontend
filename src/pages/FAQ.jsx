import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import FAQ from '../components/faq/FAQ'

export default function FAQPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <FAQ lang={lang} />
    </Page>
  )
}
