import React from 'react';

export default function VisualDensitySection({
  messageDisplay,
  setMessageDisplay
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
        Visuelle Dichte (Nachrichtenansicht)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cozy */}
        <div
          onClick={() => setMessageDisplay('cozy')}
          className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
            messageDisplay === 'cozy'
              ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
              : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-amber-100">Gemütlich (Cozy)</span>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  messageDisplay === 'cozy' ? 'border-amber-400 bg-amber-400' : 'border-amber-500/30'
                }`}
              >
                {messageDisplay === 'cozy' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
              </div>
            </div>
            <p className="text-xs text-amber-300/70 leading-relaxed">
              Moderne und großzügige Ansicht. Große Avatare, klare Zeilenabstände und lesefreundliche Nachrichten.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-400/30 border border-amber-500/40" />
            <div className="h-2 w-24 bg-amber-500/20 rounded" />
          </div>
        </div>

        {/* Compact */}
        <div
          onClick={() => setMessageDisplay('compact')}
          className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
            messageDisplay === 'compact'
              ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
              : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-amber-100">Kompakt (Compact)</span>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  messageDisplay === 'compact' ? 'border-amber-400 bg-amber-400' : 'border-amber-500/30'
                }`}
              >
                {messageDisplay === 'compact' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
              </div>
            </div>
            <p className="text-xs text-amber-300/70 leading-relaxed">
              Klassischer IRC-Stil. Avatare werden ausgeblendet, Zeit und Name stehen in einer Zeile. Mehr Text auf einen Blick.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center gap-2">
            <div className="h-2 w-8 bg-amber-500/20 rounded" />
            <div className="h-2 w-28 bg-amber-500/20 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
