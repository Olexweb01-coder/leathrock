"use client";
/**
 * Client-side content overlay.
 * The admin page writes here; pages read it and append to the static JSON.
 * Swap these four functions for a real DB (Vercel Postgres, Supabase, Sanity...)
 * and nothing else in the app has to change.
 */
export const STORE_KEY = 'leathrock.admin.v1';

export type Store = {
  courses: any[];
  events: any[];
  reviews: Record<string, { name: string; quote: string }[]>;
};

export const EMPTY: Store = { courses: [], events: [], reviews: {} };

export function read(): Store {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw);
    return { courses: p.courses ?? [], events: p.events ?? [], reviews: p.reviews ?? {} };
  } catch { return EMPTY; }
}

export function write(s: Store) {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch { /* quota */ }
  window.dispatchEvent(new Event('leathrock:store'));
}

export function download(s: Store) {
  const blob = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'leathrock-content.json';
  a.click();
  URL.revokeObjectURL(a.href);
}
