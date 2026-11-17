import { FiLock } from 'react-icons/fi'
import { IconID, IconLock, IconPrivacy } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const PILLARS = [
  {
    icon: <IconLock />,
    en: { title: 'TLS End-to-End Encryption', desc: 'All voice calls, video sessions, and messages are secured with industry-standard TLS encryption. Your conversations stay private — always.' },
    bn: { title: 'TLS এনক্রিপশন', desc: 'সকল কল, ভিডিও ও বার্তা TLS এনক্রিপশনে সুরক্ষিত। আপনার কথোপকথন সম্পূর্ণ গোপন।' },
  },
  {
    icon: <IconID />,
    en: { title: 'Official NID Compliance', desc: "NID verification via Bangladesh Election Commission's Porichoy API ensures national security compliance. BTRC-mandated, fully lawful." },
    bn: { title: 'NID সম্মতি', desc: 'বাংলাদেশ নির্বাচন কমিশনের Porichoy API-এর মাধ্যমে NID যাচাই। BTRC-অনুমোদিত, সম্পূর্ণ আইনসম্মত।' },
  },
  {
    icon: <IconPrivacy />,
    en: { title: 'Zero Third-Party Sharing', desc: 'Your personal data, call records, and message history are never sold or shared with any third party. Our privacy policy is publicly auditable.' },
    bn: { title: 'কোনো তৃতীয় পক্ষ নয়', desc: 'আপনার ব্যক্তিগত তথ্য, কল রেকর্ড বা বার্তার ইতিহাস কখনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।' },
  },
]

export default function Security({ lang }) {
  return (
    <section id="security" style={{ background: '#0A192F', padding: '80px 0' }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
            style={{ background: 'rgba(40,167,69,0.15)', color: '#4ade80', border: '1px solid rgba(40,167,69,0.2)' }}
          >
            <FiLock className="inline mr-2 -mt-0.5" />{lang === 'bn' ? 'সুরক্ষা ও গোপনীয়তা' : 'Security & Privacy'}
          </div>
          <h2 className={`font-bold mb-3 text-white ${bn(lang)}`} style={{ ...display(lang), fontSize: 'clamp(24px, 4vw, 36px)' }}>
            {lang === 'bn' ? 'আপনার কথোপকথন সম্পূর্ণ নিরাপদ' : 'Your Privacy Is Non-Negotiable'}
          </h2>
          <p className={`max-w-xl mx-auto ${bn(lang)}`} style={{ color: 'rgba(255,255,255,0.5)' }}>
            {lang === 'bn'
              ? 'অগ্নিটক ব্যবহার করে কথা বলুন নিশ্চিন্তে — প্রতিটি কল ও বার্তা আন্তর্জাতিক নিরাপত্তা মানদণ্ডে সুরক্ষিত।'
              : "Built on Agni Systems' enterprise-grade infrastructure with international security standards applied to every connection."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => {
            const t = lang === 'bn' ? p.bn : p.en
            return (
              <div key={i} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(40,167,69,0.15)', color: '#4ade80' }}>
                  {p.icon}
                </div>
                <h3 className={`font-bold text-white mb-2 ${bn(lang)}`} style={display(lang)}>{t.title}</h3>
                <p className={`text-sm leading-relaxed ${bn(lang)}`} style={{ color: 'rgba(255,255,255,0.5)' }}>{t.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <a href="#" className="text-sm font-medium hover:underline" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {lang === 'bn' ? 'আমাদের সম্পূর্ণ গোপনীয়তা নীতি পড়ুন →' : 'Read Our Full Security & Privacy Policy →'}
          </a>
        </div>
      </div>
    </section>
  )
}
