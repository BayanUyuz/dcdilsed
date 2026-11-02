import { useState, useEffect } from 'react';
import { initialServers, createExploreServerInstance } from '../data/initialData';

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
  const [activeChannelId, setActiveChannelId] = useState(() => {
    const first = servers[0]?.categories?.[0]?.channels?.find((c) => c.type === 'text') ||
      servers[0]?.categories?.[0]?.channels?.[0];
    return first?.id || 'c_willkommen';
  });

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem('discord_web_servers', JSON.stringify(servers));
  }, [servers]);

  // Current server reference
  const currentServer = servers.find((s) => s.id === activeServerId) || servers[0];

  // Auto-synchronize activeChannelId with currentServer channels
  useEffect(() => {
    if (!currentServer?.categories) return;
    const allChannels = currentServer.categories.flatMap((cat) => cat.channels || []);
    const exists = allChannels.some((c) => c.id === activeChannelId);
    if (!exists && allChannels.length > 0) {
      const firstText = allChannels.find((c) => c.type === 'text') || allChannels[0];
      setActiveChannelId(firstText.id);
    }
  }, [currentServer, activeChannelId]);

  // Find active channel object
  let activeChannelObj = null;
  if (currentServer?.categories) {
    for (const cat of currentServer.categories) {
      const found = (cat.channels || []).find((c) => c.id === activeChannelId);
      if (found) {
        activeChannelObj = found;
        break;
      }
    }
    if (!activeChannelObj && currentServer.categories.length > 0) {
      for (const cat of currentServer.categories) {
        const firstText = (cat.channels || []).find((c) => c.type === 'text');
        if (firstText) {
          activeChannelObj = firstText;
          break;
        }
        if ((cat.channels || []).length > 0 && !activeChannelObj) {
          activeChannelObj = cat.channels[0];
        }
      }
    }
  }

  // Create Server
  const handleCreateServer = (newServer, onAfterCreate) => {
    setServers((prev) => [...prev, newServer]);
    setActiveServerId(newServer.id);
    const allChs = (newServer.categories || []).flatMap((c) => c.channels || []);
    const firstTextChannel = allChs.find((c) => c.type === 'text') || allChs[0];
    setActiveChannelId(firstTextChannel?.id || null);
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
      const allChs = (remaining[0].categories || []).flatMap((c) => c.channels || []);
      const firstText = allChs.find((c) => c.type === 'text') || allChs[0];
      setActiveChannelId(firstText?.id || null);
    } else {
      setActiveServerId(null);
      setActiveChannelId(null);
      if (onEmpty) onEmpty();
    }
  };

  // Join server from explore modal
  const handleJoinServer = (exploreServer, onAfterJoin) => {
    if (servers.some((s) => s.id === exploreServer.id)) {
      setActiveServerId(exploreServer.id);
      const srv = servers.find((s) => s.id === exploreServer.id);
      const allChs = (srv?.categories || []).flatMap((c) => c.channels || []);
      const firstText = allChs.find((c) => c.type === 'text') || allChs[0];
      setActiveChannelId(firstText?.id || null);
      if (onAfterJoin) onAfterJoin();
      return;
    }

    const newServer = createExploreServerInstance(exploreServer);
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

        let added = false;
        let updatedCategories = (srv.categories || []).map((cat) => {
          if (cat.id === channelData.categoryId || (!channelData.categoryId && !added)) {
            added = true;
            return {
              ...cat,
              channels: [...(cat.channels || []), channelData],
            };
          }
          return cat;
        });

        if (!added) {
          if (updatedCategories.length === 0) {
            updatedCategories = [{
              id: 'cat_' + Date.now(),
              name: channelData.type === 'voice' ? 'SPRACHKANÄLE' : 'TEXTKANÄLE',
              channels: [channelData]
            }];
          } else {
            updatedCategories[0] = {
              ...updatedCategories[0],
              channels: [...(updatedCategories[0].channels || []), channelData]
            };
          }
        }

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
