import React, { useState } from 'react';
import ServerHeaderDropdown from './ServerHeaderDropdown';
import ChannelCategoryList from './ChannelCategoryList';
import VoiceDock from './VoiceDock';
import UserDock from '../Common/UserDock';
import { playJoinVoiceSound, playLeaveVoiceSound } from '../../soundEffects';

export default function ChannelSidebar({
  server,
  activeChannelId,
  onSelectChannel,
  connectedVoiceChannel,
  setConnectedVoiceChannel,
  currentUser,
  isMuted,
  setIsMuted,
  isDeafened,
  setIsDeafened,
  onOpenSettings,
  onOpenServerSettings,
  onOpenCreateChannel,
  onOpenVoiceRoomView,
  onOpenInvite,
  onOpenCreateEvent,
  onOpenAppDirectory,
  onOpenNotifications,
  onOpenPrivacy,
  onOpenCreateCategory,
  onOpenEditServerProfile,
  serverMutedUsers = {},
  serverDeafenedUsers = {},
  onOpenVoiceChannelSettings,
}) {
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [hideMutedChannels, setHideMutedChannels] = useState(false);
  const [mutedChannels] = useState({});

  const toggleCategory = (categoryId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleVoiceChannelClick = (channel) => {
    if (connectedVoiceChannel?.id === channel.id) {
      onOpenVoiceRoomView();
      return;
    }
    playJoinVoiceSound();
    setConnectedVoiceChannel(channel);
    onOpenVoiceRoomView();
  };

  const handleDisconnectVoice = () => {
    playLeaveVoiceSound();
    setConnectedVoiceChannel(null);
  };

  return (
    <aside className="w-60 bg-[#09090c] flex flex-col select-none flex-shrink-0 border-r border-amber-500/15 relative z-10">
      <ServerHeaderDropdown
        server={server}
        onOpenInvite={onOpenInvite}
        onOpenServerSettings={onOpenServerSettings}
        onOpenCreateEvent={onOpenCreateEvent}
        onOpenAppDirectory={onOpenAppDirectory}
        onOpenNotifications={onOpenNotifications}
        onOpenPrivacy={onOpenPrivacy}
        onOpenCreateChannel={onOpenCreateChannel}
        onOpenCreateCategory={onOpenCreateCategory}
        onOpenEditServerProfile={onOpenEditServerProfile}
        hideMutedChannels={hideMutedChannels}
        setHideMutedChannels={setHideMutedChannels}
      />

      <ChannelCategoryList
        server={server}
        activeChannelId={activeChannelId}
        onSelectChannel={onSelectChannel}
        connectedVoiceChannel={connectedVoiceChannel}
        handleVoiceChannelClick={handleVoiceChannelClick}
        onOpenVoiceChannelSettings={onOpenVoiceChannelSettings}
        onOpenCreateChannel={onOpenCreateChannel}
        onOpenInvite={onOpenInvite}
        onOpenVoiceRoomView={onOpenVoiceRoomView}
        currentUser={currentUser}
        isMuted={isMuted}
        serverMutedUsers={serverMutedUsers}
        serverDeafenedUsers={serverDeafenedUsers}
        collapsedCategories={collapsedCategories}
        toggleCategory={toggleCategory}
        hideMutedChannels={hideMutedChannels}
        mutedChannels={mutedChannels}
      />

      <VoiceDock
        connectedVoiceChannel={connectedVoiceChannel}
        serverName={server?.name}
        onOpenVoiceRoomView={onOpenVoiceRoomView}
        handleDisconnectVoice={handleDisconnectVoice}
      />

      <UserDock
        currentUser={currentUser}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDeafened={isDeafened}
        setIsDeafened={setIsDeafened}
        onOpenSettings={onOpenSettings}
      />
    </aside>
  );
}
