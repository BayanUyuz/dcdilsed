import React from 'react';

export default function AppearanceTab({ selectedTheme, setSelectedTheme }) {
  const themes = [
    { id: 'dark', label: 'Dunkel (Obsidian)' },
    { id: 'midnight', label: 'Mitternachtsgold' },
    { id: 'light', label: 'Klassisch' },
  ];

  return (
    <div>
      <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-2">
        Erscheinungsbild
      </h2>
      <p className="text-xs text-amber-300/70 mb-6">
        Passe das Erscheinungsbild der DilSed-Oberfläche an deine persönlichen Vorlieben an.
      </p>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themes.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedTheme(t.id)}
              className={`p-4 rounded-xl border text-center cursor-pointer transition ${
                selectedTheme === t.id
                  ? 'border-amber-400 bg-amber-500/15 text-amber-200 font-black shadow-md shadow-amber-500/15 ring-1 ring-amber-400'
                  : 'border-amber-500/20 bg-[#0c0c10] text-amber-300/60 hover:text-amber-200 hover:border-amber-500/40'
              }`}
            >
              <span className="text-xs uppercase tracking-wider font-extrabold">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
