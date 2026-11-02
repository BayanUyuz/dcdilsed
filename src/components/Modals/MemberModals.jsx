import React from 'react';
import ProfilePopover from './ProfilePopover';
import MemberContextMenu from './MemberContextMenu';
import ModViewModal from './ModViewModal';
import EditNicknameModal from './EditNicknameModal';
import AddNoteModal from './AddNoteModal';
import KickMemberModal from './KickMemberModal';
import BanMemberModal from './BanMemberModal';

export default function MemberModals({
  currentUser,
  currentServer,
  selectedMemberForProfile,
  setSelectedMemberForProfile,
  handleStartDm,
  handleMentionUser,
  handleOpenModView,
  userNotes,
  handleSaveUserNote,
  verifiedUsers,
  memberContextMenu,
  setMemberContextMenu,
  handleViewProfile,
  handleToggleMentionMute,
  mentionMutes,
  handleChangeNickname,
  handleAddNote,
  handleToggleMuteUser,
  userMutes,
  handleToggleServerMute,
  serverMutedUsers,
  handleToggleServerDeafen,
  serverDeafenedUsers,
  handleDisconnectVoice,
  handleMoveVoiceChannel,
  serverVoiceChannels,
  handleToggleFriend,
  friends = [],
  handleBlockUser,
  blockedUsers,
  handleToggleRole,
  handleVerifyMember,
  handleTimeoutUser,
  handleKickUser,
  handleBanUser,
  modViewMember,
  setModViewMember,
  modNotes,
  handleAddModNote,
  handleDeleteModNote,
  userTimeouts,
  messages,
  activeChannelId,
  nicknameModalMember,
  setNicknameModalMember,
  handleSaveNickname,
  noteModalMember,
  setNoteModalMember,
  kickModalMember,
  setKickModalMember,
  handleConfirmKick,
  banModalMember,
  setBanModalMember,
  handleConfirmBan,
}) {
  return (
    <>
      <ProfilePopover
        isOpen={!!selectedMemberForProfile}
        onClose={() => setSelectedMemberForProfile(null)}
        member={selectedMemberForProfile}
        onStartDm={handleStartDm}
        onMention={handleMentionUser}
        onOpenModView={handleOpenModView}
        note={selectedMemberForProfile ? userNotes[selectedMemberForProfile.id] : ''}
        onSaveNote={handleSaveUserNote}
        isVerified={selectedMemberForProfile ? !!verifiedUsers[selectedMemberForProfile.id] : false}
      />

      <MemberContextMenu
        isOpen={memberContextMenu.isOpen}
        position={memberContextMenu.position}
        member={memberContextMenu.member}
        server={currentServer}
        onClose={() => setMemberContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onViewProfile={handleViewProfile}
        onMention={handleMentionUser}
        onToggleMentionMute={handleToggleMentionMute}
        isMentionMuted={
          memberContextMenu.member ? !!mentionMutes[memberContextMenu.member.id] : false
        }
        onStartDm={handleStartDm}
        onChangeNickname={handleChangeNickname}
        onAddNote={handleAddNote}
        onToggleMute={handleToggleMuteUser}
        isUserMuted={memberContextMenu.member ? !!userMutes[memberContextMenu.member.id] : false}
        onToggleServerMute={handleToggleServerMute}
        isServerMuted={
          memberContextMenu.member ? !!serverMutedUsers[memberContextMenu.member.id] : false
        }
        onToggleServerDeafen={handleToggleServerDeafen}
        isServerDeafened={
          memberContextMenu.member ? !!serverDeafenedUsers[memberContextMenu.member.id] : false
        }
        onDisconnectVoice={handleDisconnectVoice}
        onMoveVoiceChannel={handleMoveVoiceChannel}
        serverVoiceChannels={serverVoiceChannels}
        onToggleFriend={handleToggleFriend}
        isFriend={
          memberContextMenu.member
            ? friends.some((f) => f.id === memberContextMenu.member.id)
            : false
        }
        onBlockUser={handleBlockUser}
        isBlocked={memberContextMenu.member ? !!blockedUsers[memberContextMenu.member.id] : false}
        onToggleRole={handleToggleRole}
        onOpenModView={handleOpenModView}
        onVerifyMember={handleVerifyMember}
        isVerified={
          memberContextMenu.member ? !!verifiedUsers[memberContextMenu.member.id] : false
        }
        onTimeoutUser={handleTimeoutUser}
        onKickUser={handleKickUser}
        onBanUser={handleBanUser}
      />

      <ModViewModal
        isOpen={!!modViewMember}
        onClose={() => setModViewMember(null)}
        member={modViewMember}
        server={currentServer}
        notes={modViewMember ? modNotes[modViewMember.id] || [] : []}
        onAddNote={handleAddModNote}
        onDeleteNote={handleDeleteModNote}
        onToggleRole={handleToggleRole}
        onVerifyMember={handleVerifyMember}
        isVerified={modViewMember ? !!verifiedUsers[modViewMember.id] : false}
        onTimeoutUser={handleTimeoutUser}
        timeoutExpiry={modViewMember ? userTimeouts[modViewMember.id] : null}
        onKickUser={handleKickUser}
        onBanUser={handleBanUser}
        userMessages={
          modViewMember && messages[activeChannelId]
            ? messages[activeChannelId].filter((m) => m.author?.id === modViewMember.id)
            : []
        }
        onToggleServerMute={handleToggleServerMute}
        isServerMuted={modViewMember ? !!serverMutedUsers[modViewMember.id] : false}
        onToggleServerDeafen={handleToggleServerDeafen}
        isServerDeafened={modViewMember ? !!serverDeafenedUsers[modViewMember.id] : false}
      />

      <EditNicknameModal
        isOpen={!!nicknameModalMember}
        onClose={() => setNicknameModalMember(null)}
        member={nicknameModalMember}
        onSaveNickname={handleSaveNickname}
      />

      <AddNoteModal
        isOpen={!!noteModalMember}
        onClose={() => setNoteModalMember(null)}
        member={noteModalMember}
        currentNote={noteModalMember ? userNotes[noteModalMember.id] || '' : ''}
        onSaveNote={handleSaveUserNote}
      />

      <KickMemberModal
        isOpen={!!kickModalMember}
        onClose={() => setKickModalMember(null)}
        member={kickModalMember}
        server={currentServer}
        onConfirmKick={handleConfirmKick}
      />

      <BanMemberModal
        isOpen={!!banModalMember}
        onClose={() => setBanModalMember(null)}
        member={banModalMember}
        server={currentServer}
        onConfirmBan={handleConfirmBan}
      />
    </>
  );
}
