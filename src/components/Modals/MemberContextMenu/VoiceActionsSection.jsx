import React, { useState } from 'react';
import {
  MicOff,
  Headphones,
  PhoneOff,
  ArrowRightLeft,
  ChevronRight,
  Volume2,
} from 'lucide-react';

export default function VoiceActionsSection({
  member,
  onClose,
  isServerMuted,
  onToggleServerMute,
  isServerDeafened,
  onToggleServerDeafen,
  onDisconnectVoice,
  serverVoiceChannels = [],
  onMoveVoiceChannel,
}) {
  const [showMoveSubmenu, setShowMoveSubmenu] = useState(false);

  return (
    <>
      <div className="h-[1px] bg-discord-divider/40 my-1" />
      <div className="text-[9px] font-bold text-discord-textMuted uppercase px-2.5 py-0.5">
        SPRACH-MODERATION
      </div>

      <label
        onClick={(e) => {
          e.preventDefault();
          if (onToggleServerMute) onToggleServerMute(member);
        }}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <MicOff
            className={`w-3.5 h-3.5 ${
              isServerMuted ? 'text-discord-red' : 'text-discord-textMuted'
            }`}
          />
          <span className={isServerMuted ? 'text-discord-red font-semibold' : ''}>
            Serverweit stummschalten
          </span>
        </div>
        <input
          type="checkbox"
          readOnly
          checked={!!isServerMuted}
          className="accent-discord-blurple rounded cursor-pointer w-4 h-4 pointer-events-none"
        />
      </label>

      <label
        onClick={(e) => {
          e.preventDefault();
          if (onToggleServerDeafen) onToggleServerDeafen(member);
        }}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <Headphones
            className={`w-3.5 h-3.5 ${
              isServerDeafened ? 'text-discord-red' : 'text-discord-textMuted'
            }`}
          />
          <span className={isServerDeafened ? 'text-discord-red font-semibold' : ''}>
            Serverweit taubschalten
          </span>
        </div>
        <input
          type="checkbox"
          readOnly
          checked={!!isServerDeafened}
          className="accent-discord-blurple rounded cursor-pointer w-4 h-4 pointer-events-none"
        />
      </label>

      {onDisconnectVoice && (
        <button
          onClick={() => {
            onClose();
            onDisconnectVoice(member);
          }}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-red hover:text-white transition text-discord-textNormal cursor-pointer"
        >
          <PhoneOff className="w-3.5 h-3.5 text-discord-red" />
          <span>Verbindung trennen</span>
        </button>
      )}

      {serverVoiceChannels && serverVoiceChannels.length > 0 && onMoveVoiceChannel && (
        <div
          className="relative"
          onMouseEnter={() => setShowMoveSubmenu(true)}
          onMouseLeave={() => setShowMoveSubmenu(false)}
        >
          <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition cursor-pointer">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-3.5 h-3.5 text-discord-blurple" />
              <span>In Sprachkanal verschieben</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-discord-textMuted" />
          </button>

          {showMoveSubmenu && (
            <div className="absolute top-0 right-full mr-1 w-44 bg-discord-darkest border border-discord-divider/50 rounded-xl p-1.5 shadow-2xl space-y-0.5 animate-in fade-in zoom-in-95 z-50">
              <div className="text-[9px] font-bold text-discord-textMuted uppercase px-2 py-1">
                KANAL WÄHLEN
              </div>
              {serverVoiceChannels.map((vc) => (
                <button
                  key={vc.id}
                  onClick={() => {
                    onClose();
                    onMoveVoiceChannel(member, vc);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs text-white hover:bg-discord-channels transition flex items-center gap-2 cursor-pointer"
                >
                  <Volume2 className="w-3 h-3 text-discord-textMuted" />
                  <span className="truncate">{vc.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
