import React, { useState } from 'react';
import {
  Shield,
  ChevronRight,
  Check,
  Sliders,
  CheckCircle2,
  Clock,
  UserMinus,
  UserPlus,
  UserX,
  AlertTriangle,
  Ban,
} from 'lucide-react';
import { AVAILABLE_ROLES, TIMEOUT_OPTIONS } from './constants';

export default function ModActionsSection({
  member,
  onClose,
  onToggleRole,
  onOpenModView,
  onVerifyMember,
  isVerified,
  onTimeoutUser,
  onToggleFriend,
  isFriend,
  onBlockUser,
  isBlocked,
  onKickUser,
  onBanUser,
}) {
  const [showRolesSubmenu, setShowRolesSubmenu] = useState(false);
  const [showTimeoutSubmenu, setShowTimeoutSubmenu] = useState(false);

  return (
    <>
      <div className="h-[1px] bg-discord-divider/40 my-1" />

      <div
        className="relative"
        onMouseEnter={() => setShowRolesSubmenu(true)}
        onMouseLeave={() => setShowRolesSubmenu(false)}
      >
        <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition cursor-pointer">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-discord-blurple" />
            <span>Rollen</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-discord-textMuted" />
        </button>

        {showRolesSubmenu && (
          <div className="absolute top-0 right-full mr-1 w-48 bg-discord-darkest border border-discord-divider/50 rounded-xl p-1.5 shadow-2xl space-y-0.5 animate-in fade-in zoom-in-95 z-50">
            <div className="text-[9px] font-bold text-discord-textMuted uppercase px-2 py-1">
              ROLLEN BEARBEITEN
            </div>
            {AVAILABLE_ROLES.map((role) => {
              const hasRole = member.role === role.name;
              return (
                <button
                  key={role.id}
                  onClick={() => onToggleRole(member, role)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: role.color }}
                    />
                    <span className="truncate">{role.name}</span>
                  </div>
                  {hasRole && <Check className="w-3.5 h-3.5 text-discord-green flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          onClose();
          onOpenModView(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition cursor-pointer"
      >
        <Sliders className="w-3.5 h-3.5 text-discord-blurple" />
        <span>In Moderationsansicht öffnen</span>
      </button>

      <button
        onClick={() => onVerifyMember(member)}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2
            className={`w-3.5 h-3.5 ${
              isVerified ? 'text-discord-green' : 'text-discord-textMuted'
            }`}
          />
          <span>{isVerified ? 'Verifizierung entfernen' : 'Mitglied verifizieren'}</span>
        </div>
        {isVerified && (
          <span className="text-[9px] bg-discord-green/20 text-discord-green px-1 rounded font-bold">
            VERIFIZIERT
          </span>
        )}
      </button>

      <div
        className="relative"
        onMouseEnter={() => setShowTimeoutSubmenu(true)}
        onMouseLeave={() => setShowTimeoutSubmenu(false)}
      >
        <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition cursor-pointer">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-discord-yellow" />
            <span>Timeout verhängen</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-discord-textMuted" />
        </button>

        {showTimeoutSubmenu && (
          <div className="absolute top-0 right-full mr-1 w-40 bg-discord-darkest border border-discord-divider/50 rounded-xl p-1.5 shadow-2xl space-y-0.5 animate-in fade-in zoom-in-95 z-50">
            <div className="text-[9px] font-bold text-discord-textMuted uppercase px-2 py-1">
              DAUER WÄHLEN
            </div>
            {TIMEOUT_OPTIONS.map((to) => (
              <button
                key={to.duration}
                onClick={() => {
                  onClose();
                  onTimeoutUser(member, to.duration);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-discord-hoverChannel transition text-white cursor-pointer"
              >
                {to.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-[1px] bg-discord-divider/40 my-1" />

      <button
        onClick={() => {
          onClose();
          onToggleFriend(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition cursor-pointer"
      >
        {isFriend ? (
          <>
            <UserMinus className="w-3.5 h-3.5 text-discord-red" />
            <span className="text-discord-red">Freund entfernen</span>
          </>
        ) : (
          <>
            <UserPlus className="w-3.5 h-3.5 text-discord-green" />
            <span className="text-discord-green">Freund hinzufügen</span>
          </>
        )}
      </button>

      <button
        onClick={() => {
          onClose();
          onBlockUser(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-red hover:text-white transition text-discord-red cursor-pointer"
      >
        <UserX className="w-3.5 h-3.5" />
        <span>{isBlocked ? 'Blockierung aufheben' : 'Blockieren'}</span>
      </button>

      <div className="h-[1px] bg-discord-divider/40 my-1" />

      <button
        onClick={() => {
          onClose();
          onKickUser(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-red hover:text-white transition text-discord-red font-semibold cursor-pointer"
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        <span className="truncate">{member.displayName} kicken</span>
      </button>

      <button
        onClick={() => {
          onClose();
          onBanUser(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-red hover:text-white transition text-discord-red font-semibold cursor-pointer"
      >
        <Ban className="w-3.5 h-3.5" />
        <span className="truncate">{member.displayName} bannen</span>
      </button>
    </>
  );
}
