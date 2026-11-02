import React from 'react';
import { Mic, MicOff, Headphones } from 'lucide-react';

export default function VoiceMuteDeafenSection({
  isMuted,
  handleToggleMute,
  pushToMuteKey,
  isRecordingPtmKey,
  setIsRecordingPtmKey,
  isDeafened,
  handleToggleDeafen
}) {
  return (
    <div className="space-y-4 pt-4 border-t border-amber-500/20">
      <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center justify-between">
        <span>STUMM- UND TAUBSCHALTUNG</span>
        <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Live synchronisiert
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mikrofon Mute */}
        <div
          className={`p-4 rounded-2xl border transition shadow-lg ${
            isMuted ? 'bg-red-500/10 border-red-500/40' : 'bg-[#0c0c10] border-amber-500/20'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isMuted ? 'bg-red-500 text-white' : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-xs font-bold text-amber-100">Mikrofonstatus</div>
                <div className={`text-[11px] font-semibold ${isMuted ? 'text-red-400' : 'text-emerald-400'}`}>
                  {isMuted ? 'Stummgeschaltet (Mikrofon aus)' : 'Aktiv & Bereit'}
                </div>
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                isMuted ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {isMuted ? 'STUMM' : 'AKTIV'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleMute}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow cursor-pointer ${
              isMuted ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isMuted ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span>{isMuted ? 'Stummschaltung aufheben' : 'Mikrofon stummschalten'}</span>
          </button>

          <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs">
            <span className="text-amber-300/70 text-[11px]">Push-to-Mute Tastenkürzel:</span>
            <button
              type="button"
              onClick={() => setIsRecordingPtmKey(true)}
              className="px-2.5 py-1 rounded bg-[#070709] text-amber-200 text-[11px] font-mono border border-amber-500/30 hover:border-amber-400 cursor-pointer"
            >
              {isRecordingPtmKey ? 'Taste drücken...' : pushToMuteKey}
            </button>
          </div>
        </div>

        {/* Kopfhörer Deafen */}
        <div
          className={`p-4 rounded-2xl border transition shadow-lg ${
            isDeafened ? 'bg-red-500/10 border-red-500/40' : 'bg-[#0c0c10] border-amber-500/20'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isDeafened ? 'bg-red-500 text-white' : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-100">Kopfhörer / Audioausgabe</div>
                <div className={`text-[11px] font-semibold ${isDeafened ? 'text-red-400' : 'text-amber-300'}`}>
                  {isDeafened ? 'Taubgeschaltet (Alle Töne aus)' : 'Töne aktiv & hörbar'}
                </div>
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                isDeafened ? 'bg-red-500/20 text-red-400' : 'bg-amber-400/20 text-amber-300'
              }`}
            >
              {isDeafened ? 'TAUB' : 'AKTIV'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleDeafen}
            className={`w-full py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 shadow cursor-pointer ${
              isDeafened
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-neutral-950'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>{isDeafened ? 'Taubschaltung aufheben' : 'Kopfhörer taubschalten'}</span>
          </button>

          <div className="mt-3 pt-3 border-t border-amber-500/20 text-[11px] text-amber-300/70">
            Wenn du dich taub schaltest, wird dein Mikrofon automatisch mit stummgeschaltet.
          </div>
        </div>
      </div>
    </div>
  );
}
