"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Logo from "@/components/Logo";
import { useLanguage } from "@/components/LanguageProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";

const PHONE = "73325102";

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const cls = `h-5 w-5 ${active ? "text-cb-red" : "text-slate-400"}`;
  const stroke = 1.8;
  switch (name) {
    case "home":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}>
          <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 9.5V21h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "menu":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}>
          <path d="M5 3v18M5 3c2 0 3 1.8 3 4s-1 4-3 4" strokeLinecap="round" />
          <path d="M14 3v7a3 3 0 0 0 3 3h2V3M19 13v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "book":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}>
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M8 3v4M16 3v4M3 10h18M9 15l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}>
          <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="2.6" />
        </svg>
      );
  }
}

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLanguage();

  const items = [
    { href: "/", label: t.nav.home, icon: "home" },
    { href: "/menu", label: t.nav.menu, icon: "menu" },
    { href: "/reservation", label: t.nav.book, icon: "book" },
    { href: "/contact", label: t.nav.contact, icon: "pin" },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col bg-cb-sand shadow-2xl sm:max-w-[560px]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-cb-navy/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-2.5">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-11 w-auto" />
          </Link>
          <div className="flex items-center gap-1.5">
            <div className="flex overflow-hidden rounded-full border border-white/20">
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={`px-2 py-1 text-[11px] font-bold transition ${
                    locale === code ? "bg-cb-red text-white" : "text-white/70 hover:text-white"
                  }`}
                  aria-label={`Langue ${LOCALE_LABELS[code]}`}
                >
                  {LOCALE_LABELS[code]}
                </button>
              ))}
            </div>
            <a
              href={`tel:+216${PHONE}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cb-red text-white"
              aria-label={t.common.call}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1Z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24">{children}</main>

      <footer className="bg-cb-navy px-4 pb-24 pt-6 text-center text-xs text-white/60">
        <p className="font-semibold tracking-widest text-white/80">CARTHAGE BEACH</p>
        <p className="mt-1">VJ85+782, Hammam Sousse · 73 325 102</p>
        <Link href="/admin" className="mt-3 inline-block text-[11px] text-white/40 underline">
          {t.common.admin}
        </Link>
      </footer>

      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[520px] -translate-x-1/2 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:max-w-[560px]">
        <ul className="grid grid-cols-4">
          {items.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition ${
                    active ? "text-cb-red" : "text-slate-500"
                  }`}
                >
                  <NavIcon name={item.icon} active={active} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
