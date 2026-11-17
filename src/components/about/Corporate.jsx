import Button from '../shared/Button'
import { FiBriefcase } from 'react-icons/fi'
import { IconArrowRight, IconCheck } from '../icons/Icons'
import { bn, display } from '../../utils/lang'

const STATS = [
  { num: '25+', en: 'Years in Bangladesh Telecom', bn: 'বছর টেলিকমে' },
  { num: '1995', en: 'Founded by Agni Systems PLC.', bn: 'প্রতিষ্ঠার বছর' },
  { num: 'DSE', en: 'Publicly Listed on Dhaka Stock Exchange', bn: 'ঢাকা স্টক এক্সচেঞ্জে তালিকাভুক্ত' },
  { num: 'IPTSP', en: 'Licensed by BTRC Bangladesh', bn: 'BTRC লাইসেন্সপ্রাপ্ত' },
]

const ENTERPRISE = [
  'Hosted IP PBX & SIP Trunking',
  'Call Center Solutions',
  'Dedicated Corporate Lines',
  'SLA-backed Uptime Guarantees',
]

export default function Corporate({ lang }) {
  return (
    <section id="corporate" style={{ background: '#F8F9FA', padding: '80px 0' }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* Trust narrative */}
          <div className="lg:col-span-3">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 text-sm font-semibold"
              style={{ background: 'rgba(0,51,102,0.06)', color: '#003366', border: '1px solid rgba(0,51,102,0.12)' }}
            >
              <FiBriefcase className="inline mr-2 -mt-0.5" />{lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About AgniTalk'}
            </div>
            <h2 className={`font-bold mb-4 ${bn(lang)}`} style={{ ...display(lang), fontSize: 'clamp(22px, 3.5vw, 34px)', color: '#003366' }}>
              {lang === 'bn'
                ? 'অগ্নি সিস্টেমস PLC-এর ২৫+ বছরের টেলিকম অভিজ্ঞতায় তৈরি'
                : 'Powered by Agni Systems PLC. — 25+ Years of Telecom Excellence'}
            </h2>
            <p className={`text-gray-600 leading-relaxed mb-6 ${bn(lang)}`}>
              {lang === 'bn'
                ? 'AgniTalk হলো Agni Systems PLC.-এর একটি পণ্য, যা ১৯৯৫ সাল থেকে বাংলাদেশের টেলিযোগাযোগ খাতে নেতৃত্ব দিয়ে আসছে। ঢাকা স্টক এক্সচেঞ্জে তালিকাভুক্ত এই কোম্পানি দেশের অন্যতম বিশ্বস্ত ISP এবং IPTSP অপারেটর।'
                : 'AgniTalk is a product of Agni Systems PLC., a publicly-listed pioneer in Bangladesh telecommunications since 1995. With a dedicated fiber-optic backbone, enterprise-grade iTel Class 5 softswitch, and full BTRC IPTSP licensing, AgniTalk is built on infrastructure that enterprise clients trust with mission-critical communications.'}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {STATS.map((s, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #E2E8F0' }}>
                  <div className="font-bold text-2xl mb-1" style={{ fontFamily: 'var(--agni-display)', color: '#0052CC' }}>{s.num}</div>
                  <div className={`text-sm text-gray-500 ${bn(lang)}`}>{lang === 'bn' ? s.bn : s.en}</div>
                </div>
              ))}
            </div>
          </div>

          {/* B2B callout */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden" style={{ background: '#003366', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="p-6">
                <div className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">Enterprise Solutions</div>
                <h3 className="font-bold text-white text-xl mb-3" style={{ fontFamily: 'var(--agni-display)' }}>
                  Business &amp; Corporate IP PBX
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-5">
                  {lang === 'bn'
                    ? 'আপনার ব্যবসার জন্য Agni Systems-এর এন্টারপ্রাইজ টেলিফোনি সমাধান বিবেচনা করুন।'
                    : 'Need enterprise telephony? Agni Systems offers hosted IP PBX, SIP trunking, and call center solutions backed by the same infrastructure powering AgniTalk.'}
                </p>
                {ENTERPRISE.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-blue-100 mb-2">
                    <IconCheck size={16} className="inline mr-1.5" style={{ color: '#4ade80' }} />{f}
                  </div>
                ))}
                <Button to="/faq" variant="outlineWhite" className="mt-5 w-full justify-center" style={{ display: 'flex' }} icon={<IconArrowRight />}>
                  Explore Enterprise Solutions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
