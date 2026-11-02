import { useState, useEffect } from 'react';
import { initialMembers } from '../data/initialData';
import { playMuteSound } from '../soundEffects';

export function useModeration() {
  const [members, setMembers] = useState(initialMembers);

  const [memberContextMenu, setMemberContextMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    member: null
  });
  const [modViewMember, setModViewMember] = useState(null);
  const [nicknameModalMember, setNicknameModalMember] = useState(null);
  const [noteModalMember, setNoteModalMember] = useState(null);
  const [kickModalMember, setKickModalMember] = useState(null);
  const [banModalMember, setBanModalMember] = useState(null);
  const [selectedMemberForProfile, setSelectedMemberForProfile] = useState(null);
  const [mentionTarget, setMentionTarget] = useState(null);

  const getSaved = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [userNotes, setUserNotes] = useState(() => getSaved('discord_web_user_notes', {}));
  const [modNotes, setModNotes] = useState(() => getSaved('discord_web_mod_notes', {}));
  const [userTimeouts, setUserTimeouts] = useState(() => getSaved('discord_web_user_timeouts', {}));
  const [userMutes, setUserMutes] = useState(() => getSaved('discord_web_user_mutes', {}));
  const [mentionMutes, setMentionMutes] = useState(() => getSaved('discord_web_mention_mutes', {}));
  const [verifiedUsers, setVerifiedUsers] = useState(() => getSaved('discord_web_verified_users', { 'm_owner': true }));
  const [blockedUsers, setBlockedUsers] = useState(() => getSaved('discord_web_blocked_users', {}));
  const [serverMutedUsers, setServerMutedUsers] = useState(() => getSaved('discord_web_server_mutes', {}));
  const [serverDeafenedUsers, setServerDeafenedUsers] = useState(() => getSaved('discord_web_server_deafens', {}));

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('discord_web_user_notes', JSON.stringify(userNotes));
    localStorage.setItem('discord_web_mod_notes', JSON.stringify(modNotes));
    localStorage.setItem('discord_web_user_timeouts', JSON.stringify(userTimeouts));
    localStorage.setItem('discord_web_user_mutes', JSON.stringify(userMutes));
    localStorage.setItem('discord_web_server_mutes', JSON.stringify(serverMutedUsers));
    localStorage.setItem('discord_web_server_deafens', JSON.stringify(serverDeafenedUsers));
    localStorage.setItem('discord_web_mention_mutes', JSON.stringify(mentionMutes));
    localStorage.setItem('discord_web_verified_users', JSON.stringify(verifiedUsers));
    localStorage.setItem('discord_web_blocked_users', JSON.stringify(blockedUsers));
  }, [userNotes, modNotes, userTimeouts, userMutes, serverMutedUsers, serverDeafenedUsers, mentionMutes, verifiedUsers, blockedUsers]);

  const handleOpenMemberContextMenu = (e, member) => {
    e.preventDefault();
    setMemberContextMenu({ isOpen: true, position: { x: e.clientX, y: e.clientY }, member });
  };

  const handleViewProfile = (member) => setSelectedMemberForProfile(member);
  const handleMentionUser = (member) => setMentionTarget(member);
  const handleToggleMentionMute = (member) => setMentionMutes((prev) => ({ ...prev, [member.id]: !prev[member.id] }));
  const handleChangeNickname = (member) => setNicknameModalMember(member);
  const handleSaveNickname = (memberId, newNickname) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, displayName: newNickname } : m)));
  };

  const handleAddNote = (member) => setNoteModalMember(member);
  const handleSaveUserNote = (memberId, noteText) => setUserNotes((prev) => ({ ...prev, [memberId]: noteText }));
  const handleToggleMuteUser = (member) => setUserMutes((prev) => ({ ...prev, [member.id]: !prev[member.id] }));
  const handleBlockUser = (member) => setBlockedUsers((prev) => ({ ...prev, [member.id]: !prev[member.id] }));
  const handleOpenModView = (member) => setModViewMember(member);
  const handleVerifyMember = (member) => setVerifiedUsers((prev) => ({ ...prev, [member.id]: !prev[member.id] }));
  const handleKickUser = (member) => setKickModalMember(member);
  const handleBanUser = (member) => setBanModalMember(member);

  const handleToggleRole = (member, role) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === member.id) {
          const hasRole = m.role === role.name;
          return {
            ...m,
            role: hasRole ? 'Mitglied' : role.name,
            roleColor: hasRole ? '#949ba4' : role.color,
            roleCategory: hasRole ? 'ONLINE' : role.name.toUpperCase()
          };
        }
        return m;
      })
    );
  };

  const handleTimeoutUser = (member, duration) => {
    setUserTimeouts((prev) => {
      if (!duration) {
        const copy = { ...prev };
        delete copy[member.id];
        return copy;
      }
      return { ...prev, [member.id]: duration };
    });
  };

  const handleConfirmKick = (member, reason, onLogMessage) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    if (onLogMessage) {
      onLogMessage(`👞 **${member.displayName}** wurde vom Server gekickt. (Grund: ${reason})`);
    }
  };

  const handleConfirmBan = (member, reason, deleteDays, onLogMessage, onPurgeUserMessages) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    if (deleteDays === '24h' || deleteDays === '7d') {
      if (onPurgeUserMessages) onPurgeUserMessages(member.id);
    }
    if (onLogMessage) {
      onLogMessage(`🔨 **${member.displayName}** wurde vom Server verbannt. (Grund: ${reason})`);
    }
  };

  const handleAddModNote = (memberId, content, authorName) => {
    setModNotes((prev) => ({
      ...prev,
      [memberId]: [
        ...(prev[memberId] || []),
        {
          id: 'note_' + Date.now(),
          content,
          author: authorName,
          timestamp: `Heute ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        }
      ]
    }));
  };

  const handleDeleteModNote = (memberId, noteId) => {
    setModNotes((prev) => ({
      ...prev,
      [memberId]: (prev[memberId] || []).filter((n) => n.id !== noteId)
    }));
  };

  const handleToggleServerMute = (member) => {
    setServerMutedUsers((prev) => {
      const willMute = !prev[member.id];
      const updated = { ...prev, [member.id]: willMute };

      if (!willMute) {
        setServerDeafenedUsers((dPrev) => {
          const dCopy = { ...dPrev };
          delete dCopy[member.id];
          return dCopy;
        });
      }

      playMuteSound(willMute);
      return updated;
    });
  };

  const handleToggleServerDeafen = (member) => {
    setServerDeafenedUsers((prev) => {
      const willDeafen = !prev[member.id];
      const updated = { ...prev, [member.id]: willDeafen };

      if (willDeafen) {
        setServerMutedUsers((mPrev) => ({ ...mPrev, [member.id]: true }));
      }

      playMuteSound(willDeafen);
      return updated;
    });
  };

  return {
    members,
    setMembers,
    userNotes,
    modNotes,
    userTimeouts,
    userMutes,
    mentionMutes,
    verifiedUsers,
    blockedUsers,
    serverMutedUsers,
    serverDeafenedUsers,
    memberContextMenu,
    setMemberContextMenu,
    modViewMember,
    setModViewMember,
    nicknameModalMember,
    setNicknameModalMember,
    noteModalMember,
    setNoteModalMember,
    kickModalMember,
    setKickModalMember,
    banModalMember,
    setBanModalMember,
    selectedMemberForProfile,
    setSelectedMemberForProfile,
    mentionTarget,
    setMentionTarget,
    handleOpenMemberContextMenu,
    handleViewProfile,
    handleMentionUser,
    handleToggleMentionMute,
    handleChangeNickname,
    handleSaveNickname,
    handleAddNote,
    handleSaveUserNote,
    handleToggleMuteUser,
    handleBlockUser,
    handleToggleRole,
    handleOpenModView,
    handleVerifyMember,
    handleTimeoutUser,
    handleKickUser,
    handleConfirmKick,
    handleBanUser,
    handleConfirmBan,
    handleAddModNote,
    handleDeleteModNote,
    handleToggleServerMute,
    handleToggleServerDeafen
  };
}
