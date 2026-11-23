import { chatbotFaqs } from '../data/chatbotFaqs'
import {
  chatbotPackages,
  chatbotCallingRates,
  chatbotQuestions,
} from '../data/chatbotContent'

const USE_API = import.meta.env.VITE_CHATBOT_USE_API === 'true'

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api'
).replace(/\/+$/, '')

// আপনার inquiry form-এর route অনুযায়ী পরিবর্তন করুন।
const INQUIRY_PATH = '/faq#inquiry'

const LOCAL_DATA = {
  '/packages': chatbotPackages,
  '/calling-rates': chatbotCallingRates,
  '/faqs': chatbotQuestions,
}

function normalize(value = '') {
  return String(value)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[০-৯]/g, (digit) => '০১২৩৪৫৬৭৮৯'.indexOf(digit))
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function matches(message, keyword) {
  const phrase = normalize(keyword)

  return Boolean(
    phrase && ` ${normalize(message)} `.includes(` ${phrase} `),
  )
}

function localized(item, field, lang) {
  return (
    item[`${field}_${lang}`] ||
    item[field] ||
    item[`${field}_en`] ||
    ''
  )
}

function formatNumber(value, lang, digits = 2) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  const number = Number(value)

  if (!Number.isFinite(number)) return String(value)

  return new Intl.NumberFormat(lang === 'bn' ? 'bn-BD' : 'en-US', {
    maximumFractionDigits: digits,
  }).format(number)
}

// API বন্ধ থাকলে কোনো network request হবে না।
async function getList(path, signal) {
  if (!USE_API) {
    return LOCAL_DATA[path] ?? []
  }

  const response = await fetch(`${API_BASE}${path}`, {
    signal,
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  const result = await response.json()
  const items = Array.isArray(result) ? result : result.data

  if (!Array.isArray(items)) {
    throw new Error('Unexpected API response')
  }

  return items
}

function supportReply(lang, introduction) {
  const isBangla = lang === 'bn'

  return {
    text: isBangla
      ? [
          introduction || 'আপনার প্রশ্নের নির্দিষ্ট উত্তর পাওয়া যায়নি।',
          'আরও তথ্যের জন্য আমাদের ইনকোয়ারি ফর্ম পূরণ করুন অথবা ফোন বা ইমেইলে যোগাযোগ করুন।',
          'হটলাইন: ১৬৬২০',
          'ফোন: ০৯৬০৬১০০৫২০',
          'ইমেইল: agniapps@agni.com',
        ].join('\n\n')
      : [
          introduction || 'I couldn’t find a specific answer to your question.',
          'For more information, please fill out our inquiry form or contact us by phone or email.',
          'Hotline: 16620',
          'Phone: 09606100520',
          'Email: agniapps@agni.com',
        ].join('\n\n'),

    link: {
      to: INQUIRY_PATH,
      label: isBangla
        ? 'ইনকোয়ারি ফর্ম পূরণ করুন'
        : 'Fill out inquiry form',
    },
  }
}

function findFaq(items, message) {
  const query = normalize(message)

  if (!query) return null

  const questions = (item) =>
    [item.question, item.question_en, item.question_bn]
      .filter(Boolean)
      .map(normalize)

  const exact = items.find((item) => questions(item).includes(query))

  if (exact) return exact

  const ignored = new Set([
    'a', 'an', 'the', 'is', 'are', 'do', 'does',
    'how', 'can', 'i', 'my', 'to', 'what', 'please',
    'কি', 'কী', 'কিভাবে', 'কীভাবে', 'আমি', 'আমার',
    'করব', 'করবো', 'করে', 'হয়',
  ])

  const words = [...new Set(query.split(' '))].filter(
    (word) => word.length > 1 && !ignored.has(word),
  )

  if (!words.length) return null

  const ranked = items
    .map((item) => ({
      item,
      score: Math.max(
        0,
        ...questions(item).map((question) => {
          const questionWords = new Set(question.split(' '))

          return words.filter((word) => questionWords.has(word)).length
        }),
      ),
    }))
    .sort((a, b) => b.score - a.score)

  const first = ranked[0]
  const second = ranked[1]

  if (!first || first.score < Math.min(2, words.length)) {
    return null
  }

  if (second && second.score === first.score) {
    return null
  }

  return first.item
}

export async function getChatbotReply({
  message = '',
  lang = 'en',
  topic,
  signal,
}) {
  const language = lang === 'bn' ? 'bn' : 'en'
  const isBangla = language === 'bn'

  // Explicit topic buttons take priority over typed keywords.
  const wants = (id, keywords) =>
    topic
      ? topic === id
      : keywords.some((keyword) => matches(message, keyword))

  try {
    if (
      wants('packages', [
        'package', 'packages', 'bundle', 'প্যাকেজ',
      ])
    ) {
      const packages = await getList('/packages', signal)

      if (!packages.length) {
        return supportReply(
          language,
          isBangla
            ? 'প্যাকেজের বিস্তারিত এখনো চ্যাটে যোগ করা হয়নি।'
            : 'Package details have not been added to the chat yet.',
        )
      }

      const details = packages.map((item, index) => {
        const name = localized(item, 'name', language)
        const price = formatNumber(item.price, language)
        const minutes = formatNumber(item.minutes, language, 0)
        const validity = formatNumber(item.validity_days, language, 0)

        return [
          `${formatNumber(index + 1, language, 0)}. ${name}`,
          `${isBangla ? 'দাম' : 'Price'}: ৳${price}`,
          `${isBangla ? 'মিনিট' : 'Minutes'}: ${minutes}`,
          `${isBangla ? 'মেয়াদ' : 'Validity'}: ${validity} ${
            isBangla ? 'দিন' : 'days'
          }`,
        ].join('\n')
      })

      return {
        text: [
          isBangla ? 'আমাদের প্যাকেজসমূহ:' : 'Our available packages:',
          ...details,
        ].join('\n\n'),
      }
    }

    if (
      wants('rates', [
        'rate', 'rates', 'tariff', 'calling rates',
        'রেট', 'কল রেট', 'কলের খরচ',
      ])
    ) {
      const rates = await getList('/calling-rates', signal)

      if (!rates.length) {
        return supportReply(
          language,
          isBangla
            ? 'কল রেটের বিস্তারিত এখনো চ্যাটে যোগ করা হয়নি।'
            : 'Calling rate details have not been added to the chat yet.',
        )
      }

      const details = rates.map((item, index) => {
        const country = localized(item, 'country', language)
        const rate = formatNumber(item.rate_per_minute, language, 4)

        return [
          `${formatNumber(index + 1, language, 0)}. ${country}`,
          `${isBangla ? 'প্রিফিক্স' : 'Prefix'}: ${item.prefix || '—'}`,
          `${isBangla ? 'প্রতি মিনিট' : 'Per minute'}: ৳${rate}`,
        ].join('\n')
      })

      return {
        text: [
          isBangla ? 'আমাদের কল রেট:' : 'Our calling rates:',
          ...details,
        ].join('\n\n'),
      }
    }

    if (
      wants('support', [
        'support', 'contact', 'hotline', 'email', 'inquiry',
        'সাপোর্ট', 'যোগাযোগ', 'হটলাইন', 'ইমেইল', 'ইনকোয়ারি',
      ])
    ) {
      return supportReply(
        language,
        isBangla
          ? 'অগ্নিটক সাপোর্টে যোগাযোগ করুন।'
          : 'Contact AgniTalk support.',
      )
    }

    const guide = chatbotFaqs.find((item) =>
      topic
        ? item.id === topic
        : item.keywords.some((keyword) => matches(message, keyword)),
    )

    if (guide) {
      return {
        text: guide.answer[language],
        ...(guide.link && {
          link: {
            to: guide.link.to,
            label: guide.link[language],
          },
        }),
      }
    }

    const faqs = await getList('/faqs', signal)

    if (wants('faqs', ['faq', 'faqs', 'প্রশ্নোত্তর'])) {
      if (!faqs.length) {
        return supportReply(
          language,
          isBangla
            ? 'প্রশ্নোত্তর এখনো চ্যাটে যোগ করা হয়নি।'
            : 'FAQs have not been added to the chat yet.',
        )
      }

      return {
        text: faqs
          .map((item, index) => {
            const question = localized(item, 'question', language)
            const answer = localized(item, 'answer', language)

            return [
              `${formatNumber(index + 1, language, 0)}. ${question}`,
              answer,
            ].join('\n')
          })
          .join('\n\n'),
      }
    }

    const matchedFaq = findFaq(faqs, message)

    if (matchedFaq) {
      const answer = localized(matchedFaq, 'answer', language)

      if (answer) return { text: answer }
    }

    return supportReply(language)
  } catch (error) {
    if (error.name === 'AbortError') throw error

    return supportReply(
      language,
      isBangla
        ? 'এই মুহূর্তে তথ্য লোড করা যাচ্ছে না। পরে আবার চেষ্টা করুন।'
        : 'The information could not be loaded right now. Please try again later.',
    )
  }
}