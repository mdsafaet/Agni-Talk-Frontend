import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import Corporate from '../components/about/Corporate'

export default function AboutPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <Corporate lang={lang} />
    </Page>
  )
}
