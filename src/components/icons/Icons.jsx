// All icons now come from react-icons (Feather + Font Awesome sets).
// Names and default sizes match the old inline SVGs, so existing imports keep working.
import {
  FiPhoneCall, FiVideo, FiMessageSquare, FiCheck, FiArrowRight, FiChevronDown, FiBarChart2,
  FiCreditCard, FiHash, FiMic, FiRepeat, FiGlobe, FiSearch, FiMenu, FiX, FiLock, FiUser,
  FiShield, FiMapPin, FiPhone, FiSmartphone, FiMail, FiHelpCircle,
} from 'react-icons/fi'
import { FaAndroid, FaApple, FaFacebookF, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa'

const wrap = (Icon, size) =>
  function WrappedIcon({ size: s = size, ...props }) {
    return <Icon size={s} aria-hidden="true" {...props} />
  }

export const IconPhone = wrap(FiPhoneCall, 24)
export const IconVideo = wrap(FiVideo, 24)
export const IconMessage = wrap(FiMessageSquare, 24)
export const IconCheck = wrap(FiCheck, 20)
export const IconArrowRight = wrap(FiArrowRight, 18)
export const IconChevronDown = wrap(FiChevronDown, 20)
export const IconData = wrap(FiBarChart2, 28)
export const IconWallet = wrap(FiCreditCard, 28)
export const IconHash = wrap(FiHash, 28)
export const IconMic = wrap(FiMic, 24)
export const IconTransfer = wrap(FiRepeat, 24)
export const IconGlobe = wrap(FiGlobe, 18)
export const IconSearch = wrap(FiSearch, 20)
export const IconMenu = wrap(FiMenu, 24)
export const IconX = wrap(FiX, 24)
export const IconLock = wrap(FiLock, 28)
export const IconID = wrap(FiUser, 28)
export const IconPrivacy = wrap(FiShield, 28)
export const IconAndroid = wrap(FaAndroid, 22)
export const IconApple = wrap(FaApple, 22)
export const IconMapPin = wrap(FiMapPin, 14)
export const IconCall = wrap(FiPhone, 14)
export const IconMobile = wrap(FiSmartphone, 14)
export const IconWhatsApp = wrap(FaWhatsapp, 14)
export const IconMail = wrap(FiMail, 14)
export const IconHelp = wrap(FiHelpCircle, 14)
export const IconFacebook = wrap(FaFacebookF, 15)
export const IconLinkedin = wrap(FaLinkedinIn, 15)
export const IconYoutube = wrap(FaYoutube, 16)
