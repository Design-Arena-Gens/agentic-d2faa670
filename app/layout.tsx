import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Niewydolno?? serca ? prezentacja (ESC)',
  description: 'Streszczenie najnowszych wytycznych ESC dotycz?cych niewydolno?ci serca',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand" aria-label="prezentacja ESC HF">
              <div className="logo" />
              <h1>Niewydolno?? serca ? wg ESC</h1>
            </div>
            <div className="actions">
              <a className="button secondary" href="#" onClick={(e) => { e.preventDefault(); window.print(); }}>Drukuj / PDF</a>
              <a className="button" href="https://www.escardio.org/" target="_blank" rel="noreferrer noopener">Strona ESC</a>
            </div>
          </header>
          {children}
          <footer className="footer">
            Opracowano edukacyjnie na podstawie wytycznych ESC (2021 + aktualizacje 2023). Nie zast?puje dokument?w ?r?d?owych.
          </footer>
        </div>
      </body>
    </html>
  );
}
