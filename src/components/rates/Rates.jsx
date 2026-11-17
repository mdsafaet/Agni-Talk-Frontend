import { useState } from 'react'
import { IconSearch } from '../icons/Icons'
import { bn } from '../../utils/lang'

const RATES = [
  { id: 'mobile', category: 'local', prefix: '+880', mark: 'BD', label: { en: 'BD Mobile Operators', bn: 'বাংলাদেশ মোবাইল অপারেটর' }, detail: { en: 'GP, Robi, Banglalink & Teletalk', bn: 'জিপি, রবি, বাংলালিংক ও টেলিটক' }, rate: 0.4, note: { en: 'Standard BTRC floor rate + 15% VAT', bn: 'স্ট্যান্ডার্ড BTRC ফ্লোর রেট + ১৫% ভ্যাট' } },
  { id: 'landline', category: 'local', prefix: '09606 +880', mark: '096', label: { en: 'BD Landlines & BTCL', bn: 'বাংলাদেশ ল্যান্ডলাইন ও বিটিসিএল' }, detail: { en: '09606 to PSTN & landlines', bn: '০৯৬০৬ থেকে PSTN ও ল্যান্ডলাইন' }, rate: 0.4, note: { en: 'Billed with a true 1-second pulse', bn: 'প্রকৃত ১-সেকেন্ড পালসে বিল' } },
  { id: 'app', category: 'local', prefix: '09606', mark: 'A', label: { en: 'App to App Calls & IM', bn: 'অ্যাপ-টু-অ্যাপ কল ও আইএম' }, detail: { en: 'AgniTalk to AgniTalk', bn: 'AgniTalk থেকে AgniTalk' }, rate: 0, note: { en: 'Unlimited HD voice, video & messaging', bn: 'আনলিমিটেড এইচডি ভয়েস, ভিডিও ও মেসেজিং' } },
  { id: 'usa', category: 'international', prefix: '+1', mark: 'US', label: { en: 'United States & Canada', bn: 'যুক্তরাষ্ট্র ও কানাডা' }, detail: { en: 'International calling', bn: 'আন্তর্জাতিক কল' }, rate: 1.1, note: { en: 'Low-cost HD international calling', bn: 'কম খরচে এইচডি আন্তর্জাতিক কল' } },
  { id: 'uk', category: 'international', prefix: '+44', mark: 'UK', label: { en: 'United Kingdom', bn: 'যুক্তরাজ্য' }, detail: { en: 'International calling', bn: 'আন্তর্জাতিক কল' }, rate: 1.2, note: { en: 'Low-cost HD international calling', bn: 'কম খরচে এইচডি আন্তর্জাতিক কল' } },
  { id: 'saudi', category: 'international', prefix: '+966', mark: 'SA', label: { en: 'Saudi Arabia', bn: 'সৌদি আরব' }, detail: { en: 'International calling', bn: 'আন্তর্জাতিক কল' }, rate: 0.8, note: { en: 'Popular route for Bangladeshi NRBs', bn: 'বাংলাদেশি প্রবাসীদের জনপ্রিয় রুট' } },
  { id: 'uae', category: 'international', prefix: '+971', mark: 'AE', label: { en: 'United Arab Emirates', bn: 'সংযুক্ত আরব আমিরাত' }, detail: { en: 'International calling', bn: 'আন্তর্জাতিক কল' }, rate: 0.9, note: { en: 'Popular route for Bangladeshi NRBs', bn: 'বাংলাদেশি প্রবাসীদের জনপ্রিয় রুট' } },
  { id: 'malaysia', category: 'international', prefix: '+60', mark: 'MY', label: { en: 'Malaysia', bn: 'মালয়েশিয়া' }, detail: { en: 'International calling', bn: 'আন্তর্জাতিক কল' }, rate: 0.7, note: { en: 'Low-cost HD international calling', bn: 'কম খরচে এইচডি আন্তর্জাতিক কল' } },
]

const FILTERS = [
  { id: 'all', en: 'All Rates', bn: 'সব রেট' },
  { id: 'local', en: 'Bangladesh Local', bn: 'বাংলাদেশ লোকাল' },
  { id: 'international', en: 'International Call', bn: 'আন্তর্জাতিক কল' },
]

export default function Rates({ lang }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [minutes, setMinutes] = useState(20)
  const [destination, setDestination] = useState('local')

  const q = search.trim().toLowerCase()
  const filtered = RATES.filter((r) => {
    const matchesFilter = filter === 'all' || r.category === filter
    const matchesSearch =
      !q ||
      r.label.en.toLowerCase().includes(q) ||
      r.label.bn.includes(search.trim()) ||
      r.detail.en.toLowerCase().includes(q) ||
      r.prefix.includes(q)
    return matchesFilter && matchesSearch
  })

  // Savings calculator
  const calculatorRate = destination === 'local' ? 0.4 : 1.1
  const operatorRate = destination === 'local' ? 2 : 5
  const monthlyMinutes = minutes * 30
  const agniCost = Math.round(monthlyMinutes * calculatorRate)
  const operatorCost = Math.round(monthlyMinutes * operatorRate)
  const yearlySavings = (operatorCost - agniCost) * 12

  const month = lang === 'bn' ? 'মাস' : 'month'

  return (
    <section id="rates" style={{ background: '#F4F6F9', padding: '80px 0' }}>
      <div id="Rate-Calculator-Module" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className={`inline-flex rounded-full px-4 py-2 mb-4 text-xs font-bold tracking-wider ${bn(lang)}`} style={{ background: '#E3F2FD', color: '#0052CC' }}>
            {lang === 'bn' ? 'স্বচ্ছ BTRC ট্যারিফ' : 'TRANSPARENT BTRC TARIFFS'}
          </div>
          <h2
            className={`font-bold mb-3 ${bn(lang)}`}
            style={{ fontFamily: lang === 'en' ? 'var(--agni-display)' : undefined, fontSize: 'clamp(26px, 4vw, 36px)', color: '#003366' }}
          >
            {lang === 'bn' ? 'AgniTalk কল রেট দেখুন ও সাশ্রয় হিসাব করুন' : 'Check AgniTalk Calling Rates & Calculate Savings'}
          </h2>
          <p className={`text-gray-500 max-w-2xl mx-auto ${bn(lang)}`}>
            {lang === 'bn' ? 'কোনো সংযোগ ফি নেই • ১-সেকেন্ড পালস • ৭০% কম ডাটা ব্যবহার' : 'No connection fees • 1-Second Pulse • 70% Lower Data Usage'}
          </p>
        </div>

        {/* Search + filters */}
        <div
          className="bg-white rounded-xl p-3 sm:p-4 mb-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center"
          style={{ boxShadow: '0 8px 30px rgba(0,51,102,0.07)', border: '1px solid #E6ECF2' }}
        >
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#0099FF' }}>
              <IconSearch />
            </div>
            <input
              type="text"
              aria-label={lang === 'bn' ? 'দেশ বা প্রিফিক্স খুঁজুন' : 'Search country or prefix'}
              placeholder={lang === 'bn' ? 'দেশ বা প্রিফিক্স খুঁজুন, যেমন বাংলাদেশ, +৮৮০, USA...' : 'Search country or prefix e.g. Bangladesh, +880, USA...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full rounded-lg py-3 pl-12 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-[#0099FF]/20 ${bn(lang)}`}
              style={{ border: '1px solid #DCE5EF', background: '#FAFCFE' }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${bn(lang)}`}
                style={filter === item.id ? { background: '#0052CC', color: 'white' } : { background: '#F1F5F9', color: '#475569' }}
              >
                {lang === 'bn' ? item.bn : item.en}
              </button>
            ))}
          </div>
        </div>

        {/* Rate cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {filtered.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{ border: '1px solid #E2E8F0', boxShadow: '0 6px 24px rgba(0,51,102,0.06)' }}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="min-w-0">
                  <div className={`font-bold text-gray-800 mb-1 ${bn(lang)}`}>{lang === 'bn' ? r.label.bn : r.label.en}</div>
                  <div className={`text-xs text-gray-400 ${bn(lang)}`}>{lang === 'bn' ? r.detail.bn : r.detail.en}</div>
                </div>
                <div className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-xs font-bold" style={{ background: '#E3F2FD', color: '#0052CC' }}>
                  {r.mark}
                </div>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <span className="font-bold text-3xl" style={{ fontFamily: 'var(--agni-display)', color: r.rate === 0 ? '#10B981' : '#0052CC' }}>
                  {r.rate === 0 ? 'FREE' : `৳${r.rate.toFixed(2)}`}
                </span>
                {r.rate > 0 && <span className="text-sm text-gray-400 mb-1">/ min</span>}
              </div>
              <div className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold mb-4 ${bn(lang)}`} style={{ background: '#E8F5E9', color: '#10B981' }}>
                {r.rate === 0
                  ? lang === 'bn' ? 'আনলিমিটেড এইচডি ভয়েস ও ভিডিও' : 'Unlimited HD Voice & Video'
                  : lang === 'bn' ? '১-সেকেন্ড পালস' : '1-Sec Pulse'}
              </div>
              <div className={`text-xs leading-relaxed text-gray-500 ${bn(lang)}`}>{lang === 'bn' ? r.note.bn : r.note.en}</div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className={`md:col-span-3 bg-white rounded-2xl py-12 text-center text-gray-400 ${bn(lang)}`} style={{ border: '1px solid #E2E8F0' }}>
              {lang === 'bn' ? 'এই গন্তব্যের কোনো রেট পাওয়া যায়নি' : 'No rates found for that destination'}
            </div>
          )}
        </div>

        {/* Savings calculator */}
        <div
          className="bg-white rounded-2xl p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(0,51,102,0.07)' }}
        >
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <label htmlFor="daily-minutes" className={`font-semibold text-gray-700 ${bn(lang)}`}>
                {lang === 'bn' ? 'দৈনিক কলের সময়' : 'Daily Call Duration'}
              </label>
              <span className={`font-bold rounded-lg px-3 py-1.5 ${bn(lang)}`} style={{ background: '#E3F2FD', color: '#0052CC' }}>
                {minutes} {lang === 'bn' ? 'মিনিট / দিন' : 'Mins / Day'}
              </span>
            </div>
            <input
              id="daily-minutes"
              type="range"
              min="5"
              max="120"
              step="5"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="rate-slider w-full mb-6"
              style={{ '--slider-progress': `${((minutes - 5) / 115) * 100}%` }}
            />
            <div className={`text-sm font-semibold text-gray-600 mb-3 ${bn(lang)}`}>{lang === 'bn' ? 'গন্তব্য' : 'Destination'}</div>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl" style={{ background: '#F1F5F9' }}>
              {['local', 'international'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDestination(item)}
                  className={`rounded-lg px-3 py-3 text-xs sm:text-sm font-semibold transition-all ${bn(lang)}`}
                  style={destination === item ? { background: 'white', color: '#0052CC', boxShadow: '0 2px 8px rgba(0,51,102,0.1)' } : { color: '#64748B' }}
                >
                  {item === 'local'
                    ? lang === 'bn' ? 'বিডি মোবাইল (৳০.৪০/মিনিট)' : 'BD Mobile (৳0.40/min)'
                    : lang === 'bn' ? 'আন্তর্জাতিক (৳১.১০/মিনিট থেকে)' : 'International (from ৳1.10/min)'}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5 sm:p-6" style={{ background: '#E3F2FD' }}>
            <div className={`flex justify-between gap-4 pb-3 mb-3 border-b border-blue-200 text-sm ${bn(lang)}`}>
              <span className="text-gray-600">AgniTalk</span>
              <strong style={{ color: '#003366' }}>৳{agniCost.toLocaleString()} / {month}</strong>
            </div>
            <div className={`flex justify-between gap-4 mb-5 text-sm ${bn(lang)}`}>
              <span className="text-gray-600">{lang === 'bn' ? 'স্ট্যান্ডার্ড মোবাইল অপারেটর' : 'Standard Mobile Operator'}</span>
              <strong className="text-gray-700">৳{operatorCost.toLocaleString()} / {month}</strong>
            </div>
            <div className={`font-bold text-lg leading-snug ${bn(lang)}`} style={{ color: '#0052CC' }}>
              {lang === 'bn'
                ? `AgniTalk-এ বছরে প্রায় ৳${yearlySavings.toLocaleString()} সাশ্রয় করুন!`
                : `You Save ~৳${yearlySavings.toLocaleString()} Every Year with AgniTalk!`}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
