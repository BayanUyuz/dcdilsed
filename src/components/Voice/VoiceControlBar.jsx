import React from 'react';
import {
  Monitor,
  Video,
  VideoOff,
  Sparkles,
  Music,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PhoneOff,
} from 'lucide-react';
import VoiceSoundboardPopover from './VoiceSoundboardPopover';
import { playLeaveVoiceSound } from '../../soundEffects';

export default function VoiceControlBar({
  isScreenSharing,
  startScreenShare,
  isCameraActive,
  startCamera,
  isKrispActive,
  setIsKrispActive,
  showSoundboard,
  setShowSoundboard,
  isMuted,
  toggleMute,
  isDeafened,
  toggleDeafen,
  onDisconnect,
  activeStreamRef,
}) {
  return (
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
          onClick={() => setShowSoundboard(!showSoundboard)}
          className={`p-3.5 rounded-full transition shadow-lg cursor-pointer border ${
            showSoundboard
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 border-amber-400 shadow-amber-500/25'
              : 'bg-[#121217] hover:bg-[#181822] text-amber-400 hover:text-amber-300 border-amber-500/30 hover:border-amber-400'
          }`}
          title="Soundboard"
        >
          <Music className="w-5 h-5" />
        </button>

        {showSoundboard && <VoiceSoundboardPopover />}
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
  );
}
