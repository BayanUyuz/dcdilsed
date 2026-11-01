import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  MessageSquare,
  AtSign,
  BellOff,
  Bell,
  FileText,
  Edit3,
  VolumeX,
  Volume2,
  Mic,
  MicOff,
  Headphones,
  PhoneOff,
  ArrowRightLeft,
  UserMinus,
  UserPlus,
  Ban,
  Shield,
  Clock,
  ChevronRight,
  Check,
  UserX,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export default function MemberContextMenu({
  isOpen,
  position,
  member,
  server,
  onClose,
  onViewProfile,
  onMention,
  onToggleMentionMute,
  isMentionMuted,
  onStartDm,
  onChangeNickname,
  onAddNote,
  onToggleMute,
  isUserMuted,
  onToggleServerMute,
  isServerMuted,
  onToggleServerDeafen,
  isServerDeafened,
  onDisconnectVoice,
  onMoveVoiceChannel,
  serverVoiceChannels = [],
  onToggleFriend,
  isFriend,
  onBlockUser,
  isBlocked,
  onToggleRole,
  onOpenModView,
  onVerifyMember,
  isVerified,
  onTimeoutUser,
  onKickUser,
  onBanUser,
}) {
  const menuRef = useRef(null);
  const [showRolesSubmenu, setShowRolesSubmenu] = useState(false);
  const [showTimeoutSubmenu, setShowTimeoutSubmenu] = useState(false);
  const [showMoveSubmenu, setShowMoveSubmenu] = useState(false);
  const [userVolume, setUserVolume] = useState(100);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  // Safe window bounding
  const top = Math.min(position?.y || 100, Math.max(10, window.innerHeight - 600));
  const left = Math.min(position?.x || 100, Math.max(10, window.innerWidth - 270));

  const AVAILABLE_ROLES = [
    { id: 'r_admin', name: 'Administrator', color: '#5865F2' },
    { id: 'r_mod', name: 'Moderator', color: '#23a55a' },
    { id: 'r_dev', name: 'Entwickler', color: '#f0b232' },
    { id: 'r_vip', name: 'VIP-Unterstützer', color: '#eb459e' },
    { id: 'r_member', name: 'Mitglied', color: '#949ba4' },
  ];

  const TIMEOUT_OPTIONS = [
    { label: '60 Sekunden', duration: '60s' },
    { label: '5 Minuten', duration: '5m' },
    { label: '10 Minuten', duration: '10m' },
    { label: '1 Stunde', duration: '1h' },
    { label: '1 Tag', duration: '1d' },
    { label: '1 Woche', duration: '1w' },
  ];

  return (
    <div
      ref={menuRef}
      style={{ top: `${top}px`, left: `${left}px` }}
      className="fixed z-50 w-64 bg-discord-darkest border border-discord-divider/50 rounded-xl shadow-2xl p-1.5 text-xs text-discord-textNormal select-none animate-in fade-in zoom-in-95 duration-100 max-h-[92vh] overflow-y-auto custom-scrollbar"
    >
      {/* Kopfzeile: Benutzerübersicht */}
      <div className="px-2.5 py-1.5 border-b border-discord-divider/30 mb-1 flex items-center gap-2">
        <img
          src={member.avatar}
          alt={member.displayName}
          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
        />
        <div className="truncate flex-1">
          <div className="font-semibold text-white truncate text-[11px] leading-tight">
            {member.displayName}
          </div>
          <div className="text-[10px] text-discord-textMuted truncate">
            @{member.username}
          </div>
        </div>
      </div>

      {/* 1. Profil */}
      <button
        onClick={() => {
          onClose();
          onViewProfile(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition"
      >
        <User className="w-3.5 h-3.5" />
        <span>Profil</span>
      </button>

      {/* 2. Bahset (@mention) */}
      <button
        onClick={() => {
          onClose();
          onMention(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition"
      >
        <AtSign className="w-3.5 h-3.5" />
        <span className="truncate">Erwähnen (@{member.displayName})</span>
      </button>

      {/* 3. Erwähnungen stummschalten (Benachrichtigung deaktivieren) */}
      <button
        onClick={() => {
          onToggleMentionMute(member);
        }}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition"
      >
        <div className="flex items-center gap-2">
          {isMentionMuted ? (
            <BellOff className="w-3.5 h-3.5 text-discord-red" />
          ) : (
            <Bell className="w-3.5 h-3.5" />
          )}
          <span>{isMentionMuted ? 'Erwähnungen erlauben' : 'Erwähnungen stummschalten'}</span>
        </div>
        {isMentionMuted && (
          <span className="text-[9px] bg-discord-red/20 text-discord-red px-1 rounded font-bold">STUMM</span>
        )}
      </button>

      {/* 4. Mesaj Gönder (DM) */}
      <button
        onClick={() => {
          onClose();
          onStartDm(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Nachricht senden</span>
      </button>

      {/* 5. Not Ekleme */}
      <button
        onClick={() => {
          onClose();
          onAddNote(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>Notiz hinzufügen</span>
      </button>

      <div className="h-[1px] bg-discord-divider/40 my-1" />

      {/* 6. Spitznamen ändern */}
      <button
        onClick={() => {
          onClose();
          onChangeNickname(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Spitznamen ändern</span>
      </button>

      {/* 7. Yerel Yok Say / Sessize Al (Local Mute) */}
      <button
        onClick={() => {
          onToggleMute(member);
        }}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition"
      >
        <div className="flex items-center gap-2">
          {isUserMuted ? <VolumeX className="w-3.5 h-3.5 text-discord-red" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{isUserMuted ? 'Stummschaltung aufheben' : 'Lokal stummschalten'}</span>
        </div>
        {isUserMuted && <span className="text-[9px] bg-discord-red/20 text-discord-red px-1 rounded font-bold">AKTIV</span>}
      </button>

      {/* Benutzer-Lautstärke */}
      <div className="px-2.5 py-1.5">
        <div className="flex justify-between text-[10px] text-discord-textMuted mb-1 font-semibold">
          <span>BENUTZER-LAUTSTÄRKE</span>
          <span className="text-white font-bold">%{userVolume}</span>
        </div>
        <input
          type="range"
          min={0}
          max={200}
          value={userVolume}
          onChange={(e) => setUserVolume(parseInt(e.target.value))}
          className="w-full accent-discord-blurple cursor-pointer h-1 bg-discord-divider rounded"
        />
      </div>

      {/* ========================================================= */}
      {/* 🔴 SPRACHMODERATION (SERVERWEIT STUMM & TAUB) */}
      {/* ========================================================= */}
      <div className="h-[1px] bg-discord-divider/40 my-1" />
      <div className="text-[9px] font-bold text-discord-textMuted uppercase px-2.5 py-0.5">
        SPRACH-MODERATION
      </div>

      {/* Sunucuda Sustur (Server Mute) */}
      <label
        onClick={(e) => {
          e.preventDefault();
          if (onToggleServerMute) onToggleServerMute(member);
        }}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <MicOff className={`w-3.5 h-3.5 ${isServerMuted ? 'text-discord-red' : 'text-discord-textMuted'}`} />
          <span className={isServerMuted ? 'text-discord-red font-semibold' : ''}>Serverweit stummschalten</span>
        </div>
        <input
          type="checkbox"
          readOnly
          checked={!!isServerMuted}
          className="accent-discord-blurple rounded cursor-pointer w-4 h-4 pointer-events-none"
        />
      </label>

      {/* Serverweit taubschalten (Server Deafen) */}
      <label
        onClick={(e) => {
          e.preventDefault();
          if (onToggleServerDeafen) onToggleServerDeafen(member);
        }}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <Headphones className={`w-3.5 h-3.5 ${isServerDeafened ? 'text-discord-red' : 'text-discord-textMuted'}`} />
          <span className={isServerDeafened ? 'text-discord-red font-semibold' : ''}>Serverweit taubschalten</span>
        </div>
        <input
          type="checkbox"
          readOnly
          checked={!!isServerDeafened}
          className="accent-discord-blurple rounded cursor-pointer w-4 h-4 pointer-events-none"
        />
      </label>

      {/* Sprachverbindung trennen */}
      {onDisconnectVoice && (
        <button
          onClick={() => {
            onClose();
            onDisconnectVoice(member);
          }}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-red hover:text-white transition text-discord-textNormal"
        >
          <PhoneOff className="w-3.5 h-3.5 text-discord-red" />
          <span>Verbindung trennen</span>
        </button>
      )}

      {/* In Sprachkanal verschieben */}
      {serverVoiceChannels && serverVoiceChannels.length > 0 && onMoveVoiceChannel && (
        <div
          className="relative"
          onMouseEnter={() => setShowMoveSubmenu(true)}
          onMouseLeave={() => setShowMoveSubmenu(false)}
        >
          <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition">
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
                  className="w-full text-left px-2.5 py-1.5 rounded text-xs text-white hover:bg-discord-channels transition flex items-center gap-2"
                >
                  <Volume2 className="w-3 h-3 text-discord-textMuted" />
                  <span className="truncate">{vc.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="h-[1px] bg-discord-divider/40 my-1" />

      {/* 8. Roller Alt Menüsü */}
      <div
        className="relative"
        onMouseEnter={() => setShowRolesSubmenu(true)}
        onMouseLeave={() => setShowRolesSubmenu(false)}
      >
        <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition">
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
                  onClick={() => {
                    onToggleRole(member, role);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition text-left"
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

      {/* 9. In Moderationsansicht öffnen */}
      <button
        onClick={() => {
          onClose();
          onOpenModView(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition"
      >
        <Sliders className="w-3.5 h-3.5 text-discord-blurple" />
        <span>In Moderationsansicht öffnen</span>
      </button>

      {/* 10. Mitglieder verifizieren */}
      <button
        onClick={() => {
          onVerifyMember(member);
        }}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className={`w-3.5 h-3.5 ${isVerified ? 'text-discord-green' : 'text-discord-textMuted'}`} />
          <span>{isVerified ? 'Verifizierung entfernen' : 'Mitglied verifizieren'}</span>
        </div>
        {isVerified && (
          <span className="text-[9px] bg-discord-green/20 text-discord-green px-1 rounded font-bold">VERIFIZIERT</span>
        )}
      </button>

      {/* 11. Timeout verhängen */}
      <div
        className="relative"
        onMouseEnter={() => setShowTimeoutSubmenu(true)}
        onMouseLeave={() => setShowTimeoutSubmenu(false)}
      >
        <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition">
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
                className="w-full text-left px-2 py-1.5 rounded hover:bg-discord-hoverChannel transition text-white"
              >
                {to.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-[1px] bg-discord-divider/40 my-1" />

      {/* 12. Freund entfernen / hinzufügen */}
      <button
        onClick={() => {
          onClose();
          onToggleFriend(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition"
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

      {/* 13. Engelle (Block) */}
      <button
        onClick={() => {
          onClose();
          onBlockUser(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-red hover:text-white transition text-discord-red"
      >
        <UserX className="w-3.5 h-3.5" />
        <span>{isBlocked ? 'Blockierung aufheben' : 'Blockieren'}</span>
      </button>

      <div className="h-[1px] bg-discord-divider/40 my-1" />

      {/* 14. Sunucudan At (Kick) */}
      <button
        onClick={() => {
          onClose();
          onKickUser(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-red hover:text-white transition text-discord-red font-semibold"
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        <span className="truncate">{member.displayName} kicken</span>
      </button>

      {/* 15. Sunucudan Banla */}
      <button
        onClick={() => {
          onClose();
          onBanUser(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-red hover:text-white transition text-discord-red font-semibold"
      >
        <Ban className="w-3.5 h-3.5" />
        <span className="truncate">{member.displayName} bannen</span>
      </button>
    </div>
  );
}
