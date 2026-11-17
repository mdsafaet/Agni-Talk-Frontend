// Phone frame showing real AgniTalk app screens (files live in /public/app and /public/images/app).
const SCREENS = {
  'free-calls': { src: '/app/free-calls.jpg', alt: 'AgniTalk free calls screen', w: 600, h: 1194 },
  'low-rates': { src: '/app/low-rates.jpg', alt: 'AgniTalk SMS and VoIP rates screen', w: 600, h: 1194 },
  'low-bandwidth': { src: '/app/low-bandwidth.jpg', alt: 'AgniTalk low bandwidth screen', w: 600, h: 1194 },
  'agni-number': { src: '/app/agni-number.jpg', alt: 'AgniTalk virtual number screen', w: 600, h: 1194 },
  privacy: { src: '/app/privacy.jpg', alt: 'AgniTalk safety and privacy screen', w: 600, h: 1194 },
  'video-call': { src: '/images/app/video-call.webp', alt: 'AgniTalk group video call screen', w: 311, h: 670 },
  call: { src: '/images/app/call.webp', alt: 'AgniTalk in-call screen with record and speaker controls', w: 311, h: 670 },
  chat: { src: '/images/app/chat.webp', alt: 'AgniTalk group chat screen', w: 311, h: 670 },
}

/** screen: any key of SCREENS above */
export default function PhoneMockup({ screen }) {
  const s = SCREENS[screen] ?? SCREENS['free-calls']
  return (
    <div className="phone-mockup w-full h-full overflow-hidden bg-white">
      <img
        key={screen}
        src={s.src}
        alt={s.alt}
        width={s.w}
        height={s.h}
        className="w-full h-full object-cover object-top"
        draggable={false}
      />
    </div>
  )
}
