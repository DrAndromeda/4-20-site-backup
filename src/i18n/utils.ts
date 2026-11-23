import { ui, LOCALES, DEFAULT_LANG, type Lang } from './ui';
import { extra } from './extra';

export function useTranslations(lang: Lang) {
  return (key: string): string => ui[lang][key] ?? extra[lang][key] ?? ui[DEFAULT_LANG][key] ?? key;
}

export function isLang(v: string | undefined): v is Lang {
  return !!v && (LOCALES as readonly string[]).includes(v);
}

/** Build a localized path: localePath('en', '/cannabinoids/') -> '/en/cannabinoids/' */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${clean === '/' ? '/' : clean.endsWith('/') ? clean : clean + '/'}`;
}

/** Strip the language prefix from a pathname. */
export function stripLang(pathname: string): string {
  const m = pathname.match(/^\/(ru|uk|en|es)(\/.*)?$/);
  return m ? m[2] || '/' : pathname;
}

export function getStaticLangPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}
