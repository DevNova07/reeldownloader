export const locales = ['en', 'hi', 'es', 'ar', 'pt', 'id', 'fr', 'ru', 'ja', 'tr', 'vi', 'th', 'hinglish', 'bn', 'ta', 'ur', 'tl', 'fa', 'uk', 'my', 'am', 'uz', 'ne'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  hi: () => import('./dictionaries/hi.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
  pt: () => import('./dictionaries/pt.json').then((module) => module.default),
  id: () => import('./dictionaries/id.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  tr: () => import('./dictionaries/tr.json').then((module) => module.default),
  vi: () => import('./dictionaries/vi.json').then((module) => module.default),
  th: () => import('./dictionaries/th.json').then((module) => module.default),
  hinglish: () => import('./dictionaries/hinglish.json').then((module) => module.default),
  bn: () => import('./dictionaries/bn.json').then((module) => module.default),
  ta: () => import('./dictionaries/ta.json').then((module) => module.default),
  ur: () => import('./dictionaries/ur.json').then((module) => module.default),
  tl: () => import('./dictionaries/tl.json').then((module) => module.default),
  fa: () => import('./dictionaries/fa.json').then((module) => module.default),
  uk: () => import('./dictionaries/uk.json').then((module) => module.default),
  my: () => import('./dictionaries/my.json').then((module) => module.default),
  am: () => import('./dictionaries/am.json').then((module) => module.default),
  uz: () => import('./dictionaries/uz.json').then((module) => module.default),
  ne: () => import('./dictionaries/ne.json').then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<any> => {
  const en = await dictionaries.en()
  if (locale === 'en' || !locales.includes(locale as Locale)) {
    return en
  }
  const target = await dictionaries[locale as Locale]()
  
  // provide structural fallback for primary sections
  const t = target as Record<string, unknown>
  const castEn = en as Record<string, unknown>
  
  return {
    ...en,
    ...t,
    tabs: { ...(castEn.tabs as object), ...((t.tabs || {}) as object) },
    common: { ...(castEn.common as object), ...((t.common || {}) as object) },
    features: { ...(castEn.features as object), ...((t.features || {}) as object) },
    categories: { ...(castEn.categories as object), ...((t.categories || {}) as object) },
    guide: { ...(castEn.guide as object), ...((t.guide || {}) as object) },
    platforms: { ...(castEn.platforms as object), ...((t.platforms || {}) as object) },
    about_page: t.about_page || castEn.about_page,
  }
}

export const languageNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिंदी',
  es: 'Español',
  ar: 'العربية',
  pt: 'Português',
  id: 'Bahasa Indonesia',
  fr: 'Français',
  ru: 'Русский',
  ja: '日本語',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  hinglish: 'Hinglish',
  bn: 'বাংলা',
  ta: 'தமிழ்',
  ur: 'اردو',
  tl: 'Filipino',
  fa: 'فارسی',
  uk: 'Українська',
  my: 'မြန်မာ',
  am: 'አማርኛ',
  uz: 'Oʻzbekcha',
  ne: 'नेपाली'
}

export const languageFlags: Record<Locale, string> = {
  en: '🇺🇸',
  hi: '🇮🇳',
  es: '🇪🇸',
  ar: '🇸🇦',
  pt: '🇧🇷',
  id: '🇮🇩',
  fr: '🇫🇷',
  ru: '🇷🇺',
  ja: '🇯🇵',
  tr: '🇹🇷',
  vi: '🇻🇳',
  th: '🇹🇭',
  hinglish: '🇮🇳',
  bn: '🇧🇩',
  ta: '🇮🇳',
  ur: '🇵🇰',
  tl: '🇵🇭',
  fa: '🇮🇷',
  uk: '🇺🇦',
  my: '🇲🇲',
  am: '🇪🇹',
  uz: '🇺🇿',
  ne: '🇳🇵'
}

export const rtlLocales: Locale[] = ['ar', 'fa', 'ur'];
export const isRTL = (locale: string) => rtlLocales.includes(locale as Locale);
