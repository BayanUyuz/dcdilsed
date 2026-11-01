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
      className="flex-1 bg-[#08080a] flex flex-col h-full overflow-hidden select-none relative"
    >
      {/* Top Header Bar */}
      <div className="h-12 px-4 border-b border-amber-500/15 bg-[#060608] flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
          <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-300 text-base">
            {voiceChannel.name}
          </h2>
          <span className="text-xs text-amber-300 font-bold bg-amber-400/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span>LIVE SPRACHE & STREAM</span>
            <span className="text-[10px] bg-amber-400/25 text-amber-200 px-1.5 py-0.2 rounded font-extrabold">1080p 60FPS</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-neutral-400">
          <button
            onClick={toggleFullscreen}
            className="hover:text-amber-300 transition p-1"
            title={isFullscreen ? 'Vollbild beenden' : 'Vollbild'}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Video / Screen Share Stage */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center relative overflow-hidden bg-[#040406]">
        {streamError && (
          <div className="absolute top-4 bg-red-950/90 border border-red-500 text-red-200 px-4 py-2 rounded-xl text-xs font-semibold shadow-lg z-20">
            {streamError}
          </div>
        )}

        {isScreenSharing || isCameraActive ? (
          /* Active Screen / Camera Video Container */
          <div className="relative w-full h-full max-w-5xl max-h-[75vh] bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] flex items-center justify-center group border border-amber-500/30">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain"
            />

            {/* Top Left Live Stream Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur px-3 py-1.5 rounded-xl border border-amber-500/30 text-white text-xs font-bold shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-amber-200">{isScreenSharing ? 'BILDSCHIRMÜBERTRAGUNG' : 'KAMERA'}</span>
              <span className="text-amber-300 text-[10px] bg-amber-400/20 px-1.5 py-0.5 rounded font-extrabold">
                1080p 60FPS
              </span>
            </div>

            {/* Streamer Avatar pill */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur px-3 py-1.5 rounded-xl border border-amber-500/30 text-white text-xs shadow-lg">
              <img
                src={currentUser.avatar}
                alt={currentUser.displayName}
                className="w-6 h-6 rounded-full object-cover border border-amber-400"
              />
              <span className="font-bold text-amber-200">{currentUser.displayName}</span>
            </div>
          </div>
        ) : (
          /* Participant Grid when no screen is shared */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl w-full">
            {/* Current User Card */}
            <div
              onContextMenu={(e) => onOpenContextMenu && onOpenContextMenu(e, currentUser)}
              className="bg-[#0e0e13] rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-2xl border border-amber-500/25 group cursor-pointer hover:border-amber-400/60 hover:shadow-amber-500/10 transition select-none"
              title="Rechtsklick: Moderationsmenü"
            >
              <div className="relative mb-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className={`w-24 h-24 rounded-full object-cover border-4 transition-all duration-200 ${
                    !isMuted && !serverMutedUsers[currentUser.id] && !serverDeafenedUsers[currentUser.id]
                      ? 'speaking-ring border-amber-400'
                      : 'border-transparent'
                  }`}
                />
                {serverDeafenedUsers[currentUser.id] ? (
                  <div
                    className="absolute bottom-0 right-0 bg-red-600 p-1.5 rounded-full shadow"
                    title="Serverweit taub geschaltet"
                  >
                    <Headphones className="w-4 h-4 text-white" />
                  </div>
                ) : (serverMutedUsers[currentUser.id] || isMuted) ? (
                  <div
                    className="absolute bottom-0 right-0 bg-red-600 p-1.5 rounded-full shadow"
                    title="Stummgeschaltet"
                  >
                    <MicOff className="w-4 h-4 text-white" />
                  </div>
                ) : null}
              </div>
              <div className="font-bold text-white text-sm truncate max-w-[150px] text-center">
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
                  className="bg-[#0e0e13] rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-2xl border border-amber-500/25 cursor-pointer hover:border-amber-400/60 hover:shadow-amber-500/10 transition group select-none"
                  title="Rechtsklick: Moderationsmenü"
                >
                  <div className="relative mb-3">
                    <img
                      src={member.avatar}
                      alt={member.displayName}
                      className={`w-24 h-24 rounded-full object-cover border-4 transition-all duration-200 ${
                        isMemSpeaking
                          ? 'speaking-ring border-amber-400'
                          : 'border-transparent'
                      }`}
                    />
                    {isMemServerDeafened ? (
                      <div
                        className="absolute bottom-0 right-0 bg-red-600 p-1.5 rounded-full shadow animate-pulse"
                        title="Serverweit taub geschaltet"
                      >
                        <Headphones className="w-4 h-4 text-white" />
                      </div>
                    ) : isMemServerMuted ? (
                      <div
                        className="absolute bottom-0 right-0 bg-red-600 p-1.5 rounded-full shadow"
                        title="Serverweit stummgeschaltet"
                      >
                        <MicOff className="w-4 h-4 text-white" />
                      </div>
                    ) : null}
                  </div>
                  <div className="font-bold text-white text-sm truncate max-w-[150px] text-center">
                    {member.displayName}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Voice Controls Bar */}
      <div className="h-20 bg-[#060608] flex items-center justify-center gap-3 px-6 z-20 border-t border-amber-500/15 shadow-2xl relative">
        {/* Screen Share Button */}
        <button
          onClick={startScreenShare}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs transition shadow-lg cursor-pointer ${
            isScreenSharing
              ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300 animate-pulse'
              : 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:brightness-110 shadow-amber-500/20'
          }`}
          title="Bildschirm übertragen"
        >
          <Monitor className="w-5 h-5" />
          <span>{isScreenSharing ? 'Übertragung beenden' : 'Bildschirm übertragen'}</span>
        </button>

        {/* Camera Toggle */}
        <button
          onClick={startCamera}
          className={`p-3.5 rounded-full transition shadow-lg cursor-pointer border ${
            isCameraActive
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 border-amber-400 shadow-amber-500/25'
              : 'bg-[#121217] hover:bg-[#181822] text-amber-400 hover:text-amber-300 border-amber-500/30 hover:border-amber-400'
          }`}
          title={isCameraActive ? 'Kamera ausschalten' : 'Kamera einschalten'}
        >
          {isCameraActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* Krisp Noise Suppression */}
        <button
          onClick={() => setIsKrispActive(!isKrispActive)}
          className={`p-3.5 rounded-full transition shadow-lg cursor-pointer border ${
            isKrispActive
              ? 'bg-amber-400/20 text-amber-300 border-amber-400/60 shadow-amber-500/15'
              : 'bg-[#121217] hover:bg-[#181822] text-neutral-400 border-amber-500/20'
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
            className={`p-3.5 rounded-full transition shadow-lg cursor-pointer border ${
              showSoundboard
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 border-amber-400 shadow-amber-500/25'
                : 'bg-[#121217] hover:bg-[#181822] text-amber-400 hover:text-amber-300 border-amber-500/30 hover:border-amber-400'
            }`}
            title="Soundboard"
          >
            <Music className="w-5 h-5" />
          </button>

          {showSoundboard && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#0c0c10] border border-amber-500/30 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.15)] z-50 w-56 animate-in zoom-in-95">
              <div className="text-[10px] font-bold text-amber-300/80 uppercase mb-2">
                SOUNDBOARD
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SOUNDBOARD_SOUNDS.map((snd) => (
                  <button
                    key={snd.id}
                    onClick={() => {
                      snd.play();
                    }}
                    className="p-2 rounded-xl bg-[#131318] hover:bg-[#1a1a22] border border-amber-500/15 hover:border-amber-400/40 flex flex-col items-center justify-center text-center transition hover:scale-105"
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
          className={`p-3.5 rounded-full transition shadow-lg cursor-pointer border ${
            isMuted
              ? 'bg-red-600/20 text-red-400 border-red-500/60'
              : 'bg-[#121217] hover:bg-[#181822] text-amber-400 hover:text-amber-300 border-amber-500/30 hover:border-amber-400'
          }`}
          title={isMuted ? 'Stummschaltung aufheben' : 'Stummschalten'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Deafen Toggle */}
        <button
          onClick={toggleDeafen}
          className={`p-3.5 rounded-full transition shadow-lg cursor-pointer border ${
            isDeafened
              ? 'bg-red-600/20 text-red-400 border-red-500/60'
              : 'bg-[#121217] hover:bg-[#181822] text-amber-400 hover:text-amber-300 border-amber-500/30 hover:border-amber-400'
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
          className="bg-red-600 hover:bg-red-500 text-white p-3.5 rounded-full transition shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          title="Verbindung trennen"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
