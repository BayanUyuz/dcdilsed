import React, { useState, useRef, useEffect } from 'react';
import VoiceRoomHeader from './VoiceRoomHeader';
import VoiceParticipantGrid from './VoiceParticipantGrid';
import VoiceControlBar from './VoiceControlBar';
import { playMuteSound } from '../../soundEffects';

export default function VoiceRoomView({
  voiceChannel,
  onDisconnect,
  currentUser,
  isMuted,
  setIsMuted,
  isDeafened,
  setIsDeafened,
  voiceParticipants = [],
  members = [],
  serverMutedUsers = {},
  serverDeafenedUsers = {},
  onOpenContextMenu,
}) {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isKrispActive, setIsKrispActive] = useState(true);
  const [showSoundboard, setShowSoundboard] = useState(false);
  const [streamError, setStreamError] = useState('');
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const activeStreamRef = useRef(null);

  useEffect(() => {
    const otherMembers = members.filter((m) => m.id !== currentUser.id);
    if (otherMembers.length === 0) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.35) {
        const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
        setActiveSpeakerId(randomMember.id);
        setTimeout(() => setActiveSpeakerId(null), 2400);
      } else {
        setActiveSpeakerId(null);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [members, currentUser.id]);

  useEffect(() => {
    return () => {
      if (activeStreamRef.current) {
        activeStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startScreenShare = async () => {
    setStreamError('');
    try {
      if (isScreenSharing) {
        if (activeStreamRef.current) {
          activeStreamRef.current.getTracks().forEach((track) => track.stop());
          activeStreamRef.current = null;
        }
        setIsScreenSharing(false);
        if (videoRef.current) videoRef.current.srcObject = null;
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        setStreamError('Dein Browser unterstützt die Screen-Sharing-API nicht.');
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always', displaySurface: 'monitor' },
        audio: true,
      });

      activeStreamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsScreenSharing(true);
      setIsCameraActive(false);

      stream.getVideoTracks()[0].onended = () => {
        setIsScreenSharing(false);
        if (videoRef.current) videoRef.current.srcObject = null;
        activeStreamRef.current = null;
      };
    } catch (err) {
      if (err.name !== 'NotAllowedError') {
        setStreamError('Fehler beim Starten der Bildschirmübertragung.');
      }
    }
  };

  const startCamera = async () => {
    setStreamError('');
    try {
      if (isCameraActive) {
        if (activeStreamRef.current) {
          activeStreamRef.current.getTracks().forEach((track) => track.stop());
          activeStreamRef.current = null;
        }
        setIsCameraActive(false);
        if (videoRef.current) videoRef.current.srcObject = null;
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStreamError('Kein Kameragerät gefunden.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      activeStreamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsCameraActive(true);
      setIsScreenSharing(false);

      stream.getVideoTracks()[0].onended = () => {
        setIsCameraActive(false);
        if (videoRef.current) videoRef.current.srcObject = null;
        activeStreamRef.current = null;
      };
    } catch {
      setStreamError('Kamerazugriff wurde verweigert oder keine Kamera gefunden.');
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    playMuteSound(next);
  };

  const toggleDeafen = () => {
    const next = !isDeafened;
    setIsDeafened(next);
    if (next) setIsMuted(true);
    playMuteSound(next);
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-[#08080a] flex flex-col h-full overflow-hidden select-none relative"
    >
      <VoiceRoomHeader
        voiceChannel={voiceChannel}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      <div className="flex-1 p-4 flex flex-col items-center justify-center relative overflow-hidden bg-[#040406]">
        {streamError && (
          <div className="absolute top-4 bg-red-950/90 border border-red-500 text-red-200 px-4 py-2 rounded-xl text-xs font-semibold shadow-lg z-20">
            {streamError}
          </div>
        )}

        <VoiceParticipantGrid
          videoRef={videoRef}
          isScreenSharing={isScreenSharing}
          isCameraActive={isCameraActive}
          currentUser={currentUser}
          voiceParticipants={voiceParticipants}
          members={members}
          isMuted={isMuted}
          serverMutedUsers={serverMutedUsers}
          serverDeafenedUsers={serverDeafenedUsers}
          activeSpeakerId={activeSpeakerId}
          onOpenContextMenu={onOpenContextMenu}
        />
      </div>

      <VoiceControlBar
        isScreenSharing={isScreenSharing}
        startScreenShare={startScreenShare}
        isCameraActive={isCameraActive}
        startCamera={startCamera}
        isKrispActive={isKrispActive}
        setIsKrispActive={setIsKrispActive}
        showSoundboard={showSoundboard}
        setShowSoundboard={setShowSoundboard}
        isMuted={isMuted}
        toggleMute={toggleMute}
        isDeafened={isDeafened}
        toggleDeafen={toggleDeafen}
        onDisconnect={onDisconnect}
        activeStreamRef={activeStreamRef}
      />
    </div>
  );
}
