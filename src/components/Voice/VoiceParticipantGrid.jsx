import React from 'react';
import { Headphones, MicOff } from 'lucide-react';

export default function VoiceParticipantGrid({
  videoRef,
  isScreenSharing,
  isCameraActive,
  currentUser,
  voiceParticipants = [],
  members = [],
  isMuted,
  serverMutedUsers = {},
  serverDeafenedUsers = {},
  activeSpeakerId,
  onOpenContextMenu,
}) {
  if (isScreenSharing || isCameraActive) {
    return (
      <div className="relative w-full h-full max-w-5xl max-h-[75vh] bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] flex items-center justify-center group border border-amber-500/30">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-contain"
        />

        {/* Live Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur px-3 py-1.5 rounded-xl border border-amber-500/30 text-white text-xs font-bold shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-amber-200">
            {isScreenSharing ? 'BILDSCHIRMÜBERTRAGUNG' : 'KAMERA'}
          </span>
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
    );
  }

  return (
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
              !isMuted &&
              !serverMutedUsers[currentUser.id] &&
              !serverDeafenedUsers[currentUser.id]
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
          ) : serverMutedUsers[currentUser.id] || isMuted ? (
            <div
              className="absolute bottom-0 right-0 bg-red-600 p-1.5 rounded-full shadow"
              title="Stummgeschaltet"
            >
              <MicOff className="w-4 h-4 text-white" />
            </div>
          ) : null}
        </div>
        <div className="font-bold text-amber-200 text-sm truncate max-w-[150px] text-center">
          {currentUser.displayName}
        </div>
      </div>

      {/* Live Voice Participants (Realtime Supabase Presence) */}
      {(() => {
        const otherLive = (voiceParticipants || []).filter((p) => p.id !== currentUser?.id);
        const listToRender = otherLive.length > 0 ? otherLive : members.filter((m) => m.id !== currentUser?.id).slice(0, 1);

        return listToRender.map((member) => {
          const isMemServerMuted = !!serverMutedUsers[member.id] || !!member.isMuted;
          const isMemServerDeafened = !!serverDeafenedUsers[member.id] || !!member.isDeafened;
          const isMemSpeaking = member.speaking || member.id === activeSpeakerId;

          return (
            <div
              key={member.id}
              onContextMenu={(e) => onOpenContextMenu && onOpenContextMenu(e, member)}
              className="bg-[#0e0e13] rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-2xl border border-amber-500/25 cursor-pointer hover:border-amber-400/60 hover:shadow-amber-500/10 transition group select-none"
              title={otherLive.length > 0 ? `${member.displayName} (Canlı Ses Odasında)` : 'Kullanıcı bekleniyor...'}
            >
              <div className="relative mb-3">
                <img
                  src={member.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                  alt={member.displayName}
                  className={`w-24 h-24 rounded-full object-cover border-4 transition-all duration-200 ${
                    isMemSpeaking && !isMemServerMuted && !isMemServerDeafened
                      ? 'speaking-ring border-amber-400'
                      : 'border-transparent'
                  }`}
                />
                {isMemServerDeafened ? (
                  <div
                    className="absolute bottom-0 right-0 bg-red-600 p-1.5 rounded-full shadow animate-pulse"
                    title="Taubgeschaltet"
                  >
                    <Headphones className="w-4 h-4 text-white" />
                  </div>
                ) : isMemServerMuted ? (
                  <div
                    className="absolute bottom-0 right-0 bg-red-600 p-1.5 rounded-full shadow"
                    title="Stummgeschaltet"
                  >
                    <MicOff className="w-4 h-4 text-white" />
                  </div>
                ) : null}
              </div>
              <div className="font-bold text-amber-200 text-sm truncate max-w-[150px] text-center flex items-center gap-1.5 justify-center">
                <span>{member.displayName}</span>
                {otherLive.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Canlı Bağlı" />
                )}
              </div>
            </div>
          );
        });
      })()}
    </div>
  );
}
