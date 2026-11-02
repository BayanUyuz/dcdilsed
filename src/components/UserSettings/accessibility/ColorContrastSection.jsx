import React from 'react';

export default function ColorContrastSection({
  highContrast,
  setHighContrast,
  saturation,
  setSaturation,
  underlineLinks,
  setUnderlineLinks,
  desaturateRoleColors,
  setDesaturateRoleColors
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
        Farbe und Kontrast
      </h3>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
        {/* High Contrast */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-amber-100">Hoher Kontrast (High Contrast)</div>
            <div className="text-xs text-amber-300/70">
              Verstärkt den Kontrast zwischen Texten, Schaltflächen und Rändern für bessere Lesbarkeit.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
              highContrast ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full ${highContrast ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                highContrast ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="h-[1px] bg-amber-500/20" />

        {/* Saturation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-amber-100">Farbsättigung (Saturation)</div>
              <div className="text-xs text-amber-300/70">
                Passe die Intensität aller Farben an (0% Graustufen / Schwarz-Weiß, 100% volle Farbe).
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#070709] border border-amber-500/30 text-xs font-mono font-bold text-amber-400">
              %{saturation}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={saturation}
            onChange={(e) => setSaturation(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-amber-300/60 font-mono">
            <span>0% (Schwarz-Weiß)</span>
            <span>%50</span>
            <span className="text-amber-400 font-bold">100% (Volle Sättigung)</span>
          </div>
        </div>

        <div className="h-[1px] bg-amber-500/20" />

        {/* Underline links */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-amber-100">Links immer unterstreichen</div>
            <div className="text-xs text-amber-300/70">
              Hebt Weblinks im Text dauerhaft durch eine Unterstreichung hervor.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUnderlineLinks(!underlineLinks)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
              underlineLinks ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full ${underlineLinks ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                underlineLinks ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="h-[1px] bg-amber-500/20" />

        {/* Desaturate role colors */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-amber-100">Rollenfarben-Sättigung reduzieren</div>
            <div className="text-xs text-amber-300/70">
              Wandelt grelle Neon-Namen in sanftere, augenschonende Pastelltöne um.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDesaturateRoleColors(!desaturateRoleColors)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
              desaturateRoleColors ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full ${desaturateRoleColors ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                desaturateRoleColors ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
