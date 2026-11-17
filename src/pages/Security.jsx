import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import Security from '../components/security/Security'

export default function SecurityPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <Security lang={lang} />
    </Page>
  )
}
