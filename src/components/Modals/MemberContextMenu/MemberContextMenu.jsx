import React, { useState, useEffect, useRef } from 'react';
import MemberContextMenuHeader from './MemberContextMenuHeader';
import UserActionsSection from './UserActionsSection';
import VoiceActionsSection from './VoiceActionsSection';
import ModActionsSection from './ModActionsSection';

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
  const [userVolume, setUserVolume] = useState(100);

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

  const top = Math.min(position?.y || 100, Math.max(10, window.innerHeight - 600));
  const left = Math.min(position?.x || 100, Math.max(10, window.innerWidth - 270));

  return (
    <div
      ref={menuRef}
      style={{ top: `${top}px`, left: `${left}px` }}
      className="fixed z-50 w-64 bg-discord-darkest border border-discord-divider/50 rounded-xl shadow-2xl p-1.5 text-xs text-discord-textNormal select-none animate-in fade-in zoom-in-95 duration-100 max-h-[92vh] overflow-y-auto custom-scrollbar"
    >
      <MemberContextMenuHeader member={member} />

      <UserActionsSection
        member={member}
        onClose={onClose}
        onViewProfile={onViewProfile}
        onMention={onMention}
        onToggleMentionMute={onToggleMentionMute}
        isMentionMuted={isMentionMuted}
        onStartDm={onStartDm}
        onAddNote={onAddNote}
        onChangeNickname={onChangeNickname}
        onToggleMute={onToggleMute}
        isUserMuted={isUserMuted}
        userVolume={userVolume}
        setUserVolume={setUserVolume}
      />

      <VoiceActionsSection
        member={member}
        onClose={onClose}
        isServerMuted={isServerMuted}
        onToggleServerMute={onToggleServerMute}
        isServerDeafened={isServerDeafened}
        onToggleServerDeafen={onToggleServerDeafen}
        onDisconnectVoice={onDisconnectVoice}
        serverVoiceChannels={serverVoiceChannels}
        onMoveVoiceChannel={onMoveVoiceChannel}
      />

      <ModActionsSection
        member={member}
        onClose={onClose}
        onToggleRole={onToggleRole}
        onOpenModView={onOpenModView}
        onVerifyMember={onVerifyMember}
        isVerified={isVerified}
        onTimeoutUser={onTimeoutUser}
        onToggleFriend={onToggleFriend}
        isFriend={isFriend}
        onBlockUser={onBlockUser}
        isBlocked={isBlocked}
        onKickUser={onKickUser}
        onBanUser={onBanUser}
      />
    </div>
  );
}
