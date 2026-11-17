// Small helpers shared by every section for the EN / বাংলা toggle.

/** Adds the Bengali font class when the language is Bengali. */
export const bn = (lang) => (lang === 'bn' ? 'bengali' : '')

/** Display font style for English headings (Bengali uses the .bengali class). */
export const display = (lang) =>
  lang === 'en' ? { fontFamily: 'var(--agni-display)' } : undefined

/** Pick the right translation: pick(lang, { en, bn }) */
export const pick = (lang, obj) => (lang === 'bn' ? obj.bn : obj.en)
