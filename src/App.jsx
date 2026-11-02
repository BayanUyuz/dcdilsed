import React, { useState, useEffect } from 'react';
import LandingPage from './components/Landing/LandingPage';
import LeftNavRail from './components/LeftNavRail';
import DirectMessagesView from './components/DirectMessagesView';
import ServerWorkspace from './components/Workspace/ServerWorkspace';
import AppModals from './components/Modals/AppModals';

import { useServers } from './hooks/useServers';
import { useModeration } from './hooks/useModeration';
import { useVoiceState } from './hooks/useVoiceState';
import { useChatMessages } from './hooks/useChatMessages';
import { useModalState } from './hooks/useModalState';
import { getOrCreateCurrentUser, initialFriends } from './data/initialData';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('dilsed_authenticated') === 'true');
  const [viewMode, setViewMode] = useState(() => {
    const isAuth = localStorage.getItem('dilsed_authenticated') === 'true';
    return !isAuth ? 'landing' : (localStorage.getItem('dilsed_view_mode') || 'app');
  });

  const [themeConfig, setThemeConfig] = useState(() => {
    const saved = localStorage.getItem('dilsed_web_theme') || localStorage.getItem('discord_web_theme');
    return saved ? JSON.parse(saved) : { theme: 'dark', messageDisplay: 'cozy', fontSize: 16 };
  });

  const [currentUser, setCurrentUser] = useState(() => getOrCreateCurrentUser());

  const [isHomeActive, setIsHomeActive] = useState(false);
  const [showMemberList, setShowMemberList] = useState(true);

  // Custom Hooks
  const {
    servers, setServers, activeServerId, setActiveServerId, activeChannelId, setActiveChannelId,
    currentServer, activeChannelObj, handleCreateServer: createServerAction, handleUpdateServer,
    handleDeleteServer: deleteServerAction, handleJoinServer: joinServerAction,
    handleCreateChannel: createChannelAction, handleUpdateVoiceChannel: updateVoiceChannelAction,
    handleDeleteVoiceChannel: deleteVoiceChannelAction, handleCreateCategory
  } = useServers();

  const {
    connectedVoiceChannel, setConnectedVoiceChannel, isVoiceRoomViewActive, setIsVoiceRoomViewActive,
    isMuted, setIsMuted, isDeafened, setIsDeafened, voiceParticipants, handleDisconnectVoice: disconnectVoiceAction,
    handleMoveVoiceChannel: moveVoiceChannelAction
  } = useVoiceState(currentUser);

  const moderation = useModeration();
  const { messages, setMessages, handleSendMessage, handleAddReaction, deleteMessagesByAuthor } =
    useChatMessages(activeChannelId, currentUser);
  const modalState = useModalState();

  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('dilsed_web_friends') || localStorage.getItem('discord_web_friends');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((f) => ['f_alex', 'f_elena', 'f_mert', 'f_seda'].includes(f.id))) {
          localStorage.removeItem('dilsed_web_friends');
          localStorage.removeItem('discord_web_friends');
          return [];
        }
        return parsed;
      } catch {
        return initialFriends;
      }
    }
    return initialFriends;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('dilsed_authenticated', isAuthenticated ? 'true' : 'false');
    if (!isAuthenticated) setViewMode('landing');
  }, [isAuthenticated]);
  useEffect(() => { localStorage.setItem('dilsed_view_mode', viewMode); }, [viewMode]);
  useEffect(() => { localStorage.setItem('dilsed_web_theme', JSON.stringify(themeConfig)); }, [themeConfig]);
  useEffect(() => { localStorage.setItem('dilsed_web_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('dilsed_web_friends', JSON.stringify(friends)); }, [friends]);

  // Actions
  const handleCreateServer = (newServer) => {
    createServerAction(newServer, () => { setIsHomeActive(false); setIsVoiceRoomViewActive(false); });
  };
  const handleDeleteServer = (serverId) => { deleteServerAction(serverId, () => setIsHomeActive(true)); };
  const handleJoinServer = (exploreServer) => {
    joinServerAction(exploreServer, () => { setIsHomeActive(false); setIsVoiceRoomViewActive(false); });
  };
  const handleCreateChannel = (channelData) => {
    createChannelAction(channelData, () => setIsVoiceRoomViewActive(false));
  };
  const handleUpdateVoiceChannel = (updatedChannel) => {
    updateVoiceChannelAction(updatedChannel, (updated) => {
      if (connectedVoiceChannel?.id === updated.id) setConnectedVoiceChannel((prev) => ({ ...prev, ...updated }));
      modalState.setSelectedVoiceChannelForSettings(null);
    });
  };
  const handleDeleteVoiceChannel = (channelId) => {
    deleteVoiceChannelAction(channelId, (id) => {
      if (connectedVoiceChannel?.id === id) disconnectVoiceAction({ id: currentUser.id }, currentUser);
      modalState.setSelectedVoiceChannelForSettings(null);
    });
  };
  const handleUpdateServerProfile = (serverId, { nickname, serverAvatar }) => {
    if (nickname) setCurrentUser((prev) => ({ ...prev, displayName: nickname }));
    if (serverAvatar) setCurrentUser((prev) => ({ ...prev, avatar: serverAvatar }));
  };
  const handleStartDm = () => { setIsHomeActive(true); setIsVoiceRoomViewActive(false); };
  const handleToggleFriend = (member) => {
    setFriends((prev) => {
      const exists = prev.some((f) => f.id === member.id);
      if (exists) return prev.filter((f) => f.id !== member.id);
      return [...prev, {
        id: member.id, username: member.username, displayName: member.displayName,
        avatar: member.avatar, status: member.status || 'online', customStatus: member.customStatus || ''
      }];
    });
  };
  const handleConfirmKick = (member, reason) => moderation.handleConfirmKick(member, reason, handleSendMessage);
  const handleConfirmBan = (member, reason, deleteDays) => {
    moderation.handleConfirmBan(member, reason, deleteDays, handleSendMessage, deleteMessagesByAuthor);
  };
  const handleAddModNote = (memberId, content) => moderation.handleAddModNote(memberId, content, currentUser.displayName);
  const handleDisconnectVoice = (member) => disconnectVoiceAction(member, currentUser, handleSendMessage);
  const handleMoveVoiceChannel = (member, targetChannel) => moveVoiceChannelAction(member, targetChannel, currentUser, handleSendMessage);

  const serverVoiceChannels = currentServer?.categories?.flatMap((cat) => cat.channels)?.filter((ch) => ch.type === 'voice') || [];

  if (viewMode === 'landing' || !isAuthenticated) {
    return (
      <LandingPage
        currentUser={isAuthenticated ? currentUser : null}
        isAuthenticated={isAuthenticated}
        onOpenApp={(authedUser) => {
          if (authedUser?.id) {
            setCurrentUser(authedUser);
            localStorage.setItem('dilsed_web_user', JSON.stringify(authedUser));
          }
          setIsAuthenticated(true);
          localStorage.setItem('dilsed_authenticated', 'true');
          setViewMode('app');
        }}
      />
    );
  }

  const themeClass = themeConfig.theme === 'midnight' ? 'bg-black text-white' : themeConfig.theme === 'light' ? 'bg-neutral-100 text-neutral-900' : 'bg-[#07070a] text-neutral-200';
  const totalServerUnread = servers.reduce((acc, s) => acc + (s.unread || 0), 0);

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans select-none ${themeClass}`} style={{ fontSize: `${themeConfig.fontSize || 16}px` }}>
      <LeftNavRail
        isHomeActive={isHomeActive}
        onSelectServers={() => { setIsHomeActive(false); setIsVoiceRoomViewActive(false); }}
        onSelectHome={() => { setIsHomeActive(true); setIsVoiceRoomViewActive(false); }}
        onOpenSettings={() => modalState.setIsSettingsOpen(true)}
        totalServerUnread={totalServerUnread}
      />

      <div className="flex-1 flex min-w-0 overflow-hidden h-full">
        {isHomeActive ? (
          <DirectMessagesView
            friends={friends} setFriends={setFriends} currentUser={currentUser}
            onOpenSettings={() => modalState.setIsSettingsOpen(true)} isMuted={isMuted} setIsMuted={setIsMuted}
            isDeafened={isDeafened} setIsDeafened={setIsDeafened}
          />
        ) : (
          <ServerWorkspace
            servers={servers} activeServerId={activeServerId} setActiveServerId={setActiveServerId}
            activeChannelId={activeChannelId} setActiveChannelId={setActiveChannelId} currentServer={currentServer}
            activeChannelObj={activeChannelObj} connectedVoiceChannel={connectedVoiceChannel}
            setConnectedVoiceChannel={setConnectedVoiceChannel} isVoiceRoomViewActive={isVoiceRoomViewActive}
            setIsVoiceRoomViewActive={setIsVoiceRoomViewActive} currentUser={currentUser} isMuted={isMuted}
            setIsMuted={setIsMuted} isDeafened={isDeafened} setIsDeafened={setIsDeafened} voiceParticipants={voiceParticipants}
            messages={messages} handleSendMessage={handleSendMessage} handleAddReaction={handleAddReaction} showMemberList={showMemberList}
            setShowMemberList={setShowMemberList} members={moderation.members} userTimeouts={moderation.userTimeouts}
            userMutes={moderation.userMutes} verifiedUsers={moderation.verifiedUsers}
            serverMutedUsers={moderation.serverMutedUsers} serverDeafenedUsers={moderation.serverDeafenedUsers}
            mentionTarget={moderation.mentionTarget} setMentionTarget={moderation.setMentionTarget}
            handleOpenMemberContextMenu={moderation.handleOpenMemberContextMenu} handleViewProfile={moderation.handleViewProfile}
            setIsAddServerOpen={modalState.setIsAddServerOpen} setIsExploreOpen={modalState.setIsExploreOpen}
            setIsSettingsOpen={modalState.setIsSettingsOpen} setIsServerSettingsOpen={modalState.setIsServerSettingsOpen}
            setIsCreateChannelOpen={modalState.setIsCreateChannelOpen} setCreateChannelCategoryId={modalState.setCreateChannelCategoryId}
            setIsInviteOpen={modalState.setIsInviteOpen} setIsCreateEventOpen={modalState.setIsCreateEventOpen}
            setIsAppDirectoryOpen={modalState.setIsAppDirectoryOpen} setIsNotificationsOpen={modalState.setIsNotificationsOpen}
            setIsPrivacyOpen={modalState.setIsPrivacyOpen} setIsCreateCategoryOpen={modalState.setIsCreateCategoryOpen}
            setIsEditServerProfileOpen={modalState.setIsEditServerProfileOpen}
            setSelectedVoiceChannelForSettings={modalState.setSelectedVoiceChannelForSettings} setIsHomeActive={setIsHomeActive}
          />
        )}
      </div>

      <AppModals
        modalState={modalState}
        currentUser={currentUser} setCurrentUser={setCurrentUser} isMuted={isMuted} setIsMuted={setIsMuted}
        isDeafened={isDeafened} setIsDeafened={setIsDeafened} setIsAuthenticated={setIsAuthenticated}
        setViewMode={setViewMode} themeConfig={themeConfig} setThemeConfig={setThemeConfig}
        servers={servers} setServers={setServers} setActiveServerId={setActiveServerId}
        setIsHomeActive={setIsHomeActive} setActiveChannelId={setActiveChannelId} currentServer={currentServer}
        handleUpdateServer={handleUpdateServer} handleDeleteServer={handleDeleteServer}
        handleCreateServer={handleCreateServer} handleJoinServer={handleJoinServer}
        handleCreateChannel={handleCreateChannel} handleCreateCategory={handleCreateCategory}
        friends={friends} handleUpdateServerProfile={handleUpdateServerProfile}
        selectedMemberForProfile={moderation.selectedMemberForProfile}
        setSelectedMemberForProfile={moderation.setSelectedMemberForProfile}
        handleStartDm={handleStartDm} handleMentionUser={moderation.handleMentionUser}
        handleOpenModView={moderation.handleOpenModView} userNotes={moderation.userNotes}
        handleSaveUserNote={moderation.handleSaveUserNote} verifiedUsers={moderation.verifiedUsers}
        memberContextMenu={moderation.memberContextMenu} setMemberContextMenu={moderation.setMemberContextMenu}
        handleViewProfile={moderation.handleViewProfile} handleToggleMentionMute={moderation.handleToggleMentionMute}
        mentionMutes={moderation.mentionMutes} handleChangeNickname={moderation.handleChangeNickname}
        handleAddNote={moderation.handleAddNote} handleToggleMuteUser={moderation.handleToggleMuteUser}
        userMutes={moderation.userMutes} handleToggleServerMute={moderation.handleToggleServerMute}
        serverMutedUsers={moderation.serverMutedUsers} handleToggleServerDeafen={moderation.handleToggleServerDeafen}
        serverDeafenedUsers={moderation.serverDeafenedUsers} handleDisconnectVoice={handleDisconnectVoice}
        handleMoveVoiceChannel={handleMoveVoiceChannel} serverVoiceChannels={serverVoiceChannels}
        handleToggleFriend={handleToggleFriend} handleBlockUser={moderation.handleBlockUser}
        blockedUsers={moderation.blockedUsers} handleToggleRole={moderation.handleToggleRole}
        handleVerifyMember={moderation.handleVerifyMember} handleTimeoutUser={moderation.handleTimeoutUser}
        handleKickUser={moderation.handleKickUser} handleBanUser={moderation.handleBanUser}
        modViewMember={moderation.modViewMember} setModViewMember={moderation.setModViewMember}
        modNotes={moderation.modNotes} handleAddModNote={handleAddModNote}
        handleDeleteModNote={moderation.handleDeleteModNote} userTimeouts={moderation.userTimeouts}
        messages={messages} activeChannelId={activeChannelId}
        nicknameModalMember={moderation.nicknameModalMember} setNicknameModalMember={moderation.setNicknameModalMember}
        handleSaveNickname={moderation.handleSaveNickname} noteModalMember={moderation.noteModalMember}
        setNoteModalMember={moderation.setNoteModalMember} kickModalMember={moderation.kickModalMember}
        setKickModalMember={moderation.setKickModalMember} handleConfirmKick={handleConfirmKick}
        banModalMember={moderation.banModalMember} setBanModalMember={moderation.setBanModalMember}
        handleConfirmBan={handleConfirmBan} handleUpdateVoiceChannel={handleUpdateVoiceChannel}
        handleDeleteVoiceChannel={handleDeleteVoiceChannel}
      />
    </div>
  );
}
