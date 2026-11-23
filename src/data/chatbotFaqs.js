// src/data/chatbotFaqs.js

// Static guides.
// Packages, calling rates and published FAQs come from your API.

export const chatbotFaqs = [
  {
    id: 'download',

    keywords: [
      'download',
      'install',
      'app download',
      'ডাউনলোড',
      'ইনস্টল',
      'অ্যাপ ডাউনলোড',
    ],

    answer: {
      en: 'Visit our Download page for the available AgniTalk app download options.',
      bn: 'অগ্নিটক অ্যাপ ডাউনলোডের অপশন দেখতে আমাদের ডাউনলোড পেজে যান।',
    },

    link: {
      to: '/download',
      en: 'Download AgniTalk',
      bn: 'অগ্নিটক ডাউনলোড',
    },
  },

  {
    id: 'registration',

    keywords: [
      'register',
      'registration',
      'signup',
      'sign up',
      'create account',
      'রেজিস্ট্রেশন',
      'নিবন্ধন',
      'অ্যাকাউন্ট খুলব',
      'একাউন্ট খুলব',
    ],

    answer: {
      en: 'Follow the registration instructions in the AgniTalk app. Our How It Works page provides the getting-started guide.',
      bn: 'অগ্নিটক অ্যাপে দেওয়া নিবন্ধনের নির্দেশনা অনুসরণ করুন। শুরু করার নিয়ম জানতে আমাদের ব্যবহার নির্দেশিকা পেজে যান।',
    },

    link: {
      to: '/how-it-works',
      en: 'Getting started',
      bn: 'শুরু করার নিয়ম',
    },
  },

  {
    id: 'recharge',

    keywords: [
      'recharge',
      'top up',
      'topup',
      'bkash',
      'bKash',
      'nagad',
      'রিচার্জ',
      'টপ আপ',
      'টপআপ',
      'বিকাশ',
      'নগদ',
    ],

    answer: {
      en: 'Open the recharge or top-up option in AgniTalk and follow the payment instructions shown in the app. For a failed recharge, contact support. Never send your PIN or OTP in this chat.',
      bn: 'অগ্নিটক অ্যাপের রিচার্জ বা টপ-আপ অপশন খুলে সেখানে দেওয়া পেমেন্ট নির্দেশনা অনুসরণ করুন। রিচার্জ ব্যর্থ হলে সাপোর্টে যোগাযোগ করুন। এই চ্যাটে আপনার PIN বা OTP দেবেন না।',
    },

    link: {
      to: '/faq',
      en: 'Get help',
      bn: 'সহায়তা নিন',
    },
  },

  {
    id: 'support',

    keywords: [
      'support',
      'contact',
      'hotline',
      'customer care',
      'customer service',
      'সাপোর্ট',
      'যোগাযোগ',
      'হটলাইন',
      'কাস্টমার কেয়ার',
      'সাহায্য',
      'সহায়তা',
    ],

    answer: {
      en: 'Contact AgniTalk support:\n\nHotline: 16620 / 09606100520\nEmail: agniapps@agni.com',
      bn: 'অগ্নিটক সাপোর্টে যোগাযোগ করুন:\n\nহটলাইন: ১৬৬২০ / ০৯৬০৬১০০৫২০\nইমেইল: agniapps@agni.com',
    },

    link: {
      to: '/faq',
      en: 'Help Center',
      bn: 'সহায়তা কেন্দ্র',
    },
  },
]

// Chatbot interface text.

export const chatLabels = {
  en: {
    title: 'AgniTalk Help',
    subtitle: 'FAQ assistant',

    welcome: 'Hi! Choose a topic or type your question.',
    placeholder: 'Type your question…',

    clear: 'Clear chat',
    close: 'Close chat',
    open: 'Open chat',
    send: 'Send message',

    loading: 'Finding an answer…',

    error: 'I couldn’t load the information. Please try again.',

    fallback:
      'I couldn’t find a matching answer. Try Packages, Calling rates, FAQs or contact support.',

    empty: 'No information is available for this topic yet.',

    more: 'View details',
  },

  bn: {
    title: 'অগ্নিটক সহায়তা',
    subtitle: 'প্রশ্নোত্তর সহকারী',

    welcome: 'স্বাগতম! একটি বিষয় বেছে নিন অথবা আপনার প্রশ্ন লিখুন।',
    placeholder: 'আপনার প্রশ্ন লিখুন…',

    clear: 'চ্যাট মুছুন',
    close: 'চ্যাট বন্ধ করুন',
    open: 'চ্যাট খুলুন',
    send: 'মেসেজ পাঠান',

    loading: 'উত্তর খোঁজা হচ্ছে…',

    error: 'তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।',

    fallback:
      'মিল আছে এমন উত্তর পাওয়া যায়নি। প্যাকেজ, কল রেট, প্রশ্নোত্তর বেছে নিন অথবা সাপোর্টে যোগাযোগ করুন।',

    empty: 'এই বিষয়ে এখনো তথ্য পাওয়া যায়নি।',

    more: 'বিস্তারিত দেখুন',
  },
}

// Quick-action buttons.

export const chatTopics = [
  {
    id: 'packages',
    en: 'Packages',
    bn: 'প্যাকেজ',
  },
  {
    id: 'rates',
    en: 'Calling rates',
    bn: 'কল রেট',
  },
  {
    id: 'faqs',
    en: 'FAQs',
    bn: 'প্রশ্নোত্তর',
  },
  {
    id: 'download',
    en: 'Download',
    bn: 'ডাউনলোড',
  },
  {
    id: 'registration',
    en: 'Registration',
    bn: 'নিবন্ধন',
  },
  {
    id: 'recharge',
    en: 'Recharge',
    bn: 'রিচার্জ',
  },
  {
    id: 'support',
    en: 'Support',
    bn: 'সাপোর্ট',
  },
]