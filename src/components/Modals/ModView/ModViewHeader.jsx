import React from 'react';
import {
  X,
  Calendar,
  Shield,
  UserCheck
} from 'lucide-react';
import ModActionToolbar from './ModActionToolbar';

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
          <ModActionToolbar
            member={member}
            isVerified={isVerified}
            onVerifyMember={onVerifyMember}
            isServerMuted={isServerMuted}
            onToggleServerMute={onToggleServerMute}
            isServerDeafened={isServerDeafened}
            onToggleServerDeafen={onToggleServerDeafen}
            timeoutExpiry={timeoutExpiry}
            onTimeoutUser={onTimeoutUser}
            showTimeoutDropdown={showTimeoutDropdown}
            setShowTimeoutDropdown={setShowTimeoutDropdown}
            onKickUser={onKickUser}
            onBanUser={onBanUser}
          />
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
