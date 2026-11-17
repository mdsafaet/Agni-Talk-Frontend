import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import Screenshots from '../components/screens/Screenshots'

export default function AppScreensPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <Screenshots lang={lang} />
    </Page>
  )
}
