export const locales = ['en'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'en'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
}

import { cache } from 'react'

const dictionaryCache: Record<string, any> = {}

export const getDictionary = cache(async (locale: string): Promise<any> => {
  if (dictionaryCache.en) return dictionaryCache.en

  const en = await dictionaries.en()
  dictionaryCache.en = en
  return en
})

export const languageNames: Record<string, string> = {
  en: 'English',
}

export const languageFlags: Record<string, string> = {
  en: '🇺🇸',
}

export const rtlLocales: string[] = [];
export const isRTL = (locale: string) => false;
