import React from 'react';
import {
  X,
  CheckCircle2,
  MicOff,
  Headphones,
  Clock,
  AlertTriangle,
  Ban,
  Calendar,
  Shield,
  UserCheck
} from 'lucide-react';

const TIMEOUT_DURATIONS = [
  { label: '60 Sekunden', duration: '60s' },
  { label: '5 Minuten', duration: '5m' },
  { label: '10 Minuten', duration: '10m' },
  { label: '1 Stunde', duration: '1h' },
  { label: '1 Tag', duration: '1d' },
  { label: '1 Woche', duration: '1w' },
];

export default function ModViewHeader({
  member,
  onClose,
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
    <>
      {/* Banner */}
      <div
        className="h-24 w-full relative flex-shrink-0"
        style={{
          backgroundColor: member.roleColor || '#5865F2',
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.4))'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Info Bar */}
      <div className="px-6 pb-4 pt-0 bg-discord-darker relative flex-shrink-0 border-b border-discord-divider/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-10 gap-3">
          <div className="flex items-end gap-3.5">
            <div className="relative">
              <img
                src={member.avatar}
                alt={member.displayName}
                className="w-20 h-20 rounded-full border-4 border-discord-darker object-cover shadow-lg"
              />
              <span
                className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-discord-darker ${
                  member.status === 'online'
                    ? 'bg-discord-green'
                    : member.status === 'idle'
                    ? 'bg-discord-yellow'
                    : member.status === 'dnd'
                    ? 'bg-discord-red'
                    : 'bg-[#747f8d]'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white leading-tight">
                  {member.displayName}
                </h2>
                {isVerified && (
                  <span
                    title="Verifiziertes Mitglied"
                    className="flex items-center gap-1 bg-discord-green/20 text-discord-green text-[10px] font-bold px-2 py-0.5 rounded-full border border-discord-green/40"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Verifiziert
                  </span>
                )}
                {isServerMuted && (
                  <span
                    title="Serverweit stummgeschaltet"
                    className="flex items-center gap-1 bg-discord-red/20 text-discord-red text-[10px] font-bold px-2 py-0.5 rounded-full border border-discord-red/40"
                  >
                    <MicOff className="w-3 h-3" />
                    Serverweit stummgeschaltet
                  </span>
                )}
                {isServerDeafened && (
                  <span
                    title="Serverweit taubgeschaltet"
                    className="flex items-center gap-1 bg-discord-red/20 text-discord-red text-[10px] font-bold px-2 py-0.5 rounded-full border border-discord-red/40"
                  >
                    <Headphones className="w-3 h-3" />
                    Serverweit taubgeschaltet
                  </span>
                )}
                {timeoutExpiry && (
                  <span
                    title="Timeout aktiv"
                    className="flex items-center gap-1 bg-discord-yellow/20 text-discord-yellow text-[10px] font-bold px-2 py-0.5 rounded-full border border-discord-yellow/40"
                  >
                    <Clock className="w-3 h-3" />
                    Timeout ({timeoutExpiry})
                  </span>
                )}
              </div>
              <div className="text-xs text-discord-textMuted flex items-center gap-2 mt-0.5">
                <span>@{member.username}</span>
                <span>•</span>
                <span>ID: {member.id}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-discord-divider/20 text-xs text-discord-textMuted">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-discord-blurple flex-shrink-0" />
            <div>
              <span className="block text-[10px] uppercase font-bold text-discord-textMuted">KONTO ERSTELLT</span>
              <span className="text-white font-medium">12. Jan. 2021 (vor 3 Jahren)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-discord-green flex-shrink-0" />
            <div>
              <span className="block text-[10px] uppercase font-bold text-discord-textMuted">SERVER BEIGETRETEN</span>
              <span className="text-white font-medium">04. Jun. 2023</span>
            </div>
          </div>
          <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
            <UserCheck className="w-3.5 h-3.5 text-discord-yellow flex-shrink-0" />
            <div>
              <span className="block text-[10px] uppercase font-bold text-discord-textMuted">EINGELADEN VON</span>
              <span className="text-white font-medium">discord.gg/community</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
