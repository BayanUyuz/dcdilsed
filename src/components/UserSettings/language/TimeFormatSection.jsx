import React from 'react';
import { Clock } from 'lucide-react';

const TIME_FORMAT_OPTIONS = [
  {
    id: 'auto',
    title: 'Automatisch',
    desc: 'Verwendet das Standardformat der gewählten Sprache und deines Betriebssystems.',
  },
  {
    id: '12h',
    title: '12-Stunden-Format',
    desc: 'Zeigt Uhrzeiten im AM/PM-Format an (z. B. 02:45 PM).',
  },
  {
    id: '24h',
    title: '24-Stunden-Format',
    desc: 'Zeigt Uhrzeiten standardmäßig im 24-Stunden-Format an (z. B. 14:45).',
  },
];

export default function TimeFormatSection({
  timeFormat,
  setTimeFormat,
  timeZone,
  setTimeZone,
  firstDayOfWeek,
  setFirstDayOfWeek,
  getFormattedTimePreview,
  currentUser,
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Zeit- & Datumsformat</span>
        </h3>
        <p className="text-xs text-amber-300/70">
          Wähle, wie Uhrzeiten in Chatnachrichten, Profilen und Events dargestellt werden.
        </p>
      </div>

      {/* 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {TIME_FORMAT_OPTIONS.map((opt) => {
          const isSelected = timeFormat === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setTimeFormat(opt.id)}
              className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
                  : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-amber-100">{opt.title}</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-amber-400 bg-amber-400' : 'border-amber-500/30'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                  </div>
                </div>
                <p className="text-xs text-amber-300/70 leading-relaxed mb-3">{opt.desc}</p>
              </div>
              <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px]">
                <span className="text-amber-300/70">Aktuelle Uhrzeit:</span>
                <span className="font-mono font-bold text-amber-400">
                  {getFormattedTimePreview(opt.id)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live-Chat Preview */}
      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20">
        <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-2.5">
          Live-Vorschau des Chat-Zeitstempels
        </span>
        <div className="flex items-start gap-3 p-3 bg-[#070709] rounded-lg border border-amber-500/20">
          <img
            src={
              currentUser?.avatar ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
            }
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-amber-500/30"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-amber-100 text-sm">
                {currentUser?.displayName || 'Benutzer'}
              </span>
              <span className="text-[11px] text-amber-300/60 font-mono">
                Heute um {getFormattedTimePreview(timeFormat)}
              </span>
            </div>
            <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">
              Viel Spaß auf den Sprach- und Textkanälen von DilSed! Der Zeitstempel aktualisiert
              sich sofort nach deiner Auswahl.
            </p>
          </div>
        </div>
      </div>

      {/* Timezone and first day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20">
          <label className="text-xs font-bold text-amber-200 block mb-1">Zeitzone</label>
          <p className="text-[11px] text-amber-300/70 mb-2">
            Zeitzone zur Berechnung von Events und Zeitstempeln.
          </p>
          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full bg-[#070709] text-xs text-amber-100 rounded-lg px-3 py-2 border border-amber-500/30 outline-none focus:border-amber-400 cursor-pointer font-medium"
          >
            <option value="Europe/Istanbul">Europe/Istanbul (UTC+03:00 - Türkei)</option>
            <option value="UTC">UTC (Koordinierte Weltzeit)</option>
            <option value="Europe/London">Europe/London (GMT/BST - Großbritannien)</option>
            <option value="Europe/Berlin">Europe/Berlin (MEZ - Deutschland/Frankreich)</option>
            <option value="America/New_York">America/New_York (EST/EDT - New York)</option>
            <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT - Kalifornien)</option>
            <option value="Asia/Tokyo">Asia/Tokyo (JST - Japan)</option>
            <option value="Asia/Dubai">Asia/Dubai (GST - Dubai)</option>
          </select>
        </div>

        <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20">
          <label className="text-xs font-bold text-amber-200 block mb-1">
            Erster Tag der Woche
          </label>
          <p className="text-[11px] text-amber-300/70 mb-2">
            Beginn der Woche in Kalendern und geplanten Events.
          </p>
          <select
            value={firstDayOfWeek}
            onChange={(e) => setFirstDayOfWeek(e.target.value)}
            className="w-full bg-[#070709] text-xs text-amber-100 rounded-lg px-3 py-2 border border-amber-500/30 outline-none focus:border-amber-400 cursor-pointer font-medium"
          >
            <option value="auto">Automatisch (Regionaler Standard)</option>
            <option value="monday">Montag</option>
            <option value="sunday">Sonntag</option>
          </select>
        </div>
      </div>
    </div>
  );
}
