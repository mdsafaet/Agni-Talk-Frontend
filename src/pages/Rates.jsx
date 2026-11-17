import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import Rates from '../components/rates/Rates'

export default function RatesPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <Rates lang={lang} />
    </Page>
  )
}
