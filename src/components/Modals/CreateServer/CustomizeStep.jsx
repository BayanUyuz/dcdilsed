import React from 'react';
import { Camera, Upload, Trash2 } from 'lucide-react';
import { PRESET_ICONS } from './serverTemplates';

export default function CustomizeStep({
  fileInputRef,
  handleFileChange,
  serverIcon,
  setServerIcon,
  serverName,
  setServerName,
  handleFinalCreate,
  setStep
}) {
  return (
    <form onSubmit={handleFinalCreate} className="flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-black text-center text-white mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          Passe deinen Server an
        </h2>
        <p className="text-xs text-center text-amber-200/60 leading-relaxed max-w-xs mx-auto mb-6">
          Gib deinem neuen Server einen Namen und ein Symbol. Du kannst dies jederzeit später ändern.
        </p>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Server Icon Selector */}
        <div className="flex flex-col items-center mb-5">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative group cursor-pointer w-20 h-20 rounded-2xl border-2 border-dashed border-amber-500/40 hover:border-amber-400 flex items-center justify-center overflow-hidden transition shadow-lg bg-[#0e0e12]"
          >
            {serverIcon ? (
              <img
                src={serverIcon}
                alt="Icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-amber-200/70 group-hover:text-amber-300 transition">
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-[9px] font-bold uppercase tracking-wider">HOCHLADEN</span>
              </div>
            )}

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-amber-300 text-[9px] font-bold transition">
              <Upload className="w-4 h-4 mb-0.5" />
              ÄNDERN
            </div>
          </div>

          {serverIcon && (
            <button
              type="button"
              onClick={() => setServerIcon('')}
              className="text-[11px] text-discord-red hover:underline mt-2 flex items-center gap-1 font-medium cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Symbol entfernen</span>
            </button>
          )}

          {/* Quick Preset Icons */}
          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-[10px] text-amber-200/60 uppercase font-bold mr-1">Beispiele:</span>
            {PRESET_ICONS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setServerIcon(preset)}
                className="w-6 h-6 rounded-full overflow-hidden border border-amber-500/30 hover:scale-110 transition cursor-pointer"
              >
                <img src={preset} alt="Preset" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Server Name Field */}
        <div className="mb-4">
          <label className="text-[11px] font-bold text-amber-300/80 uppercase block mb-1 tracking-wider">
            SERVERNAME <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            required
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            placeholder="Servernamen eingeben"
            className="w-full bg-[#121216] rounded-xl px-3.5 py-2.5 text-sm text-white border border-amber-500/25 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
          />
        </div>

        {/* Guidelines Notice */}
        <p className="text-[11px] text-neutral-400 leading-relaxed">
          Mit der Erstellung eines Servers akzeptierst du die{' '}
          <a
            href="https://discord.com/guidelines"
            target="_blank"
            rel="noreferrer"
            className="text-amber-400 hover:text-amber-300 hover:underline font-semibold"
          >
            Community-Richtlinien
          </a>{' '}
          von DilSed.
        </p>
      </div>

      <div className="bg-[#070709] px-6 py-4 flex items-center justify-between border-t border-amber-500/15">
        <button
          type="button"
          onClick={() => setStep('audience')}
          className="text-xs font-semibold text-amber-200/70 hover:text-white hover:underline cursor-pointer"
        >
          Zurück
        </button>
        <button
          type="submit"
          disabled={!serverName.trim()}
          className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-6 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-amber-500/20 disabled:opacity-50 active:scale-95 cursor-pointer"
        >
          Erstellen
        </button>
      </div>
    </form>
  );
}
