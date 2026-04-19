import en from './en.json'
import hi from './hi.json'
import es from './es.json'
import ar from './ar.json'
import pt from './pt.json'
import id from './id.json'
import fr from './fr.json'
import ru from './ru.json'
import ja from './ja.json'
import tr from './tr.json'
import vi from './vi.json'
import th from './th.json'
import hinglish from './hinglish.json'
import bn from './bn.json'
import ta from './ta.json'
import ur from './ur.json'
import tl from './tl.json'
import fa from './fa.json'
import uk from './uk.json'
import my from './my.json'
import am from './am.json'
import uz from './uz.json'
import ne from './ne.json'

export const dictionaries = {
  en, hi, es, ar, pt, id, fr, ru, ja, tr, vi, th, hinglish, bn, ta, ur, tl, fa, uk, my, am, uz, ne
}

export type Dictionary = typeof en
export type Locale = keyof typeof dictionaries

// Helper to get dictionary safely with English fallback for missing properties
export const getDictionary = (locale: string): Dictionary => {
  return (dictionaries as Record<string, any>)[locale] || dictionaries.en
}
