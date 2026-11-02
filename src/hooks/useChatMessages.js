import { useState, useEffect } from 'react';
import { initialMessages } from '../data/initialData';
import { subscribeToChannelRealtime, broadcastMessage } from '../supabaseClient';

export function useChatMessages(activeChannelId, currentUser) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('dilsed_web_messages') || localStorage.getItem('discord_web_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          if (parsed['c_general'] || parsed['c_dev'] || parsed['c_rules']) {
            localStorage.removeItem('dilsed_web_messages');
            localStorage.removeItem('discord_web_messages');
            return initialMessages;
          }
          // Normalize messages in all channels
          const normalized = {};
          for (const [chId, msgList] of Object.entries(parsed)) {
            if (Array.isArray(msgList)) {
              normalized[chId] = msgList.map((m) => {
                const author = (typeof m.author === 'object' && m.author !== null)
                  ? m.author
                  : {
                      id: m.senderId || m.authorId || 'author_' + (m.id || 'unknown'),
                      displayName: typeof m.author === 'string' ? m.author : (m.senderName || 'Benutzer'),
                      username: typeof m.author === 'string' ? m.author : (m.senderName || 'user'),
                      avatar: m.avatar || '/dilsed-logo.png',
                      isBot: Boolean(m.isBot),
                      roleColor: m.roleColor || '#fde68a'
                    };
                const content = m.content || m.text || '';
                const reactions = Array.isArray(m.reactions)
                  ? m.reactions
                  : (m.reactions && typeof m.reactions === 'object')
                    ? Object.entries(m.reactions).map(([emoji, count]) => ({
                        emoji,
                        count: typeof count === 'number' ? count : 1,
                        users: []
                      }))
                    : [];
                return { ...m, author, content, reactions };
              });
            } else {
              normalized[chId] = [];
            }
          }
          return normalized;
        }
      } catch {
        return initialMessages;
      }
    }
    return initialMessages;
  });

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('dilsed_web_messages', JSON.stringify(messages));
  }, [messages]);

  // Supabase Realtime Listener with safe cleanup
  useEffect(() => {
    if (!activeChannelId) return;
    const unsub = subscribeToChannelRealtime(activeChannelId, (incomingMsg) => {
      setMessages((prev) => {
        const currentList = prev[activeChannelId] || [];
        if (currentList.some((m) => m.id === incomingMsg.id)) return prev;
        return { ...prev, [activeChannelId]: [...currentList, incomingMsg] };
      });
    });
    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, [activeChannelId]);

  const handleSendMessage = (text) => {
    if (!activeChannelId || !text?.trim()) return;
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
      content: text.trim(),
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
    if (!activeChannelId) return;
    setMessages((prev) => {
      const channelMsgs = prev[activeChannelId] || [];
      const updated = channelMsgs.map((m) => {
        if (m.id !== messageId) return m;
        const reactions = Array.isArray(m.reactions)
          ? [...m.reactions]
          : (m.reactions && typeof m.reactions === 'object')
            ? Object.entries(m.reactions).map(([e, c]) => ({ emoji: e, count: typeof c === 'number' ? c : 1, users: [] }))
            : [];
        const existingIndex = reactions.findIndex((r) => r.emoji === emoji);
        if (existingIndex > -1) {
          const r = reactions[existingIndex];
          const hasUser = r.users?.includes(currentUser.id);
          if (hasUser) {
            const newUsers = (r.users || []).filter((u) => u !== currentUser.id);
            if (newUsers.length === 0) reactions.splice(existingIndex, 1);
            else reactions[existingIndex] = { ...r, count: Math.max(0, r.count - 1), users: newUsers };
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
