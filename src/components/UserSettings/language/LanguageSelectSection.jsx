import React, { useState } from 'react';
import { Globe, Search, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DISCORD_LANGUAGES } from '../constants';

export default function LanguageSelectSection({ language, setLanguage }) {
  const [languageSearch, setLanguageSearch] = useState('');

  const filteredLanguages = DISCORD_LANGUAGES.filter(
    (l) =>
      l.native.toLowerCase().includes(languageSearch.toLowerCase()) ||
      l.english.toLowerCase().includes(languageSearch.toLowerCase()) ||
      l.code.toLowerCase().includes(languageSearch.toLowerCase())
  );

  return (
    <div className="space-y-4 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Sprachauswahl</span>
          </h3>
          <p className="text-xs text-amber-300/70">
            Wähle die Sprache für die DilSed-Oberfläche. Die Änderung wird sofort übernommen.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-amber-400/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={languageSearch}
            onChange={(e) => setLanguageSearch(e.target.value)}
            placeholder={`${DISCORD_LANGUAGES.length} Sprachen durchsuchen...`}
            className="w-full bg-[#070709] text-xs text-amber-100 rounded-lg pl-8 pr-3 py-2 border border-amber-500/30 outline-none focus:border-amber-400 placeholder:text-amber-300/40 font-medium"
          />
        </div>
      </div>

      {/* Languages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
        {filteredLanguages.map((langItem) => {
          const isSelected = language === langItem.code;
          return (
            <div
              key={langItem.code}
              onClick={() => {
                setLanguage(langItem.code);
                confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
              }}
              className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
                  : 'bg-[#0c0c10] border-amber-500/20 hover:bg-amber-400/5 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl flex-shrink-0 select-none">{langItem.flag}</span>
                <div className="min-w-0">
                  <div
                    className={`text-xs font-bold truncate ${
                      isSelected ? 'text-amber-200' : 'text-amber-100'
                    }`}
                  >
                    {langItem.native}
                  </div>
                  <div className="text-[10px] text-amber-300/60 truncate">{langItem.english}</div>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400 text-neutral-950'
                    : 'border-amber-500/30'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
