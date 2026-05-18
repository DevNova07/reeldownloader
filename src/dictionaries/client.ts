import en from './en.json'

// Minimal client-side dictionary helper
// This should only be used as a fallback. 
// Preferred method: Pass dictionary from Server Component to Client View.

export const dictionaries = {
  en
}

export type Dictionary = typeof en
export type Locale = string

export const getDictionary = (locale: string): Dictionary => {
  // In a real client-side scenario, this would ideally be loaded via a provider
  // For now, we return English to prevent crashes, but we should refactor pages to use server-passed dicts.
  return (dictionaries as any)[locale] || dictionaries.en
}
