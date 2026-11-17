import { Link } from 'react-router-dom'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { bn, display } from '../../utils/lang'

export default function DownloadBar({ lang = 'en' }) {
  const buttonClass =
    'inline-flex h-[46px] w-[150px] shrink-0 items-center gap-3 rounded-[13px] border border-white/15 bg-[#1B2934] px-3.5 text-white transition-colors hover:bg-[#263846] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5722] motion-reduce:transition-none'

  return (
    <div id="download-bar" className="bg-[#003366] py-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
          <p
            className={`text-center font-normal text-white lg:text-left ${bn(lang)}`}
            style={display(lang)}
          >
            {lang === 'bn'
              ? 'Android ও iOS-এ AgniTalk ডাউনলোড করুন — মিনিটেই শুরু করুন'
              : 'Download AgniTalk on Android & iOS — Start Calling in Minutes'}
          </p>

          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2.5">
            {/* App Store */}
            <Link
              to="/download"
              aria-label="Download on the App Store"
              className={buttonClass}
            >
              <FaApple
                aria-hidden="true"
                className="h-6 w-6 shrink-0"
              />

              <div className="font-agni-body">
                <span className="block text-[7px] leading-[10px] text-[#9AA6AF]">
                  DOWNLOAD ON THE
                </span>

                <span className="block text-[13px] leading-[16px]">
                  App Store
                </span>
              </div>
            </Link>

            {/* Google Play */}
            <Link
              to="/download"
              aria-label="Get it on Google Play"
              className={buttonClass}
            >
              <FaGooglePlay
                aria-hidden="true"
                className="h-6 w-6 shrink-0"
              />

              <div className="font-agni-body">
                <span className="block text-[7px] leading-[10px] text-[#9AA6AF]">
                  GET IT ON
                </span>

                <span className="block text-[13px] leading-[16px]">
                  Google Play
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}