import { create } from 'zustand';
import de from './translations/de.json';
import en from './translations/en.json';

type Language = 'en' | 'de';
type Translations = typeof de;

interface I18nStore {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useI18n = create<I18nStore>((set, get) => ({
  language: 'de',
  translations: de,
  setLanguage: (lang) => {
    const translations = lang === 'de' ? de : en;
    set({ language: lang, translations });
  },
  t: (key) => {
    const keys = key.split('.');
    let value: any = get().translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  },
}));