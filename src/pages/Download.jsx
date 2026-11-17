import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import FinalCTA from '../components/shared/FinalCTA'

export default function DownloadPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <FinalCTA lang={lang} />
    </Page>
  )
}
