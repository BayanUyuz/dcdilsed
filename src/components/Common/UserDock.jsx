import React from 'react';
import { Mic, MicOff, Headphones, Settings } from 'lucide-react';
import { playMuteSound } from '../../soundEffects';

export default function UserDock({
  currentUser,
  isMuted,
  setIsMuted,
  isDeafened,
  setIsDeafened,
  onOpenSettings
}) {
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    playMuteSound(nextMuted);
  };

  const toggleDeafen = () => {
    const nextDeafened = !isDeafened;
    setIsDeafened(nextDeafened);
    if (nextDeafened) {
      setIsMuted(true);
    }
    playMuteSound(nextDeafened);
  };

  const statusColor =
    currentUser?.status === 'online'
      ? 'bg-emerald-400'
      : currentUser?.status === 'idle'
      ? 'bg-amber-400'
      : currentUser?.status === 'dnd'
      ? 'bg-red-500'
      : 'bg-neutral-600';

  return (
    <div className="h-[52px] bg-[#060608] px-2 flex items-center justify-between flex-shrink-0 border-t border-amber-500/15">
      <div
        onClick={onOpenSettings}
        className="flex items-center gap-2 p-1 -ml-1 rounded-lg hover:bg-white/5 cursor-pointer transition flex-1 min-w-0"
      >
        <div className="relative flex-shrink-0">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.username}
            className="w-8 h-8 rounded-full object-cover border border-amber-500/30"
          />
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black ${statusColor}`}
          />
        </div>
        <div className="truncate min-w-0">
          <div className="text-sm font-bold text-amber-200 truncate leading-tight">
            {currentUser?.displayName}
          </div>
          <div className="text-[11px] text-amber-300/70 truncate">
            {currentUser?.statusText}
          </div>
        </div>
      </div>

      <div className="flex items-center text-amber-400 gap-0.5">
        <button
          onClick={toggleMute}
          className={`p-1.5 rounded-lg hover:bg-white/5 transition hover:scale-105 ${
            isMuted ? 'text-red-400' : 'text-amber-400 hover:text-amber-300'
          }`}
          title={isMuted ? 'Stummschaltung aufheben' : 'Stummschalten'}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-400" />}
        </button>
        <button
          onClick={toggleDeafen}
          className={`p-1.5 rounded-lg hover:bg-white/5 transition hover:scale-105 ${
            isDeafened ? 'text-red-400' : 'text-amber-400 hover:text-amber-300'
          }`}
          title={isDeafened ? 'Taubschaltung aufheben' : 'Taub schalten'}
        >
          <Headphones className="w-4 h-4 text-amber-400" />
        </button>
        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg hover:bg-white/5 text-amber-400 hover:text-amber-300 transition hover:scale-105 group"
          title="Benutzereinstellungen"
        >
          <Settings className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
