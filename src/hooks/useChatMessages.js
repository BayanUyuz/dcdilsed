import { useState, useEffect } from 'react';
import { initialMessages } from '../data/initialData';
import { subscribeToChannelRealtime, broadcastMessage } from '../supabaseClient';

export function useChatMessages(activeChannelId, currentUser) {
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
      } catch {
        return initialMessages;
      }
    }
    return initialMessages;
  });

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('discord_web_messages', JSON.stringify(messages));
  }, [messages]);

  // Supabase Realtime Listener
  useEffect(() => {
    if (!activeChannelId) return;
    return subscribeToChannelRealtime(activeChannelId, (incomingMsg) => {
      setMessages((prev) => {
        const currentList = prev[activeChannelId] || [];
        if (currentList.some((m) => m.id === incomingMsg.id)) return prev;
        return { ...prev, [activeChannelId]: [...currentList, incomingMsg] };
      });
    });
  }, [activeChannelId]);

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
            if (newUsers.length === 0) reactions.splice(existingIndex, 1);
            else reactions[existingIndex] = { ...r, count: r.count - 1, users: newUsers };
          } else {
            reactions[existingIndex] = {
              ...r,
              count: r.count + 1,
              users: [...(r.users || []), currentUser.id],
            };
          }
        } else {
          reactions.push({ emoji, count: 1, users: [currentUser.id] });
        }
        return { ...m, reactions };
      });
      return { ...prev, [activeChannelId]: updated };
    });
  };

  const deleteMessagesByAuthor = (userId) => {
    setMessages((prev) => {
      const updated = {};
      for (const [chId, msgs] of Object.entries(prev)) {
        updated[chId] = msgs.filter((m) => m.author?.id !== userId);
      }
      return updated;
    });
  };

  return {
    messages,
    setMessages,
    handleSendMessage,
    handleAddReaction,
    deleteMessagesByAuthor,
  };
}
