import React from 'react';
import { Radio, Maximize2, Minimize2 } from 'lucide-react';

export default function VoiceRoomHeader({ voiceChannel, isFullscreen, toggleFullscreen }) {
  return (
    <div className="h-12 px-4 border-b border-amber-500/15 bg-[#060608] flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center gap-2">
        <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
        <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-300 text-base">
          {voiceChannel.name}
        </h2>
        <span className="text-xs text-amber-300 font-bold bg-amber-400/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <span>LIVE SPRACHE & STREAM</span>
          <span className="text-[10px] bg-amber-400/25 text-amber-200 px-1.5 py-0.2 rounded font-extrabold">
            1080p 60FPS
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3 text-neutral-400">
        <button
          onClick={toggleFullscreen}
          className="hover:text-amber-300 transition p-1 cursor-pointer"
          title={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
