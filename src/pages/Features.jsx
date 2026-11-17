import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import Features from '../components/features/Features'

export default function FeaturesPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <Features lang={lang} />
    </Page>
  )
}
