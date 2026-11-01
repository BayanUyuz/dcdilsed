import React, { useState, useRef, useEffect } from 'react';
import {
  Monitor,
  Video,
  VideoOff,
  PhoneOff,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Radio,
  Settings,
  Sparkles,
  Users,
  Music,
  Rocket,
  Headphones
} from 'lucide-react';
import {
  playLeaveVoiceSound,
  playMuteSound,
  playAirhornSound,
  playQuackSound,
  playBadumTssSound,
  playApplauseSound
} from '../../soundEffects';

export default function VoiceRoomView({
  voiceChannel,
  onDisconnect,
  currentUser,
  isMuted,
  setIsMuted,
  isDeafened,
  setIsDeafened,
  members = [],
  serverMutedUsers = {},
  serverDeafenedUsers = {},
  onOpenContextMenu
}) {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isKrispActive, setIsKrispActive] = useState(true);
  const [showSoundboard, setShowSoundboard] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [streamError, setStreamError] = useState('');
  const [simulatedSpeakerId, setSimulatedSpeakerId] = useState(null);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const activeStreamRef = useRef(null);

  // Periodic subtle speaking simulation for other participants (illuminates green ring)
  useEffect(() => {
    const otherMembers = members.filter((m) => m.id !== currentUser.id);
    if (otherMembers.length === 0) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.35) {
        const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
        setSimulatedSpeakerId(randomMember.id);
        setTimeout(() => setSimulatedSpeakerId(null), 2400);
      } else {
        setSimulatedSpeakerId(null);
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
        video: {
          cursor: 'always',
          displaySurface: 'monitor',
        },
        audio: true,
      });

      activeStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
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
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setIsScreenSharing(false);

      stream.getVideoTracks()[0].onended = () => {
        setIsCameraActive(false);
        if (videoRef.current) videoRef.current.srcObject = null;
        activeStreamRef.current = null;
      };
    } catch (err) {
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
    if (next && !isMuted) setIsMuted(true);
    playMuteSound(next);
  };

  const SOUNDBOARD_SOUNDS = [
    { id: 'airhorn', name: 'Lufthorn', emoji: '📢', play: playAirhornSound },
    { id: 'quack', name: 'Enten-Quak', emoji: '🦆', play: playQuackSound },
    { id: 'badum', name: 'Ba-Dum-Tss!', emoji: '🥁', play: playBadumTssSound },
    { id: 'applause', name: 'Großer Applaus', emoji: '👏', play: playApplauseSound },
  ];

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-discord-chat flex flex-col h-full overflow-hidden select-none relative"
    >
      {/* Top Header Bar */}
      <div className="h-12 px-4 border-b border-discord-darkest/30 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-discord-green animate-pulse" />
          <h2 className="font-bold text-white text-base">
            {voiceChannel.name}
          </h2>
          <span className="text-xs text-discord-green font-semibold bg-discord-green/10 px-2 py-0.5 rounded flex items-center gap-1">
            <span>LIVE SPRACHE & STREAM</span>
            <span className="text-[10px] bg-discord-green/20 px-1 rounded">1080p 60FPS</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-discord-textMuted">
          <button
            onClick={toggleFullscreen}
            className="hover:text-white transition p-1"
            title={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Video / Screen Share Stage */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center relative overflow-hidden bg-discord-darkest/80">
        {streamError && (
          <div className="absolute top-4 bg-discord-red/80 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg z-20">
            {streamError}
          </div>
        )}

        {isScreenSharing || isCameraActive ? (
          /* Active Screen / Camera Video Container */
          <div className="relative w-full h-full max-w-5xl max-h-[75vh] bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center group border border-discord-divider/30">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain"
            />

            {/* Top Left Live Stream Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-discord-red animate-ping" />
              <span>{isScreenSharing ? 'BILDSCHIRMÜBERTRAGUNG' : 'KAMERA'}</span>
              <span className="text-discord-green text-[10px] bg-discord-green/20 px-1.5 py-0.5 rounded">
                1080p 60FPS
              </span>
            </div>

            {/* Streamer Avatar pill */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs">
              <img
                src={currentUser.avatar}
                alt={currentUser.displayName}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-semibold">{currentUser.displayName}</span>
            </div>
          </div>
        ) : (
          /* Participant Grid when no screen is shared */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl w-full">
            {/* Current User Card */}
            <div
              onContextMenu={(e) => onOpenContextMenu && onOpenContextMenu(e, currentUser)}
              className="bg-discord-channels rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-lg border border-discord-divider/20 group cursor-pointer hover:border-discord-divider/50 transition select-none"
              title="Rechtsklick: Moderationsmenü"
            >
              <div className="relative mb-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className={`w-24 h-24 rounded-full object-cover border-4 transition-all duration-200 ${
                    !isMuted && !serverMutedUsers[currentUser.id] && !serverDeafenedUsers[currentUser.id]
                      ? 'speaking-ring border-discord-green'
                      : 'border-transparent'
                  }`}
                />
                {serverDeafenedUsers[currentUser.id] ? (
                  <div
                    className="absolute bottom-0 right-0 bg-discord-red p-1.5 rounded-full shadow"
                    title="Serverweit taub geschaltet"
                  >
                    <Headphones className="w-4 h-4 text-white" />
                  </div>
                ) : (serverMutedUsers[currentUser.id] || isMuted) ? (
                  <div
                    className="absolute bottom-0 right-0 bg-discord-red p-1.5 rounded-full shadow"
                    title="Stummgeschaltet"
                  >
                    <MicOff className="w-4 h-4 text-white" />
                  </div>
                ) : null}
              </div>
              <div className="font-semibold text-white text-sm truncate max-w-[150px] text-center">
                {currentUser.displayName}
              </div>
            </div>

            {/* Other Server Members in Voice Room */}
            {members.filter((m) => m.id !== currentUser.id).slice(0, 5).map((member) => {
              const isMemServerMuted = !!serverMutedUsers[member.id];
              const isMemServerDeafened = !!serverDeafenedUsers[member.id];
              const isMemSpeaking = member.id === simulatedSpeakerId && !isMemServerMuted && !isMemServerDeafened;

              return (
                <div
                  key={member.id}
                  onContextMenu={(e) => onOpenContextMenu && onOpenContextMenu(e, member)}
                  className="bg-discord-channels rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-lg border border-discord-divider/20 cursor-pointer hover:border-discord-divider/50 transition group select-none"
                  title="Rechtsklick: Moderationsmenü"
                >
                  <div className="relative mb-3">
                    <img
                      src={member.avatar}
                      alt={member.displayName}
                      className={`w-24 h-24 rounded-full object-cover border-4 transition-all duration-200 ${
                        isMemSpeaking
                          ? 'speaking-ring border-discord-green'
                          : 'border-transparent'
                      }`}
                    />
                    {isMemServerDeafened ? (
                      <div
                        className="absolute bottom-0 right-0 bg-discord-red p-1.5 rounded-full shadow animate-pulse"
                        title="Serverweit taub geschaltet"
                      >
                        <Headphones className="w-4 h-4 text-white" />
                      </div>
                    ) : isMemServerMuted ? (
                      <div
                        className="absolute bottom-0 right-0 bg-discord-red p-1.5 rounded-full shadow"
                        title="Serverweit stummgeschaltet"
                      >
                        <MicOff className="w-4 h-4 text-white" />
                      </div>
                    ) : null}
                  </div>
                  <div className="font-semibold text-white text-sm truncate max-w-[150px] text-center">
                    {member.displayName}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Voice Controls Bar */}
      <div className="h-20 bg-discord-darkest flex items-center justify-center gap-3 px-6 z-20 border-t border-discord-divider/30 relative">
        {/* Screen Share Button */}
        <button
          onClick={startScreenShare}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-xs transition shadow-lg ${
            isScreenSharing
              ? 'bg-discord-green text-white hover:bg-discord-green/90 animate-pulse'
              : 'bg-discord-channels hover:bg-discord-hoverChannel text-white'
          }`}
          title="Bildschirm übertragen"
        >
          <Monitor className="w-5 h-5" />
          <span>{isScreenSharing ? 'Übertragung beenden' : 'Bildschirm übertragen'}</span>
        </button>

        {/* Camera Toggle */}
        <button
          onClick={startCamera}
          className={`p-3.5 rounded-full transition shadow-lg ${
            isCameraActive
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 shadow-amber-500/20'
              : 'bg-discord-channels hover:bg-discord-hoverChannel text-white'
          }`}
          title={isCameraActive ? 'Kamera ausschalten' : 'Kamera einschalten'}
        >
          {isCameraActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* Krisp Noise Suppression */}
        <button
          onClick={() => setIsKrispActive(!isKrispActive)}
          className={`p-3.5 rounded-full transition shadow-lg ${
            isKrispActive
              ? 'bg-discord-green/20 text-discord-green border border-discord-green/50'
              : 'bg-discord-channels hover:bg-discord-hoverChannel text-discord-textMuted'
          }`}
          title={`Krisp-Rauschunterdrückung: ${isKrispActive ? 'Aktiviert' : 'Deaktiviert'}`}
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Soundboard Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSoundboard(!showSoundboard);
              setShowActivities(false);
            }}
            className={`p-3.5 rounded-full transition shadow-lg ${
              showSoundboard
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 shadow-amber-500/20'
                : 'bg-discord-channels hover:bg-discord-hoverChannel text-white'
            }`}
            title="Soundboard"
          >
            <Music className="w-5 h-5" />
          </button>

          {showSoundboard && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-discord-darkest border border-discord-divider/50 rounded-xl p-3 shadow-2xl z-50 w-52 animate-in zoom-in-95">
              <div className="text-[10px] font-bold text-discord-textMuted uppercase mb-2">
                SOUNDBOARD
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SOUNDBOARD_SOUNDS.map((snd) => (
                  <button
                    key={snd.id}
                    onClick={() => {
                      snd.play();
                    }}
                    className="p-2 rounded-lg bg-discord-channels/70 hover:bg-discord-hoverChannel flex flex-col items-center justify-center text-center transition hover:scale-105"
                  >
                    <span className="text-xl mb-1">{snd.emoji}</span>
                    <span className="text-[10px] font-bold text-white leading-tight">{snd.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mic Toggle */}
        <button
          onClick={toggleMute}
          className={`p-3.5 rounded-full transition shadow-lg ${
            isMuted
              ? 'bg-discord-red text-white'
              : 'bg-discord-channels hover:bg-discord-hoverChannel text-white'
          }`}
          title={isMuted ? 'Stummschaltung aufheben' : 'Stummschalten'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Deafen Toggle */}
        <button
          onClick={toggleDeafen}
          className={`p-3.5 rounded-full transition shadow-lg ${
            isDeafened
              ? 'bg-discord-red text-white'
              : 'bg-discord-channels hover:bg-discord-hoverChannel text-white'
          }`}
          title={isDeafened ? 'Taubschaltung aufheben' : 'Taub schalten'}
        >
          {isDeafened ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        {/* Disconnect Call */}
        <button
          onClick={() => {
            playLeaveVoiceSound();
            if (activeStreamRef.current) {
              activeStreamRef.current.getTracks().forEach((track) => track.stop());
            }
            onDisconnect();
          }}
          className="bg-discord-red hover:bg-discord-red/90 text-white p-3.5 rounded-full transition shadow-lg"
          title="Verbindung trennen"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
