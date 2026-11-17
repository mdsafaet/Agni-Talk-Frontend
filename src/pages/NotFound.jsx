import { useOutletContext } from 'react-router-dom'
import Button from '../components/shared/Button'
import Page from '../components/shared/Page'
import { bn } from '../utils/lang'

export default function NotFoundPage() {
  const { lang = 'en' } = useOutletContext() ?? {}
  return (
    <Page lang={lang}>
      <section style={{ padding: '120px 0', textAlign: 'center' }}>
        <h1 className={`mb-3 ${bn(lang)}`} style={{ fontSize: 48, color: '#003366' }}>404</h1>
        <p className={`mb-6 ${bn(lang)}`} style={{ color: '#4a5568' }}>
          {lang === 'bn' ? 'পেজটি খুঁজে পাওয়া যায়নি।' : "We couldn't find that page."}
        </p>
        <Button to="/" className="inline-flex">{lang === 'bn' ? 'হোমে ফিরুন' : 'Back to Home'}</Button>
      </section>
    </Page>
  )
}
