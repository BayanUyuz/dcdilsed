import React from 'react';
import {
  CheckCircle2,
  MicOff,
  Headphones,
  Clock,
  AlertTriangle,
  Ban
} from 'lucide-react';

const TIMEOUT_DURATIONS = [
  { label: '60 Sekunden', duration: '60s' },
  { label: '5 Minuten', duration: '5m' },
  { label: '10 Minuten', duration: '10m' },
  { label: '1 Stunde', duration: '1h' },
  { label: '1 Tag', duration: '1d' },
  { label: '1 Woche', duration: '1w' },
];

export default function ModActionToolbar({
  member,
  isVerified,
  onVerifyMember,
  isServerMuted,
  onToggleServerMute,
  isServerDeafened,
  onToggleServerDeafen,
  timeoutExpiry,
  onTimeoutUser,
  showTimeoutDropdown,
  setShowTimeoutDropdown,
  onKickUser,
  onBanUser
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onVerifyMember(member)}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer ${
          isVerified
            ? 'bg-discord-green/20 border-discord-green text-discord-green hover:bg-discord-green/30'
            : 'bg-discord-channels border-discord-divider text-discord-textNormal hover:bg-discord-hoverChannel'
        }`}
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>{isVerified ? 'Verifizierung entfernen' : 'Mitglied verifizieren'}</span>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowTimeoutDropdown(!showTimeoutDropdown)}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-discord-channels border border-discord-divider text-discord-textNormal hover:bg-discord-hoverChannel transition cursor-pointer"
        >
          <Clock className="w-3.5 h-3.5 text-discord-yellow" />
          <span>Timeout</span>
        </button>

        {showTimeoutDropdown && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-discord-darkest border border-discord-divider rounded-xl p-1 shadow-2xl z-20 space-y-0.5">
            <div className="text-[9px] font-bold text-discord-textMuted uppercase px-2 py-1">
              DAUER WÄHLEN
            </div>
            {TIMEOUT_DURATIONS.map((td) => (
              <button
                key={td.duration}
                onClick={() => {
                  onTimeoutUser(member, td.duration);
                  setShowTimeoutDropdown(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded text-xs text-white hover:bg-discord-hoverChannel transition cursor-pointer"
              >
                {td.label}
              </button>
            ))}
            {timeoutExpiry && (
              <button
                onClick={() => {
                  onTimeoutUser(member, null);
                  setShowTimeoutDropdown(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded text-xs text-discord-green hover:bg-discord-hoverChannel transition font-bold cursor-pointer"
              >
                Timeout aufheben
              </button>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => onToggleServerMute && onToggleServerMute(member)}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer ${
          isServerMuted
            ? 'bg-discord-red/20 border-discord-red text-discord-red hover:bg-discord-red/30'
            : 'bg-discord-channels border-discord-divider text-discord-textNormal hover:bg-discord-hoverChannel'
        }`}
        title={isServerMuted ? 'Stummschaltung aufheben' : 'Serverweit stummschalten'}
      >
        <MicOff className="w-3.5 h-3.5" />
        <span>{isServerMuted ? 'Stummgeschaltet' : 'Stummschalten'}</span>
      </button>

      <button
        onClick={() => onToggleServerDeafen && onToggleServerDeafen(member)}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer ${
          isServerDeafened
            ? 'bg-discord-red/20 border-discord-red text-discord-red hover:bg-discord-red/30'
            : 'bg-discord-channels border-discord-divider text-discord-textNormal hover:bg-discord-hoverChannel'
        }`}
        title={isServerDeafened ? 'Taubschaltung aufheben' : 'Serverweit taubschalten'}
      >
        <Headphones className="w-3.5 h-3.5" />
        <span>{isServerDeafened ? 'Taubgeschaltet' : 'Taubschalten'}</span>
      </button>

      <button
        onClick={() => onKickUser(member)}
        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-discord-red/10 border border-discord-red/30 text-discord-red hover:bg-discord-red hover:text-white transition cursor-pointer"
        title="Kicken"
      >
        <AlertTriangle className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => onBanUser(member)}
        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-discord-red/10 border border-discord-red/30 text-discord-red hover:bg-discord-red hover:text-white transition cursor-pointer"
        title="Bannen"
      >
        <Ban className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
