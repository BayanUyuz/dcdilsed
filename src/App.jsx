import React, { useState, useEffect } from 'react';
import { FolderPlus, Compass, Plus } from 'lucide-react';
import LandingPage from './components/Landing/LandingPage';
import LeftNavRail from './components/LeftNavRail';
import ServerSidebar from './components/ServerSidebar';
import ChannelSidebar from './components/ChannelSidebar';
import ChatArea from './components/ChatArea';
import MemberList from './components/MemberList';
import DirectMessagesView from './components/DirectMessagesView';
import VoiceRoomView from './components/Voice/VoiceRoomView';

import UserSettingsModal from './components/Modals/UserSettingsModal';
import ServerSettingsModal from './components/Modals/ServerSettingsModal';
import CreateServerModal from './components/Modals/CreateServerModal';
import ExploreServersModal from './components/Modals/ExploreServersModal';
import CreateChannelModal from './components/Modals/CreateChannelModal';
import CreateCategoryModal from './components/Modals/CreateCategoryModal';
import InviteServerModal from './components/Modals/InviteServerModal';
import CreateEventModal from './components/Modals/CreateEventModal';
import AppDirectoryModal from './components/Modals/AppDirectoryModal';
import ServerNotificationsModal from './components/Modals/ServerNotificationsModal';
import ServerPrivacyModal from './components/Modals/ServerPrivacyModal';
import EditServerProfileModal from './components/Modals/EditServerProfileModal';
import ProfilePopover from './components/Modals/ProfilePopover';
import MemberContextMenu from './components/Modals/MemberContextMenu';
import ModViewModal from './components/Modals/ModViewModal';
import EditNicknameModal from './components/Modals/EditNicknameModal';
import AddNoteModal from './components/Modals/AddNoteModal';
import KickMemberModal from './components/Modals/KickMemberModal';
import BanMemberModal from './components/Modals/BanMemberModal';
import VoiceChannelSettingsModal from './components/Modals/VoiceChannelSettingsModal';

import {
  currentUser as initialCurrentUser,
  initialServers,
  initialMessages,
  initialMembers,
  initialFriends,
} from './data/initialData';

import {
  subscribeToChannelRealtime,
  broadcastMessage,
  SUPABASE_URL,
  SUPABASE_KEY
} from './supabaseClient';
import {
  playMuteSound,
  playJoinVoiceSound,
  playLeaveVoiceSound
} from './soundEffects';

export default function App() {
  // Authentication & Global View Mode: 'app' | 'landing'
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('dilsed_authenticated') === 'true';
  });

  const [viewMode, setViewMode] = useState(() => {
    const isAuth = localStorage.getItem('dilsed_authenticated') === 'true';
    if (!isAuth) return 'landing';
    return localStorage.getItem('dilsed_view_mode') || 'app';
  });

  // Theme & Appearance Config
  const [themeConfig, setThemeConfig] = useState(() => {
    const saved = localStorage.getItem('discord_web_theme');
    return saved ? JSON.parse(saved) : { theme: 'dark', messageDisplay: 'cozy', fontSize: 16 };
  });

  // State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('discord_web_user');
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  const [servers, setServers] = useState(() => {
    const saved = localStorage.getItem('discord_web_servers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((s) => s.id === 'server_main' || s.id === 'server_gamers' || s.id === 'server_devs')) {
          localStorage.removeItem('discord_web_servers');
          return [];
        }
        return parsed;
      } catch (e) {
        return initialServers;
      }
    }
    return initialServers;
  });

  const [activeServerId, setActiveServerId] = useState(() => servers[0]?.id || null);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [connectedVoiceChannel, setConnectedVoiceChannel] = useState(null);
  const [isVoiceRoomViewActive, setIsVoiceRoomViewActive] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [showMemberList, setShowMemberList] = useState(true);

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('discord_web_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed['c_general'] || parsed['c_dev'] || parsed['c_rules']) {
          localStorage.removeItem('discord_web_messages');
          return {};
        }
        return parsed;
      } catch (e) {
        return initialMessages;
      }
    }
    return initialMessages;
  });

  const [members, setMembers] = useState(initialMembers);
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('discord_web_friends');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((f) => f.id === 'f_alex' || f.id === 'f_elena' || f.id === 'f_mert' || f.id === 'f_seda')) {
          localStorage.removeItem('discord_web_friends');
          return [];
        }
        return parsed;
      } catch (e) {
        return initialFriends;
      }
    }
    return initialFriends;
  });

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isServerSettingsOpen, setIsServerSettingsOpen] = useState(false);
  const [isAddServerOpen, setIsAddServerOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [createChannelCategoryId, setCreateChannelCategoryId] = useState(null);
  const [selectedMemberForProfile, setSelectedMemberForProfile] = useState(null);

  // Server Header Dropdown Modals
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isAppDirectoryOpen, setIsAppDirectoryOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isEditServerProfileOpen, setIsEditServerProfileOpen] = useState(false);
  const [selectedVoiceChannelForSettings, setSelectedVoiceChannelForSettings] = useState(null);

  // Member Moderation & Context Menu States
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

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('dilsed_authenticated', isAuthenticated ? 'true' : 'false');
    if (!isAuthenticated) {
      setViewMode('landing');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('dilsed_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem('discord_web_theme', JSON.stringify(themeConfig));
  }, [themeConfig]);

  useEffect(() => {
    localStorage.setItem('discord_web_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('discord_web_servers', JSON.stringify(servers));
  }, [servers]);

  useEffect(() => {
    localStorage.setItem('discord_web_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('discord_web_friends', JSON.stringify(friends));
  }, [friends]);

  // Current server reference
  const currentServer = servers.find((s) => s.id === activeServerId) || servers[0];

  // Supabase Realtime Listener for active channel
  useEffect(() => {
    if (!activeChannelId) return;

    const channelSubscription = subscribeToChannelRealtime(activeChannelId, (incomingMsg) => {
      setMessages((prev) => {
        const currentList = prev[activeChannelId] || [];
        if (currentList.some((m) => m.id === incomingMsg.id)) {
          return prev;
        }
        return {
          ...prev,
          [activeChannelId]: [...currentList, incomingMsg],
        };
      });
    });

    return () => {};
  }, [activeChannelId]);

  // Send message handler
  const handleSendMessage = (text) => {
    const newMsg = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      author: {
        id: currentUser.id,
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatar: currentUser.avatar,
        role: 'Mitglied',
        roleColor: '#ffffff',
      },
      content: text,
      timestamp: `Heute ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      reactions: [],
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMsg],
    }));

    broadcastMessage(activeChannelId, newMsg);
  };

  // Add emoji reaction handler
  const handleAddReaction = (messageId, emoji) => {
    setMessages((prev) => {
      const channelMsgs = prev[activeChannelId] || [];
      const updated = channelMsgs.map((m) => {
        if (m.id !== messageId) return m;

        const reactions = m.reactions ? [...m.reactions] : [];
        const existingIndex = reactions.findIndex((r) => r.emoji === emoji);

        if (existingIndex > -1) {
          const r = reactions[existingIndex];
          const hasUser = r.users?.includes(currentUser.id);
          if (hasUser) {
            const newUsers = r.users.filter((u) => u !== currentUser.id);
            if (newUsers.length === 0) {
              reactions.splice(existingIndex, 1);
            } else {
              reactions[existingIndex] = {
                ...r,
                count: r.count - 1,
                users: newUsers,
              };
            }
          } else {
            reactions[existingIndex] = {
              ...r,
              count: r.count + 1,
              users: [...(r.users || []), currentUser.id],
            };
          }
        } else {
          reactions.push({
            emoji,
            count: 1,
            users: [currentUser.id],
          });
        }

        return { ...m, reactions };
      });

      return {
        ...prev,
        [activeChannelId]: updated,
      };
    });
  };

  // Create Server
  const handleCreateServer = (newServer) => {
    setServers((prev) => [...prev, newServer]);
    setActiveServerId(newServer.id);
    setIsHomeActive(false);
    setIsVoiceRoomViewActive(false);
    const firstTextChannel = newServer.categories[0]?.channels[0]?.id || 'c_general';
    setActiveChannelId(firstTextChannel);
  };

  // Update Server
  const handleUpdateServer = (updatedServer) => {
    setServers((prev) =>
      prev.map((s) => (s.id === updatedServer.id ? updatedServer : s))
    );
  };

  // Delete Server
  const handleDeleteServer = (serverId) => {
    const remaining = servers.filter((s) => s.id !== serverId);
    setServers(remaining);
    if (remaining.length > 0) {
      setActiveServerId(remaining[0].id);
      setActiveChannelId(remaining[0].categories[0]?.channels[0]?.id || 'c_general');
    } else {
      setIsHomeActive(true);
    }
  };

  // Join server from explore modal
  const handleJoinServer = (exploreServer) => {
    if (servers.some((s) => s.id === exploreServer.id)) {
      setActiveServerId(exploreServer.id);
      setIsHomeActive(false);
      setIsVoiceRoomViewActive(false);
      return;
    }

    const newServer = {
      id: exploreServer.id,
      name: exploreServer.name,
      acronym: exploreServer.name.slice(0, 2).toUpperCase(),
      icon: exploreServer.icon,
      banner: exploreServer.banner,
      unread: 0,
      categories: [
        {
          id: 'cat_exp_1',
          name: 'ALLGEMEINE KANÄLE',
          channels: [
            { id: 'c_exp_welcome', name: 'willkommen', type: 'text', description: 'Willkommen in der Community!' },
            { id: 'c_exp_chat', name: 'allgemein', type: 'text', description: 'Allgemeiner Chat.' }
          ]
        },
        {
          id: 'cat_exp_2',
          name: 'SPRACHKANÄLE',
          channels: [
            { id: 'v_exp_lounge', name: 'Community-Lounge', type: 'voice', userLimit: 20 }
          ]
        }
      ]
    };

    setServers((prev) => [...prev, newServer]);
    setActiveServerId(newServer.id);
    setIsHomeActive(false);
    setIsVoiceRoomViewActive(false);
    setActiveChannelId('c_exp_chat');
  };

  // Create Channel
  const handleCreateChannel = (channelData) => {
    setServers((prev) =>
      prev.map((srv) => {
        if (srv.id !== activeServerId) return srv;

        const updatedCategories = srv.categories.map((cat) => {
          if (cat.id === channelData.categoryId || cat.channels.some(c => c.type === channelData.type)) {
            return {
              ...cat,
              channels: [...cat.channels, channelData],
            };
          }
          return cat;
        });

        return {
          ...srv,
          categories: updatedCategories,
        };
      })
    );

    if (channelData.type === 'text') {
      setActiveChannelId(channelData.id);
      setIsVoiceRoomViewActive(false);
    }
  };

  // Sprachkanal-Einstellungen aktualisieren (Benutzerlimit, Berechtigungen, Bitrate...)
  const handleUpdateVoiceChannel = (updatedChannel) => {
    setServers((prev) =>
      prev.map((srv) => {
        if (srv.id !== activeServerId) return srv;

        const updatedCategories = srv.categories.map((cat) => {
          const channelExists = cat.channels.some((c) => c.id === updatedChannel.id);
          if (channelExists) {
            return {
              ...cat,
              channels: cat.channels.map((c) =>
                c.id === updatedChannel.id ? { ...c, ...updatedChannel } : c
              ),
            };
          }
          return cat;
        });

        return {
          ...srv,
          categories: updatedCategories,
        };
      })
    );

    if (connectedVoiceChannel?.id === updatedChannel.id) {
      setConnectedVoiceChannel((prev) => ({
        ...prev,
        ...updatedChannel,
      }));
    }

    setSelectedVoiceChannelForSettings(null);
  };

  // Delete Voice Channel
  const handleDeleteVoiceChannel = (channelId) => {
    setServers((prev) =>
      prev.map((srv) => {
        if (srv.id !== activeServerId) return srv;

        const updatedCategories = srv.categories.map((cat) => ({
          ...cat,
          channels: cat.channels.filter((c) => c.id !== channelId),
        }));

        return {
          ...srv,
          categories: updatedCategories,
        };
      })
    );

    if (connectedVoiceChannel?.id === channelId) {
      setConnectedVoiceChannel(null);
      setIsVoiceRoomViewActive(false);
      playLeaveVoiceSound();
    }

    setSelectedVoiceChannelForSettings(null);
  };

  // Create Category
  const handleCreateCategory = (newCat) => {
    setServers((prev) =>
      prev.map((srv) => {
        if (srv.id !== activeServerId) return srv;
        return {
          ...srv,
          categories: [...srv.categories, newCat],
        };
      })
    );
  };

  // Update Server Profile (Nickname & Server Avatar)
  const handleUpdateServerProfile = (serverId, { nickname, serverAvatar }) => {
    if (nickname) {
      setCurrentUser((prev) => ({
        ...prev,
        displayName: nickname,
      }));
    }
    if (serverAvatar) {
      setCurrentUser((prev) => ({
        ...prev,
        avatar: serverAvatar,
      }));
    }
  };

  // Member Management & Moderation Handlers
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

  const handleStartDm = (member) => {
    setIsHomeActive(true);
    setIsVoiceRoomViewActive(false);
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

  const handleToggleFriend = (member) => {
    setFriends((prev) => {
      const exists = prev.some((f) => f.id === member.id);
      if (exists) {
        return prev.filter((f) => f.id !== member.id);
      } else {
        return [
          ...prev,
          {
            id: member.id,
            username: member.username,
            displayName: member.displayName,
            avatar: member.avatar,
            status: member.status || 'online',
            customStatus: member.customStatus || ''
          }
        ];
      }
    });
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

  const handleConfirmKick = (member, reason) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    handleSendMessage(`👞 **${member.displayName}** wurde vom Server gekickt. (Grund: ${reason})`);
  };

  const handleBanUser = (member) => {
    setBanModalMember(member);
  };

  const handleConfirmBan = (member, reason, deleteDays) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    if (deleteDays === '24h' || deleteDays === '7d') {
      setMessages((prev) => {
        const updated = {};
        for (const [chId, msgs] of Object.entries(prev)) {
          updated[chId] = msgs.filter((m) => m.author?.id !== member.id);
        }
        return updated;
      });
    }
    handleSendMessage(`🔨 **${member.displayName}** wurde vom Server verbannt. (Grund: ${reason})`);
  };

  const handleAddModNote = (memberId, content) => {
    setModNotes((prev) => ({
      ...prev,
      [memberId]: [
        ...(prev[memberId] || []),
        {
          id: 'note_' + Date.now(),
          content,
          author: currentUser.displayName,
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

  // Voice Moderation Handlers (Serverseitig stummschalten & taubschalten)
  const handleToggleServerMute = (member) => {
    setServerMutedUsers((prev) => {
      const willMute = !prev[member.id];
      const updated = { ...prev, [member.id]: willMute };

      // If user is currently deafened and we unmute, also un-deafen
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

      // In Discord, server deafening automatically also server mutes the user
      if (willDeafen) {
        setServerMutedUsers((mPrev) => ({ ...mPrev, [member.id]: true }));
      }

      playMuteSound(willDeafen);
      return updated;
    });
  };

  const handleDisconnectVoice = (member) => {
    if (member.id === currentUser.id) {
      setConnectedVoiceChannel(null);
      setIsVoiceRoomViewActive(false);
      playLeaveVoiceSound();
    } else {
      handleSendMessage(`📞 Sprachverbindung von **${member.displayName}** wurde getrennt.`);
    }
  };

  const handleMoveVoiceChannel = (member, targetChannel) => {
    if (member.id === currentUser.id) {
      setConnectedVoiceChannel(targetChannel);
      playJoinVoiceSound();
    } else {
      handleSendMessage(`↔️ **${member.displayName}** wurde in den Kanal **${targetChannel.name}** verschoben.`);
    }
  };

  // Liste der Sprachkanäle auf dem aktuellen Server für das "Verschieben"-Menü
  const serverVoiceChannels =
    currentServer?.categories
      ?.flatMap((cat) => cat.channels)
      ?.filter((ch) => ch.type === 'voice') || [];

  // Find active channel object
  let activeChannelObj = null;
  if (currentServer) {
    for (const cat of (currentServer.categories || [])) {
      const found = (cat.channels || []).find((c) => c.id === activeChannelId);
      if (found) {
        activeChannelObj = found;
        break;
      }
    }
    if (!activeChannelObj && currentServer.categories?.length > 0) {
      for (const cat of currentServer.categories) {
        if (cat.channels?.length > 0) {
          activeChannelObj = cat.channels[0];
          break;
        }
      }
    }
  }

  // If currently in Landing Page mode or not authenticated, render Landing Page
  if (viewMode === 'landing' || !isAuthenticated) {
    return (
      <LandingPage
        currentUser={isAuthenticated ? currentUser : null}
        isAuthenticated={isAuthenticated}
        onOpenApp={(authedUser) => {
          if (authedUser && authedUser.id) {
            setCurrentUser(authedUser);
            localStorage.setItem('discord_web_user', JSON.stringify(authedUser));
          }
          setIsAuthenticated(true);
          localStorage.setItem('dilsed_authenticated', 'true');
          setViewMode('app');
        }}
      />
    );
  }

  // Theme container classes
  const themeClass =
    themeConfig.theme === 'midnight'
      ? 'bg-black text-white'
      : themeConfig.theme === 'light'
      ? 'bg-neutral-100 text-neutral-900'
      : 'bg-discord-chat text-discord-textNormal';

  const totalServerUnread = servers.reduce((acc, s) => acc + (s.unread || 0), 0);

  return (
    <div
      className={`flex h-screen w-screen overflow-hidden font-sans select-none ${themeClass}`}
      style={{ fontSize: `${themeConfig.fontSize || 16}px` }}
    >
      {/* Linke 3-Tasten-Navigationsleiste (1: Server, 2: DMs, 3: Einstellungen direkt unter DMs) */}
      <LeftNavRail
        isHomeActive={isHomeActive}
        onSelectServers={() => {
          setIsHomeActive(false);
          setIsVoiceRoomViewActive(false);
        }}
        onSelectHome={() => {
          setIsHomeActive(true);
          setIsVoiceRoomViewActive(false);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        totalServerUnread={totalServerUnread}
      />

      {/* Middle & Right Workspace Area */}
      <div className="flex-1 flex min-w-0 overflow-hidden h-full">
        {isHomeActive ? (
          <DirectMessagesView
            friends={friends}
            setFriends={setFriends}
            currentUser={currentUser}
            onOpenSettings={() => setIsSettingsOpen(true)}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            isDeafened={isDeafened}
            setIsDeafened={setIsDeafened}
          />
        ) : (
          <div className="flex-1 flex min-w-0 h-full">
            {/* Server-Leiste - Serverliste */}
            <ServerSidebar
              servers={servers}
              activeServerId={activeServerId}
              onSelectServer={(serverId) => {
                setActiveServerId(serverId);
                setIsVoiceRoomViewActive(false);
                const targetServer = servers.find((s) => s.id === serverId);
                if (targetServer) {
                  const firstChannel = targetServer.categories?.[0]?.channels?.[0]?.id || null;
                  setActiveChannelId(firstChannel);
                }
              }}
              onOpenAddServer={() => setIsAddServerOpen(true)}
              onOpenExplore={() => setIsExploreOpen(true)}
            />

            {currentServer ? (
              <>
                {/* Channels Sidebar */}
                <ChannelSidebar
                  server={currentServer}
                  activeChannelId={activeChannelId}
                  onSelectChannel={(channelId) => {
                    setActiveChannelId(channelId);
                    setIsVoiceRoomViewActive(false);
                  }}
                  connectedVoiceChannel={connectedVoiceChannel}
                  setConnectedVoiceChannel={setConnectedVoiceChannel}
                  currentUser={currentUser}
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                  isDeafened={isDeafened}
                  setIsDeafened={setIsDeafened}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                  onOpenServerSettings={() => setIsServerSettingsOpen(true)}
                  onOpenCreateChannel={(catId) => {
                    setCreateChannelCategoryId(catId || null);
                    setIsCreateChannelOpen(true);
                  }}
                  onOpenVoiceRoomView={() => setIsVoiceRoomViewActive(true)}
                  onOpenInvite={() => setIsInviteOpen(true)}
                  onOpenCreateEvent={() => setIsCreateEventOpen(true)}
                  onOpenAppDirectory={() => setIsAppDirectoryOpen(true)}
                  onOpenNotifications={() => setIsNotificationsOpen(true)}
                  onOpenPrivacy={() => setIsPrivacyOpen(true)}
                  onOpenCreateCategory={() => setIsCreateCategoryOpen(true)}
                  onOpenEditServerProfile={() => setIsEditServerProfileOpen(true)}
                  serverMutedUsers={serverMutedUsers}
                  serverDeafenedUsers={serverDeafenedUsers}
                  onOpenVoiceChannelSettings={(ch) => setSelectedVoiceChannelForSettings(ch)}
                />

                {/* Main Area: either VoiceRoomView with Screen Sharing, or ChatArea */}
                {isVoiceRoomViewActive && connectedVoiceChannel ? (
                  <div className="flex-1 flex flex-col min-w-0 h-full relative">
                    <VoiceRoomView
                      voiceChannel={connectedVoiceChannel}
                      currentUser={currentUser}
                      onDisconnect={() => {
                        setConnectedVoiceChannel(null);
                        setIsVoiceRoomViewActive(false);
                      }}
                      isMuted={isMuted}
                      setIsMuted={setIsMuted}
                      isDeafened={isDeafened}
                      setIsDeafened={setIsDeafened}
                      members={members}
                      serverMutedUsers={serverMutedUsers}
                      serverDeafenedUsers={serverDeafenedUsers}
                      onOpenContextMenu={handleOpenMemberContextMenu}
                    />
                    <button
                      onClick={() => setIsVoiceRoomViewActive(false)}
                      className="absolute top-3 right-16 bg-discord-darkest/80 hover:bg-discord-darkest text-xs text-white px-3 py-1.5 rounded-lg border border-discord-divider/40 transition z-30 font-semibold"
                    >
                      Zum Textchat wechseln
                    </button>
                  </div>
                ) : activeChannelObj ? (
                  <ChatArea
                    channel={activeChannelObj}
                    messages={messages[activeChannelId] || []}
                    onSendMessage={handleSendMessage}
                    onAddReaction={handleAddReaction}
                    currentUser={currentUser}
                    showMemberList={showMemberList}
                    setShowMemberList={setShowMemberList}
                    supabaseConnected={true}
                    onOpenContextMenu={handleOpenMemberContextMenu}
                    onSelectMember={handleViewProfile}
                    mentionTarget={mentionTarget}
                    setMentionTarget={setMentionTarget}
                  />
                ) : (
                  <main className="flex-1 bg-discord-chat flex flex-col items-center justify-center p-8 text-center select-none">
                    <div className="w-16 h-16 rounded-2xl bg-discord-channels/60 border border-discord-divider/40 flex items-center justify-center mb-4 text-discord-textMuted">
                      <FolderPlus className="w-8 h-8 text-discord-blurple" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Keine Kanäle auf diesem Server</h3>
                    <p className="text-xs text-discord-textMuted max-w-sm mb-6">
                      Erstelle deinen ersten Kanal oder eine Kategorie, um Unterhaltungen zu starten.
                    </p>
                    <button
                      onClick={() => {
                        setCreateChannelCategoryId(null);
                        setIsCreateChannelOpen(true);
                      }}
                      className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow"
                    >
                      Kanal erstellen
                    </button>
                  </main>
                )}

                {/* Right Member List (shown in chat mode) */}
                {showMemberList && !isVoiceRoomViewActive && (
                  <MemberList
                    members={members}
                    onSelectMember={handleViewProfile}
                    onOpenContextMenu={handleOpenMemberContextMenu}
                    userTimeouts={userTimeouts}
                    userMutes={userMutes}
                    verifiedUsers={verifiedUsers}
                    serverMutedUsers={serverMutedUsers}
                    serverDeafenedUsers={serverDeafenedUsers}
                  />
                )}
              </>
            ) : (
              /* When there are no servers (Keine Server vorhanden) */
              <div className="flex-1 bg-discord-chat flex flex-col items-center justify-center p-8 text-center select-none">
                <div className="w-20 h-20 rounded-3xl bg-discord-channels/70 border border-discord-divider/50 flex items-center justify-center mb-5 shadow-2xl">
                  <Compass className="w-10 h-10 text-discord-blurple animate-pulse" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">
                  Keine Server vorhanden
                </h2>
                <p className="text-xs text-discord-textMuted max-w-md mb-6 leading-relaxed">
                  Du bist derzeit auf keinem Server. Erstelle deine eigene Community von Grund auf neu oder entdecke öffentliche Server!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setIsAddServerOpen(true)}
                    className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Server erstellen</span>
                  </button>
                  <button
                    onClick={() => setIsExploreOpen(true)}
                    className="bg-discord-channels hover:bg-discord-hoverChannel border border-discord-divider/50 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-discord-green" />
                    <span>Öffentliche Server entdecken</span>
                  </button>
                  <button
                    onClick={() => setIsHomeActive(true)}
                    className="bg-discord-channels hover:bg-discord-hoverChannel border border-discord-divider/50 text-discord-textMuted hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition"
                  >
                    Direktnachrichten (DMs)
                  </button>
                </div>
              </div>
            )}
          </div>
      )}
      </div>

      {/* MODALS */}
      <UserSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDeafened={isDeafened}
        setIsDeafened={setIsDeafened}
        onLogout={() => {
          setIsAuthenticated(false);
          localStorage.removeItem('dilsed_authenticated');
          localStorage.setItem('dilsed_view_mode', 'landing');
          setViewMode('landing');
          setIsSettingsOpen(false);
        }}
        themeConfig={themeConfig}
        setThemeConfig={setThemeConfig}
        servers={servers}
      />

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
        currentUser={currentUser}
        onJoinInvite={(invite) => {
          // If already in list, switch to it, else create new joined server
          const inviteClean = invite.replace('https://discord.gg/', '').replace('discord.gg/', '');
          const existing = servers.find((s) => s.id.toLowerCase().includes(inviteClean.toLowerCase()));
          if (existing) {
            setActiveServerId(existing.id);
            setIsHomeActive(false);
          } else {
            const joinedServer = {
              id: 'server_invite_' + Date.now(),
              name: `Server (${inviteClean})`,
              acronym: inviteClean.slice(0, 2).toUpperCase() || 'DS',
              icon: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150',
              banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
              unread: 0,
              categories: [
                {
                  id: 'cat_inv_1',
                  name: 'ALLGEMEINE KANÄLE',
                  channels: [
                    { id: 'c_inv_welcome', name: 'willkommen', type: 'text', description: 'Per Einladung beigetreten!' },
                    { id: 'c_inv_gen', name: 'allgemein', type: 'text', description: 'Chatraum.' }
                  ]
                },
                {
                  id: 'cat_inv_2',
                  name: 'SPRACHKANÄLE',
                  channels: [
                    { id: 'v_inv_lounge', name: 'Community-Lounge', type: 'voice', userLimit: 15 }
                  ]
                }
              ]
            };
            setServers((prev) => [...prev, joinedServer]);
            setActiveServerId(joinedServer.id);
            setIsHomeActive(false);
            setActiveChannelId('c_inv_gen');
          }
        }}
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
        onCreateEvent={(ev) => {
          // Event added
        }}
      />

      <AppDirectoryModal
        isOpen={isAppDirectoryOpen}
        onClose={() => setIsAppDirectoryOpen(false)}
        server={currentServer}
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
        onUpdateServerProfile={handleUpdateServerProfile}
      />

      <ProfilePopover
        user={selectedMemberForProfile}
        onClose={() => setSelectedMemberForProfile(null)}
        onStartDm={handleStartDm}
        onMention={handleMentionUser}
        onOpenModView={handleOpenModView}
        userNote={selectedMemberForProfile ? userNotes[selectedMemberForProfile.id] : ''}
        onSaveNote={handleSaveUserNote}
        isVerified={selectedMemberForProfile ? !!verifiedUsers[selectedMemberForProfile.id] : false}
      />

      {/* Member Moderation Context Menu */}
      <MemberContextMenu
        isOpen={memberContextMenu.isOpen}
        position={memberContextMenu.position}
        member={memberContextMenu.member}
        server={currentServer}
        onClose={() => setMemberContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onViewProfile={handleViewProfile}
        onMention={handleMentionUser}
        onToggleMentionMute={handleToggleMentionMute}
        isMentionMuted={memberContextMenu.member ? !!mentionMutes[memberContextMenu.member.id] : false}
        onStartDm={handleStartDm}
        onChangeNickname={handleChangeNickname}
        onAddNote={handleAddNote}
        onToggleMute={handleToggleMuteUser}
        isUserMuted={memberContextMenu.member ? !!userMutes[memberContextMenu.member.id] : false}
        onToggleServerMute={handleToggleServerMute}
        isServerMuted={memberContextMenu.member ? !!serverMutedUsers[memberContextMenu.member.id] : false}
        onToggleServerDeafen={handleToggleServerDeafen}
        isServerDeafened={memberContextMenu.member ? !!serverDeafenedUsers[memberContextMenu.member.id] : false}
        onDisconnectVoice={handleDisconnectVoice}
        onMoveVoiceChannel={handleMoveVoiceChannel}
        serverVoiceChannels={serverVoiceChannels}
        onToggleFriend={handleToggleFriend}
        isFriend={memberContextMenu.member ? friends.some((f) => f.id === memberContextMenu.member.id) : false}
        onBlockUser={handleBlockUser}
        isBlocked={memberContextMenu.member ? !!blockedUsers[memberContextMenu.member.id] : false}
        onToggleRole={handleToggleRole}
        onOpenModView={handleOpenModView}
        onVerifyMember={handleVerifyMember}
        isVerified={memberContextMenu.member ? !!verifiedUsers[memberContextMenu.member.id] : false}
        onTimeoutUser={handleTimeoutUser}
        onKickUser={handleKickUser}
        onBanUser={handleBanUser}
      />

      {/* Mod View Modal */}
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
        onToggleServerMute={handleToggleServerMute}
        isServerMuted={modViewMember ? !!serverMutedUsers[modViewMember.id] : false}
        onToggleServerDeafen={handleToggleServerDeafen}
        isServerDeafened={modViewMember ? !!serverDeafenedUsers[modViewMember.id] : false}
        onTimeoutUser={handleTimeoutUser}
        timeoutExpiry={modViewMember ? userTimeouts[modViewMember.id] : null}
        onKickUser={handleKickUser}
        onBanUser={handleBanUser}
        userMessages={
          modViewMember && messages[activeChannelId]
            ? messages[activeChannelId].filter((m) => m.author?.id === modViewMember.id)
            : []
        }
      />

      {/* Change Nickname Modal */}
      <EditNicknameModal
        isOpen={!!nicknameModalMember}
        onClose={() => setNicknameModalMember(null)}
        member={nicknameModalMember}
        onSaveNickname={handleSaveNickname}
      />

      {/* Private Note Modal */}
      <AddNoteModal
        isOpen={!!noteModalMember}
        onClose={() => setNoteModalMember(null)}
        member={noteModalMember}
        currentNote={noteModalMember ? userNotes[noteModalMember.id] : ''}
        onSaveNote={handleSaveUserNote}
      />

      {/* Kick Confirmation Modal */}
      <KickMemberModal
        isOpen={!!kickModalMember}
        onClose={() => setKickModalMember(null)}
        member={kickModalMember}
        serverName={currentServer?.name}
        onConfirmKick={handleConfirmKick}
      />

      {/* Ban Confirmation Modal */}
      <BanMemberModal
        isOpen={!!banModalMember}
        onClose={() => setBanModalMember(null)}
        member={banModalMember}
        serverName={currentServer?.name}
        onConfirmBan={handleConfirmBan}
      />

      {/* Voice Channel Settings Modal (Benutzerlimit, Berechtigungen, Bitrate, Privater Kanal...) */}
      <VoiceChannelSettingsModal
        isOpen={!!selectedVoiceChannelForSettings}
        onClose={() => setSelectedVoiceChannelForSettings(null)}
        channel={selectedVoiceChannelForSettings}
        onUpdateChannel={handleUpdateVoiceChannel}
        onDeleteChannel={handleDeleteVoiceChannel}
        serverRoles={currentServer?.roles || []}
      />
    </div>
  );
}
