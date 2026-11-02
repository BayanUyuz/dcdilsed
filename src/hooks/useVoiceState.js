import { useState } from 'react';
import {
  playJoinVoiceSound,
  playLeaveVoiceSound
} from '../soundEffects';

export function useVoiceState() {
  const [connectedVoiceChannel, setConnectedVoiceChannel] = useState(null);
  const [isVoiceRoomViewActive, setIsVoiceRoomViewActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const handleDisconnectVoice = (member, currentUser, onLogMessage) => {
    if (member.id === currentUser.id) {
      setConnectedVoiceChannel(null);
      setIsVoiceRoomViewActive(false);
      playLeaveVoiceSound();
    } else {
      if (onLogMessage) {
        onLogMessage(`📞 Sprachverbindung von **${member.displayName}** wurde getrennt.`);
      }
    }
  };

  const handleMoveVoiceChannel = (member, targetChannel, currentUser, onLogMessage) => {
    if (member.id === currentUser.id) {
      setConnectedVoiceChannel(targetChannel);
      playJoinVoiceSound();
    } else {
      if (onLogMessage) {
        onLogMessage(`↔️ **${member.displayName}** wurde in den Kanal **${targetChannel.name}** verschoben.`);
      }
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
    handleDisconnectVoice,
    handleMoveVoiceChannel
  };
}
