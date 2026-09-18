import data from '@/content/site.json';

export type Pillar = { icon: string; title: string; text: string };
export type Step = { n: string; title: string; text: string };
export type Review = { name: string; quote: string; event?: string };

export type Branch = {
  slug: string; name: string; kind: string; icon: string; color: string;
  image: string; crest: string; tagline: string; short: string; intro: string;
  mission: string[]; highlights: Pillar[]; defs?: [string, string][];
  cores: { name: string; text: string; rules: [string, boolean][] }[];
  coreNote: string;
  join: { heading: string; steps: Step[]; note: string; wa: string };
  faqs: [string, string][];
};

export type Course = {
  slug: string; title: string; subtitle: string; price: number; image: string;
  short: string; summary: string; learn: string[]; get: string[]; forWho: string;
  curriculum: [string, string][]; meta: string[];
};

export type EventItem = {
  slug: string; title: string; edition: string; status: string; dateText: string;
  venue: string; tagline: string; summary: string; pillars: Pillar[];
  link: string; linkLabel: string; image: string; reviews: Review[];
};

export const site = data.site;
export const about = data.about;
export const branches = data.branches as unknown as Branch[];
export const courses = data.courses as unknown as Course[];
export const events = data.events as unknown as EventItem[];
export const voices = data.voices as { name: string; quote: string; mine: boolean }[];

export const getBranch = (s: string) => branches.find((b) => b.slug === s);
export const getCourse = (s: string) => courses.find((c) => c.slug === s);
export const getEvent = (s: string) => events.find((e) => e.slug === s);

export const naira = (n: number) => '\u20a6' + n.toLocaleString('en-NG');

/** WhatsApp deep link with a preset message that names where it came from. */
export function wa(message: string, context?: string) {
  const from = context ? ` (from your website \u2014 ${context})` : ' (from your website)';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hi Leathrock' + from + '. ' + message)}`;
}
