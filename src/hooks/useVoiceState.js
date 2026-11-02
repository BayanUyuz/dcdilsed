import { useState, useEffect } from 'react';
import {
  playJoinVoiceSound,
  playLeaveVoiceSound
} from '../soundEffects';
import {
  subscribeToVoicePresence,
  updateVoiceUserState
} from '../supabaseClient';

export function useVoiceState(currentUser) {
  const [connectedVoiceChannel, setConnectedVoiceChannel] = useState(null);
  const [isVoiceRoomViewActive, setIsVoiceRoomViewActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [voiceParticipants, setVoiceParticipants] = useState([]);

  // Supabase Realtime Presence sync for active voice channel
  useEffect(() => {
    if (!connectedVoiceChannel?.id || !currentUser?.id) {
      setVoiceParticipants([]);
      return;
    }

    const unsub = subscribeToVoicePresence(
      connectedVoiceChannel.id,
      currentUser,
      { isMuted, isDeafened },
      (liveUsers) => {
        setVoiceParticipants(liveUsers);
      }
    );

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, [connectedVoiceChannel?.id, currentUser?.id]);

  // Update mute/deafen status in presence
  useEffect(() => {
    if (connectedVoiceChannel?.id && currentUser?.id) {
      updateVoiceUserState(connectedVoiceChannel.id, currentUser, { isMuted, isDeafened });
    }
  }, [isMuted, isDeafened]);

  const handleDisconnectVoice = (member, user, onLogMessage) => {
    const target = member || user || currentUser;
    if (target.id === currentUser?.id) {
      setConnectedVoiceChannel(null);
      setIsVoiceRoomViewActive(false);
      setVoiceParticipants([]);
      playLeaveVoiceSound();
    } else if (onLogMessage) {
      onLogMessage(`📞 Sprachverbindung von **${target.displayName}** wurde getrennt.`);
    }
  };

  const handleMoveVoiceChannel = (member, targetChannel, user, onLogMessage) => {
    const target = member || user || currentUser;
    if (target.id === currentUser?.id) {
      setConnectedVoiceChannel(targetChannel);
      playJoinVoiceSound();
    } else if (onLogMessage) {
      onLogMessage(`↔️ **${target.displayName}** wurde in den Kanal **${targetChannel.name}** verschoben.`);
    }
  };

  return {
    connectedVoiceChannel,
    setConnectedVoiceChannel,
    isVoiceRoomViewActive,
    setIsVoiceRoomViewActive,
    isMuted,
    setIsMuted,
    isDeafened,
    setIsDeafened,
    voiceParticipants,
    handleDisconnectVoice,
    handleMoveVoiceChannel
  };
}
