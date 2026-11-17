import Button from '../shared/Button'
import { FiGift } from 'react-icons/fi'
import { IconArrowRight, IconCheck } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const PACKAGES = [
  {
    badge: { en: 'Most Popular', bn: 'সবচেয়ে জনপ্রিয়' },
    en: { name: 'Talk 100 Pack', price: '৳49', desc: '100 minutes to any Bangladesh mobile/landline. Valid 7 days.', minutes: '100 min', validity: '7 days', bonus: '' },
    bn: { name: 'টক ১০০ প্যাক', price: '৳49', desc: 'যেকোনো বাংলাদেশী মোবাইল/ল্যান্ডলাইনে ১০০ মিনিট।', minutes: '১০০ মিনিট', validity: '৭ দিন', bonus: '' },
    highlight: true,
  },
  {
    badge: { en: 'Best Value', bn: 'সেরা মূল্য' },
    en: { name: 'Talk 500 Pack', price: '৳199', desc: '500 minutes to any number. Valid 30 days. Extra 50 min bonus!', minutes: '500+50 min', validity: '30 days', bonus: '+50 min Bonus' },
    bn: { name: 'টক ৫০০ প্যাক', price: '৳199', desc: '৫০০ মিনিট + ৫০ মিনিট বোনাস। ৩০ দিন মেয়াদ।', minutes: '৫০০+৫০ মিনিট', validity: '৩০ দিন', bonus: '+৫০ মিনিট বোনাস' },
    highlight: false,
  },
  {
    badge: { en: 'Quick Pack', bn: 'কুইক প্যাক' },
    en: { name: 'Talk 30 Pack', price: '৳18', desc: '30 minutes to any Bangladesh number. Valid 3 days.', minutes: '30 min', validity: '3 days', bonus: '' },
    bn: { name: 'টক ৩০ প্যাক', price: '৳18', desc: 'যেকোনো নাম্বারে ৩০ মিনিট। ৩ দিন মেয়াদ।', minutes: '৩০ মিনিট', validity: '৩ দিন', bonus: '' },
    highlight: false,
  },
]

export default function Packages({ lang }) {
  return (
    <section id="packages" style={{ background: 'white', padding: '80px 0' }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`font-bold mb-3 ${bn(lang)}`} style={{ ...display(lang), fontSize: 'clamp(24px, 4vw, 36px)', color: '#003366' }}>
            {lang === 'bn' ? 'ভয়েস প্যাকেজ ও অফার' : 'Voice Packages & Special Offers'}
          </h2>
          <p className={`text-gray-500 ${bn(lang)}`}>
            {lang === 'bn' ? 'আরো বেশি সাশ্রয়ের জন্য বেছে নিন আমাদের প্যাকেজ।' : 'Save even more with bundled voice minute packages.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PACKAGES.map((p, i) => {
            const t = lang === 'bn' ? p.bn : p.en
            return (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden transition-all"
                style={{
                  border: p.highlight ? '2px solid #FF5722' : '1px solid #E2E8F0',
                  boxShadow: p.highlight
                    ? '0 2px 8px rgba(0,0,0,0.05)'
                    : 'none',
                }}
              >
                {p.highlight && (
                  <div className="absolute top-0 right-0 left-0 h-1" style={{ background: '#FF5722' }}></div>
                )}
                <div className="p-6">
                  <div
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4 ${bn(lang)}`}
                    style={{ background: p.highlight ? 'rgba(255,87,34,0.1)' : '#F8F9FA', color: p.highlight ? '#0052CC' : '#718096' }}
                  >
                    {lang === 'bn' ? p.badge.bn : p.badge.en}
                  </div>
                  <h3 className={`font-bold text-xl mb-1 ${bn(lang)}`} style={{ ...display(lang), color: '#003366' }}>
                    {t.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'var(--agni-display)', color: '#1a202c' }}>{t.price}</span>
                    <span className="text-gray-400 text-sm">{lang === 'bn' ? '/প্যাক' : '/pack'}</span>
                  </div>
                  <p className={`text-sm text-gray-500 mb-4 ${bn(lang)}`}>{t.desc}</p>
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <IconCheck size={16} style={{ color: '#28A745' }} />
                      <span className={`text-gray-600 ${bn(lang)}`}>{t.minutes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <IconCheck size={16} style={{ color: '#28A745' }} />
                      <span className={`text-gray-600 ${bn(lang)}`}>
                        {t.validity} {lang === 'bn' ? 'মেয়াদ' : 'validity'}
                      </span>
                    </div>
                    {t.bonus && (
                      <div className="flex items-center gap-2 text-sm">
                        <FiGift style={{ color: '#0052CC' }} />
                        <span className={`font-semibold ${bn(lang)}`} style={{ color: '#0052CC' }}>{t.bonus}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    to="/download"
                    variant={p.highlight ? 'primary' : 'secondary'}
                    className="w-full justify-center"
                    style={{ display: 'flex' }}
                  >
                    {lang === 'bn' ? 'অ্যাপে পাবেন' : 'Claim in App'}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Referral banner */}
        <div
          className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10"
          style={{ background: '#E4ECF4', border: '1px solid #D3DFEC' }}
        >
          <img
            src="/images/refer-a-friend.webp"
            alt=""
            width="455"
            height="465"
            loading="lazy"
            draggable={false}
            className="h-36 w-auto shrink-0 md:h-44"
          />
          <div className="text-center md:text-left md:flex-1">
            <h3 className={`font-bold text-xl mb-2 ${bn(lang)}`} style={{ ...display(lang), color: '#003366' }}>
              {lang === 'bn' ? 'বন্ধুকে রেফার করুন, ক্রেডিট পান!' : 'Refer a Friend & Earn Credit!'}
            </h3>
            <p className={`text-sm ${bn(lang)}`} style={{ color: '#4a5568' }}>
              {lang === 'bn'
                ? 'প্রতিটি সফল রেফারেলে আপনি ও আপনার বন্ধু উভয়েই বোনাস ক্রেডিট পাবেন।'
                : 'Every successful referral earns both you and your friend bonus calling credit. Multi-level rewards.'}
            </p>
          </div>
          <Button to="/download" className="flex-shrink-0" icon={<IconArrowRight />}>
            {lang === 'bn' ? 'এখনই শুরু করুন' : 'Start Referring'}
          </Button>
        </div>
      </div>
    </section>
  )
}
