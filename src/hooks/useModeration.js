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

  const [userNotes, setUserNotes] = useState(() => {
    const saved = localStorage.getItem('discord_web_user_notes');
    return saved ? JSON.parse(saved) : {};
  });

  const [modNotes, setModNotes] = useState(() => {
    const saved = localStorage.getItem('discord_web_mod_notes');
    return saved ? JSON.parse(saved) : {};
  });

  const [userTimeouts, setUserTimeouts] = useState(() => {
    const saved = localStorage.getItem('discord_web_user_timeouts');
    return saved ? JSON.parse(saved) : {};
  });

  const [userMutes, setUserMutes] = useState(() => {
    const saved = localStorage.getItem('discord_web_user_mutes');
    return saved ? JSON.parse(saved) : {};
  });

  const [mentionMutes, setMentionMutes] = useState(() => {
    const saved = localStorage.getItem('discord_web_mention_mutes');
    return saved ? JSON.parse(saved) : {};
  });

  const [verifiedUsers, setVerifiedUsers] = useState(() => {
    const saved = localStorage.getItem('discord_web_verified_users');
    return saved ? JSON.parse(saved) : { 'm_owner': true };
  });

  const [blockedUsers, setBlockedUsers] = useState(() => {
    const saved = localStorage.getItem('discord_web_blocked_users');
    return saved ? JSON.parse(saved) : {};
  });

  const [serverMutedUsers, setServerMutedUsers] = useState(() => {
    const saved = localStorage.getItem('discord_web_server_mutes');
    return saved ? JSON.parse(saved) : {};
  });

  const [serverDeafenedUsers, setServerDeafenedUsers] = useState(() => {
    const saved = localStorage.getItem('discord_web_server_deafens');
    return saved ? JSON.parse(saved) : {};
  });

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('discord_web_user_notes', JSON.stringify(userNotes));
  }, [userNotes]);

  useEffect(() => {
    localStorage.setItem('discord_web_mod_notes', JSON.stringify(modNotes));
  }, [modNotes]);

  useEffect(() => {
    localStorage.setItem('discord_web_user_timeouts', JSON.stringify(userTimeouts));
  }, [userTimeouts]);

  useEffect(() => {
    localStorage.setItem('discord_web_user_mutes', JSON.stringify(userMutes));
  }, [userMutes]);

  useEffect(() => {
    localStorage.setItem('discord_web_server_mutes', JSON.stringify(serverMutedUsers));
  }, [serverMutedUsers]);

  useEffect(() => {
    localStorage.setItem('discord_web_server_deafens', JSON.stringify(serverDeafenedUsers));
  }, [serverDeafenedUsers]);

  useEffect(() => {
    localStorage.setItem('discord_web_mention_mutes', JSON.stringify(mentionMutes));
  }, [mentionMutes]);

  useEffect(() => {
    localStorage.setItem('discord_web_verified_users', JSON.stringify(verifiedUsers));
  }, [verifiedUsers]);

  useEffect(() => {
    localStorage.setItem('discord_web_blocked_users', JSON.stringify(blockedUsers));
  }, [blockedUsers]);

  const handleOpenMemberContextMenu = (e, member) => {
    e.preventDefault();
    setMemberContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
      member
    });
  };

  const handleViewProfile = (member) => {
    setSelectedMemberForProfile(member);
  };

  const handleMentionUser = (member) => {
    setMentionTarget(member);
  };

  const handleToggleMentionMute = (member) => {
    setMentionMutes((prev) => ({
      ...prev,
      [member.id]: !prev[member.id]
    }));
  };

  const handleChangeNickname = (member) => {
    setNicknameModalMember(member);
  };

  const handleSaveNickname = (memberId, newNickname) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, displayName: newNickname } : m))
    );
  };

  const handleAddNote = (member) => {
    setNoteModalMember(member);
  };

  const handleSaveUserNote = (memberId, noteText) => {
    setUserNotes((prev) => ({
      ...prev,
      [memberId]: noteText
    }));
  };

  const handleToggleMuteUser = (member) => {
    setUserMutes((prev) => ({
      ...prev,
      [member.id]: !prev[member.id]
    }));
  };

  const handleBlockUser = (member) => {
    setBlockedUsers((prev) => ({
      ...prev,
      [member.id]: !prev[member.id]
    }));
  };

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

  const handleOpenModView = (member) => {
    setModViewMember(member);
  };

  const handleVerifyMember = (member) => {
    setVerifiedUsers((prev) => ({
      ...prev,
      [member.id]: !prev[member.id]
    }));
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

  const handleKickUser = (member) => {
    setKickModalMember(member);
  };

  const handleConfirmKick = (member, reason, onLogMessage) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    if (onLogMessage) {
      onLogMessage(`👞 **${member.displayName}** wurde vom Server gekickt. (Grund: ${reason})`);
    }
  };

  const handleBanUser = (member) => {
    setBanModalMember(member);
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
