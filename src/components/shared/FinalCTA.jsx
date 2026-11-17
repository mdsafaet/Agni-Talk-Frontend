import { FaApple, FaGooglePlay } from 'react-icons/fa'
import QRCode from './QRCode'
import { bn, display } from '../../utils/lang'

export default function FinalCTA({
  lang = 'en',
  appStoreUrl = '#',
  googlePlayUrl = '#',
}) {
  const buttonClass =
    'inline-flex h-[46px] w-[150px] shrink-0 items-center gap-3 rounded-[13px] border border-white/15 bg-[#1B2934] px-3.5 text-white transition-colors duration-200 hover:bg-[#263846] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5722] motion-reduce:transition-none'

  return (
    <section
      id="download"
      style={{ background: '#003366', padding: '80px 0' }}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-left">
          <h2
            className={`mb-4 font-normal text-white ${bn(lang)}`}
            style={{
              ...display(lang),
              fontSize: 'clamp(26px, 5vw, 44px)',
            }}
          >
            {lang === 'bn'
              ? 'ফোন বিলে ছাড় পেতে প্রস্তুত?'
              : 'Ready to Cut Your Phone Bills?'}
          </h2>

          <p
            className={`mx-auto mb-8 max-w-xl text-lg text-white/90 lg:mx-0 ${bn(lang)}`}
          >
            {lang === 'bn'
              ? 'আজই AgniTalk ডাউনলোড করুন এবং আপনার নিজস্ব ০৯৬০৬ নম্বর সহ বিনামূল্যে HD কলিং উপভোগ করুন।'
              : "Download AgniTalk today and enjoy free HD calling with your own 09606 number. Bangladesh's smartest calling app."}
          </p>

          {/* Store buttons */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            {/* App Store */}
            <a
              href={appStoreUrl}
              aria-label="Download on the App Store"
              className={buttonClass}
            >
              <FaApple
                aria-hidden="true"
                className="h-6 w-6 shrink-0"
              />

              <div className="text-left font-agni-body">
                <span className="block text-[7px] leading-[10px] text-[#9AA6AF]">
                  DOWNLOAD ON THE
                </span>

                <span className="block text-[13px] leading-[16px]">
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play */}
            <a
              href={googlePlayUrl}
              aria-label="Get it on Google Play"
              className={buttonClass}
            >
              <FaGooglePlay
                aria-hidden="true"
                className="h-6 w-6 shrink-0"
              />

              <div className="text-left font-agni-body">
                <span className="block text-[7px] leading-[10px] text-[#9AA6AF]">
                  GET IT ON
                </span>

                <span className="block text-[13px] leading-[16px]">
                  Google Play
                </span>
              </div>
            </a>
          </div>

          {/* QR code */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <QRCode size={104} caption="" />

            <p
              className={`max-w-[220px] text-sm text-white/70 sm:text-left ${bn(lang)}`}
            >
              {lang === 'bn'
                ? 'ফোনের ক্যামেরা দিয়ে স্ক্যান করে সরাসরি ডাউনলোড করুন'
                : 'Scan with your phone camera to download instantly'}
            </p>
          </div>
        </div>

        {/* Campaign image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/campaign.webp"
            alt="AgniTalk campaign poster: a hand holding a phone showing the Agni number screen, with a Download button"
            width="1000"
            height="1000"
            loading="lazy"
            draggable={false}
            className="h-auto w-full max-w-[460px] rounded-2xl ring-1 ring-white/10"
          />
        </div>
      </div>
    </section>
  )
}