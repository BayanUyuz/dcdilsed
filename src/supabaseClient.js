import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://ejefjepfzqduuzuxcyta.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_gIN1OQFlbRw51HZlNFCzQg_HWUIZ7zd';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

const activeChannels = new Map();

export function subscribeToChannelRealtime(channelId, onMessageReceived) {
  const channelName = `dilsed-room-${channelId}`;
  let channel = activeChannels.get(channelName);

  if (!channel) {
    channel = supabase.channel(channelName, {
      config: { broadcast: { self: false } },
    });

    channel
      .on('broadcast', { event: 'new_message' }, (payload) => {
        if (payload?.payload) onMessageReceived(payload.payload);
      })
      .subscribe();

    activeChannels.set(channelName, channel);
  }

  return () => {};
}

export async function broadcastMessage(channelId, message) {
  const channelName = `dilsed-room-${channelId}`;
  let channel = activeChannels.get(channelName);

  if (!channel) {
    channel = supabase.channel(channelName);
    channel.subscribe();
    activeChannels.set(channelName, channel);
  }

  try {
    await channel.send({
      type: 'broadcast',
      event: 'new_message',
      payload: message,
    });
  } catch (err) {
    console.warn('[Supabase Broadcast Warning]:', err);
  }
}

// --- SES ODALARI REALTIME PRESENCE (CANLI KATILIMCILAR) ---
export function subscribeToVoicePresence(voiceChannelId, currentUser, userState, onPresenceChange) {
  if (!voiceChannelId || !currentUser) return () => {};
  const channelName = `dilsed-voice-${voiceChannelId}`;
  let channel = supabase.channel(channelName, { config: { presence: { key: currentUser.id } } });

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      const users = [];
      const seen = new Set();
      for (const k in state) {
        state[k].forEach((u) => {
          if (u?.id && !seen.has(u.id)) {
            seen.add(u.id);
            users.push(u);
          }
        });
      }
      onPresenceChange(users);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({
          id: currentUser.id,
          username: currentUser.username,
          displayName: currentUser.displayName,
          avatar: currentUser.avatar,
          isMuted: Boolean(userState?.isMuted),
          isDeafened: Boolean(userState?.isDeafened),
          speaking: Boolean(userState?.speaking),
          joinedAt: Date.now()
        });
      }
    });

  return () => {
    try {
      channel.untrack();
      channel.unsubscribe();
    } catch {}
  };
}

export async function updateVoiceUserState(voiceChannelId, currentUser, userState) {
  if (!voiceChannelId || !currentUser) return;
  const channelName = `dilsed-voice-${voiceChannelId}`;
  const channel = supabase.channel(channelName);
  try {
    await channel.track({
      id: currentUser.id,
      username: currentUser.username,
      displayName: currentUser.displayName,
      avatar: currentUser.avatar,
      isMuted: Boolean(userState?.isMuted),
      isDeafened: Boolean(userState?.isDeafened),
      speaking: Boolean(userState?.speaking),
    });
  } catch {}
}

// --- ARKADAŞ VE DM REALTIME SENKRONİZASYONU ---
export function subscribeToNetworkSync(currentUser, onFriendEvent, onDmEvent) {
  if (!currentUser?.id) return () => {};
  const channel = supabase.channel('dilsed-network-friends', {
    config: { broadcast: { self: false } },
  });

  channel
    .on('broadcast', { event: 'friend_request' }, (payload) => {
      const req = payload?.payload;
      if (!req) return;
      const myUsername = (currentUser.username || '').toLowerCase();
      const target = (req.targetUsername || '').toLowerCase();
      if (target === myUsername || req.targetUserId === currentUser.id) {
        onFriendEvent?.(req);
      }
    })
    .on('broadcast', { event: 'dm_message' }, (payload) => {
      const msg = payload?.payload;
      if (!msg) return;
      if (msg.recipientId === currentUser.id || msg.senderId === currentUser.id) {
        onDmEvent?.(msg);
      }
    })
    .subscribe();

  return () => {
    try {
      channel.unsubscribe();
    } catch {}
  };
}

export async function broadcastFriendRequest(fromUser, targetUsername) {
  const channel = supabase.channel('dilsed-network-friends');
  channel.subscribe();
  try {
    await channel.send({
      type: 'broadcast',
      event: 'friend_request',
      payload: {
        fromUser: {
          id: fromUser.id,
          username: fromUser.username,
          displayName: fromUser.displayName,
          avatar: fromUser.avatar,
          status: 'online',
          statusText: fromUser.statusText || '⚡ DilSed Web'
        },
        targetUsername: targetUsername.toLowerCase().trim()
      }
    });
  } catch (e) {
    console.warn('[Supabase Friend Request Error]:', e);
  }
}

export async function broadcastDm(fromUser, recipientId, content) {
  const channel = supabase.channel('dilsed-network-friends');
  channel.subscribe();
  const newMsg = {
    id: 'dm_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    senderId: fromUser.id,
    recipientId,
    author: fromUser.displayName,
    content: content.trim(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  try {
    await channel.send({
      type: 'broadcast',
      event: 'dm_message',
      payload: newMsg
    });
  } catch (e) {
    console.warn('[Supabase DM Error]:', e);
  }
  return newMsg;
}
