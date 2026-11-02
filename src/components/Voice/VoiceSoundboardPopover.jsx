import React from 'react';
import {
  playAirhornSound,
  playQuackSound,
  playBadumTssSound,
  playApplauseSound,
} from '../../soundEffects';

export const SOUNDBOARD_SOUNDS = [
  { id: 'airhorn', name: 'Lufthorn', emoji: '📢', play: playAirhornSound },
  { id: 'quack', name: 'Enten-Quak', emoji: '🦆', play: playQuackSound },
  { id: 'badum', name: 'Ba-Dum-Tss!', emoji: '🥁', play: playBadumTssSound },
  { id: 'applause', name: 'Großer Applaus', emoji: '👏', play: playApplauseSound },
];

export default function VoiceSoundboardPopover() {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#0c0c10] border border-amber-500/30 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.15)] z-50 w-56 animate-in zoom-in-95">
      <div className="text-[10px] font-bold text-amber-300/80 uppercase mb-2">
        SOUNDBOARD
      </div>
      <div className="grid grid-cols-2 gap-2">
        {SOUNDBOARD_SOUNDS.map((snd) => (
          <button
            key={snd.id}
            onClick={() => snd.play()}
            className="p-2 rounded-xl bg-[#131318] hover:bg-[#1a1a22] border border-amber-500/15 hover:border-amber-400/40 flex flex-col items-center justify-center text-center transition hover:scale-105 cursor-pointer"
          >
            <span className="text-xl mb-1">{snd.emoji}</span>
            <span className="text-[10px] font-bold text-white leading-tight">
              {snd.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
