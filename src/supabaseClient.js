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
      config: {
        broadcast: { self: false },
      },
    });

    channel
      .on('broadcast', { event: 'new_message' }, (payload) => {
        if (payload && payload.payload) {
          onMessageReceived(payload.payload);
        }
      })
      .subscribe((status) => {
        console.log(`[Supabase Realtime] Channel ${channelName} status:`, status);
      });

    activeChannels.set(channelName, channel);
  }

  // Return a safe cleanup function so React useEffect never throws
  return () => {
    // Keep active channel cached or cleanly handle if needed
  };
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

  try {
    await supabase.from('messages').insert([
      {
        channel_id: channelId,
        content: message.content,
        author: message.author,
        created_at: message.timestamp || new Date().toISOString(),
      },
    ]);
  } catch {
    // Database schema fallback
  }
}
