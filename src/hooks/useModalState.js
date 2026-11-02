import { useState } from 'react';

export function useModalState() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isServerSettingsOpen, setIsServerSettingsOpen] = useState(false);
  const [isAddServerOpen, setIsAddServerOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [createChannelCategoryId, setCreateChannelCategoryId] = useState(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isAppDirectoryOpen, setIsAppDirectoryOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isEditServerProfileOpen, setIsEditServerProfileOpen] = useState(false);
  const [selectedVoiceChannelForSettings, setSelectedVoiceChannelForSettings] = useState(null);

  return {
    isSettingsOpen,
    setIsSettingsOpen,
    isServerSettingsOpen,
    setIsServerSettingsOpen,
    isAddServerOpen,
    setIsAddServerOpen,
    isExploreOpen,
    setIsExploreOpen,
    isCreateChannelOpen,
    setIsCreateChannelOpen,
    createChannelCategoryId,
    setCreateChannelCategoryId,
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
    isCreateCategoryOpen,
    setIsCreateCategoryOpen,
    isEditServerProfileOpen,
    setIsEditServerProfileOpen,
    selectedVoiceChannelForSettings,
    setSelectedVoiceChannelForSettings,
  };
}
