import { useState, useEffect } from 'react';

const INITIAL_ROLE_PERMS = {
  '@everyone': {
    view: true,
    connect: true,
    speak: true,
    video: true,
    voiceActivity: true,
    prioritySpeaker: false,
    muteMembers: false,
    deafenMembers: false,
    moveMembers: false,
  },
  'r_admin': {
    view: true,
    connect: true,
    speak: true,
    video: true,
    voiceActivity: true,
    prioritySpeaker: true,
    muteMembers: true,
    deafenMembers: true,
    moveMembers: true,
  },
  'r_mod': {
    view: true,
    connect: true,
    speak: true,
    video: true,
    voiceActivity: true,
    prioritySpeaker: true,
    muteMembers: true,
    deafenMembers: true,
    moveMembers: true,
  },
  'r_vip': {
    view: true,
    connect: true,
    speak: true,
    video: true,
    voiceActivity: true,
    prioritySpeaker: false,
    muteMembers: false,
    deafenMembers: false,
    moveMembers: false,
  },
};

export function useVoiceChannelSettings(channel, isOpen, onUpdateChannel, onClose) {
  const [activeTab, setActiveTab] = useState('overview');

  const [channelName, setChannelName] = useState('');
  const [channelTopic, setChannelTopic] = useState('');
  const [userLimit, setUserLimit] = useState(0);
  const [bitrate, setBitrate] = useState(64);
  const [videoQuality, setVideoQuality] = useState('auto');
  const [region, setRegion] = useState('automatic');
  const [isPushToTalkRequired, setIsPushToTalkRequired] = useState(false);

  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState('@everyone');
  const [rolePermissions, setRolePermissions] = useState(INITIAL_ROLE_PERMS);

  const [invites, setInvites] = useState([]);
  const [copiedInvite, setCopiedInvite] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (channel) {
      setChannelName(channel.name || '');
      setChannelTopic(channel.description || channel.topic || '');
      setUserLimit(channel.userLimit !== undefined ? channel.userLimit : 0);
      setBitrate(channel.bitrate || 64);
      setVideoQuality(channel.videoQuality || 'auto');
      setRegion(channel.region || 'automatic');
      setIsPushToTalkRequired(!!channel.isPushToTalkRequired);
      setIsPrivate(!!channel.isPrivate);
      if (channel.rolePermissions) {
        setRolePermissions(channel.rolePermissions);
      }
      setHasChanges(false);
    }
  }, [channel, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showDeleteConfirm) setShowDeleteConfirm(false);
        else onClose();
      }
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showDeleteConfirm, onClose]);

  const handleSaveChanges = () => {
    const updated = {
      ...channel,
      name: channelName.trim() || channel.name,
      description: channelTopic.trim(),
      topic: channelTopic.trim(),
      userLimit: Number(userLimit),
      bitrate: Number(bitrate),
      videoQuality,
      region,
      isPushToTalkRequired,
      isPrivate,
      rolePermissions,
    };
    onUpdateChannel(updated);
    setHasChanges(false);
  };

  const handleReset = () => {
    if (channel) {
      setChannelName(channel.name || '');
      setChannelTopic(channel.description || channel.topic || '');
      setUserLimit(channel.userLimit !== undefined ? channel.userLimit : 0);
      setBitrate(channel.bitrate || 64);
      setVideoQuality(channel.videoQuality || 'auto');
      setRegion(channel.region || 'automatic');
      setIsPushToTalkRequired(!!channel.isPushToTalkRequired);
      setIsPrivate(!!channel.isPrivate);
      if (channel.rolePermissions) setRolePermissions(channel.rolePermissions);
      setHasChanges(false);
    }
  };

  const handleTogglePermission = (roleId, permKey) => {
    setRolePermissions((prev) => ({
      ...prev,
      [roleId]: {
        ...(prev[roleId] || {}),
        [permKey]: !prev[roleId]?.[permKey],
      },
    }));
    setHasChanges(true);
  };

  const handleCreateInvite = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newInv = {
      code,
      creator: 'Du',
      uses: 0,
      maxUses: 0,
      expires: '7 Tage',
    };
    setInvites((prev) => [newInv, ...prev]);
  };

  const handleCopyInvite = (code) => {
    const link = `https://dilsed.gg/${code}`;
    navigator.clipboard?.writeText(link);
    setCopiedInvite(code);
    setTimeout(() => setCopiedInvite(null), 2000);
  };

  const handleDeleteInvite = (code) => {
    setInvites((prev) => prev.filter((i) => i.code !== code));
  };

  return {
    activeTab,
    setActiveTab,
    channelName,
    setChannelName,
    channelTopic,
    setChannelTopic,
    userLimit,
    setUserLimit,
    bitrate,
    setBitrate,
    videoQuality,
    setVideoQuality,
    region,
    setRegion,
    isPushToTalkRequired,
    setIsPushToTalkRequired,
    isPrivate,
    setIsPrivate,
    selectedRoleId,
    setSelectedRoleId,
    rolePermissions,
    invites,
    copiedInvite,
    showDeleteConfirm,
    setShowDeleteConfirm,
    hasChanges,
    setHasChanges,
    handleSaveChanges,
    handleReset,
    handleTogglePermission,
    handleCreateInvite,
    handleCopyInvite,
    handleDeleteInvite,
  };
}
