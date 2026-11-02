import React from 'react';
import ServerSettingsModal from '../ServerSettings/ServerSettingsModal';
import CreateServerModal from './CreateServerModal';
import ExploreServersModal from './ExploreServersModal';
import CreateChannelModal from './CreateChannelModal';
import CreateCategoryModal from './CreateCategoryModal';
import InviteServerModal from './InviteServerModal';
import CreateEventModal from './CreateEventModal';
import AppDirectoryModal from './AppDirectoryModal';
import ServerNotificationsModal from './ServerNotificationsModal';
import ServerPrivacyModal from './ServerPrivacyModal';
import EditServerProfileModal from './EditServerProfileModal';
import VoiceChannelSettingsModal from './VoiceChannelSettingsModal';

export default function ServerModals({
  modalState,
  currentServer,
  handleUpdateServer,
  handleDeleteServer,
  handleCreateServer,
  handleJoinServer,
  handleCreateChannel,
  handleCreateCategory,
  friends,
  currentUser,
  handleUpdateServerProfile,
  handleUpdateVoiceChannel,
  handleDeleteVoiceChannel,
}) {
  const {
    isServerSettingsOpen,
    setIsServerSettingsOpen,
    isAddServerOpen,
    setIsAddServerOpen,
    isExploreOpen,
    setIsExploreOpen,
    isCreateChannelOpen,
    setIsCreateChannelOpen,
    createChannelCategoryId,
    isCreateCategoryOpen,
    setIsCreateCategoryOpen,
    isInviteOpen,
    setIsInviteOpen,
    isCreateEventOpen,
    setIsCreateEventOpen,
    isAppDirectoryOpen,
    setIsAppDirectoryOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isPrivacyOpen,
    setIsPrivacyOpen,
    isEditServerProfileOpen,
    setIsEditServerProfileOpen,
    selectedVoiceChannelForSettings,
    setSelectedVoiceChannelForSettings,
  } = modalState;

  return (
    <>
      <ServerSettingsModal
        isOpen={isServerSettingsOpen}
        onClose={() => setIsServerSettingsOpen(false)}
        server={currentServer}
        onUpdateServer={handleUpdateServer}
        onDeleteServer={handleDeleteServer}
      />
      <CreateServerModal
        isOpen={isAddServerOpen}
        onClose={() => setIsAddServerOpen(false)}
        onCreateServer={handleCreateServer}
      />
      <ExploreServersModal
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        onJoinServer={handleJoinServer}
      />
      <CreateChannelModal
        isOpen={isCreateChannelOpen}
        onClose={() => setIsCreateChannelOpen(false)}
        onCreateChannel={handleCreateChannel}
        categoryId={createChannelCategoryId}
      />
      <CreateCategoryModal
        isOpen={isCreateCategoryOpen}
        onClose={() => setIsCreateCategoryOpen(false)}
        onCreateCategory={handleCreateCategory}
      />
      <InviteServerModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        server={currentServer}
        friends={friends}
      />
      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        server={currentServer}
      />
      <AppDirectoryModal
        isOpen={isAppDirectoryOpen}
        onClose={() => setIsAppDirectoryOpen(false)}
      />
      <ServerNotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        server={currentServer}
      />
      <ServerPrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        server={currentServer}
      />
      <EditServerProfileModal
        isOpen={isEditServerProfileOpen}
        onClose={() => setIsEditServerProfileOpen(false)}
        server={currentServer}
        currentUser={currentUser}
        onSaveProfile={handleUpdateServerProfile}
      />
      <VoiceChannelSettingsModal
        isOpen={!!selectedVoiceChannelForSettings}
        onClose={() => setSelectedVoiceChannelForSettings(null)}
        channel={selectedVoiceChannelForSettings}
        server={currentServer}
        onUpdateChannel={handleUpdateVoiceChannel}
        onDeleteChannel={handleDeleteVoiceChannel}
      />
    </>
  );
}
