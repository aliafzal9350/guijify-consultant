/**
 * PLACEHOLDER - "starter kit loaded" check page.
 * After importing this repo into Google AI Studio Build, paste MASTER_PROMPT.md into the chat;
 * the model replaces this file with the real website.
 */
import { meta, provinces, site } from '@/data';
import logoGold from '@/assets/brand/logo-mark-gold.png';

export default function App() {
  const c = meta.counts;
  return (
    <main className="min-h-screen bg-navy text-mist">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center gap-4">
          <img src={logoGold} alt="Gujjify Consultant logo" className="h-16 w-16" />
          <div>
            <p className="font-display text-3xl text-white">{site.brand.name}</p>
            <p className="text-sm tracking-[0.28em] text-gold-2">{site.brand.tagline.toUpperCase()}</p>
          </div>
        </div>

        <h1 className="mt-12 text-4xl text-white">Starter kit loaded</h1>
        <p className="mt-3 max-w-2xl">
          Data check passed: {c.programmes} programmes in {c.provinces} provinces and {c.cities} cities
          ({c.englishTaught} English-taught, {c.fullyFunded} fully funded). Next step: paste
          <span className="text-gold-2"> MASTER_PROMPT.md </span> into the AI Studio chat.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {provinces.map((p) => (
            <li key={p.adcode} className="rounded-card border border-white/10 bg-navy-2 px-4 py-3 shadow-soft">
              <span className="font-display text-lg text-white">{p.name}</span>
              <span className="ml-2 text-sm text-mist/70">{p.nameZh}</span>
              <span className="block text-sm text-gold-2">
                {p.programCount} {p.programCount === 1 ? 'programme' : 'programmes'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
