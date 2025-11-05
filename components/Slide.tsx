"use client";
import { useEffect, useMemo, useState } from 'react';

export type SlideBlock = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bullets?: Array<string>;
  cards?: Array<{ title: string; lines: string[]; badge?: { label: string; tone: 'ok' | 'warn' | 'bad' } }>; 
  note?: string;
};

export function useKeyboardNavigation(count: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') setIndex((i) => Math.min(i + 1, count - 1));
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') setIndex((i) => Math.max(i - 1, 0));
      if (e.key === 'Home') setIndex(0);
      if (e.key === 'End') setIndex(count - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [count]);
  return [index, setIndex] as const;
}

export default function SlideDeck({ slides }: { slides: SlideBlock[] }) {
  const [idx, setIdx] = useKeyboardNavigation(slides.length);
  const progress = useMemo(() => ((idx + 1) / slides.length) * 100, [idx, slides.length]);
  return (
    <div className="deck" role="region" aria-label="Slajdy niewydolno?? serca">
      <div style={{ height: 4, background: 'rgba(255,255,255,.08)' }}>
        <div style={{ width: `${progress}%`, height: 4, background: 'linear-gradient(90deg,#6aa4ff,#9ad2ff)' }} />
      </div>
      <Nav idx={idx} setIdx={setIdx} max={slides.length - 1} />
      {slides.map((s, i) => (
        <section key={i} className="slide" style={{ display: i === idx ? 'flex' : 'none' }}>
          {s.eyebrow && <div className="eyebrow">{s.eyebrow}</div>}
          <h2>{s.title}</h2>
          {s.subtitle && <h3>{s.subtitle}</h3>}
          {s.bullets && (
            <div className="content">
              <ul>
                {s.bullets.map((b, n) => (
                  <li key={n} dangerouslySetInnerHTML={{ __html: b }} />
                ))}
              </ul>
            </div>
          )}
          {s.cards && (
            <div className="cards">
              {s.cards.map((c, n) => (
                <div className="card" key={n}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <strong>{c.title}</strong>
                    {c.badge && (
                      <span className={`badge ${c.badge.tone}`}>{c.badge.label}</span>
                    )}
                  </div>
                  <ul className="small">
                    {c.lines.map((l, m) => (
                      <li key={m} dangerouslySetInnerHTML={{ __html: l }} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {s.note && <p className="small" style={{ opacity: 0.8 }}>{s.note}</p>}
          <div className="small" style={{ marginTop: 'auto', display: 'flex', gap: 8, alignItems: 'center', color: '#9aa4c7' }}>
            <span className="kbd">?</span>
            <span className="kbd">?</span>
            <span>/</span>
            <span className="kbd">Home</span>
            <span className="kbd">End</span>
            <span>? nawigacja</span>
          </div>
        </section>
      ))}
    </div>
  );
}

function Nav({ idx, setIdx, max }: { idx: number; setIdx: (v: number) => void; max: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
      <button className="button secondary" onClick={() => setIdx(Math.max(0, idx - 1))} aria-label="Poprzedni">Poprzedni</button>
      <div className="small" aria-live="polite">Slajd {idx + 1} / {max + 1}</div>
      <button className="button" onClick={() => setIdx(Math.min(max, idx + 1))} aria-label="Nast?pny">Nast?pny</button>
    </div>
  );
}
