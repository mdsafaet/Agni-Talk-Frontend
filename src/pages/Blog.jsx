import { useOutletContext } from 'react-router-dom'
import Page from '../components/shared/Page'
import Blog from '../components/blog/Blog'

export default function BlogPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <Blog lang={lang} />
    </Page>
  )
}
