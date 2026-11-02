import React from 'react';
import { Volume2, Mic, MicOff, Bell, Sparkles } from 'lucide-react';
import {
  playJoinVoiceSound,
  playLeaveVoiceSound,
  playMessagePingSound,
  playMuteSound,
  playAirhornSound
} from '../../../soundEffects';

export default function VoiceSoundEffectsSection({
  soundboardVolume,
  setSoundboardVolume
}) {
  return (
    <div className="space-y-6 pt-4 border-t border-amber-500/20">
      <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
        AUDIO-EVENTS & BENACHRICHTIGUNGSTÖNE
      </div>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-extrabold text-amber-400 uppercase text-[10px]">SOUNDBOARD-LAUTSTÄRKE</span>
          <span className="text-amber-200 font-bold">%{soundboardVolume}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={soundboardVolume}
          onChange={(e) => setSoundboardVolume(parseInt(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
      </div>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
        <div className="text-xs font-bold text-amber-200 mb-1">DILSED BENACHRICHTIGUNGS- & SOUNDTEST</div>
        <p className="text-[11px] text-amber-300/70 mb-3">
          Klicke auf die Schaltflächen, um die Soundeffekte live anzuhören.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => playJoinVoiceSound()}
            className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
          >
            <span>Kanal beigetreten</span>
            <Volume2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110" />
          </button>

          <button
            type="button"
            onClick={() => playLeaveVoiceSound()}
            className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
          >
            <span>Kanal verlassen</span>
            <Volume2 className="w-3.5 h-3.5 text-red-400 group-hover:scale-110" />
          </button>

          <button
            type="button"
            onClick={() => playMuteSound(true)}
            className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
          >
            <span>Stummgeschaltet</span>
            <MicOff className="w-3.5 h-3.5 text-red-400 group-hover:scale-110" />
          </button>

          <button
            type="button"
            onClick={() => playMuteSound(false)}
            className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
          >
            <span>Stummschaltung aufgehoben</span>
            <Mic className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110" />
          </button>

          <button
            type="button"
            onClick={() => playMessagePingSound()}
            className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
          >
            <span>Nachrichtenton</span>
            <Bell className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110" />
          </button>

          <button
            type="button"
            onClick={() => playAirhornSound()}
            className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
          >
            <span>Soundboard (Lufthorn)</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
}
