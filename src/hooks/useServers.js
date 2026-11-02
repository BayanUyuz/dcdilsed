import { useState, useEffect } from 'react';
import { initialServers } from '../data/initialData';

export function useServers() {
  const [servers, setServers] = useState(() => {
    const saved = localStorage.getItem('discord_web_servers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        return initialServers;
      }
    }
    return initialServers;
  });

  const [activeServerId, setActiveServerId] = useState(() => servers[0]?.id || null);
  const [activeChannelId, setActiveChannelId] = useState(null);

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('discord_web_servers', JSON.stringify(servers));
  }, [servers]);

  // Current server reference
  const currentServer = servers.find((s) => s.id === activeServerId) || servers[0];

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

  // Create Server
  const handleCreateServer = (newServer, onAfterCreate) => {
    setServers((prev) => [...prev, newServer]);
    setActiveServerId(newServer.id);
    const firstTextChannel = newServer.categories[0]?.channels[0]?.id || 'c_general';
    setActiveChannelId(firstTextChannel);
    if (onAfterCreate) onAfterCreate();
  };

  // Update Server
  const handleUpdateServer = (updatedServer) => {
    setServers((prev) =>
      prev.map((s) => (s.id === updatedServer.id ? updatedServer : s))
    );
  };

  // Delete Server
  const handleDeleteServer = (serverId, onEmpty) => {
    const remaining = servers.filter((s) => s.id !== serverId);
    setServers(remaining);
    if (remaining.length > 0) {
      setActiveServerId(remaining[0].id);
      setActiveChannelId(remaining[0].categories[0]?.channels[0]?.id || 'c_general');
    } else {
      if (onEmpty) onEmpty();
    }
  };

  // Join server from explore modal
  const handleJoinServer = (exploreServer, onAfterJoin) => {
    if (servers.some((s) => s.id === exploreServer.id)) {
      setActiveServerId(exploreServer.id);
      if (onAfterJoin) onAfterJoin();
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
    setActiveChannelId('c_exp_chat');
    if (onAfterJoin) onAfterJoin();
  };

  // Create Channel
  const handleCreateChannel = (channelData, onTextChannelCreated) => {
    setServers((prev) =>
      prev.map((srv) => {
        if (srv.id !== activeServerId) return srv;

        const updatedCategories = srv.categories.map((cat) => {
          if (cat.id === channelData.categoryId || cat.channels.some((c) => c.type === channelData.type)) {
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
      if (onTextChannelCreated) onTextChannelCreated();
    }
  };

  // Update Voice Channel Settings
  const handleUpdateVoiceChannel = (updatedChannel, onVoiceUpdated) => {
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

    if (onVoiceUpdated) onVoiceUpdated(updatedChannel);
  };

  // Delete Voice Channel
  const handleDeleteVoiceChannel = (channelId, onVoiceDeleted) => {
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

    if (onVoiceDeleted) onVoiceDeleted(channelId);
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

  return {
    servers,
    setServers,
    activeServerId,
    setActiveServerId,
    activeChannelId,
    setActiveChannelId,
    currentServer,
    activeChannelObj,
    handleCreateServer,
    handleUpdateServer,
    handleDeleteServer,
    handleJoinServer,
    handleCreateChannel,
    handleUpdateVoiceChannel,
    handleDeleteVoiceChannel,
    handleCreateCategory
  };
}
