import React from 'react';

export default function MotionSection({
  reducedMotionMode,
  setReducedMotionMode,
  autoplayGifs,
  setAutoplayGifs,
  animateEmojis,
  setAnimateEmojis
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
        Reduzierte Bewegung (Reduced Motion)
      </h3>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
        <div>
          <div className="text-sm font-bold text-amber-100 mb-1">Modus für reduzierte Bewegung</div>
          <div className="text-xs text-amber-300/70 mb-3">
            Schränkt Animationen bei Übergängen, Dialogen und Bildläufen ein.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'system', label: 'Mit System synchronisieren', desc: 'Verwendet die Systemeinstellung' },
              { id: 'enabled', label: 'Aktivieren', desc: 'Stoppt Animationen und Bewegungen' },
              { id: 'disabled', label: 'Deaktivieren', desc: 'Alle Animationen und Bewegungen aktiv' },
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setReducedMotionMode(m.id)}
                className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  reducedMotionMode === m.id
                    ? 'bg-amber-500/15 border-amber-400 text-amber-100 ring-1 ring-amber-400 font-bold shadow-md'
                    : 'bg-[#070709] border-amber-500/20 text-amber-300/60 hover:border-amber-500/40 hover:text-amber-200'
                }`}
              >
                <span className="text-xs font-bold text-amber-200 mb-1">{m.label}</span>
                <span className="text-[10px] text-amber-300/60">{m.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-amber-500/20" />

        {/* Autoplay GIFs */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-amber-100">GIFs und Sticker automatisch abspielen</div>
            <div className="text-xs text-amber-300/70">
              Spielt animierte GIFs und Sticker automatisch ab. Wenn deaktiviert, nur beim Daraufzeigen mit der Maus.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAutoplayGifs(!autoplayGifs)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
              autoplayGifs ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full ${autoplayGifs ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                autoplayGifs ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="h-[1px] bg-amber-500/20" />

        {/* Animate Emojis */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-amber-100">Animierte Emojis abspielen</div>
            <div className="text-xs text-amber-300/70">
              Animiert dynamische Emojis automatisch im Chat.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAnimateEmojis(!animateEmojis)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
              animateEmojis ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full ${animateEmojis ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                animateEmojis ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
