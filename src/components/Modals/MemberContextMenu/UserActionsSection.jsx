import React from 'react';
import {
  User,
  AtSign,
  BellOff,
  Bell,
  MessageSquare,
  FileText,
  Edit3,
  VolumeX,
  Volume2,
} from 'lucide-react';

export default function UserActionsSection({
  member,
  onClose,
  onViewProfile,
  onMention,
  onToggleMentionMute,
  isMentionMuted,
  onStartDm,
  onAddNote,
  onChangeNickname,
  onToggleMute,
  isUserMuted,
  userVolume,
  setUserVolume,
}) {
  return (
    <>
      <button
        onClick={() => {
          onClose();
          onViewProfile(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition cursor-pointer"
      >
        <User className="w-3.5 h-3.5" />
        <span>Profil</span>
      </button>

      <button
        onClick={() => {
          onClose();
          onMention(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition cursor-pointer"
      >
        <AtSign className="w-3.5 h-3.5" />
        <span className="truncate">Erwähnen (@{member.displayName})</span>
      </button>

      <button
        onClick={() => onToggleMentionMute(member)}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition cursor-pointer"
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
          <span className="text-[9px] bg-discord-red/20 text-discord-red px-1 rounded font-bold">
            STUMM
          </span>
        )}
      </button>

      <button
        onClick={() => {
          onClose();
          onStartDm(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition cursor-pointer"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Nachricht senden</span>
      </button>

      <button
        onClick={() => {
          onClose();
          onAddNote(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition cursor-pointer"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>Notiz hinzufügen</span>
      </button>

      <div className="h-[1px] bg-discord-divider/40 my-1" />

      <button
        onClick={() => {
          onClose();
          onChangeNickname(member);
        }}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-discord-blurple hover:text-white transition cursor-pointer"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Spitznamen ändern</span>
      </button>

      <button
        onClick={() => onToggleMute(member)}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-discord-hoverChannel transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {isUserMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-discord-red" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
          <span>{isUserMuted ? 'Stummschaltung aufheben' : 'Lokal stummschalten'}</span>
        </div>
        {isUserMuted && (
          <span className="text-[9px] bg-discord-red/20 text-discord-red px-1 rounded font-bold">
            AKTIV
          </span>
        )}
      </button>

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
    </>
  );
}
