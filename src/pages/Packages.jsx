import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import Packages from '../components/packages/Packages'

export default function PackagesPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <Packages lang={lang} />
    </Page>
  )
}
