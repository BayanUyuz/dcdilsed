import React from 'react';
import UserSettingsModal from '../UserSettings/UserSettingsModal';
import ServerModals from './ServerModals';
import MemberModals from './MemberModals';

export default function AppModals(props) {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    currentUser,
    setCurrentUser,
    isMuted,
    setIsMuted,
    isDeafened,
    setIsDeafened,
    setIsAuthenticated,
    setViewMode,
    themeConfig,
    setThemeConfig,
    servers,
    setServers,
    setActiveServerId,
    setIsHomeActive,
    setActiveChannelId,
    modalState,
  } = props;

  return (
    <>
      <UserSettingsModal
        isOpen={isSettingsOpen || modalState?.isSettingsOpen}
        onClose={() => {
          if (setIsSettingsOpen) setIsSettingsOpen(false);
          if (modalState?.setIsSettingsOpen) modalState.setIsSettingsOpen(false);
        }}
        currentUser={currentUser}
        onSaveUser={setCurrentUser}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        isDeafened={isDeafened}
        onToggleDeafen={() => setIsDeafened(!isDeafened)}
        onLogout={() => {
          setIsAuthenticated(false);
          setViewMode('landing');
        }}
        themeConfig={themeConfig}
        onUpdateTheme={setThemeConfig}
        servers={servers}
        onUpdateServer={(updated) =>
          setServers((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
        }
        onSelectServer={(serverId) => {
          setActiveServerId(serverId);
          setIsHomeActive(false);
        }}
        onSelectChannel={(chId) => setActiveChannelId(chId)}
      />

      <ServerModals {...props} modalState={modalState || props} />
      <MemberModals {...props} />
    </>
  );
}
