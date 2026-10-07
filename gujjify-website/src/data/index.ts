/**
 * Single import point for site data. Import from '@/data' everywhere:
 *   import { programs, provinces, site, tools, meta, whatsappLink } from '@/data';
 * Map geometry lives in '@/data/geo' - import it only inside the lazy-loaded map components.
 *
 * The explicit types make `npm run typecheck` verify the JSON against src/types/data.ts.
 */
import programsJson from './programs.json';
import provincesJson from './provinces.json';
import siteJson from './site.json';
import toolsJson from './tools.json';
import metaJson from './meta.json';
import type { Program, Province } from '@/types/data';

export const programs: Program[] = programsJson;
export const provinces: Province[] = provincesJson;

/** Site copy, contacts, social links, legal, FAQ, SEO, WhatsApp messages */
export const site = siteJson;
export type SiteContent = typeof siteJson;

/** Config for the 3 tools: currency, cost calculator, eligibility checker, finder */
export const tools = toolsJson;
export type ToolsConfig = typeof toolsJson;

export const meta = metaJson;

export const programById = new Map(programs.map((p) => [p.id, p]));
export const programBySlug = new Map(programs.map((p) => [p.slug, p]));
export const provinceByName = new Map(provinces.map((p) => [p.name, p]));
export const provinceByAdcode = new Map(provinces.map((p) => [p.adcode, p]));

/** WhatsApp click-to-chat link with a pre-filled message */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
