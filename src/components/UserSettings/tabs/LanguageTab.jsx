import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { DISCORD_LANGUAGES } from '../constants';
import TimeFormatSection from '../language/TimeFormatSection';
import LanguageSelectSection from '../language/LanguageSelectSection';

export default function LanguageTab({
  currentUser,
  language,
  setLanguage,
  timeFormat,
  setTimeFormat,
  timeZone,
  setTimeZone,
  firstDayOfWeek,
  setFirstDayOfWeek,
  getFormattedTimePreview,
}) {
  const [langSubTab, setLangSubTab] = useState('all');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1 flex items-center gap-2">
          <Globe className="w-6 h-6 text-amber-400" />
          <span>Sprache & Zeit</span>
        </h2>
        <p className="text-xs text-amber-300/70">
          Passe die Oberflächensprache, das Zeitformat (12/24 Std.) und regionale Einstellungen an.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-amber-500/20">
        {[
          { id: 'all', label: 'Alle' },
          { id: 'time', label: 'Zeit- & Datumsformat' },
          { id: 'language', label: `Sprachauswahl (${DISCORD_LANGUAGES.length} Sprachen)` },
        ].map((st) => (
          <button
            key={st.id}
            type="button"
            onClick={() => setLangSubTab(st.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              langSubTab === st.id
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black shadow-md shadow-amber-500/25 ring-1 ring-amber-300'
                : 'bg-[#0e0e13] text-amber-200/70 border border-amber-500/20 hover:bg-amber-400/10 hover:text-amber-200'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {(langSubTab === 'all' || langSubTab === 'time') && (
        <TimeFormatSection
          timeFormat={timeFormat}
          setTimeFormat={setTimeFormat}
          timeZone={timeZone}
          setTimeZone={setTimeZone}
          firstDayOfWeek={firstDayOfWeek}
          setFirstDayOfWeek={setFirstDayOfWeek}
          getFormattedTimePreview={getFormattedTimePreview}
          currentUser={currentUser}
        />
      )}

      {(langSubTab === 'all' || langSubTab === 'language') && (
        <LanguageSelectSection language={language} setLanguage={setLanguage} />
      )}
    </div>
  );
}
